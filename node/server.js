const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const CRUD = require('./crud');
const AUTH = require('./authCrud');

const app = express();
const PORT = 3000;

//segredo
const SEGREDO = 'chave_secreta_filmes';     // chave secreta para assinar e verificar tokens JWT. é uma senha que só a gente vai conhecer

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//verificação do token do JWT
function verificarToken(req, res, next) {       // Ela verifica se o token é válido antes de deixar a requisição passar
    const authHeader = req.headers.authorization;

    if (!authHeader) {      // Se não veio nenhum token no cabeçalho, ele bloqueia

        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1]; // Remove 'Bearer' do início

    try {       // Verifica se o token é válido e não está expirado
        const decoded = jwt.verify(token, SEGREDO);     // Se o token for válido, ele decodifica o token e coloca as informações do usuário na requisição
        req.usuario = decoded;      // Coloca as informações do usuário na requisição para que possamos usar depois
        next();     // Se o token for válido, ele chama a próxima função (next) para continuar a requisição
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });       // Se o token for inválido, ele bloqueia a requisição e retorna um erro 401
    }
}

// rotas dos filmes

app.get('/filmes', verificarToken, async (req, res) => {        // A rota GET /filmes é protegida pelo middleware verificarToken, que verifica se o token JWT é válido antes de permitir o acesso à lista de filmes.
    const filmes = await CRUD.listar();
    res.json(filmes);
});

app.get('/filmes/:id', verificarToken, async (req, res) => {        // A rota GET /filmes/:id também é protegida pelo middleware verificarToken, que verifica se o token JWT é válido antes de permitir o acesso aos detalhes de um filme específico.
    const filme = await CRUD.buscarPorId(parseInt(req.params.id));
    if (!filme) return res.status(404).json({ error: 'Filme não encontrado' });
    res.json(filme);
});

// o POST, PUT e DELETE são protegidos, exigem um token para fazer as alterações na aplicação.
app.post('/filmes', verificarToken, async (req, res) => {
    const { nome, genero } = req.body;
    if (!nome || !genero) return res.status(400).json({ error: 'Nome e gênero são obrigatórios' });
    const filme = await CRUD.criar(nome, genero);
    res.status(201).json(filme);
});

app.put('/filmes/:id', verificarToken, async (req, res) => {
    const { nome, genero } = req.body;
    const filme = await CRUD.atualizar(parseInt(req.params.id), nome, genero);
    if (!filme) return res.status(404).json({ error: 'Filme não encontrado' });
    res.json(filme);
});

app.delete('/filmes/:id', verificarToken, async (req, res) => {
    await CRUD.deletar(parseInt(req.params.id));
    res.status(204).send();
});

// rotas de autenticação
app.post('/auth/cadastro', async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ error: 'Email e senha são obrigatórios' });

    try {
        const usuario = await AUTH.cadastrar(email, senha);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso', id: usuario.id });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

app.post('/auth/login', async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ error: 'Email e senha são obrigatórios' });

    try {
        const usuario = await AUTH.login(email, senha);

        const token = jwt.sign(     // Gera o token com os dados do usuário dentro

            { id: usuario.id, email: usuario.email },
            SEGREDO,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login realizado com sucesso', token });
    } catch (e) {
        res.status(401).json({ error: e.message });
    }
});

// servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

process.on('SIGINT', async () => {
    console.log('Encerrando servidor...');
    await CRUD.fecharConexao();
    process.exit(0);
});
const express = require('express');
const cors = require('cors');
const CRUD = require('./crud');
const AUTH = require('./authCrud');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/filmes', async (req, res) => {
    const filmes = await CRUD.listar();
    res.json(filmes);
});

app.get('/filmes/:id', async (req, res) => {
    const filme = await CRUD.buscarPorId(parseInt(req.params.id));
    if (!filme) return res.status(404).json({ error: 'Filme não encontrado' });
    res.json(filme);
});

app.post('/filmes', async (req, res) => {
    const { nome, genero } = req.body;
    if (!nome || !genero) return res.status(400).json({ error: 'Nome e gênero são obrigatórios' });
    const filme = await CRUD.criar(nome, genero);
    res.status(201).json(filme);
});

app.put('/filmes/:id', async (req, res) => {
    const { nome, genero } = req.body;
    const filme = await CRUD.atualizar(parseInt(req.params.id), nome, genero);
    if (!filme) return res.status(404).json({ error: 'Filme não encontrado' });
    res.json(filme);
});

app.delete('/filmes/:id', async (req, res) => {
    await CRUD.deletar(parseInt(req.params.id));
    res.status(204).send();
});


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
        // Futuramente: retornar JWT aqui
        res.json({ message: 'Login realizado com sucesso', email: usuario.email });
    } catch (e) {
        res.status(401).json({ error: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

process.on('SIGINT', async () => {
    console.log('Encerrando servidor...');
    await CRUD.fecharConexao();
    process.exit(0);
});
const express = require('express');
const CRUD = require('./crud');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        message: 'API de Filmes com Prisma',
        endpoints:{
            listar: 'GET /filmes',
            criar: 'POST /filmes',
            buscarPorId: 'GET /filmes/:id',
            atualizar: 'PUT /filmes/:id',
            deletar: 'DELETE /filmes/:id'
        }
        });
});

//criar
app.post('/filmes', (req, res) => {
    const { nome, genero } = req.body;
    if (!nome || !genero) {
        return res.status(400).json({ error: 'Nome e gênero são obrigatórios' });
    }
    const filme = CRUD.criar(nome, genero);
    res.status(201).json(filme);
});

//listar
app.get('/filmes', (req, res) => {
    const filmes = CRUD.listar();
    res.json(filmes);
});

//buscar por id
app.get('/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const filme = CRUD.buscarPorId(id);
    if (!filme) {
        return res.status(404).json({ error: 'Filme não encontrado' });
    }
    res.json(filme);
});
//atualizar
app.put('/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, genero } = req.body;
    const filmeAtualizado = CRUD.atualizar(id, nome, genero);
    if (!filmeAtualizado) {
        return res.status(404).json({ error: 'Filme não encontrado' });
    }
    res.json(filmeAtualizado);
});

//deletar
app.delete('/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sucesso = CRUD.deletar(id);
    if (!sucesso) {
        return res.status(404).json({ error: 'Filme não encontrado' });
    }
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

process.on('SIGINT',async () => {
    console.log('Encerrando servidor...');
    await CRUD.fecharConexao();
    process.exit(0);
})
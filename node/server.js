const express = require('express');
const cors = require('cors');
const { criar, ler, buscarPorId, atualizar, deletar } = require('./crud');

const app = express();

app.use(cors());
app.use(express.json());

// GET /api/filmes — retorna todos os filmes
app.get('/api/filmes', (req, res) => {
    return res.json(ler());
});

// POST /api/filmes — cria um novo filme
app.post('/api/filmes', (req, res) => {
    const dados = req.body;

    try {
        const novoFilme = criar(dados.nome, dados.genero);
        return res.status(201).json(novoFilme);
    } catch (e) {
        return res.status(400).json({ erro: e.message });
    }
});

// GET /api/filmes/:id — retorna um filme pelo id
app.get('/api/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const filme = buscarPorId(id);

    if (filme) {
        return res.json(filme);
    }
    return res.status(404).json({ erro: 'filme não encontrado' });
});

// PUT /api/filmes/:id — atualiza um filme pelo id
app.put('/api/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const dados = req.body;

    try {
        const filmeAtualizado = atualizar(id, dados);
        return res.json(filmeAtualizado);
    } catch (e) {
        return res.status(404).json({ erro: e.message });
    }
});

// DELETE /api/filmes/:id — deleta um filme pelo id
app.delete('/api/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);

    try {
        deletar(id);
        return res.status(200).json({ mensagem: 'filme deletado com sucesso' });
    } catch (e) {
        return res.status(404).json({ erro: e.message });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

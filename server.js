var express = require('express');
var path = require('path');


const app = express();
const PORTA = 3000;

app.use(express.json());
app.use(express.static('public'));
let filmes =[
//dados de exemplo
{id: 1, titulo: 'Interstellar', genero: 'Ficção'},
{id: 2, titulo: 'Pulp Fiction', genero: 'Crime'},
{id: 3, titulo: 'Tudo em Todo Lugar ao Mesmo Tempo', genero: 'Ação'},
];
//==ROTAS DE PÁGINAS==

//página inicial
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
}
);

//página da lista de filmes
app.get('/lista', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'lista.html'));
}
);

//==ROTAS DE API==

//rota para retornar a lista de filmes em formato JSON
app.get('/api/filmes', function(req, res) {
    res.json(filmes);
});

//criar filme
app.post('/api/filmes', function(req, res) {
    const {titulo,genero} = req.body;

    if(!titulo || !genero){
        return res.status(400).send('Titulo e gênero são obrigatórios');
    }
    const novoFilme = {
        id: filmes.length > 0 ? filmes[filmes.length - 1].id + 1 : 1,
        titulo: titulo,
        genero: genero
    };
    filmes.push(novoFilme);
    res.status(201).json(novoFilme);
});
//buscar filme por id
app.get('/api/filmes/:id', function(req, res) {
    const id = parseInt(req.params.id);
    const filme = filmes.find(f => f.id === id);
    if(!filme){
        return res.status(404).send('Filme não encontrado');
    }
    res.json(filme);
});

//atualizar filme
app.put('/api/filmes/:id', function(req, res) {
    const id = parseInt(req.params.id);
    const filme = filmes.find(f => f.id === id);
    if(!filme){
        return res.status(404).send('Filme não encontrado');
    }
    const {titulo, genero} = req.body;
    if(!titulo || !genero){
        return res.status(400).send('Titulo e gênero são obrigatórios');
    }
    filme.titulo = titulo;
    filme.genero = genero;
    res.json(filme);
});

//deletar filme
app.delete('/api/filmes/:id', async function(req, res) {
    const id = parseInt(req.params.id);
    const index = filmes.findIndex(f => f.id === id);
    if(index === -1){
        return res.status(404).send('Filme não encontrado');
    }

    filmes.splice(index, 1);
    res.status(204).send('Filme deletado com sucesso');

});

app.listen(PORTA, function() {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
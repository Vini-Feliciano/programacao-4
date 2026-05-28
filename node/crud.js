// Array que substitui o banco de dados SQLite
let filmes = [];

// Contador de IDs para simular o autoincrement do SQLAlchemy
let proximoId = 1;

// CRIAR
function criar(nome, genero) {
    if (!nome || nome.trim() === '') {
        throw new Error('Nome do filme não pode ser vazio');
    }

    const novoFilme = {
        id: proximoId++,
        nome: nome.trim(),
        genero: genero || null
    };

    filmes.push(novoFilme);
    return novoFilme;
}

// LER
function ler() {
    return filmes;
}

// BUSCAR POR ID
function buscarPorId(id) {
    return filmes.find(f => f.id === id) || null;
}

// ATUALIZAR
function atualizar(id, novosDados) {
    const filme = filmes.find(f => f.id === id);

    if (!filme) {
        throw new Error('Filme não encontrado');
    }

    if ('nome' in novosDados) {
        const nomeNovo = novosDados.nome.trim();
        if (!nomeNovo) {
            throw new Error('Nome do filme não pode ser vazio');
        }
        filme.nome = nomeNovo;
    }

    if ('genero' in novosDados) {
        filme.genero = novosDados.genero;
    }

    return filme;
}

// DELETAR
function deletar(id) {
    const index = filmes.findIndex(f => f.id === id);

    if (index === -1) {
        throw new Error('Filme não encontrado');
    }

    filmes.splice(index, 1);
    return true;
}

module.exports = { criar, ler, buscarPorId, atualizar, deletar };

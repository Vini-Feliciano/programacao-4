const urlBase = 'http://127.0.0.1:5000/api/filmes';

// CRIAR
export function criar(nome, genero) {
    if (!nome || nome.trim() == '') {
        throw new Error('Nome do filme é obrigatório');
    }

    return fetch(urlBase, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nome.trim(), genero: genero })
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao criar filme: ' + response.statusText);
        return response.json();
    });
}

// LER
export function ler() {
    return fetch(urlBase)
    .then(response => {
        if (!response.ok) throw new Error('Erro ao listar filmes: ' + response.statusText);
        return response.json();
    });
}

// BUSCAR POR ID
export function buscarPorId(id) {
    return fetch(urlBase + `/${id}`)
    .then(response => {
        if (!response.ok) throw new Error('Erro ao buscar filme: ' + response.statusText);
        return response.json();
    });
}

// ATUALIZAR
export function atualizar(id, novosDados) {
    if (!novosDados.nome || novosDados.nome.trim() == '') {
        throw new Error('Nome do filme não pode ser vazio');
    }

    return fetch(urlBase + `/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: novosDados.nome.trim(), genero: novosDados.genero })
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao atualizar filme: ' + response.statusText);
        return response.json();
    });
}

// DELETAR
export function deletar(id) {
    return fetch(urlBase + `/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao deletar filme: ' + response.statusText);
        return response.json();
    });
}
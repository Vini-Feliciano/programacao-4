const urlBase = 'http://localhost:3000/filmes';

function getToken() {   // Função para pegar o token do sessionStorage
    return sessionStorage.getItem('token');     // Retorna o token armazenado no sessionStorage
}

// CRIAR
export function criar(nome, genero) {
    if (!nome || nome.trim() == '') {
        throw new Error('Nome do filme é obrigatório');
    }

    return fetch(urlBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify({ nome: nome.trim(), genero: genero })
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao criar filme: ' + response.statusText);
        return response.json();
    });
}

// LER
export function ler() {
    return fetch(urlBase, {
        headers: {
            "Authorization": "Bearer " + getToken()     // envia o token no header da requisição, para que o servidor possa validar.
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao listar filmes: ' + response.statusText);
        return response.json();
    });
}

// BUSCAR POR ID
export function buscarPorId(id) {
    return fetch(urlBase + `/${id}`, {
        headers: {
            "Authorization": "Bearer " + getToken()     // envia o token no header da requisição, para que o servidor possa validar!
        }
    })
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
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()     // envia o token no header da requisição, para que o servidor possa validar!
        },
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
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + getToken()     // envia o token no header da requisição, para que o servidor possa validar!
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao deletar filme: ' + response.statusText);
        return true;
    });
}
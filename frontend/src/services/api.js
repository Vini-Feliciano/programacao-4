const urlBase = 'http://localhost:3000';

function getToken() {
    return sessionStorage.getItem('token');
}

// ── AUTH ──
export async function cadastrar(email, senha) {
    const response = await fetch(urlBase + '/auth/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });
    const dados = await response.json();
    if (!response.ok) throw new Error(dados.error);
    return dados;
}

export async function login(email, senha) {
    const response = await fetch(urlBase + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });
    const dados = await response.json();
    if (!response.ok) throw new Error(dados.error);
    return dados;
}

// ── FILMES ──
export async function listarFilmes() {
    const response = await fetch(urlBase + '/filmes', {
        headers: { 'Authorization': 'Bearer ' + getToken() }
    });
    const dados = await response.json();
    if (!response.ok) throw new Error(dados.error);
    return dados;
}

export async function criarFilme(nome, genero) {
    const response = await fetch(urlBase + '/filmes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify({ nome, genero })
    });
    const dados = await response.json();
    if (!response.ok) throw new Error(dados.error);
    return dados;
}

export async function atualizarFilme(id, nome, genero) {
    const response = await fetch(urlBase + '/filmes/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify({ nome, genero })
    });
    const dados = await response.json();
    if (!response.ok) throw new Error(dados.error);
    return dados;
}

export async function deletarFilme(id) {
    const response = await fetch(urlBase + '/filmes/' + id, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + getToken() }
    });
    if (!response.ok) throw new Error('Erro ao deletar filme');
    return true;
}
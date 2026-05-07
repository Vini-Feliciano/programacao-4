const urlBase = 'http://127.0.0.1:5000/api/filmes';
let filmes = [];
let id = 0;

//CRIAR
export function criar(nome,genero){
    console.log('Criando filme:', nome, genero);
    if(!nome || nome.trim()==''){
        throw new Error('Nome do filme é obrigatório');
    }

    const novoFilme={
        id: id++,
        nome: nome.trim(),
        genero: genero
    };

const headers = new Headers();
headers.append('Content-Type', 'application/json');

const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(novoFilme)
};

return fetch(urlBase, options)
// .then(function (response) {
//     if (!response.ok) {
//         console.error('Resposta da API:', response);
//       throw new Error('Erro na resposta da API: ' + response.statusText);
//     }
//     return response.json();
//   })
//   .then(function (myJson) {
//     filmes.push(myJson);
//     return myJson;
//   })
//   .catch(function(error){
//     throw new Error('Erro ao criar filme: ' + error.message);
//   });
}

//LER
export function ler(){
    
const headers = new Headers();
headers.append('Content-Type', 'application/json');

const options = {
  method: "GET",
  headers: headers
};

return fetch(urlBase, options)
  .then(function (response) {
    if (!response.ok) {
      throw new Error('Erro na resposta da API: ' + response.statusText);
    }
    return response.json();
  })
  .then(function (myJson) {
    console.log('Resposta da API:', myJson);
    filmes = myJson;
    return myJson;
  })
  .catch(function(error){
    throw new Error('Erro ao listar filmes: ' + error.message);
  });
}

//Buscar por ID
export function buscarPorId(id){

const headers = new Headers();
headers.append('Content-Type', 'application/json');

const options = {
  method: "GET",
  headers: headers
};

return fetch(urlBase + `/${id}`, options)
  .then(function (response) {
    if (!response.ok) {
      throw new Error('Erro ao buscar filme: ' + response.statusText);
    }
    return response.json();
  })
  .then(function (myJson) {
    filmes = myJson;
    console.log('Filme encontrado:', myJson);
    return myJson;
  })
  .catch(function(error){
    throw new Error('Erro ao buscar filme: ' + error.message);
  });    
}

//ATUALIZA
export function atualizar(id,novosDados){
    const index = filmes.findIndex(filme =>filme.id == id);

    if (index === -1) {
        throw new Error('Filme não encontrado');
    }

    if (novosDados.nome ==''){
        throw new Error('Nome do filme não pode ser vazio');
    }

    filmes[index]={
        id: filmes[index].id,
        nome: novosDados.nome.trim(),
        genero: novosDados.genero
    }

const headers = new Headers();
headers.append('Content-Type', 'application/json');

const options = {
  method: "PUT",
  headers: headers,
  body: JSON.stringify(filmes[index])
};

fetch(urlBase + `/${id}`, options)
  .then(function (response) {
    if (!response.ok) {
      throw new Error('Erro ao atualizar filme: ' + response.statusText);
    }
    return response.json();
  })
  .then(function (myJson) {
    filmes = myJson;
    return myJson;
  })
  .catch(function(error){
    throw new Error('Erro ao atualizar filme: ' + error.message);
  });
}

//DELETA
export function deletar(id){
    const tamanhoOriginal = filmes.length;
    filmes = filmes.filter(f =>f.id !==id);

const headers = new Headers();
headers.append('Content-Type', 'application/json');

const options = {
  method: "DELETE",
  headers: headers
};

fetch(urlBase + `/${id}`, options)
  .then(function (response) {
    if (!response.ok) {
      throw new Error('Erro ao deletar filme: ' + response.statusText);
    }
    return response.json();
  })
  .then(function (myJson) {
    filmes = myJson;
    return myJson;
  })
  .catch(function(error){
    throw new Error('Erro ao deletar filme: ' + error.message);
  });

}
let filmes = [];
let id = 0;

//CRIAR
export function criar(nome,genero){
    if(!nome || nome.trim()==''){
        throw new Error('Nome do filme é obrigatório');
    }

    const novoFilme={
        id: id++,
        nome: nome.trim(),
        genero: genero
    };

    filmes.push(novoFilme);
    return novoFilme;
}

//LER
export function ler(){
    //spread
    return [...filmes];
}

//Buscar por ID
export function buscarPorId(id){
    return filmes.find(filme=>filme.id == id);
}

//ATUALIZAR
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


    return filmes[index];
}

//DELETAR
export function deletar(id){
    const tamanhoOriginal = filmes.length;
    filmes = filmes.filter(f =>f.id !==id);
    return filmes.length !== tamanhoOriginal;

}
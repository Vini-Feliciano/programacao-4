let filmes = [];
let editandoId = null;
let id = 0;



//create
function Adicionar(){
    let nome = document.getElementById('titulo').value.trim();
    let genero = document.getElementById('genero').value;

    if(nome == ''){
        alert('Digite o título do filme!');
        return;
    }

    const novoFilme = {
        id: id++,
        nome: nome,
        genero: genero
    };

    filmes.push(novoFilme);
    document.getElementById('titulo').value = '';
    document.getElementById('genero').value = 'Ação';
    Exibir();
}

//read
function Exibir(){
    const tbody = document.getElementById('corpoTabela');
    tbody.innerHTML='';

    filmes.forEach(filme =>{
        const tr = document.createElement('tr');
        tr.innerHTML=`
            <td>${filme.nome}</td>
            <td>${filme.genero}</td>
            <td>
            <button onclick="Editar(${filme.id})">✏️ EDITAR</button>
            <button onclick="Excluir(${filme.id})">❌ EXCLUIR</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

//update
function Editar(id){
    const filme = filmes.find(f=>f.id == id);
    document.getElementById('titulo').value = filme.nome;
    document.getElementById('genero').value = filme.genero;

    editandoId = id;

    const btn = document.getElementById('btnAdicionar');
    btn.textContent = '💾 SALVAR EDIÇÃO';
}
//update 2
function Salvar(){
    const nomeNovo = document.getElementById('titulo').value.trim();
    const generoNovo = document.getElementById('genero').value;

    if (nomeNovo == '') {
    alert('Digite o título do filme!');
    return;
    }

    const index = filmes.findIndex(f => f.id == editandoId);
    filmes[index].nome = nomeNovo;
    filmes[index].genero = generoNovo

    document.getElementById('titulo').value = '';
    document.getElementById('genero').value = 'Ação';

    const btn = document.getElementById('btnAdicionar');
    btn.textContent = 'ADICIONAR';
    editandoId = null;

    Exibir();
}

//delete
function Excluir(id){
    if(confirm('Tem certeza que quer remover este filme?')){
    filmes = filmes.filter(f=> f.id !== id);
    Exibir();
    }
}

document.getElementById('btnAdicionar').onclick = function(){
    if (editandoId == null){
        Adicionar();
    } else {
        Salvar();
    }
}
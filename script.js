import {criar, ler, atualizar, deletar, buscarPorId} from './crud.js';

let editandoId = null;

function Adicionar(){
    const nome = document.getElementById('titulo').value.trim();
    const genero = document.getElementById('genero').value;

    if(nome==''){
        alert('Digite o título do filme!');
        return;
    }

    //crud
    try{
        if(editandoId == null){
            criar(nome,genero);

        }else{
            atualizar(editandoId,{nome: nome,genero: genero});
            cancelarEdicao();
        }
    limparFormulario();
    Exibir();

    } catch(error){
        alert('Erro: '+error.message);
    }
}

function Exibir(){
    const tbody = document.getElementById('corpoTabela');
    tbody.innerHTML='';

    //crud
    const filmes = ler();

    filmes.forEach(filme =>{
        const tr = document.createElement('tr');
        tr.innerHTML=`
            <td>${filme.nome}</td>
            <td>${filme.genero}</td>
            <td>
            <button class="btn-editar" data-id="${filme.id}">✏️ EDITAR</button>
            <button class="btn-excluir" data-id="${filme.id}">❌ EXCLUIR</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.querySelectorAll('.btn-editar').forEach(btn =>{
        btn.addEventListener('click',()=>Editar(btn.dataset.id));
    })
}

function Editar(id){
    //crud
    const filme = buscarPorId(id);

    if(filme){
        document.getElementById('titulo').value = filme.nome;
        document.getElementById('genero').value=filme.genero;

        editandoId = id;

        const btn = document.getElementById('btnAdicionar');
        if (btn) btn.textContent = '💾 SALVAR EDIÇÃO';
    }
}

//deletar
function Excluir(id){
    //crud
    if(confirm('Tem certeza que quer remover este filme?')){
    deletar(id);
    if(editandoId==id){
        cancelarEdicao();
    }
    limparFormulario();
    Exibir();
    }
}

//outras funções
function cancelarEdicao() {
    editandoId = null;
    const btn = document.getElementById('btnAdicionar');
    if (btn) btn.textContent = 'ADICIONAR';
}

function limparFormulario() {
    const nome = document.getElementById('titulo');
    const genero = document.getElementById('genero');
    
    if (nome) nome.value = '';
    if (genero) genero.value = 'Ação';
}

document.getElementById('btnAdicionar').addEventListener('click', Adicionar);
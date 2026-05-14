import {criar, ler, atualizar, deletar, buscarPorId} from './api.js';

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
            criar(nome,genero)
            .then(function(novoFilme){
                limparFormulario();
                alert('Filme criado com sucesso!');
                Exibir();
            });
        }
        else{
            atualizar(editandoId,{nome: nome,genero: genero});
            cancelarEdicao();
        }
    
    } catch(error){
        alert('Erro: '+error.message);
    }
}

async function Exibir(){
    const tbody = document.getElementById('corpoTabela');
    tbody.innerHTML='';

    //crud
    const filmes = await ler();
    console.log(filmes);
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
    document.querySelectorAll('.btn-excluir').forEach(btn =>{
            btn.addEventListener('click',()=>Excluir(btn.dataset.id));
        })
}

async function Editar(id){
    //crud
    const filme = await buscarPorId(id);

    if(filme){
        document.getElementById('titulo').value = filme.nome;
        document.getElementById('genero').value=filme.genero;

        editandoId = id;

        const btn = document.getElementById('btnAdicionar');
        if (btn) btn.textContent = '💾 SALVAR EDIÇÃO';
    }
}

//deletar
async function Excluir(id){
    //crud
    if(confirm('Tem certeza que quer remover este filme?')){
    await deletar(id);
    if(editandoId==id){
        cancelarEdicao();
    }
    limparFormulario();
    await Exibir();
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
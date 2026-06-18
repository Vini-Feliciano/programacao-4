let filmeEmEdicao = null

async function carregarFilmes() {
    try {
        const resposta = await fetch('/api/filmes');
        const filmes = await resposta.json();
        
        const corpoTabela = document.getElementById('corpoTabela');
        corpoTabela.innerHTML = '';
        
        filmes.forEach(filme => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${filme.titulo}</td>
                <td>${filme.genero}</td>
                <td>
                    <button class="btn-editar" data-id="${filme.id}">✏️ Editar</button>
                    <button class="btn-deletar" data-id="${filme.id}">🗑️ Deletar</button>
                </td>
            `;
            corpoTabela.appendChild(linha);
        });
        
        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', () => editarFilme(btn.dataset.id));
        });

        document.querySelectorAll('.btn-deletar').forEach(btn => {
            btn.addEventListener('click', () => deletarFilme(btn.dataset.id));
        });
        
    } catch (error) {
        console.error('Erro ao carregar filmes:', error);
    }
}

async function editarFilme(id){
    try {
        const resposta = await fetch(`/api/filmes/${id}`);
        if(!resposta.ok){
            alert('Filme não encontrado');
            return;
        }
        const filme = await resposta.json();

        document.getElementById('titulo').value = filme.titulo;
        document.getElementById('genero').value = filme.genero;
        filmeEmEdicao = filme.id;

        // Mudar o botão para "Atualizar"
        const btnAdicionar = document.getElementById('btnAdicionar');
        btnAdicionar.textContent = 'Atualizar Filme';
        btnAdicionar.style.backgroundColor = '#ff9800'; // Laranja

        //mostra o botao cancelar
        document.getElementById('btnCancelar').style.display = 'inline-block';
        //foca no campo titulo
        document.getElementById('titulo').focus();
    } catch (error) {
        console.error('Erro ao iniciar edição:', error);
        alert('Erro ao carregar dados do filme');
    }
}
// Cancelar edição
function cancelarEdicao() {
    // Limpar formulário
    document.getElementById('titulo').value = '';
    document.getElementById('genero').value = '';

    // Resetar botão
    const btnAdicionar = document.getElementById('btnAdicionar');
    btnAdicionar.textContent = 'Adicionar';
    btnAdicionar.style.backgroundColor = ''; // Volta ao estilo original

    // Esconder botão cancelar
    document.getElementById('btnCancelar').style.display = 'none';

    // Limpar ID de edição
    filmeEmEdicao = null;
}

async function salvarFilme() {
    const titulo = document.getElementById('titulo').value.trim();
    const genero = document.getElementById('genero').value;

    if (!titulo) {
        alert('Por favor, digite o título do filme');
        return;
    }
    if (!genero) {
        alert('Por favor, selecione um gênero');
        return;
    }

    try {
        let resposta;

        if (filmeEmEdicao) {
            // MODO EDIÇÃO - Atualizar filme existente
            resposta = await fetch(`/api/filmes/${filmeEmEdicao}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ titulo, genero })

            });

            if (resposta.ok) {
                alert('Filme atualizado com sucesso!');
            }
        } else {
            // MODO ADIÇÃO - Criar novo filme
            resposta = await fetch('/api/filmes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ titulo, genero })
            });
        }

        if (resposta.ok) {
            // Limpar formulário e resetar botão
            cancelarEdicao();
            // Recarregar lista
            await carregarFilmes();
        } else {
            const erro = await resposta.json();
            alert(`Erro: ${erro.erro}`);
        }
    } catch (error) {
        console.error('Erro ao salvar filme:', error);
        alert('Erro ao salvar filme');
    }
}

// Função para deletar filme
async function deletarFilme(id) {
    if (!confirm('Tem certeza que deseja deletar este filme?')) return;
    
    try {
        const resposta = await fetch(`/api/filmes/${id}`, {
            method: 'DELETE'
        });
        
        if (resposta.ok) {

            if (filmeEmEdicao == id) {
            cancelarEdicao();
            }

            await carregarFilmes();
        } else {
            const erro = await resposta.json();
            alert(`Erro: ${erro.erro}`);
        }
    } catch (error) {
        console.error('Erro ao deletar filme:', error);
        alert('Erro ao deletar filme');
    }
}

//  Event listeners
   document.addEventListener('DOMContentLoaded', () => {
       carregarFilmes();

       // Botão principal (Adicionar/Atualizar)
       document.getElementById('btnAdicionar').addEventListener('click', salvarFilme);

       // Botão cancelar
       document.getElementById('btnCancelar').addEventListener('click', cancelarEdicao);

       // Enter no campo título
       document.getElementById('titulo').addEventListener('keypress', (e) => {
           if (e.key === 'Enter') {
               salvarFilme();
           }
       });
   });
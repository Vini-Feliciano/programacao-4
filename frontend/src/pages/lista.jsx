import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarFilmes, criarFilme, atualizarFilme, deletarFilme } from '../services/api';

function Lista() {
    const [filmes, setFilmes] = useState([]);
    const [nome, setNome] = useState('');
    const [genero, setGenero] = useState('');
    const [editandoId, setEditandoId] = useState(null);
    const navigate = useNavigate();

    // Verifica token e carrega filmes ao abrir a página
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        carregarFilmes();
    }, []);

    async function carregarFilmes() {
        try {
            const dados = await listarFilmes();
            setFilmes(dados);
        } catch (e) {
            alert('Erro ao carregar filmes: ' + e.message);
        }
    }

    async function handleAdicionar() {
        if (!nome) { alert('Digite o título do filme!'); return; }
        if (!genero) { alert('Selecione o gênero do filme!'); return; }

        try {
            if (editandoId === null) {
                await criarFilme(nome, genero);
            } else {
                await atualizarFilme(editandoId, nome, genero);
                setEditandoId(null);
            }
            setNome('');
            setGenero('');
            carregarFilmes();
        } catch (e) {
            alert('Erro: ' + e.message);
        }
    }

    function handleEditar(filme) {
        setNome(filme.nome);
        setGenero(filme.genero);
        setEditandoId(filme.id);
    }

    async function handleDeletar(id) {
        if (!confirm('Tem certeza que quer remover este filme?')) return;
        try {
            await deletarFilme(id);
            carregarFilmes();
        } catch (e) {
            alert('Erro: ' + e.message);
        }
    }

    function handleSair() {
        sessionStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div style={estilos.pagina}>
            <div style={estilos.container}>

                {/* Cabeçalho */}
                <div style={estilos.cabecalho}>
                    <h1 style={estilos.titulo}>Lista de Filmes</h1>
                    <button style={estilos.btnSair} onClick={handleSair}>🚪 SAIR</button>
                </div>

                {/* Formulário */}
                <div style={estilos.formulario}>
                    <input
                        style={estilos.input}
                        type="text"
                        placeholder="Título do filme"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <select
                        style={estilos.select}
                        value={genero}
                        onChange={e => setGenero(e.target.value)}
                    >
                        <option value="" disabled>Selecione o Gênero</option>
                        <option value="Ação">🔥 AÇÃO</option>
                        <option value="Comédia">😂 COMÉDIA</option>
                        <option value="Drama">🎭 DRAMA</option>
                        <option value="Terror">👻 TERROR</option>
                        <option value="Ficção">🚀 FICÇÃO</option>
                        <option value="Romance">💖 ROMANCE</option>
                    </select>
                    <button style={estilos.btnAdicionar} onClick={handleAdicionar}>
                        {editandoId !== null ? '💾 SALVAR EDIÇÃO' : 'Adicionar'}
                    </button>
                </div>

                {/* Tabela */}
                <table style={estilos.tabela}>
                    <thead>
                        <tr>
                            <th style={estilos.th}>Título</th>
                            <th style={estilos.th}>Gênero</th>
                            <th style={estilos.th}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filmes.map(filme => (
                            <tr key={filme.id}>
                                <td style={estilos.td}>{filme.nome}</td>
                                <td style={estilos.td}>{filme.genero}</td>
                                <td style={estilos.td}>
                                    <button style={estilos.btnEditar} onClick={() => handleEditar(filme)}>✏️ EDITAR</button>
                                    <button style={estilos.btnExcluir} onClick={() => handleDeletar(filme.id)}>❌ EXCLUIR</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

const estilos = {
    pagina: {
        minHeight: '100vh',
        padding: '20px',
        background: 'rgba(0,0,0,0.75)',
    },
    container: {
        maxWidth: '900px',
        margin: 'auto',
        padding: '30px',
        background: 'linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)',
        borderRadius: '20px',
        border: '1px solid #d4af37',
        boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
    },
    cabecalho: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        borderBottom: '3px solid #C41E3A',
        paddingBottom: '10px',
    },
    titulo: { color: '#F5C518', letterSpacing: '3px', fontSize: '32px' },
    btnSair: {
        padding: '10px 20px',
        background: '#5a1a1a',
        color: '#ff9999',
        border: 'none',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '14px',
        cursor: 'pointer',
        letterSpacing: '1px',
    },
    formulario: {
        display: 'flex',
        gap: '12px',
        marginBottom: '30px',
        flexWrap: 'wrap',
        background: '#111',
        padding: '20px',
        borderRadius: '15px',
        border: '1px solid #2a2a2a',
    },
    input: {
        flex: 2,
        minWidth: '200px',
        padding: '12px 16px',
        border: '1px solid #333',
        borderRadius: '10px',
        background: '#222',
        color: '#eee',
        fontSize: '14px',
    },
    select: {
        flex: 1,
        minWidth: '130px',
        padding: '12px 16px',
        border: '1px solid #333',
        borderRadius: '10px',
        background: '#222',
        color: '#eee',
        fontSize: '14px',
        cursor: 'pointer',
    },
    btnAdicionar: {
        padding: '12px 28px',
        background: '#C41E3A',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '14px',
        cursor: 'pointer',
        letterSpacing: '1px',
    },
    tabela: {
        width: '100%',
        borderCollapse: 'collapse',
        borderRadius: '12px',
        overflow: 'hidden',
    },
    th: {
        padding: '14px 12px',
        background: '#8B0000',
        color: '#F5C518',
        fontWeight: 'bold',
        fontSize: '15px',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        textAlign: 'left',
    },
    td: {
        padding: '14px 12px',
        background: '#1a1a1a',
        color: '#e0e0e0',
        borderBottom: '1px solid #2a2a2a',
        textAlign: 'left',
    },
    btnEditar: {
        padding: '6px 14px',
        margin: '0 4px',
        background: '#F5C518',
        color: '#1a1a1a',
        border: 'none',
        borderRadius: '6px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    btnExcluir: {
        padding: '6px 14px',
        margin: '0 4px',
        background: '#5a1a1a',
        color: '#ff9999',
        border: 'none',
        borderRadius: '6px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
};

export default Lista;
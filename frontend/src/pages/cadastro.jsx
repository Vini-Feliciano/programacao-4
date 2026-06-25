import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastrar } from '../services/api';

function Cadastro() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    async function handleCadastro() {
        if (!email || !senha) {
            alert('Preencha todos os campos!');
            return;
        }

        try {
            await cadastrar(email, senha);
            alert('Cadastro realizado! Faça login.');
            navigate('/login');
        } catch (e) {
            alert('Erro: ' + e.message);
        }
    }

    return (
        <div style={estilos.container}>
            <div style={estilos.card}>
                <h1 style={estilos.titulo}>🎬 Cadastro</h1>
                <input
                    style={estilos.input}
                    type="email"
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    style={estilos.input}
                    type="password"
                    placeholder="Sua senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />
                <button style={estilos.botao} onClick={handleCadastro}>Cadastrar</button>
                <p style={estilos.texto}>
                    Já tem conta?{' '}
                    <span style={estilos.link} onClick={() => navigate('/login')}>
                        Entrar
                    </span>
                </p>
            </div>
        </div>
    );
}

const estilos = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
    },
    card: {
        background: '#1a1212',
        border: '1px solid #c0392b',
        borderRadius: '12px',
        padding: '40px 32px',
        width: '100%',
        maxWidth: '360px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        textAlign: 'center',
    },
    titulo: { color: '#f0a500', fontSize: '1.6rem' },
    input: {
        padding: '12px',
        border: '1px solid #333',
        borderRadius: '8px',
        background: '#222',
        color: '#eee',
        fontSize: '14px',
    },
    botao: {
        padding: '12px',
        background: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '15px',
        cursor: 'pointer',
    },
    texto: { color: '#8a7f7f', fontSize: '.9rem' },
    link: { color: '#f0a500', cursor: 'pointer' },
};

export default Cadastro;
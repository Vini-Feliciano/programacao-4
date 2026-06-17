// Futuramente: substituir esse array pelo Prisma
let usuarios = [];

export function cadastrar(email, senha) {
    if (!email || !senha) throw new Error('Preencha todos os campos');

    const jaExiste = usuarios.find(u => u.email === email);
    if (jaExiste) throw new Error('E-mail já cadastrado');

    const novoUsuario = { id: Date.now(), email, senha };
    usuarios.push(novoUsuario);
    return novoUsuario;
}

export function login(email, senha) {
    if (!email || !senha) throw new Error('Preencha todos os campos');

    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (!usuario) throw new Error('E-mail ou senha incorretos');

    // Futuramente: gerar JWT aqui
    return usuario;
}
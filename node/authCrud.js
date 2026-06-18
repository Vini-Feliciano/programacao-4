const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const adapter = new PrismaBetterSqlite3({ url: 'file:./filmes.db' });
const prisma = new PrismaClient({ adapter });

async function cadastrar(email, senha) {
    const jaExiste = await prisma.usuario.findUnique({ where: { email } });
    if (jaExiste) throw new Error('E-mail já cadastrado');

    return await prisma.usuario.create({ data: { email, senha } });
}

async function login(email, senha) {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario || usuario.senha !== senha) throw new Error('E-mail ou senha incorretos');

    return usuario;
}

module.exports = { cadastrar, login };
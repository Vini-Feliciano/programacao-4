const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const adapter = new PrismaBetterSqlite3({ url: 'file:./filmes.db' });
const prisma = new PrismaClient({ adapter });


async function criar(nome, genero) {
    return await prisma.filme.create({ data: { nome, genero } });
}

async function listar() {
    return await prisma.filme.findMany();
}

async function buscarPorId(id) {
    return await prisma.filme.findUnique({ where: { id } });
}

async function atualizar(id, nome, genero) {
    return await prisma.filme.update({ where: { id }, data: { nome, genero } });
}

async function deletar(id) {
    await prisma.filme.delete({ where: { id } });
    return true;
}

async function fecharConexao() {
    await prisma.$disconnect();
}

module.exports = { criar, listar, buscarPorId, atualizar, deletar, fecharConexao };
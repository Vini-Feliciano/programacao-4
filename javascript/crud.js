const {PrismaClient} = require('@prisma/client');
const path = require('path');

const prisma = new PrismaClient();


async function criar(nome, genero) {
    try{
        const filme = await prisma.filme.create({
            data: { nome, genero },
        });
        return filme;
    }
    catch(error){
        console.error('Erro ao criar filme:', error);
        throw error;
    }
}

async function listar() {
    try{
        const filmes = await prisma.filme.findMany();
        return filmes;
    }
    catch(error){
        console.error('Erro ao listar filmes:', error);
        throw error;
    }
}

async function buscarPorId(id) {
    try{
        const filme = await prisma.filme.findUnique({
            where: { id },
        });
        return filme;
    }
    catch(error){
        console.error('Erro ao buscar filme por ID:', error);
        throw error;
    }
}

async function atualizar(id, nome, genero) {
    try{
        const filmeAtualizado = await prisma.filme.update({
            where: { id },
            data: { nome, genero },
        });
        return filmeAtualizado;
    }
    catch(error){
        console.error('Erro ao atualizar filme:', error);
        throw error;
    }
}

async function deletar(id) {
    try{
        await prisma.filme.delete({
            where: { id },
        });
        return true;
    }
    catch(error){
        console.error('Erro ao deletar filme:', error);
        throw error;
    }
}

async function fecharConexao() {
    await prisma.$disconnect();
}

module.exports = {
    criar,
    listar,
    buscarPorId,
    atualizar,
    deletar,
    fecharConexao
};
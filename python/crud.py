filmes = []
id_atual = 0

#CRIAR
def criar(nome,genero):
    global id_atual

    if not nome or not nome.strip():
        raise ValueError('Nome do filme é obrigatório')

    novo_filme = {
        'id': id_atual,
        'nome': nome.strip(),
        'genero': genero
    }

    filmes.append(novo_filme)
    id_atual += 1
    return novo_filme

#LER
def ler():
    return filmes.copy()

#buscar por id
def buscar_por_id(id):
    return next((f for f in filmes if f['id'] == id), None)

#ATUALIZAR
def atualizar(id,novos_dados):
    filme = buscar_por_id(id)
    if not filme:
        raise ValueError('Filme não encontrado')
    if 'nome' in novos_dados:
        nome_novo = novos_dados['nome'].strip()
        if not nome_novo:
            raise ValueError('Nome do filme não pode ser vazio')
        filme['nome'] = nome_novo

    if 'genero' in novos_dados:
        filme['genero'] = novos_dados['genero']

    return filme

#DELETAR
def deletar(id):
    tamanho_original = len(filmes)
    filmes[:] = [f for f in filmes if f['id'] != id]
    return len(filmes) < tamanho_original
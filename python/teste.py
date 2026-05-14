from crud import criar, ler, atualizar, deletar

while True:
    print("\n1 - Listar")
    print("2 - Cadastrar")
    print("3 - Atualizar")
    print("4 - Deletar")

    opcao = input("Digite uma opção: ")

    if opcao == '1':
        filmes = ler()
        for f in filmes:
            print(f.id, f.nome, f.genero)

    elif opcao == '2':
        nome = input("Nome: ")
        genero = input("Gênero: ")
        criar(nome, genero)
        print("Filme criado!")

    elif opcao == '3':
        id = int(input("ID do filme: "))
        nome = input("Novo nome: ")
        genero = input("Novo gênero: ")
        atualizar(id, {"nome": nome, "genero": genero})
        print("Filme atualizado!")

    elif opcao == '4':
        id = int(input("ID do filme: "))
        deletar(id)
        print("Filme deletado!")

    else:
        print("Opção inválida")
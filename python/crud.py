from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

#config do BD
Base = declarative_base()
engine = create_engine('sqlite:///filmes.db',echo=True)
Session = sessionmaker(bind=engine)
session = Session()

class Filme(Base):
    __tablename__ ="filmes"
    id= Column(Integer,primary_key=True,autoincrement=True)
    nome = Column(String,nullable=False)
    genero = Column(String)

    def to_dict(self):
        return{
            'id':self.id,
            'nome': self.nome,
            'genero': self.genero
        }

Base.metadata.create_all(engine)


#CRIAR
def criar(nome,genero):

    if not nome or not nome.strip():
        raise ValueError('Nome do filme é obrigatório')

    novo_filme = Filme(
        nome=nome.strip(),
        genero=genero
    )

    session.add(novo_filme)
    session.commit()
    return novo_filme.to_dict()

#LER
def ler():
    filmes = session.query(Filme).order_by(Filme.id).all()
    return [filme.to_dict() for filme in filmes]

#buscar por id
def buscar_por_id(id):
    filme = session.query(Filme).filter(Filme.id == id).first()
    return filme.to_dict() if filme else None

#ATUALIZAR
def atualizar(id,novos_dados):
    filme = buscar_por_id(id)

    if not filme:
        raise ValueError('Filme não encontrado')

    if 'nome' in novos_dados:
        nome_novo = novos_dados['nome'].strip()
        if not nome_novo:
            raise ValueError('Nome do filme não pode ser vazio')

        filme.nome = nome_novo

    if 'genero' in novos_dados:
        filme.genero = novos_dados['genero']

    session.commit()
    return filme.to_dict()

#DELETAR
def deletar(id):
    filme = buscar_por_id(id)

    if filme:
        session.delete(filme)
        session.commit()
        return True
    else:
        return False
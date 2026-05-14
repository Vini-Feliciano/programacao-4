from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import DeclarativeBase, Session
from sqlalchemy.orm import sessionmaker

engine = create_engine('sqlite:///filmes.db', echo=True)
SessionLocal = sessionmaker(bind=engine)


class Base(DeclarativeBase):
    pass

class Filme(Base):
    __tablename__ = 'filmes'

    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String, nullable=False)
    genero = Column(String)

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'genero': self.genero
        }

# Cria todas as tabelas no banco
Base.metadata.create_all(engine)

#CRIAR
def criar(nome,genero):
    with SessionLocal() as session:
        novo_filme = Filme(nome=nome, genero=genero)
        session.add(novo_filme)
        session.commit()
        session.refresh(novo_filme)
        return novo_filme

#LER
def ler():
    with SessionLocal() as session:
        return session.query(Filme).all()

#buscar por id
def buscar_por_id(id):
    with SessionLocal() as session:
        return session.query(Filme).filter(Filme.id == id).first()

#ATUALIZAR
def atualizar(id, novos_dados):
    with SessionLocal() as session:
        filme = session.query(Filme).filter(Filme.id == id).first()
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
        return filme

#DELETAR
def deletar(id):
    with SessionLocal() as session:
        filme = session.query(Filme).filter(Filme.id == id).first()
        if not filme:
            raise ValueError('Filme não encontrado')
        session.delete(filme)
        session.commit()
    return True
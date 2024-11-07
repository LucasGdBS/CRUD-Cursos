from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.config.base import Base
from decouple import config as env
from fastapi import FastAPI
from app.models.aluno import Aluno
from app.models.curso import Curso
from app.models.inscricao import Inscricao

DATABASE_URL = env('DATABASE_URL')

engine = create_async_engine(DATABASE_URL, echo=True)
async_session = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)


# Database session dependency
async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session

# Create tables before the app start
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    await inserir_dados()

    yield

async def inserir_dados():
    try:
        async with async_session() as session:
            async with session.begin():
                # Inserindo dados na tabela Aluno
                aluno1 = Aluno(nome="João Silva", email="joao.silva@example.com")
                aluno2 = Aluno(nome="Maria Souza", email="maria.souza@example.com")
                aluno3 = Aluno(nome="Carlos Santana", email="carlos.santana@example.com")
                aluno4 = Aluno(nome="Ana Lima", email="ana.lima@example.com")
                aluno5 = Aluno(nome="Jorge Lucas", email="jorge.lucas@example.com")
                aluno6 = Aluno(nome="Caio Pessoa", email="caio.pessoa@example.com")
                session.add_all([aluno1, aluno2, aluno3, aluno4, aluno5, aluno6])

                # Inserindo dados na tabela Curso
                curso1 = Curso(titulo="Cerâmica", descricao="Curso de Cerâmica", data_inicio="2024-01-20", data_fim="2024-03-03")
                curso2 = Curso(titulo="Culinária", descricao="Curso de Culinária", data_inicio="2024-02-15", data_fim="2024-04-15")
                curso3 = Curso(titulo="Matemática", descricao="Curso de Matemática Básica", data_inicio="2024-03-01", data_fim="2024-05-01")
                curso4 = Curso(titulo="Artes", descricao="Curso de Artes", data_inicio="2024-04-10", data_fim="2024-06-10")
                curso5 = Curso(titulo="Violão", descricao="Curso de Violão Básico", data_inicio="2024-05-05", data_fim="2024-07-05")
                curso6 = Curso(titulo="Guitarra", descricao="Curso de Guitarra", data_inicio="2024-06-20", data_fim="2024-08-20")
                session.add_all([curso1, curso2, curso3, curso4, curso5, curso6])

                # Inserindo dados na tabela Inscricao
                inscricao1 = Inscricao(aluno_id=1, curso_id=1, data_inscricao="2024-01-10")
                inscricao2 = Inscricao(aluno_id=2, curso_id=2, data_inscricao="2024-01-12")
                inscricao3 = Inscricao(aluno_id=3, curso_id=1, data_inscricao="2024-01-13")
                inscricao4 = Inscricao(aluno_id=4, curso_id=2, data_inscricao="2024-01-10")
                inscricao5 = Inscricao(aluno_id=3, curso_id=5, data_inscricao="2024-01-20")
                inscricao6 = Inscricao(aluno_id=4, curso_id=6, data_inscricao="2024-01-22")
                inscricao7 = Inscricao(aluno_id=1, curso_id=4, data_inscricao="2024-02-10")
                inscricao8 = Inscricao(aluno_id=2, curso_id=5, data_inscricao="2024-03-12")
                session.add_all([inscricao1, inscricao2, inscricao3, inscricao4, inscricao5, inscricao6, inscricao7, inscricao8])

            await session.commit()
    except Exception as e:
        print("Banco de dados já populado")
        await session.rollback()
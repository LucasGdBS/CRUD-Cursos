import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.config.db import async_session  # Importe a sessão configurada
from app.models.aluno import Aluno
from app.models.curso import Curso
from app.models.inscricao import Inscricao

async def inserir_dados():
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
            curso1 = Curso(titulo="Cerêmica", descricao="Curso de Cerâmica")
            curso2 = Curso(titulo="Culinária", descricao="Curso de Culinária")
            curso3 = Curso(titulo="Matemática", descricao="Curso de Matemática Básica")
            curso4 = Curso(titulo="Artes", descricao="Curso de Artes")
            curso5 = Curso(titulo="Violão", descricao="Curso de Violão Básico")
            curso6 = Curso(titulo="Guitarra", descricao="Curso de Guitarra")
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

# Executa a função para inserir os dados
asyncio.run(inserir_dados())

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload
from app.models.aluno import Aluno
from app.models.curso import Curso
from app.models.inscricao import Inscricao

async def get_aluno_cursos(aluno_id: int, session: AsyncSession):
    query = (
        select(Aluno, Curso)
        .join(Inscricao, Aluno.id == Inscricao.aluno_id)
        .join(Curso, Curso.id == Inscricao.curso_id)
        .where(Aluno.id == aluno_id)
    )
    result = await session.execute(query)
    return result.fetchall() 

async def get_alunos_por_curso(curso_titulo: str, session: AsyncSession):
    query = (
        select(Aluno)
        .join(Inscricao, Aluno.id == Inscricao.aluno_id)
        .join(Curso, Curso.id == Inscricao.curso_id)
        .where(Curso.titulo == curso_titulo)
        .options(joinedload(Aluno.inscricoes))  
    )    
    result = await session.execute(query)
    return result.scalars().all()  # Retorna uma lista de objetos Aluno
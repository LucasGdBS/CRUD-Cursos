from fastapi import FastAPI, Depends, HTTPException
from fastcrud import FastCRUD
from fastcrud import crud_router
from typing import List
from app.config.db import get_session, lifespan
from sqlalchemy.ext.asyncio import AsyncSession
from app.config.db import get_session, lifespan
from app.models.aluno import Aluno
from app.schemas.aluno_schema import AlunoCreateSchema
from app.models.curso import Curso
from app.models.inscricao import Inscricao
from app.models.joins import get_alunos_por_curso, get_aluno_cursos
from app.schemas.curso_schema import CursoCreateSchema
from app.schemas.inscricao_schema import InscricaoCreateSchema


app = FastAPI(lifespan=lifespan)

aluno_crud = FastCRUD(Aluno)
aluno_router = crud_router(
    session=get_session,
    model=Aluno,
    create_schema=AlunoCreateSchema,
    update_schema=AlunoCreateSchema,
    crud=aluno_crud,
    path="/alunos",
    tags=["Alunos"]
)

curso_crud = FastCRUD(Curso)
curso_router = crud_router(
    session=get_session,
    model=Curso,
    create_schema=CursoCreateSchema,
    update_schema=CursoCreateSchema,
    crud=curso_crud,
    path="/cursos",
    tags=["Cursos"]
)

inscricao_crud = FastCRUD(Inscricao)
inscricao_router = crud_router(
    session=get_session,
    model=Inscricao,
    create_schema=InscricaoCreateSchema,
    update_schema=InscricaoCreateSchema,
    crud=inscricao_crud,
    path="/inscricoes",
    tags=["Inscrições"]
)

app.include_router(aluno_router)
app.include_router(curso_router)
app.include_router(inscricao_router)

@app.get("/alunos/curso/{curso_titulo}", response_model=List[InscricaoCreateSchema], tags=["Alunos"])
async def listar_alunos_por_curso(curso_titulo: str, session: AsyncSession = Depends(get_session)):
    alunos = await get_alunos_por_curso(curso_titulo, session)
    if not alunos:
        raise HTTPException(status_code=404, detail="Curso não encontrado ou sem alunos")
    return alunos

@app.get("/alunos/{aluno_id}/cursos", response_model=List[CursoCreateSchema], tags=["Alunos"])
async def listar_cursos_por_aluno(aluno_id: int, session: AsyncSession = Depends(get_session)):
    cursos = await get_aluno_cursos(aluno_id, session)
    if not cursos:
        raise HTTPException(status_code=404, detail="Aluno não encontrado ou sem cursos")
    return [curso for _, curso in cursos]  
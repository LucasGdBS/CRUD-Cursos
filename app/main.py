from fastapi import FastAPI
from fastcrud import FastCRUD
from fastcrud import crud_router
from app.config.db import get_session, lifespan
from app.models.aluno import Aluno
from app.schemas.aluno_schema import AlunoCreateSchema
from app.models.curso import Curso
from app.models.inscricao import Inscricao
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
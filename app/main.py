from fastapi import FastAPI
from fastcrud import FastCRUD
from fastcrud import crud_router
from app.config.db import get_session, lifespan
from app.models.aluno import Aluno
from app.schemas.aluno_schema import AlunoCreateSchema

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

app.include_router(aluno_router)
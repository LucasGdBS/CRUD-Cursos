from pydantic import BaseModel

class AlunoCreateSchema(BaseModel):
    nome: str
    email: str

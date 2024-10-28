from pydantic import BaseModel
from datetime import date

class InscricaoCreateSchema(BaseModel):
    aluno_id: int
    curso_id: int
    data_inscricao: date
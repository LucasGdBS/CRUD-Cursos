from pydantic import BaseModel
from datetime import date

class CursoCreateSchema(BaseModel):
    titulo: str
    descricao: str
    data_inicio: date
    data_fim: date
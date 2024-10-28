from sqlalchemy import Column, Integer, String
from app.config.base import Base

class Aluno(Base):
    __tablename__ = 'aluno'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False, unique=True)

    def __repr__(self):
        return f'<Aluno {self.nome}>'
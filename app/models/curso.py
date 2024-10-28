from sqlalchemy import Column, Date, Integer, String
from sqlalchemy.orm import relationship
from app.config.base import Base

class Curso(Base):
    __tablename__ = 'curso'
    id = Column(Integer, primary_key=True, autoincrement=True)
    titulo = Column(String(100), nullable=False)
    descricao = Column(String(100), nullable=False)
    data_inicio = Column(Date)
    data_fim = Column(Date)

    inscricoes = relationship("Inscricao", back_populates="curso")

    def __repr__(self):
        return f'<Curso {self.nome}>'
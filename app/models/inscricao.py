from sqlalchemy import Column, Integer, ForeignKey, Date
from sqlalchemy.orm import relationship
from app.config.base import Base

class Inscricao(Base):
    __tablename__ = 'inscricao'

    id = Column(Integer, primary_key=True, index=True)
    aluno_id = Column(Integer, ForeignKey('aluno.id'))
    curso_id = Column(Integer, ForeignKey('curso.id'))
    data_inscricao = Column(Date)

    aluno = relationship("Aluno", back_populates="inscricoes")
    curso = relationship("Curso", back_populates="inscricoes")

    def __repr__(self):
        return f'<Aluno {self.aluno_id} inscrito no curso {self.curso_id} >'
use gestor_cursos;

CREATE TABLE aluno (
    id INTEGER NOT NULL AUTO_INCREMENT, 
    nome VARCHAR(100) NOT NULL, 
    email VARCHAR(100) NOT NULL, 
    PRIMARY KEY (id), 
    UNIQUE (email)
);

CREATE TABLE curso (
    id INTEGER NOT NULL AUTO_INCREMENT, 
    titulo VARCHAR(100) NOT NULL, 
    descricao VARCHAR(100) NOT NULL, 
    data_inicio DATE, 
    data_fim DATE, 
    PRIMARY KEY (id)
);

CREATE TABLE inscricao (
    id INTEGER NOT NULL AUTO_INCREMENT, 
    aluno_id INTEGER, 
    curso_id INTEGER, 
    data_inscricao DATE, 
    PRIMARY KEY (id), 
    FOREIGN KEY(aluno_id) REFERENCES aluno (id), 
    FOREIGN KEY(curso_id) REFERENCES curso (id)
);
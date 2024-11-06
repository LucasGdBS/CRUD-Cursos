import FormMatricula from "../components/Formulario";
import { useState, useEffect } from "react";
import '../index.css';
import axios from 'axios';

export default function Matricula() {
  const [selectedAluno, setSelectedAluno] = useState("Selecione um Aluno");
  const [selectedCurso, setSelectedCurso] = useState("Selecione uma Disciplina");
  const [alunos, setAlunos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [alunosPorCurso, setAlunosPorCurso] = useState([]);
  const [cursosPorAluno, setCursosPorAluno] = useState([]);

  // Fetch alunos and cursos on component load
  useEffect(() => {
    async function fetchAlunos() {
      const response = await axios.get("http://localhost:8000/alunos");
      setAlunos(response.data);
    }

    async function fetchCursos() {
      const response = await axios.get("http://localhost:8000/cursos");
      setCursos(response.data);
    }

    fetchAlunos();
    fetchCursos();
  }, []);

  // Handle student enrollment in a course
  async function handleMatricula() {
    try {
      await axios.post("http://localhost:8000/inscricoes", {
        aluno_id: selectedAluno,
        curso_id: selectedCurso,
      });
      alert("Aluno matriculado com sucesso!");
    } catch (error) {
      console.error("Erro ao matricular aluno:", error);
      alert("Falha ao matricular aluno.");
    }
  }

  // List students in a selected course
  async function listarAlunosPorCurso() {
    if (selectedCurso) {
      try {
        const response = await axios.get(`http://localhost:8000/alunos/curso/${selectedCurso}`);
        setAlunosPorCurso(response.data);
      } catch (error) {
        console.error("Erro ao listar alunos por curso:", error);
      }
    } else {
      alert("Por favor, selecione um curso primeiro.");
    }
  }

  // List courses that a selected student is enrolled in
  async function listarCursosPorAluno() {
    if (selectedAluno) {
      try {
        const response = await axios.get(`http://localhost:8000/alunos/${selectedAluno}/cursos`);
        setCursosPorAluno(response.data);
      } catch (error) {
        console.error("Erro ao listar cursos por aluno:", error);
      }
    } else {
      alert("Por favor, selecione um aluno primeiro.");
    }
  }

  return (
    <div className="flex flex-col items-center bg-black-eclipse h-full w-screen p-8 font-poppins text-white">
      {/* Seção principal com Alunos, Disciplinas e Matricular */}
      <div className="flex justify-center space-x-16">
        {/* Alunos */}
        <div className="bg-black border rounded-xl flex flex-col py-4 px-6 w-1/4">
          <h2 className="text-center text-4xl py-8">Alunos</h2>
          <FormMatricula
            labels={[
              { label: "Nome", name: "nome", type: "text" },
              { label: "Email", name: "email", type: "email" },
            ]}
            onSubmit={() => {}}
          />
        </div>

        {/* Cursos */}
        <div className="bg-black border rounded-xl flex flex-col py-4 px-6 w-1/4">
          <h2 className="text-center text-4xl py-8">Disciplinas</h2>
          <FormMatricula
            labels={[
              { label: "Titulo", name: "Titulo", type: "text" },
              { label: "Descrição", name: "descricao", type: "text" },
              { label: "Data de Inicio", name: "data-inicio", type: "date" },
              { label: "Data de Conclusão", name: "data-fim", type: "date" },
            ]}
            onSubmit={() => {}}
          />
        </div>

        {/* Matricular */}
        <div className="bg-black border rounded-xl flex flex-col py-4 px-6 w-1/4 items-center">
          <h2 className="text-center text-4xl py-8">Matricular</h2>
          <div className="flex flex-col mt-4">
            <label className="text-lg">Aluno</label>
            <select onChange={(e) => setSelectedAluno(e.target.value)} value={selectedAluno} className="text-black">
              <option value="">Selecione um Aluno</option>
              {alunos.map((aluno) => (
                <option key={aluno.id} value={aluno.id}>
                  {aluno.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-lg">Curso</label>
            <select onChange={(e) => setSelectedCurso(e.target.value)} value={selectedCurso} className="text-black">
              <option value="">Selecione um Curso</option>
              {cursos.map((curso) => (
                <option key={curso.id} value={curso.id}>
                  {curso.titulo}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleMatricula} className="bg-blue-500 text-white rounded-md py-2 px-4 mt-6 font-semibold hover:bg-blue-700">
            Matricular
          </button>
        </div>
      </div>

      {/* Listas de Alunos por Curso e Cursos por Aluno */}
      <div className="flex flex-col items-center space-y-8 w-3/4 mt-12">
        <div className="bg-black border rounded-xl p-6 w-full flex flex-col items-center">
          <h3 className="text-3xl text-center mb-4">Alunos do Curso Selecionado</h3>
          <button onClick={listarAlunosPorCurso} className="bg-blue-500 text-white rounded-md py-2 h-10 w-2/5 font-semibold hover:bg-blue-700 mb-4">
            Listar Alunos por Curso
          </button>
          <ul className="list-disc list-inside">
            {alunosPorCurso.map((aluno) => (
              <li key={aluno.id}>{aluno.nome}</li>
            ))}
          </ul>
        </div>

        <div className="bg-black border rounded-xl p-6 w-full flex flex-col items-center">
          <h3 className="text-3xl text-center mb-4">Cursos do Aluno Selecionado</h3>
          <button onClick={listarCursosPorAluno} className="bg-blue-500 text-white rounded-md py-2 h-10 w-2/5 font-semibold hover:bg-blue-700 mb-4">
            Listar Cursos por Aluno
          </button>
          <ul className="list-disc list-inside">
            {cursosPorAluno.map((curso) => (
              <li key={curso.id}>{curso.titulo}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

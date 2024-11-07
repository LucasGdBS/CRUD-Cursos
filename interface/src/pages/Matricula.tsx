import FormMatricula from "../components/Formulario";
import { useState, useEffect } from "react";
import '../index.css';


export default function Matricula() {
  const [selectedAluno, setSelectedAluno] = useState("Selecione um Aluno");
  const [selectedCurso, setSelectedCurso] = useState("Selecione uma Disciplina");
  interface Aluno {
    id: number;
    nome: string;
  }

  interface Curso {
    id: number;
    titulo: string;
  }

  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [alunosPorCurso, setAlunosPorCurso] = useState<Aluno[]>([]);
  const [cursosPorAluno, setCursosPorAluno] = useState<Curso[]>([]);
  const [nome, setNome] = useState(""); // Novo estado para nome
  const [email, setEmail] = useState(""); // Novo estado para email
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  // Fetch alunos and cursos on component load
    // Fetch alunos and cursos on component load
// Fetch alunos and cursos on component load
  useEffect(() => {
    async function fetchAlunos() {
      try {
        const response = await fetch("http://localhost:8000/alunos");
        const json = await response.json();
        
        // Acessa a chave "data" para extrair o array de alunos
        const alunosArray = json.data || [];
        setAlunos(alunosArray);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    }
  
    async function fetchCursos() {
      try {
        const response = await fetch("http://localhost:8000/cursos");
        const json = await response.json();
        
        // Acessa a chave "data" para extrair o array de cursos
        const cursosArray = json.data || [];
        setCursos(cursosArray);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    }
  
    fetchAlunos();
    fetchCursos();
  }, []);

  // List students in a selected course
  async function listarAlunosPorCurso() {
    if (selectedCurso) {
      try {
        const response = await fetch(`http://localhost:8000/alunos/curso/${selectedCurso}`);
        const json = await response.json();
        
        // Certifique-se de que o resultado é um array
        const alunosArray = Array.isArray(json) ? json : (json.data || []);
        setAlunosPorCurso(alunosArray);

        console.log("Alunos por curso:", alunosArray); // Log para depuração
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
        const response = await fetch(`http://localhost:8000/alunos/${selectedAluno}/cursos`);
        const json = await response.json();
        
        // Certifique-se de que o resultado é um array
        const cursosArray = Array.isArray(json) ? json : (json.data || []);
        setCursosPorAluno(cursosArray);

        console.log("Cursos por aluno:", cursosArray); // Log para depuração
      } catch (error) {
        console.error("Erro ao listar cursos por aluno:", error);
      }
    } else {
      alert("Por favor, selecione um aluno primeiro.");
    }
  }

  async function handleMatricula() {
    try {
      // Converte os IDs para números caso sejam strings
      const alunoId = Number(selectedAluno);
      const cursoId = Number(selectedCurso);

      if (!alunoId || !cursoId) {
        alert("Por favor, selecione um aluno e um curso válidos.");
        return;
      }

      const response = await fetch("http://localhost:8000/inscricoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          aluno_id: alunoId,
          curso_id: cursoId,
          //data de hoje
          data_inscricao: new Date().toISOString().split("T")[0],
        }),
      });

      if (response.ok) {
        const json = await response.json();
        const data = json.data || null;

        // Verifique se data existe para confirmação ou exiba uma mensagem de sucesso
        if (data) {
          alert("Aluno matriculado com sucesso!");
        } else {
          alert("Matrícula realizada com sucesso, mas sem dados adicionais.");
        }
      } else {
        console.error("Erro ao matricular aluno:", response.statusText);
        alert("Falha ao matricular aluno.");
      }
    } catch (error) {
      console.error("Erro ao matricular aluno:", error);
      alert("Erro de rede ao tentar matricular aluno.");
    }
  }

  // Função para criar curso
  async function handleCreateCurso(event: React.FormEvent) {
    event.preventDefault(); // Previne a submissão padrão do formulário
    try {
      const response = await fetch("http://localhost:8000/cursos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          descricao,
          data_inicio: dataInicio,
          data_fim: dataFim,
        }),
      });

      if (response.ok) {
        alert("Curso criado com sucesso!");
        const json = await response.json();
        const novoCurso = json.data;
        setCursos((prevCursos) => [...prevCursos, novoCurso]);
        setTitulo(""); // Limpa os campos após criação
        setDescricao("");
        setDataInicio("");
        setDataFim("");
      } else {
        console.error("Erro ao criar curso:", response.statusText);
        alert("Falha ao criar curso.");
      }
    } catch (error) {
      console.error("Erro ao criar curso:", error);
      alert("Erro de rede ao tentar criar curso.");
    }
  }

  // Função para criar aluno
  async function handleCreateAluno(event: React.FormEvent) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/alunos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
        }),
      });

      if (response.ok) {
        alert("Aluno criado com sucesso!");
        const json = await response.json();
        const novoAluno = json.data;
        setAlunos((prevAlunos) => [...prevAlunos, novoAluno]);
        setNome(""); // Limpa os campos após criação
        setEmail("");
      } else {
        console.error("Erro ao criar aluno:", response.statusText);
        alert("Falha ao criar aluno.");
      }
    } catch (error) {
      console.error("Erro ao criar aluno:", error);
      alert("Erro de rede ao tentar criar aluno.");
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
            { label: "Nome", name: "nome", type: "text", value: nome, onChange: (e) => setNome(e.target.value) },
            { label: "Email", name: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value) },
          ]}
          onSubmit={handleCreateAluno}
          />
        </div>

        {/* Cursos */}
        <div className="bg-black border rounded-xl flex flex-col py-4 px-6 w-1/4">
          <h2 className="text-center text-4xl py-8">Disciplinas</h2>
          <FormMatricula
          labels={[
            { label: "Titulo", name: "titulo", type: "text", value: titulo, onChange: (e) => setTitulo(e.target.value) },
            { label: "Descrição", name: "descricao", type: "text", value: descricao, onChange: (e) => setDescricao(e.target.value) },
            { label: "Data de Inicio", name: "dataInicio", type: "date", value: dataInicio, onChange: (e) => setDataInicio(e.target.value) },
            { label: "Data de Conclusão", name: "dataFim", type: "date", value: dataFim, onChange: (e) => setDataFim(e.target.value) },
          ]}
          onSubmit={handleCreateCurso}
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
      <div className="flex flex-col items-center bg-black-eclipse h-full w-screen p-8 font-poppins text-white">
      {/* Listas de Alunos por Curso e Cursos por Aluno */}
      <div className="flex flex-col items-center space-y-8 w-3/4 mt-12">
        <div className="bg-black border rounded-xl p-6 w-full flex flex-col items-center">
          <h3 className="text-3xl text-center mb-4">Alunos do Curso Selecionado</h3>
          <select onChange={(e) => setSelectedCurso(e.target.value)} value={selectedCurso} className="text-black mb-4">
            <option value="">Selecione um Curso</option>
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.titulo}>
                {curso.titulo}
              </option>
            ))}
          </select>
          <button onClick={listarAlunosPorCurso} className="bg-blue-500 text-white rounded-md py-2 h-10 w-2/5 font-semibold hover:bg-blue-700 mb-4">
            Listar Alunos por Curso
          </button>
          {alunosPorCurso.length > 0 ? (
            <ul className="list-disc list-inside">
              {alunosPorCurso.map((aluno) => (
                <li key={aluno.id}>{aluno.nome}</li>
              ))}
            </ul>
          ) : (
            <p>Nenhum aluno encontrado para o curso selecionado.</p>
          )}
        </div>

        <div className="bg-black border rounded-xl p-6 w-full flex flex-col items-center">
          <h3 className="text-3xl text-center mb-4">Cursos do Aluno Selecionado</h3>
          <select onChange={(e) => setSelectedAluno(e.target.value)} value={selectedAluno} className="text-black mb-4">
            <option value="">Selecione um Aluno</option>
            {alunos.map((aluno) => (
              <option key={aluno.id} value={aluno.id}>
                {aluno.nome}
              </option>
            ))}
          </select>
          <button onClick={listarCursosPorAluno} className="bg-blue-500 text-white rounded-md py-2 h-10 w-2/5 font-semibold hover:bg-blue-700 mb-4">
            Listar Cursos por Aluno
          </button>
          {cursosPorAluno.length > 0 ? (
            <ul className="list-disc list-inside">
              {cursosPorAluno.map((curso) => (
                <li key={curso.id}>{curso.titulo}</li>
              ))}
            </ul>
          ) : (
            <p>Nenhum curso encontrado para o aluno selecionado.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

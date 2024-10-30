import DropDown from "@/components/DropDown";
import FormMatricula from "../components/Formulario";
import { useState } from "react";

export default function Matricula() {
  const [selectedAluno, setSelectedAluno] = useState("Selecione um Aluno");
  const [selectedDisciplina, setSelectedDisciplina] = useState("Selecione uma Disciplina");

  return (
    <div className="flex justify-center space-x-48 bg-black-eclipse h-screen w-screen overflow-x-hidden p-8 font-poppins text-white">
      {/* Alunos */}
      <div className="bg-black h-4/5 w-1/4 border rounded-xl border-transparent flex flex-col py-16 space-y-16">
        <h2 className="text-center text-4xl">Alunos</h2>
        <FormMatricula
          labels={[
            { label: "Nome", name: "nome", type: "text" },
            { label: "Email", name: "email", type: "email" },
          ]}
          onSubmit={() => {}}
        />
      </div>
      {/* Cursos */}
      <div className="bg-black h-4/5 w-1/4 border rounded-xl border-transparent flex flex-col py-16 space-y-16">
        <h2 className="text-center text-4xl">Disciplinas</h2>
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
      {/* Matriculas */}
      <div className="bg-black h-4/5 w-1/4 border rounded-xl border-transparent flex flex-col py-16 space-y-16 items-center">
        <h2 className="text-center text-4xl">Matricular</h2>
        <DropDown
          itens={["Lucas", "Gabriel", "Chaves", "Brito"]}
          setSelect={() => setSelectedAluno}
          titulo="Escolha o Aluno"
        />
        <DropDown
          itens={["Lucas", "Gabriel", "Chaves", "Brito"]}
          setSelect={() => setSelectedDisciplina}
          titulo="Escolha a disciplina"
        />

        <button  className="bg-blue-500 text-white rounded-md py-2 h-10 w-1/2 font-semibold hover:bg-blue-700">
          Matricular
        </button>
      </div>
    </div>
  );
}

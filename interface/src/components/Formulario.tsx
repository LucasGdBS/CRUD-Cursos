interface InputProp {
  label: string;
  name: string;
  type: string;
}

interface FormularioProps {
  onSubmit: (event: React.FormEvent) => void;
  labels: InputProp[];
}

export default function FormMatricula({ onSubmit, labels }: FormularioProps) {
  return (
    <form action="" method="post" className="flex flex-col px-16 space-y-8">
  {labels.map((label, index) => (
    <div className="flex flex-col" key={index}>
      <label htmlFor={`${label.name}`}>{label.label}</label>
      <input
        className="text-black"
        type={`${label.type}`}
        name={`${label.name}`}
        id={`${label.name}`}
      />
    </div>
  ))}
  <div className="py-8 flex justify-center">
    <button
      type="reset"
      className="bg-blue-500 text-white rounded-md py-2 h-10 w-1/2 font-semibold hover:bg-blue-700"
      onClick={onSubmit}
    >
      Criar
    </button>
  </div>
</form>
  );
}

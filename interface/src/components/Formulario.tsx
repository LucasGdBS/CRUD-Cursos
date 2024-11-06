interface InputProp {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormularioProps {
  onSubmit: (event: React.FormEvent) => void;
  labels: InputProp[];
}

export default function FormMatricula({ onSubmit, labels }: FormularioProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col px-16 space-y-8">
      {labels.map((inputProp, index) => (
        <div className="flex flex-col" key={index}>
          <label htmlFor={`${inputProp.name}`}>{inputProp.label}</label>
          <input
            className="text-black w-full text-lg border border-border rounded-md"
            type={inputProp.type}
            name={inputProp.name}
            id={inputProp.name}
            value={inputProp.value}
            onChange={inputProp.onChange}
          />
        </div>
      ))}
      <div className="py-8 flex justify-center">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md py-2 h-10 font-semibold hover:bg-blue-700"
        >
          Criar
        </button>
      </div>
    </form>
  );
}
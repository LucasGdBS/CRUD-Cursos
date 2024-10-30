import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface DropDownProps {
  titulo: string;
  itens: string[];
  setSelect: (escolha: string) => void;
}

export default function DropDown({ titulo, itens, setSelect }: DropDownProps) {
  const [escolha, setEscolha] = useState<string>(titulo);

  const handleEscolha = (escolha: string) => {
    setSelect(escolha);
    setEscolha(escolha);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-3/4 bg-slate-600 border rounded-lg border-transparent outline-none">
        {escolha}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {itens.map((item) => (
          <DropdownMenuItem key={item} onClick={() => handleEscolha(item)}>
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

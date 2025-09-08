import React from "react";
import type { Habilidade, NivelHabilidade } from "../tipos";
import { gerarId } from "../utils/id";

interface HabilidadesProps {
  value: Habilidade[];
  onChange: (habilidades: Habilidade[]) => void;
}

const niveis: NivelHabilidade[] = ["Iniciante", "Intermediário", "Avançado"];

export default function FormHabilidades({ value, onChange }: HabilidadesProps) {
  const [draftName, setDraftName] = React.useState("");
  const [draftLevel, setDraftLevel] =
    React.useState<NivelHabilidade>("Iniciante");

  const adicionar = () => {
    const name = draftName.trim();
    if (!name) return;
    onChange([...value, { id: gerarId(), nome: name, nivel: draftLevel }]);
    setDraftName("");
    setDraftLevel("Iniciante");
  };

  const remover = (id: string) => onChange(value.filter((h) => h.id !== id));

  const atualizar = (id: string, patch: Partial<Habilidade>) =>
    onChange(value.map((h) => (h.id === id ? { ...h, ...patch } : h)));

  const podeAdicionar = draftName.trim().length > 0;

  return (
    <fieldset className="border border-gray-300 rounded-xl p-4 shadow-sm bg-white">
      <legend className="font-semibold text-lg text-indigo-600">
        Habilidades
      </legend>

      {/* formulário de adição */}
      <div className="flex flex-col gap-4 mt-2">
        <input
          className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          type="text"
          placeholder="Nome da Habilidade (ex.: React)"
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
        />
        <select
          className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          value={draftLevel}
          onChange={(e) => setDraftLevel(e.target.value as NivelHabilidade)}
        >
          {niveis.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          type="button"
          disabled={!podeAdicionar}
          onClick={adicionar}
        >
          Adicionar
        </button>
      </div>
      <ul className="space-y-4 mt-4">
        {value.map((h) => (
          <li
            key={h.id}
            className="border rounded-lg p-4 bg-gray-50 shadow-sm flex flex-wrap gap-4 items-center"
          >
            <input
              className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              type="text"
              value={h.nome}
              onChange={(e) => atualizar(h.id, { nome: e.target.value })}
              placeholder="Habilidade"
            />
            <select
              className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              value={h.nivel}
              onChange={(e) =>
                atualizar(h.id, { nivel: e.target.value as NivelHabilidade })
              }
            >
              {niveis.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <button
              className="ml-auto px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
              type="button"
              onClick={() => remover(h.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

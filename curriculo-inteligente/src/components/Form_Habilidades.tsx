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

  return (
    <fieldset>
      <legend>Habilidades</legend>

      <div>
        <input
          type="text"
          placeholder="Nome da Habilidade (ex.: React)"
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
        />
        <select
          value={draftLevel}
          onChange={(e) => setDraftLevel(e.target.value as NivelHabilidade)}
        >
          {niveis.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <button type="button" onClick={adicionar}>
          Adicionar
        </button>
      </div>

      <ul>
        {value.map((h) => (
          <li key={h.id}>
            <input
              type="text"
              value={h.nome}
              onChange={(e) => atualizar(h.id, { nome: e.target.value })}
            />
            <select
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
            <button type="button" onClick={() => remover(h.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

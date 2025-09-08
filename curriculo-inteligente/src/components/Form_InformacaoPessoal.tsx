import React from "react";
import type { InformacaoPessoal } from "../tipos";

interface Props {
  value: InformacaoPessoal;
  onChange: (value: InformacaoPessoal) => void;
}

const MAX_LENGTH = 600;

export default function Form_InformacaoPessoal({ value, onChange }: Props) {
  const set = <K extends keyof InformacaoPessoal>(
    key: K,
    val: InformacaoPessoal[K]
  ) => onChange({ ...value, [key]: val });

  const emailValido =
    !value.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email);
  const linkedinValido =
    !value.linkedin ||
    /^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(value.linkedin);

  return (
    <fieldset className="border border-gray-300 rounded-xl p-4 shadow-sm bg-white">
      <legend className="font-semibold text-lg text-indigo-600">
        Dados Pessoais
      </legend>
      <div className="flex flex-col gap-4 mt-2">
        <label className="flex flex-col text-sm font-medium text-gray-700">
          Nome completo:
          <input
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            type="text"
            value={value.nome}
            onChange={(e) => set("nome", e.target.value)}
          />
        </label>

        <label className="flex flex-col text-sm font-medium text-gray-700">
          E-mail:
          <input
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            type="email"
            value={value.email}
            onChange={(e) => set("email", e.target.value)}
            style={{ borderColor: emailValido ? undefined : "red" }}
          />
        </label>
        {!emailValido && <span className="text-red-500 text-sm">Email inválido</span>}

        <label className="flex flex-col text-sm font-medium text-gray-700">
          Telefone:
          <input
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            type="tel"
            value={value.telefone}
            onChange={(e) => set("telefone", e.target.value)}
          />
        </label>

        <label className="flex flex-col text-sm font-medium text-gray-700">
          LinkedIn:
          <input
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            type="url"
            value={value.linkedin}
            onChange={(e) => set("linkedin", e.target.value)}
            style={{ borderColor: linkedinValido ? undefined : "red" }}
          />
        </label>
        {!linkedinValido && <span className="text-red-500 text-sm">URL do LinkedIn inválido</span>}

        <label className="flex flex-col text-sm font-medium text-gray-700">
          Endereço:
          <input
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            type="text"
            value={value.endereco}
            onChange={(e) => set("endereco", e.target.value)}
          />
        </label>

        <label className="flex flex-col text-sm font-medium text-gray-700">
          Resumo Profissional:
          <textarea
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            rows={6}
            value={value.resumo}
            onChange={(e) => set("resumo", e.target.value.slice(0, MAX_LENGTH))}
            maxLength={MAX_LENGTH}
          />
        </label>
        <small>
          {value.resumo.length} / {MAX_LENGTH} caracteres
        </small>
      </div>
    </fieldset>
  );
}

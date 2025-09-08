import React from "react";
import type { ExperienciaProfissional } from "../tipos";
import { gerarId } from "../utils/id";

interface ExperienciaProfissionalProps {
  value: ExperienciaProfissional[];
  onChange: (value: ExperienciaProfissional[]) => void;
}

const anoEMes = (d: Date) => d.toISOString().slice(0, 7);

function periodoValido(
  dataInicio: string,
  dataFim?: string,
  trabalhandoAtualmente?: boolean
) {
  if (!dataInicio) return false;
  if (trabalhandoAtualmente) return true;
  if (!dataFim) return false;
  return dataInicio <= dataFim;
}

export default function Form_ExperienciaProfissional({
  value,
  onChange,
}: ExperienciaProfissionalProps) {
  const draft: ExperienciaProfissional = {
    id: "",
    empresa: "",
    cargo: "",
    dataInicio: "",
    dataFim: "",
    descricao: "",
    trabalhandoAtualmente: false,
  };

  const [form, setForm] = React.useState<ExperienciaProfissional>(draft);
  const set = <K extends keyof ExperienciaProfissional>(
    key: K,
    val: ExperienciaProfissional[K]
  ) => setForm((prev: any) => ({ ...prev, [key]: val }));

  const anoEMesAtual = anoEMes(new Date());
  const dataOk = periodoValido(
    form.dataInicio,
    form.dataFim ?? undefined,
    form.trabalhandoAtualmente
  );
  const podeAdicionar = form.empresa.trim() && form.cargo.trim() && dataOk;

  const adicionar = () => {
    if (!podeAdicionar) return;
    onChange([
      ...value,
      {
        ...form,
        id: gerarId(),
        dataFim: form.trabalhandoAtualmente ? null : form.dataFim ?? null,
      },
    ]);
    setForm(draft);
  };

  const remover = (id: string) => {
    onChange(value.filter((exp) => exp.id !== id));
  };

  const atualizar = (id: string, patch: Partial<ExperienciaProfissional>) =>
    onChange(value.map((e) => (e.id === id ? { ...e, ...patch } : e)));

  return (
    <fieldset className="border border-gray-300 rounded-xl p-4 shadow-sm bg-white">
      <legend className="font-semibold text-lg text-indigo-600">
        Experiências Profissionais
      </legend>

      <div className="flex flex-col gap-4 mt-2">
        <input
          className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          type="text"
          placeholder="Empresa"
          value={form.empresa}
          onChange={(e) => set("empresa", e.target.value)}
        />
        <input
          className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          type="text"
          placeholder="Cargo"
          value={form.cargo}
          onChange={(e) => set("cargo", e.target.value)}
        />

        <label className="flex flex-col text-sm font-medium text-gray-700">
          Data de Início:
          <input
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            type="month"
            value={form.dataInicio}
            max={anoEMesAtual}
            onChange={(e) => set("dataInicio", e.target.value)}
          />
        </label>

        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <input
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            type="checkbox"
            checked={form.trabalhandoAtualmente}
            onChange={(e) => set("trabalhandoAtualmente", e.target.checked)}
          />
          Trabalho atual
        </label>

        <label className="flex flex-col text-sm font-medium text-gray-700">
          Data de Fim:
          <input
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            type="month"
            value={form.dataFim || ""}
            disabled={form.trabalhandoAtualmente}
            max={anoEMesAtual}
            onChange={(e) => set("dataFim", e.target.value)}
          />
        </label>

        {!dataOk && (
          <span className="text-red-500 text-sm">
            Período inválido (verifique datas)
          </span>
        )}

        <textarea
          className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          rows={4}
          placeholder="Descrição (responsabilidades, resultados, tecnologias...)"
          value={form.descricao}
          onChange={(e) => set("descricao", e.target.value)}
        />

        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          type="button"
          disabled={!podeAdicionar}
          onClick={adicionar}
        >
          Adicionar experiência
        </button>
      </div>

      <ol className="space-y-4 mt-4">
        {value.map((e) => (
          <li
            key={e.id}
            className="border rounded-lg p-4 bg-gray-50 shadow-sm space-y-3"
          >
            <div className="flex flex-col gap-2">
              <input
                className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                type="text"
                value={e.empresa}
                placeholder="Empresa"
                onChange={(ev) => atualizar(e.id, { empresa: ev.target.value })}
              />
              <input
                className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                type="text"
                value={e.cargo}
                placeholder="Cargo"
                onChange={(ev) => atualizar(e.id, { cargo: ev.target.value })}
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex flex-col text-sm font-medium text-gray-700">
                Início
                <input
                  type="month"
                  className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                  value={e.dataInicio}
                  onChange={(ev) =>
                    atualizar(e.id, { dataInicio: ev.target.value })
                  }
                />
              </label>

              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={e.trabalhandoAtualmente}
                  onChange={(ev) =>
                    atualizar(e.id, {
                      trabalhandoAtualmente: ev.target.checked,
                      dataFim: ev.target.checked ? undefined : e.dataFim || "",
                    })
                  }
                />
                Trabalho atual
              </label>

              <label className="flex flex-col text-sm font-medium text-gray-700">
                Fim
                <input
                  type="month"
                  className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                  value={e.dataFim || ""}
                  disabled={e.trabalhandoAtualmente}
                  onChange={(ev) =>
                    atualizar(e.id, { dataFim: ev.target.value })
                  }
                />
              </label>
            </div>

            <textarea
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              rows={3}
              placeholder="Descrição"
              value={e.descricao}
              onChange={(ev) => atualizar(e.id, { descricao: ev.target.value })}
            />

            <button
              className="ml-auto block px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
              type="button"
              onClick={() => remover(e.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ol>
    </fieldset>
  );
}

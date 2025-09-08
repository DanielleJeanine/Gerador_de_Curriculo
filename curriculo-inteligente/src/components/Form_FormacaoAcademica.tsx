import React from "react";
import type { FormacaoAcademica } from "../tipos";
import { gerarId } from "../utils/id";

interface FormacaoAcademicaProps {
  value: FormacaoAcademica[];
  onChange: (next: FormacaoAcademica[]) => void;
}

const AnoMes = (d: Date) => d.toISOString().slice(0, 7);

function periodoValido(
  dataInicio: string,
  dataConclusao: string | null,
  estudandoAtualmente: boolean
) {
  if (!dataInicio) return false;
  if (estudandoAtualmente) return true;
  if (!dataConclusao) return false;
  return dataInicio <= dataConclusao;
}

export default function FormacaoAcademicaForm({
  value,
  onChange,
}: FormacaoAcademicaProps) {
  const draft: FormacaoAcademica = {
    id: "",
    instituicao: "",
    curso: "",
    dataInicio: "",
    dataConclusao: null,
    descricao: "",
    estudandoAtualmente: false,
  };
  const [form, setForm] = React.useState<FormacaoAcademica>(draft);

  const set = <K extends keyof FormacaoAcademica>(
    key: K,
    val: FormacaoAcademica[K]
  ) => setForm((prev) => ({ ...prev, [key]: val }));

  const anoMesAtual = AnoMes(new Date());
  const dataValida = periodoValido(
    form.dataInicio,
    form.dataConclusao,
    form.estudandoAtualmente
  );

  const podeAdicionar =
    form.instituicao.trim() && form.curso.trim() && dataValida;

  const adicionar = () => {
    if (!podeAdicionar) return;
    onChange([
      ...value,
      {
        ...form,
        id: gerarId(),
        dataConclusao: form.estudandoAtualmente ? null : form.dataConclusao,
      },
    ]);
    setForm(draft);
  };

  const remover = (id: string) => onChange(value.filter((f) => f.id !== id));

  const atualizar = (id: string, patch: Partial<FormacaoAcademica>) =>
    onChange(value.map((f) => (f.id === id ? { ...f, ...patch } : f)));

  return (
    <fieldset className="border border-gray-300 rounded-xl p-4 shadow-sm bg-white">
      <legend className="font-semibold text-lg text-indigo-600">
        Formação Acadêmica
      </legend>

      <div className="flex flex-col gap-4 mt-2">
        <input
          className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          type="text"
          placeholder="Instituição"
          value={form.instituicao}
          onChange={(e) => set("instituicao", e.target.value)}
        />
        <input
          className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          type="text"
          placeholder="Curso"
          value={form.curso}
          onChange={(e) => set("curso", e.target.value)}
        />

        <label>
          Data de Início:
          <input
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            type="month"
            value={form.dataInicio}
            max={anoMesAtual}
            onChange={(e) => set("dataInicio", e.target.value)}
          />
        </label>

        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            checked={form.estudandoAtualmente}
            onChange={(e) => set("estudandoAtualmente", e.target.checked)}
          />
          Estudando atualmente
        </label>

        <label>
          Data de Conclusão:
          <input
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            type="month"
            value={form.dataConclusao || ""}
            disabled={form.estudandoAtualmente}
            max={anoMesAtual}
            onChange={(e) => set("dataConclusao", e.target.value)}
          />
        </label>

        {!dataValida && (
          <span className="text-red-500 text-sm">
            Período inválido (verifique as datas)
          </span>
        )}

        <textarea
          className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          rows={3}
          placeholder="Descrição (disciplinas relevantes, atividades, projetos...)"
          value={form.descricao}
          onChange={(e) => set("descricao", e.target.value)}
        />

        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          type="button"
          disabled={!podeAdicionar}
          onClick={adicionar}
        >
          Adicionar formação
        </button>
      </div>

      <ul className="space-y-4 mt-4">
        {value.map((f) => (
          <li key={f.id} className="border rounded-lg p-4 bg-gray-50 shadow-sm space-y-3">
            <input
              className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              type="text"
              value={f.instituicao}
              onChange={(e) => atualizar(f.id, { instituicao: e.target.value })}
            />
            <input
              className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              type="text"
              value={f.curso}
              onChange={(e) => atualizar(f.id, { curso: e.target.value })}
            />

            <input
              className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              type="month"
              value={f.dataInicio}
              onChange={(e) => atualizar(f.id, { dataInicio: e.target.value })}
            />

            <label className="flex flex-col text-sm font-medium text-gray-700">
              <input
                className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                type="checkbox"
                checked={f.estudandoAtualmente}
                onChange={(e) =>
                  atualizar(f.id, {
                    estudandoAtualmente: e.target.checked,
                    dataConclusao: e.target.checked ? null : f.dataConclusao,
                  })
                }
              />
              Estudando atualmente
            </label>

            <input
              className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              type="month"
              value={f.dataConclusao || ""}
              disabled={f.estudandoAtualmente}
              onChange={(e) =>
                atualizar(f.id, { dataConclusao: e.target.value })
              }
            />

            <textarea
              className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              rows={2}
              value={f.descricao}
              onChange={(e) => atualizar(f.id, { descricao: e.target.value })}
            />

            <button
              className="ml-2 px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
              type="button"
              onClick={() => remover(f.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

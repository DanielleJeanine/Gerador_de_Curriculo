import React from "react";
import type { Curriculo } from "../tipos";

function Fallback({
  children,
  empty = "—",
}: {
  children?: React.ReactNode;
  empty?: string;
}) {
  return <>{children && String(children).trim() ? children : empty}</>;
}

export default function Visualizacao_Curriculo({
  curriculo,
}: {
  curriculo: Curriculo;
}) {
  const {
    informacaoPessoal: informacaoPessoal,
    habilidades: habilidades,
    experienciasProfissionais: experiencias,
    formacoesAcademicas: formacoes,
  } = curriculo;
  return (
    <article className="prose max-w-none">
      <header className="border-b pb-4 mb-6">
        <h3 className="text-3xl font-bold text-indigo-700">
          <Fallback>{informacaoPessoal.nome}</Fallback>
        </h3>
        <p className="text-gray-600 mt-1">
          <Fallback>{informacaoPessoal.email}</Fallback> ·{" "}
          <Fallback>{informacaoPessoal.telefone}</Fallback> ·{" "}
          <Fallback>{informacaoPessoal.linkedin}</Fallback> ·{" "}
          <Fallback>{informacaoPessoal.endereco}</Fallback>
        </p>
      </header>

      <section className="mb-6">
        <h4 className="text-xl font-semibold text-gray-800">Resumo</h4>
        <p className="text-gray-700">
          <Fallback>{informacaoPessoal.resumo}</Fallback>
        </p>
      </section>

      <section className="mb-6">
        <h4 className="text-xl font-semibold text-gray-800">Habilidades</h4>
        {habilidades.length === 0 ? (
          <p className="text-gray-700">—</p>
        ) : (
          <ul className="list-disc pl-6 text-gray-700">
            {habilidades.map((h) => (
              <li key={h.id}>
                {h.nome} — <span className="italic">{h.nivel}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-6">
        <h4 className="text-xl font-semibold text-gray-800">Experiências Profissionais</h4>
        {experiencias.length === 0 ? (
          <p className="text-gray-500">—</p>
        ) : (
          <ol>
            {experiencias.map((e) => (
              <li key={e.id}>
                <strong>
                  <Fallback>{e.cargo}</Fallback>
                </strong>{" "}
                · <Fallback>{e.empresa}</Fallback>
                <br />
                <small>
                  <Fallback>{e.dataInicio}</Fallback> —{" "}
                  <Fallback>
                    {e.trabalhandoAtualmente ? "Atual" : e.dataFim}
                  </Fallback>
                </small>
                <p>
                  <Fallback>{e.descricao}</Fallback>
                </p>
              </li>
            ))}
          </ol>
        )}
      </section>
      <section className="mb-6">
        <h4 className="text-xl font-semibold text-gray-800">Formação Acadêmica</h4>
        {formacoes.length === 0 ? (
          <p className="text-gray-500">—</p>
        ) : (
          <ul>
            {formacoes.map((f) => (
              <li key={f.id}>
                <strong>{f.curso}</strong> — {f.instituicao}
                <br />
                <small>
                  {f.dataInicio} —{" "}
                  {f.estudandoAtualmente ? "Atualmente" : f.dataConclusao}
                </small>
                <p>{f.descricao || "—"}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}

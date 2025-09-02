import React from "react";
import type { Curriculo } from "../tipos";

// componente auxiliar pra mostrar "—" quando vazio
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
    <article>
      <header>
        <h3>
          <Fallback>{informacaoPessoal.nome}</Fallback>
        </h3>
        <p>
          <Fallback>{informacaoPessoal.email}</Fallback> ·{" "}
          <Fallback>{informacaoPessoal.telefone}</Fallback> ·{" "}
          <Fallback>{informacaoPessoal.linkedin}</Fallback>
          <Fallback>{informacaoPessoal.endereco}</Fallback>
        </p>
      </header>

      <section>
        <h4>Resumo</h4>
        <p>
          <Fallback>{informacaoPessoal.resumo}</Fallback>
        </p>
      </section>

      <section>
        <h4>Habilidades</h4>
        {habilidades.length === 0 ? (
          <p>—</p>
        ) : (
          <ul>
            {habilidades.map((h) => (
              <li key={h.id}>
                {h.nome} — {h.nivel}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h4>Experiências Profissionais</h4>
        {experiencias.length === 0 ? (
          <p>—</p>
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
      <section>
        <h4>Formação Acadêmica</h4>
        {formacoes.length === 0 ? (
          <p>—</p>
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

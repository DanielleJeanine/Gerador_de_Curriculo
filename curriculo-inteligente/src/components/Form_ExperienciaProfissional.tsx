import React from "react";
import type { ExperienciaProfissional } from "../tipos";
import { gerarId } from "../utils/id";

interface ExperienciaProfissionalProps {
  value: ExperienciaProfissional[];
  onChange: (value: ExperienciaProfissional[]) => void;
}

const anoEMes = (d: Date) => d.toISOString().slice(0, 7);

function periodoValido(dataInicio: string, dataFim?: string, trabalhandoAtualmente?: boolean) {
    if (!dataInicio) return false;
    if (trabalhandoAtualmente) return true;
    if (!dataFim) return false;
    return dataInicio <= dataFim;
}

export default function Form_ExperienciaProfissional({ value, onChange }: ExperienciaProfissionalProps) {

    const draft: ExperienciaProfissional = {
        id: '',
        empresa: '',
        cargo: '',
        dataInicio: '',
        dataFim: '',
        descricao: '',
        trabalhandoAtualmente: false
    };

    const [form, setForm] = React.useState<ExperienciaProfissional>(draft);
    const set = <K extends keyof ExperienciaProfissional>(key: K, val: ExperienciaProfissional[K]) =>
    setForm((prev: any) => ({ ...prev, [key]: val }));

    const anoEMesAtual = anoEMes(new Date());
    const dataOk = periodoValido(form.dataInicio, form.dataFim ?? undefined, form.trabalhandoAtualmente);
    const podeAdicionar = form.empresa.trim() && form.cargo.trim() && dataOk;

    const adicionar = () => {
        if (!podeAdicionar) return;
        onChange([
            ...value,
            { 
                ...form, 
                id: gerarId(), 
                dataFim: form.trabalhandoAtualmente ? null : form.dataFim ?? null 
            }
        ]);
        setForm(draft);
    };

    const remover = (id: string) => {
        onChange(value.filter(exp => exp.id !== id));
    }

    const atualizar = (id: string, patch: Partial<ExperienciaProfissional>) =>
    onChange(value.map(e => (e.id === id ? { ...e, ...patch } : e)));

    return (
        <fieldset>
            <legend>Experiências Profissionais</legend>

            <div>
        <input
          type="text"
          placeholder="Empresa"
          value={form.empresa}
          onChange={e => set('empresa', e.target.value)}
        />
        <input
          type="text"
          placeholder="Cargo"
          value={form.cargo}
          onChange={e => set('cargo', e.target.value)}
        />

        <label>
          Data de Início
          <input
            type="month"
            value={form.dataInicio}
            max={anoEMesAtual}
            onChange={e => set('dataInicio', e.target.value)}
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={form.trabalhandoAtualmente}
            onChange={e => set('trabalhandoAtualmente', e.target.checked)}
          />
          Trabalho atual
        </label>

        <label>
         Data de Fim
          <input
            type="month"
            value={form.dataFim || ''}
            disabled={form.trabalhandoAtualmente}
            max={anoEMesAtual}
            onChange={e => set('dataFim', e.target.value)}
          />
        </label>

        {!dataOk && <small>Período inválido (verifique datas)</small>}

        <textarea
          rows={4}
          placeholder="Descrição (responsabilidades, resultados, tecnologias...)"
          value={form.descricao}
          onChange={e => set('descricao', e.target.value)}
        />

        <button type="button" disabled={!podeAdicionar} onClick={adicionar}>
          Adicionar experiência
        </button>
      </div>

      
      <ol>
        {value.map(e => (
          <li key={e.id}>
            <div>
              <input
                type="text"
                value={e.empresa}
                onChange={ev => atualizar(e.id, { empresa: ev.target.value })}
              />
              <input
                type="text"
                value={e.cargo}
                onChange={ev => atualizar(e.id, { cargo: ev.target.value })}
              />
            </div>

            <div>
              <label>
                Data de Início
                <input
                  type="month"
                  value={e.dataInicio}
                  onChange={ev => atualizar(e.id, { dataInicio: ev.target.value })}
                />
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={e.trabalhandoAtualmente}
                  onChange={ev =>
                    atualizar(e.id, {
                      trabalhandoAtualmente: ev.target.checked,
                      dataFim: ev.target.checked ? undefined : e.dataFim || ''
                    })
                  }
                />
                Trabalho atual
              </label>

              <label>
                Data de Fim
                <input
                  type="month"
                  value={e.dataFim || ''}
                  disabled={e.trabalhandoAtualmente}
                  onChange={ev => atualizar(e.id, { dataFim: ev.target.value })}
                />
              </label>
            </div>

            <textarea
              rows={3}
              value={e.descricao}
              onChange={ev => atualizar(e.id, { descricao: ev.target.value })}
            />

            <button type="button" onClick={() => remover(e.id)}>Remover</button>
          </li>
        ))}
      </ol>
        </fieldset>
    );

}
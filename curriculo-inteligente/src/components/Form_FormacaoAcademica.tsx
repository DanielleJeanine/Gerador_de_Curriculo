import React from 'react';
import type { FormacaoAcademica } from '../tipos';
import { gerarId } from '../utils/id';

interface FormacaoAcademicaProps {
  value: FormacaoAcademica[];
  onChange: (next: FormacaoAcademica[]) => void;
}

const AnoMes = (d: Date) => d.toISOString().slice(0, 7);

function periodoValido(dataInicio: string, dataConclusao: string | null, estudandoAtualmente: boolean) {
  if (!dataInicio) return false;
  if (estudandoAtualmente) return true;
  if (!dataConclusao) return false;
  return dataInicio <= dataConclusao;
}

export default function FormacaoAcademicaForm({ value, onChange }: FormacaoAcademicaProps) {
  const draft: FormacaoAcademica = {
    id: '',
    instituicao: '',
    curso: '',
    dataInicio: '',
    dataConclusao: null,
    descricao: '',
    estudandoAtualmente: false
  };
  const [form, setForm] = React.useState<FormacaoAcademica>(draft);

  const set = <K extends keyof FormacaoAcademica>(key: K, val: FormacaoAcademica[K]) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const anoMesAtual = AnoMes(new Date());
  const dataValida = periodoValido(form.dataInicio, form.dataConclusao, form.estudandoAtualmente);

  const podeAdicionar = form.instituicao.trim() && form.curso.trim() && periodoValido;

  const adicionar = () => {
    if (!podeAdicionar) return;
    onChange([
      ...value,
      { ...form, id: gerarId(), dataConclusao: form.estudandoAtualmente ? null : form.dataConclusao }
    ]);
    setForm(draft);
  };

  const remover = (id: string) => onChange(value.filter(f => f.id !== id));

  const atualizar = (id: string, patch: Partial<FormacaoAcademica>) =>
    onChange(value.map(f => (f.id === id ? { ...f, ...patch } : f)));

  return (
    <fieldset>
      <legend>Formação Acadêmica</legend>

      {/* formulário de adição */}
      <div>
        <input
          type="text"
          placeholder="Instituição"
          value={form.instituicao}
          onChange={e => set('instituicao', e.target.value)}
        />
        <input
          type="text"
          placeholder="Curso"
          value={form.curso}
          onChange={e => set('curso', e.target.value)}
        />

        <label>
          Data de Início
          <input
            type="month"
            value={form.dataInicio}
            max={anoMesAtual}
            onChange={e => set('dataInicio', e.target.value)}
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={form.estudandoAtualmente}
            onChange={e => set('estudandoAtualmente', e.target.checked)}
          />
          Estudando atualmente
        </label>

        <label>
          Data de Conclusão
          <input
            type="month"
            value={form.dataConclusao || ''}
            disabled={form.estudandoAtualmente}
            max={anoMesAtual}
            onChange={e => set('dataConclusao', e.target.value)}
          />
        </label>

        {!dataValida && <small>Período inválido</small>}

        <textarea
          rows={3}
          placeholder="Descrição (disciplinas relevantes, atividades, projetos...)"
          value={form.descricao}
          onChange={e => set('descricao', e.target.value)}
        />

        <button type="button" disabled={!podeAdicionar} onClick={adicionar}>
          Adicionar formação
        </button>
      </div>

      
      <ul>
        {value.map(f => (
          <li key={f.id}>
            <input
              type="text"
              value={f.instituicao}
              onChange={e => atualizar(f.id, { instituicao: e.target.value })}
            />
            <input
              type="text"
              value={f.curso}
              onChange={e => atualizar(f.id, { curso: e.target.value })}
            />

            <input
              type="month"
              value={f.dataInicio}
              onChange={e => atualizar(f.id, { dataInicio: e.target.value })}
            />

            <label>
              <input
                type="checkbox"
                checked={f.estudandoAtualmente}
                onChange={e =>
                  atualizar(f.id, {
                    estudandoAtualmente: e.target.checked,
                    dataConclusao: e.target.checked ? null : f.dataConclusao
                  })
                }
              />
              Estudando atualmente
            </label>

            <input
              type="month"
              value={f.dataConclusao || ''}
              disabled={f.estudandoAtualmente}
              onChange={e => atualizar(f.id, { dataConclusao: e.target.value })}
            />

            <textarea
              rows={2}
              value={f.descricao}
              onChange={e => atualizar(f.id, { descricao: e.target.value })}
            />

            <button type="button" onClick={() => remover(f.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

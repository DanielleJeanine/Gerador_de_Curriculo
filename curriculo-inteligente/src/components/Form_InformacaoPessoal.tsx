import React from "react";
import type { InformacaoPessoal } from "../tipos";

interface Props {
    value: InformacaoPessoal;
    onChange: (value: InformacaoPessoal) => void;
}

const MAX_LENGTH = 600;

export default function Form_InformacaoPessoal({ value, onChange }: Props) {
    const set = <K extends keyof InformacaoPessoal>(key: K, val: InformacaoPessoal[K]) =>
        onChange({ ...value, [key]: val });

    const emailValido = !value.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email);
    const linkedinValido = !value.linkedin || /^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(value.linkedin);

    return (
        <fieldset>
            <legend>Dados Pessoais</legend>

            <label >
                Nome completo:
                <input
                    type="text" 
                    value={value.nome}
                    onChange={e => set("nome", e.target.value)}
                />
            </label>

            <label >
                E-mail:
                <input
                    type="email"
                    value={value.email}
                    onChange={e => set("email", e.target.value)}
                    style={{ borderColor: emailValido ? undefined : "red" }}
                />
            </label>
            {!emailValido && <small>Email inválido</small>}

            <label >
                Telefone:
                <input
                    type="tel"
                    value={value.telefone}
                    onChange={e => set("telefone", e.target.value)}
                />
            </label>

            <label >
                LinkedIn:
                <input
                    type="url"
                    value={value.linkedin}
                    onChange={e => set("linkedin", e.target.value)}
                    style={{ borderColor: linkedinValido ? undefined : "red" }}
                />
            </label>
            {!linkedinValido && <small>URL do LinkedIn inválido</small>}

            <label >
                Resumo Profissional:
                <textarea
                    rows={6}
                    value={value.resumo}
                    onChange={e => set('resumo', e.target.value.slice(0, MAX_LENGTH))}
                    maxLength={MAX_LENGTH}
                />
            </label>
            <small>{value.resumo.length} / {MAX_LENGTH} caracteres</small>

        </fieldset>
    );
}
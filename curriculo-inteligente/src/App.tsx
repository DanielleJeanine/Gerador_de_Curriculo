import React from "react";
import type { Curriculo } from "./tipos";
import Form_ExperienciaProfissional from "./components/Form_ExperienciaProfissional";
import Form_FormacaoAcademica from "./components/Form_FormacaoAcademica";
import Form_Habilidades from "./components/Form_Habilidades";
import Form_InformacaoPessoal from "./components/Form_InformacaoPessoal";
import Visualizacao_Curriculo from "./components/Visualizacao_Curriculo";

const curriculoVazio: Curriculo = {
  informacaoPessoal: { nome: "", email: "", telefone: "", endereco: "", linkedin: "", resumo: "" },
  habilidades: [],
  experienciasProfissionais: [],
  formacoesAcademicas: []
};

export default function App() {
  const [curriculo, setCurriculo] = React.useState<Curriculo>(curriculoVazio);

  const atualizarInformacaoPessoal = (info: Curriculo["informacaoPessoal"]) => {
    setCurriculo(prev => ({ ...prev, informacaoPessoal: info }));
  };

  const atualizarHabilidades = (habilidades: Curriculo["habilidades"]) => {
    setCurriculo(prev => ({ ...prev, habilidades: habilidades }));
  };

  const atualizarExperienciasProfissionais = (experiencias: Curriculo["experienciasProfissionais"]) => {
    setCurriculo(prev => ({ ...prev, experienciasProfissionais: experiencias }));
  };

  const atualizarFormacoesAcademicas = (formacoes: Curriculo["formacoesAcademicas"]) => {
    setCurriculo(prev => ({ ...prev, formacoesAcademicas: formacoes }));
  };

  return (
    <div className="h-screen grid grid-cols-2">
      <div className="p-6 overflow-y-auto bg-gray-50 border-r border-gray-300">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">
          Gerador de Currículo
        </h1>
        <div className="space-y-6">
          <Form_InformacaoPessoal value={curriculo.informacaoPessoal} onChange={atualizarInformacaoPessoal} />
          <Form_Habilidades value={curriculo.habilidades} onChange={atualizarHabilidades} />
          <Form_ExperienciaProfissional
            value={curriculo.experienciasProfissionais}
            onChange={atualizarExperienciasProfissionais}
          />
          <Form_FormacaoAcademica
            value={curriculo.formacoesAcademicas}
            onChange={atualizarFormacoesAcademicas}
          />
        </div>
      </div>

    
      <div className="p-8 overflow-y-auto bg-white">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Visualização do Currículo</h2>
        <div className="border rounded-xl shadow-md p-6 bg-gray-50">
          <Visualizacao_Curriculo curriculo={curriculo} />
        </div>
      </div>
    </div>
  );
}
 
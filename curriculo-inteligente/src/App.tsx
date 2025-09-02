import React from "react";
import type { Curriculo } from "./tipos";
// import Form_ExperienciaProfissional from "./components/Form_ExperienciaProfissional";
// import Form_FormacaoAcademica from "./components/Form_FormacaoAcademica";
// import Form_Habilidades from "./components/Form_Habilidades";
import Form_InformacaoPessoal from "./components/Form_InformacaoPessoal";
// import Visualizacao_Curriculo from "./components/Visualizacao_Curriculo";

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
    <div>
      <h1>Gerador de Currículo</h1>
        <section>
        <h2>Formulários</h2>
        <Form_InformacaoPessoal value={curriculo.informacaoPessoal} onChange={atualizarInformacaoPessoal} />
        {/* <Form_Habilidades habilidades={curriculo.habilidades} onChange={atualizarHabilidades} />
        <Form_FormacaoAcademica formacoes={curriculo.formacoesAcademicas} onChange={atualizarFormacoesAcademicas} />
        <Form_ExperienciaProfissional experiencias={curriculo.experienciasProfissionais} onChange={atualizarExperienciasProfissionais} /> */}
      </section>

      <section>
        <h2>Visualização do Currículo</h2>
        {/* <Visualizacao_Curriculo curriculo={curriculo} /> */}
      </section> 
    </div>
  );
}
 
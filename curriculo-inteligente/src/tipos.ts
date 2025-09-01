//Documento para organizar os diferentes tipos de sessões do currículo

export type NivelHabilidade = 'Iniciante' | 'Intermediário' | 'Avançado';

export interface Habilidade {
    id: string;
    nome: string;
    nivel: NivelHabilidade;
}

export interface ExperienciaProfissional {
    id: string;
    empresa: string;
    cargo: string;  
    dataInicio: string;
    dataFim: string | null;
    descricao: string;
    trabalhandoAtualmente: boolean;
}

export interface InformacaoPessoal {
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    linkedin: string;
    resumo: string;
}

export interface FormacaoAcademica {
    id: string;
    instituicao: string;
    curso: string;
    dataInicio: string;
    dataConclusao: string | null;
    descricao: string;
    estudandoAtualmente: boolean;
}

export interface Curriculo {
    informacaoPessoal: InformacaoPessoal;
    habilidades: Habilidade[];
    experienciasProfissionais: ExperienciaProfissional[];
    formacoesAcademicas: FormacaoAcademica[];
}
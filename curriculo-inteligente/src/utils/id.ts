// Gera um ID único de forma simples, automática e aleatória
// Usa a API nativa do navegador (crypto.randomUUID) quando disponível
// Caso contrário, usa uma combinação de timestamp e número aleatório

export const gerarId = () =>
(crypto?.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()));
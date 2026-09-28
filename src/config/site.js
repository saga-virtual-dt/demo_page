// ─────────────────────────────────────────────────────────────
// CONFIGURAÇÕES GERAIS DO SITE DE DEMONSTRAÇÃO
// Edite este arquivo para trocar o WhatsApp de captação e os preços.
// ─────────────────────────────────────────────────────────────

const site = {
  // WhatsApp exibido como atalho ("Prefere falar direto?") na página
  // /solicitar. O botão "Quero uma página como esta" da faixa de
  // demonstração leva ao formulário, não mais direto pro WhatsApp —
  // o formulário é quem envia o e-mail (ver api/send-brief.js).
  ctaWhatsapp: "5541999999999", // só números, com DDI+DDD

  siteName: "Nome do Site",

  pricing: {
    essential: {
      title: "Landing Page",
      price: "R$ 99",
      deadline:
        "Prazo: até 48 horas após receber todas as informações necessárias",
      includes: [
        "Landing page personalizada",
        "Layout responsivo para celular e computador",
        "Informações e serviços da empresa",
        "Botão de WhatsApp",
        "Formulário de contato",
        "Publicação na Vercel",
        "Hospedagem inicial sem custo",
        "1 rodada de alterações simples",
      ],
    },
    addonsTitle: "Valores adicionais",
    addons: [
      { label: "Página adicional", price: "R$ 14,90" },
      { label: "Alteração adicional", price: "R$ 14,90" },
      { label: "Domínio próprio", price: "Valor do domínio + configuração" },
      { label: "Outros recursos", price: "Orçamento conforme necessidade" },
    ],
    maintenance: {
      title: "Manutenção",
      price: "R$ 29/mês",
      includes: [
        "Pequenas alterações",
        "Manutenção técnica",
        "Acompanhamento da publicação",
        "Suporte básico",
      ],
    },
  },
};

export default site;

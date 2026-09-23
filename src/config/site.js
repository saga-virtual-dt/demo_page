// ─────────────────────────────────────────────────────────────
// CONFIGURAÇÕES GERAIS DO SITE DE DEMONSTRAÇÃO
// Edite este arquivo para trocar o WhatsApp de captação e os preços.
// ─────────────────────────────────────────────────────────────

const site = {
  // WhatsApp exibido como atalho ("Prefere falar direto?") na página
  // /solicitar. O botão "Quero uma página como esta" da faixa de
  // demonstração leva ao formulário, não mais direto pro WhatsApp —
  // o formulário é quem envia o e-mail (ver api/send-brief.js).
  ctaWhatsapp: '5541999999999', // só números, com DDI+DDD

  siteName: 'Nome do Site',

  pricing: {
    essential: {
      title: 'Landing Page Essencial',
      price: 'R$ X',
      includes: [
        'Página responsiva',
        'Domínio seudominio.com.br ou configuração',
        'Botão WhatsApp',
        'Localização',
        'Serviços',
        'Formulário',
        'SEO básico',
        'Publicação',
        '1 rodada de alterações',
      ],
    },
    addonsTitle: 'Adicionais',
    addons: [
      { label: 'Página adicional', price: 'R$ 150' },
      { label: 'Seção adicional', price: 'R$ 50' },
      { label: 'Formulário avançado', price: 'R$ 100' },
      { label: 'Integração WhatsApp', price: 'R$ 80' },
      { label: 'Google Maps', price: 'R$ 50' },
      { label: 'Galeria de fotos', price: 'R$ 80' },
      { label: 'Blog', price: 'R$ 300' },
      { label: 'Copy profissional', price: 'R$ 150' },
      { label: 'SEO avançado', price: 'R$ 200' },
      { label: 'Domínio', price: 'Custo + serviço' },
      { label: 'Manutenção mensal', price: 'R$ X/mês' },
    ],
  },
}

export default site

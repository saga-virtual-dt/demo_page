// ─────────────────────────────────────────────────────────────
// UM OBJETO POR ROTA DE DEMONSTRAÇÃO (ex: /barbearia)
// "clientName" é o nome que aparece na faixa "Landing page demonstrativa para X"
// "variant" escolhe o template: 'servicos' | 'empresa' | 'profissional'
// ─────────────────────────────────────────────────────────────

const palettes = {
  servicos: {
    paper: "#F7F5F1",
    paper2: "#EFEAE2",
    ink: "#22201C",
    accent: "#6B5B95",
    accentDark: "#50436F",
    trust: "#3F6E5E",
    line: "#E2DCD0",
    font: "'Fraunces', serif",
  },
  empresa: {
    paper: "#F5F6F7",
    paper2: "#EAECEF",
    ink: "#1B2027",
    accent: "#2D5F73",
    accentDark: "#20464F",
    trust: "#2D5F73",
    line: "#DBDFE3",
    font: "'Space Grotesk', sans-serif",
    cta: "#E0862C",
    ctaDark: "#B96A1C",
  },
  profissional: {
    paper: "#F7F5F0",
    paper2: "#EFEAE0",
    ink: "#20242B",
    accent: "#8C6D1F",
    accentDark: "#6E5518",
    trust: "#2E4B5E",
    line: "#E3DFD2",
    font: "'Lora', serif",
  },
};

function servicos(slug, clientName, opts) {
  return {
    slug,
    variant: "servicos",
    clientName,
    secondaryType: "instagram",
    colors: palettes.servicos,
    ...opts,
  };
}
function empresa(slug, clientName, opts) {
  return {
    slug,
    variant: "empresa",
    clientName,
    secondaryType: "linkedin",
    colors: palettes.empresa,
    ...opts,
  };
}
function profissional(slug, clientName, opts) {
  return {
    slug,
    variant: "profissional",
    clientName,
    secondaryType: "linkedin",
    colors: palettes.profissional,
    ...opts,
  };
}

const niches = [
  servicos("salao", "Studio Bella Hair", {
    eyebrow: "Salão de beleza · Centro",
    headline: "Seu cabelo, sua confiança, em boas mãos",
    subheadline:
      "Corte, coloração e tratamentos com profissionais especializados e horário marcado.",
    heroBullets: [
      "Produtos profissionais",
      "Equipe especializada",
      "Ambiente climatizado",
      "Agendamento pelo WhatsApp",
    ],
    stats: [
      { value: "+8", label: "anos de salão" },
      { value: "+1.200", label: "clientes atendidas" },
      { value: "Centro", label: "fácil acesso" },
    ],
    services: [
      {
        title: "Corte e escova",
        description: "Cortes modernos e finalização impecável.",
      },
      { title: "Coloração", description: "Tinturas, mechas e nanoplastia." },
      {
        title: "Tratamentos capilares",
        description: "Hidratação, botox e reconstrução.",
      },
      {
        title: "Penteados para eventos",
        description: "Produção completa para ocasiões especiais.",
      },
    ],
    gallery: [
      "../img/antes_depois1.png",
      "/img/antes_depois2.png",
      "/img/ambiente3.png",
      "/img/ambiente4.png",
    ],
    testimonials: [
      {
        quote: "Saí do salão completamente renovada, adorei o atendimento.",
        author: "Cliente fidelizada",
      },
      {
        quote: "Equipe atenciosa e resultado sempre acima do esperado.",
        author: "Cliente há 3 anos",
      },
    ],
  }),
  servicos("estetica", "Espaço Renove Estética", {
    eyebrow: "Clínica de estética · Centro",
    headline: "Cuidado com a sua pele começa aqui",
    subheadline:
      "Protocolos personalizados de estética facial e corporal com resultado acompanhado.",
    heroBullets: [
      "Avaliação personalizada",
      "Equipamentos modernos",
      "Protocolos exclusivos",
      "Acompanhamento contínuo",
    ],
    stats: [
      { value: "+600", label: "protocolos realizados" },
      { value: "9", label: "tratamentos disponíveis" },
      { value: "4.9", label: "avaliação média" },
    ],
    services: [
      {
        title: "Limpeza de pele",
        description: "Higienização profunda e revitalizante.",
      },
      {
        title: "Estética facial",
        description: "Protocolos antienvelhecimento e firmeza.",
      },
      {
        title: "Estética corporal",
        description: "Redução de medidas e modelagem corporal.",
      },
      {
        title: "Massoterapia",
        description: "Relaxamento e drenagem linfática.",
      },
    ],
    gallery: [
      "../img/antes_depois1.png",
      "/img/antes_depois2.png",
      "/img/ambiente3.png",
      "/img/ambiente4.png",
    ],
    testimonials: [
      {
        quote: "Resultado visível já nas primeiras sessões.",
        author: "Cliente de estética facial",
      },
      {
        quote: "Ambiente acolhedor e profissionais muito atenciosas.",
        author: "Cliente de estética corporal",
      },
    ],
  }),
  servicos("barbearia", "Barbearia Vintage", {
    eyebrow: "Barbearia · Centro",
    headline: "Estilo e tradição em cada corte",
    subheadline:
      "Corte, barba e cuidados masculinos num ambiente pensado para você.",
    heroBullets: [
      "Barbeiros experientes",
      "Produtos de barba premium",
      "Ambiente descontraído",
      "Agendamento rápido",
    ],
    stats: [
      { value: "+10", label: "anos de barbearia" },
      { value: "+3.000", label: "cortes realizados" },
      { value: "Centro", label: "fácil acesso" },
    ],
    services: [
      { title: "Corte masculino", description: "Cortes clássicos e modernos." },
      { title: "Barba", description: "Modelagem e hidratação de barba." },
      {
        title: "Combo corte + barba",
        description: "O pacote completo com desconto.",
      },
      { title: "Sobrancelha", description: "Design com navalha ou pinça." },
    ],
    gallery: ["Trabalho 1", "Trabalho 2", "Trabalho 3", "Trabalho 4"],
    testimonials: [
      {
        quote: "Melhor barbearia da região, atendimento nota 10.",
        author: "Cliente fiel",
      },
      {
        quote: "Ambiente show e corte sempre impecável.",
        author: "Cliente há 2 anos",
      },
    ],
  }),
  servicos("clinica", "Clínica Vida Plena", {
    eyebrow: "Clínica multiprofissional · Centro",
    headline: "Cuidado completo para sua saúde",
    subheadline:
      "Consultas e exames com especialistas, em um só lugar, com horário marcado.",
    heroBullets: [
      "Especialistas qualificados",
      "Convênios aceitos",
      "Estrutura completa",
      "Atendimento de urgência",
    ],
    stats: [
      { value: "+15", label: "especialidades" },
      { value: "+5.000", label: "pacientes atendidos" },
      { value: "Centro", label: "fácil acesso" },
    ],
    services: [
      {
        title: "Clínica geral",
        description: "Consultas de rotina e prevenção.",
      },
      {
        title: "Exames laboratoriais",
        description: "Coleta e resultados rápidos.",
      },
      {
        title: "Especialidades médicas",
        description: "Cardiologia, dermatologia e mais.",
      },
      {
        title: "Check-up completo",
        description: "Avaliação preventiva anual.",
      },
    ],
    gallery: [
      "../img/clinica1.png",
      "/img/clinica2.png",
      "/img/clinica3.png",
      "/img/clinica2.png",
    ],
    testimonials: [
      {
        quote: "Fui muito bem atendida, equipe atenciosa do início ao fim.",
        author: "Paciente de clínica geral",
      },
      {
        quote: "Estrutura excelente e retorno rápido dos exames.",
        author: "Paciente de check-up",
      },
    ],
  }),
  servicos("fotografo", "João Ramos Fotografia", {
    eyebrow: "Fotografia profissional",
    headline: "Registros que contam a sua história",
    subheadline:
      "Ensaios, casamentos e eventos com um olhar autoral e cuidado em cada detalhe.",
    heroBullets: [
      "Equipamento profissional",
      "Edição autoral",
      "Entrega em até 15 dias",
      "Portfólio disponível",
    ],
    stats: [
      { value: "+7", label: "anos de carreira" },
      { value: "+200", label: "eventos cobertos" },
      { value: "4.9", label: "avaliação média" },
    ],
    services: [
      {
        title: "Ensaios pessoais",
        description: "Retratos e ensaios temáticos.",
      },
      { title: "Casamentos", description: "Cobertura completa do grande dia." },
      {
        title: "Eventos corporativos",
        description: "Registro profissional de eventos.",
      },
      {
        title: "Book de família",
        description: "Momentos em família com naturalidade.",
      },
    ],
    gallery: ["Ensaio 1", "Ensaio 2", "Casamento 3", "Evento 4"],
    testimonials: [
      {
        quote: "As fotos ficaram além do que eu esperava.",
        author: "Cliente de casamento",
      },
      {
        quote: "Profissional atencioso e resultado impecável.",
        author: "Cliente de ensaio",
      },
    ],
  }),
  servicos("autonomo", "Ana Costa — Profissional Autônoma", {
    eyebrow: "Profissional autônomo(a)",
    headline: "Seu serviço de confiança, direto com quem entende",
    subheadline:
      "Atendimento próximo, orçamento sem compromisso e prazo combinado com você.",
    heroBullets: [
      "Atendimento direto",
      "Orçamento sem compromisso",
      "Flexibilidade de horário",
      "Trabalho com referências",
    ],
    stats: [
      { value: "+6", label: "anos de experiência" },
      { value: "+150", label: "clientes atendidos" },
      { value: "5.0", label: "avaliação média" },
    ],
    services: [
      {
        title: "Serviço 1",
        description: "Descrição curta do serviço prestado.",
      },
      {
        title: "Serviço 2",
        description: "Descrição curta do serviço prestado.",
      },
      {
        title: "Serviço 3",
        description: "Descrição curta do serviço prestado.",
      },
      {
        title: "Serviço 4",
        description: "Descrição curta do serviço prestado.",
      },
    ],
    gallery: ["Trabalho 1", "Trabalho 2", "Trabalho 3", "Trabalho 4"],
    testimonials: [
      {
        quote: "Serviço rápido, caprichado e no prazo combinado.",
        author: "Cliente satisfeito",
      },
      {
        quote: "Recomendo, atendimento muito atencioso.",
        author: "Cliente recorrente",
      },
    ],
  }),

  empresa("engenharia", "Engenharia & Estrutura Ltda.", {
    eyebrow: "Engenharia civil e estrutural",
    headline: "Projetos estruturais com segurança e precisão",
    subheadline:
      "Da concepção à execução, entregamos projetos de engenharia dentro do prazo e da norma.",
    heroBullets: [
      "Engenheiros com CREA ativo",
      "Laudos e ARTs em dia",
      "Prazos cumpridos",
      "Suporte pós-entrega",
    ],
    stats: [
      { value: "+120", label: "projetos entregues" },
      { value: "+12", label: "anos de mercado" },
      { value: "+40", label: "empresas atendidas" },
    ],
    services: [
      {
        title: "Projeto estrutural",
        description: "Cálculo e detalhamento estrutural.",
      },
      { title: "Laudo técnico", description: "Vistorias e laudos com ART." },
      {
        title: "Gerenciamento de obra",
        description: "Acompanhamento técnico da execução.",
      },
      {
        title: "Consultoria em normas",
        description: "Adequação a normas técnicas vigentes.",
      },
    ],
    process: [
      {
        title: "Diagnóstico",
        description: "Levantamento das necessidades do projeto.",
      },
      {
        title: "Projeto",
        description: "Elaboração técnica e aprovação com o cliente.",
      },
      { title: "Execução", description: "Acompanhamento da obra em campo." },
      { title: "Suporte", description: "Atendimento pós-entrega e ajustes." },
    ],
    gallery: ["Projeto 1", "Projeto 2", "Projeto 3", "Projeto 4"],
    testimonials: [
      {
        quote: "Projeto entregue no prazo e com total clareza técnica.",
        author: "Diretor de obras — Construtora parceira",
      },
      {
        quote: "Suporte técnico excelente do início ao fim.",
        author: "Engenheiro responsável — Cliente",
      },
    ],
  }),
  empresa("energia-solar", "Sol Energia Solar", {
    eyebrow: "Energia solar fotovoltaica",
    headline: "Reduza sua conta de luz com energia solar",
    subheadline:
      "Projeto, instalação e homologação do seu sistema fotovoltaico, do início ao fim.",
    heroBullets: [
      "Equipe certificada",
      "Financiamento facilitado",
      "Homologação inclusa",
      "Garantia de até 25 anos",
    ],
    stats: [
      { value: "+300", label: "sistemas instalados" },
      { value: "+2MW", label: "de potência instalada" },
      { value: "+8", label: "anos de mercado" },
    ],
    services: [
      {
        title: "Projeto fotovoltaico",
        description: "Dimensionamento sob medida.",
      },
      { title: "Instalação", description: "Montagem com equipe própria." },
      {
        title: "Homologação",
        description: "Regularização junto à concessionária.",
      },
      {
        title: "Manutenção",
        description: "Monitoramento e limpeza periódica.",
      },
    ],
    process: [
      {
        title: "Diagnóstico",
        description: "Análise da conta de luz e do telhado.",
      },
      {
        title: "Projeto",
        description: "Dimensionamento e proposta comercial.",
      },
      {
        title: "Execução",
        description: "Instalação e homologação do sistema.",
      },
      { title: "Suporte", description: "Monitoramento e manutenção contínua." },
    ],
    gallery: ["Instalação 1", "Instalação 2", "Instalação 3", "Instalação 4"],
    testimonials: [
      {
        quote: "Minha conta de luz caiu mais de 90% depois da instalação.",
        author: "Cliente residencial",
      },
      {
        quote: "Processo todo muito transparente, do orçamento à homologação.",
        author: "Cliente comercial",
      },
    ],
  }),
  empresa("manutencao", "MáquinaTec Manutenção Industrial", {
    eyebrow: "Manutenção industrial",
    headline: "Sua produção sem paradas inesperadas",
    subheadline:
      "Manutenção preventiva, corretiva e preditiva para manter sua linha operando.",
    heroBullets: [
      "Equipe técnica especializada",
      "Atendimento emergencial",
      "Peças e insumos próprios",
      "Relatórios de manutenção",
    ],
    stats: [
      { value: "+95%", label: "de disponibilidade dos equipamentos" },
      { value: "+80", label: "plantas atendidas" },
      { value: "24h", label: "atendimento emergencial" },
    ],
    services: [
      {
        title: "Manutenção preventiva",
        description: "Cronograma reduzindo paradas.",
      },
      {
        title: "Manutenção corretiva",
        description: "Atendimento rápido a falhas.",
      },
      {
        title: "Manutenção preditiva",
        description: "Monitoramento de vibração e temperatura.",
      },
      {
        title: "Retrofit de máquinas",
        description: "Modernização de equipamentos antigos.",
      },
    ],
    process: [
      {
        title: "Diagnóstico",
        description: "Avaliação do estado dos equipamentos.",
      },
      { title: "Plano", description: "Cronograma de manutenção sob medida." },
      { title: "Execução", description: "Intervenção técnica em campo." },
      { title: "Suporte", description: "Acompanhamento contínuo e chamados." },
    ],
    gallery: ["Planta 1", "Planta 2", "Equipe 3", "Equipe 4"],
    testimonials: [
      {
        quote: "Reduzimos as paradas não programadas em poucos meses.",
        author: "Gerente de manutenção — Indústria parceira",
      },
      {
        quote: "Equipe técnica muito qualificada e ágil.",
        author: "Supervisor de produção",
      },
    ],
  }),
  empresa("industria", "Metalúrgica Prime", {
    eyebrow: "Indústria metalúrgica",
    headline: "Produção industrial com qualidade e escala",
    subheadline:
      "Fabricação sob medida com controle de qualidade em todas as etapas do processo.",
    heroBullets: [
      "Certificações de qualidade",
      "Capacidade de escala",
      "Controle de qualidade rígido",
      "Prazos de entrega confiáveis",
    ],
    stats: [
      { value: "+18", label: "anos de indústria" },
      { value: "+500", label: "clientes atendidos" },
      { value: "+50", label: "colaboradores" },
    ],
    services: [
      {
        title: "Fabricação sob medida",
        description: "Peças e estruturas personalizadas.",
      },
      {
        title: "Corte e dobra",
        description: "Processamento de chapas metálicas.",
      },
      {
        title: "Solda especializada",
        description: "Processos certificados de soldagem.",
      },
      {
        title: "Controle de qualidade",
        description: "Inspeção em todas as etapas.",
      },
    ],
    process: [
      {
        title: "Diagnóstico",
        description: "Análise técnica da demanda do cliente.",
      },
      { title: "Projeto", description: "Especificação e orçamento detalhado." },
      { title: "Execução", description: "Produção com controle de qualidade." },
      { title: "Suporte", description: "Pós-venda e assistência técnica." },
    ],
    gallery: ["Produção 1", "Produção 2", "Produto 3", "Produto 4"],
    testimonials: [
      {
        quote: "Qualidade consistente em todos os lotes entregues.",
        author: "Comprador — Indústria parceira",
      },
      {
        quote: "Prazo de entrega sempre cumprido rigorosamente.",
        author: "Gerente de compras",
      },
    ],
  }),
  empresa("software", "NovaCode Software", {
    eyebrow: "Desenvolvimento de software",
    headline: "Software sob medida para o seu negócio",
    subheadline:
      "Sistemas web, integrações e automações desenvolvidos com padrão de produção.",
    heroBullets: [
      "Equipe sênior",
      "Código documentado",
      "Entregas incrementais",
      "Suporte contínuo",
    ],
    stats: [
      { value: "+60", label: "sistemas entregues" },
      { value: "+9", label: "anos de mercado" },
      { value: "+99%", label: "uptime médio" },
    ],
    services: [
      {
        title: "Desenvolvimento web",
        description: "Sistemas sob medida e escaláveis.",
      },
      {
        title: "Integrações e APIs",
        description: "Conectando seus sistemas e parceiros.",
      },
      {
        title: "Automação de processos",
        description: "Redução de tarefas manuais.",
      },
      {
        title: "Consultoria técnica",
        description: "Arquitetura e boas práticas.",
      },
    ],
    process: [
      {
        title: "Diagnóstico",
        description: "Levantamento de requisitos do negócio.",
      },
      { title: "Projeto", description: "Arquitetura e planejamento técnico." },
      {
        title: "Execução",
        description: "Desenvolvimento em ciclos incrementais.",
      },
      { title: "Suporte", description: "Manutenção e evolução contínua." },
    ],
    gallery: ["Projeto 1", "Projeto 2", "Projeto 3", "Projeto 4"],
    testimonials: [
      {
        quote: "Sistema entregue dentro do prazo e sem retrabalho.",
        author: "CTO — Cliente parceiro",
      },
      {
        quote: "Comunicação técnica muito clara durante todo o projeto.",
        author: "Product Owner — Cliente",
      },
    ],
  }),
  empresa("consultoria", "Consultoria Axis", {
    eyebrow: "Consultoria empresarial",
    headline: "Decisões melhores, resultados mensuráveis",
    subheadline:
      "Diagnóstico, plano de ação e acompanhamento para destravar o crescimento da sua empresa.",
    heroBullets: [
      "Metodologia própria",
      "Times multidisciplinares",
      "Indicadores claros",
      "Acompanhamento contínuo",
    ],
    stats: [
      { value: "+80", label: "empresas atendidas" },
      { value: "+11", label: "anos de mercado" },
      { value: "+30%", label: "de ganho médio de eficiência" },
    ],
    services: [
      {
        title: "Diagnóstico empresarial",
        description: "Mapeamento de gargalos e oportunidades.",
      },
      {
        title: "Planejamento estratégico",
        description: "Definição de metas e indicadores.",
      },
      {
        title: "Gestão de processos",
        description: "Otimização de rotinas e custos.",
      },
      {
        title: "Acompanhamento de resultados",
        description: "Revisões periódicas de performance.",
      },
    ],
    process: [
      {
        title: "Diagnóstico",
        description: "Análise da operação e dos números.",
      },
      { title: "Plano", description: "Definição de prioridades e metas." },
      {
        title: "Execução",
        description: "Implementação junto ao time do cliente.",
      },
      { title: "Suporte", description: "Acompanhamento e ajustes de rota." },
    ],
    gallery: ["Projeto 1", "Projeto 2", "Projeto 3", "Projeto 4"],
    testimonials: [
      {
        quote: "Enxergamos gargalos que não víamos há anos.",
        author: "CEO — Empresa cliente",
      },
      {
        quote: "Acompanhamento próximo fez toda a diferença.",
        author: "Diretor financeiro — Empresa cliente",
      },
    ],
  }),

  profissional("advogado", "Dr. Marcos Vieira — Advocacia", {
    eyebrow: "Advogado(a)",
    headline: "Defesa técnica e atenção humana ao seu caso",
    subheadline:
      "Atuação em direito civil e trabalhista, com atendimento próximo do início ao fim do processo.",
    credential: "OAB/PR nº XXXXX",
    formacao: [
      {
        title: "Bacharel em Direito",
        detail: "Universidade Federal do Paraná, 2010",
      },
      { title: "Pós-graduação em Direito Civil", detail: "Instituição, 2013" },
      { title: "Membro da OAB-PR", detail: "Desde 2010" },
    ],
    stats: [
      { value: "+14", label: "anos de atuação" },
      { value: "+500", label: "casos atendidos" },
      { value: "Presencial/Online", label: "modalidade" },
    ],
    services: [
      {
        title: "Direito civil",
        description: "Contratos, indenizações e disputas.",
      },
      {
        title: "Direito trabalhista",
        description: "Defesa de empregados e empregadores.",
      },
      {
        title: "Direito de família",
        description: "Divórcio, pensão e guarda.",
      },
      {
        title: "Consultoria jurídica",
        description: "Orientação preventiva para pessoas e empresas.",
      },
    ],
    testimonials: [
      {
        quote: "Acompanhamento atencioso durante todo o processo.",
        author: "Cliente de direito civil",
      },
      {
        quote: "Explicou cada etapa com muita clareza.",
        author: "Cliente de direito trabalhista",
      },
    ],
  }),
  profissional("arquiteto", "Camila Souza Arquitetura", {
    eyebrow: "Arquiteta",
    headline: "Projetos que unem funcionalidade e identidade",
    subheadline:
      "Do projeto ao acompanhamento de obra, criando espaços sob medida para cada cliente.",
    credential: "CAU nº XXXXX",
    formacao: [
      {
        title: "Bacharel em Arquitetura e Urbanismo",
        detail: "Universidade, 2012",
      },
      {
        title: "Pós-graduação em Design de Interiores",
        detail: "Instituição, 2015",
      },
      { title: "Registro ativo no CAU/PR", detail: "Desde 2012" },
    ],
    stats: [
      { value: "+90", label: "projetos entregues" },
      { value: "+11", label: "anos de atuação" },
      { value: "Presencial/Online", label: "modalidade" },
    ],
    services: [
      {
        title: "Projeto residencial",
        description: "Casas e apartamentos sob medida.",
      },
      {
        title: "Projeto comercial",
        description: "Lojas, escritórios e clínicas.",
      },
      {
        title: "Design de interiores",
        description: "Ambientação e escolha de materiais.",
      },
      {
        title: "Acompanhamento de obra",
        description: "Fiscalização técnica do projeto.",
      },
    ],
    testimonials: [
      {
        quote: "Entendeu exatamente o que a gente queria pro apartamento.",
        author: "Cliente residencial",
      },
      {
        quote: "Acompanhamento de obra muito presente e cuidadoso.",
        author: "Cliente comercial",
      },
    ],
  }),
  profissional("contador", "Roberto Lima Contabilidade", {
    eyebrow: "Contador(a)",
    headline: "Sua contabilidade em dia, sem complicação",
    subheadline:
      "Gestão contábil, fiscal e tributária para autônomos e pequenas empresas.",
    credential: "CRC nº XXXXX",
    formacao: [
      { title: "Bacharel em Ciências Contábeis", detail: "Universidade, 2008" },
      {
        title: "Especialização em Direito Tributário",
        detail: "Instituição, 2011",
      },
      { title: "Registro ativo no CRC/PR", detail: "Desde 2008" },
    ],
    stats: [
      { value: "+16", label: "anos de atuação" },
      { value: "+200", label: "empresas atendidas" },
      { value: "Presencial/Online", label: "modalidade" },
    ],
    services: [
      {
        title: "Abertura de empresa",
        description: "Do CNPJ ao enquadramento tributário.",
      },
      {
        title: "Contabilidade mensal",
        description: "Folha, impostos e obrigações em dia.",
      },
      {
        title: "Planejamento tributário",
        description: "Redução legal da carga de impostos.",
      },
      {
        title: "Consultoria para autônomos",
        description: "Orientação sob medida para MEI e PJ.",
      },
    ],
    testimonials: [
      {
        quote: "Nunca mais me preocupei com prazo de imposto.",
        author: "Cliente MEI",
      },
      {
        quote: "Economia real depois do planejamento tributário.",
        author: "Cliente PJ",
      },
    ],
  }),
  profissional("nutricionista", "Fernanda Alves Nutrição", {
    eyebrow: "Nutricionista",
    headline: "Alimentação que cabe na sua rotina",
    subheadline:
      "Planos alimentares personalizados com acompanhamento próximo e resultado sustentável.",
    credential: "CRN nº XXXXX",
    formacao: [
      { title: "Bacharel em Nutrição", detail: "Universidade, 2015" },
      {
        title: "Especialização em Nutrição Esportiva",
        detail: "Instituição, 2018",
      },
      { title: "Registro ativo no CRN", detail: "Desde 2015" },
    ],
    stats: [
      { value: "+9", label: "anos de atuação" },
      { value: "+700", label: "pacientes atendidos" },
      { value: "Presencial/Online", label: "modalidade" },
    ],
    services: [
      {
        title: "Nutrição clínica",
        description: "Planos alimentares individualizados.",
      },
      {
        title: "Nutrição esportiva",
        description: "Performance e composição corporal.",
      },
      {
        title: "Reeducação alimentar",
        description: "Mudança de hábitos a longo prazo.",
      },
      {
        title: "Acompanhamento online",
        description: "Consultas e ajustes à distância.",
      },
    ],
    testimonials: [
      {
        quote: "Consegui mudar meus hábitos sem sofrer com dieta restritiva.",
        author: "Paciente de reeducação alimentar",
      },
      {
        quote: "Acompanhamento muito próximo, sempre tirando dúvidas.",
        author: "Paciente de nutrição esportiva",
      },
    ],
  }),
  profissional("consultor", "Paulo Henrique — Consultor", {
    eyebrow: "Consultor",
    headline: "Clareza para decidir, direção para crescer",
    subheadline:
      "Consultoria individual para donos de negócio que querem sair do operacional e crescer com estratégia.",
    credential: "Consultor certificado",
    formacao: [
      { title: "Bacharel em Administração", detail: "Universidade, 2009" },
      { title: "MBA em Gestão Empresarial", detail: "Instituição, 2014" },
      { title: "Certificação em consultoria de negócios", detail: "2016" },
    ],
    stats: [
      { value: "+13", label: "anos de atuação" },
      { value: "+120", label: "negócios atendidos" },
      { value: "Presencial/Online", label: "modalidade" },
    ],
    services: [
      {
        title: "Diagnóstico de negócio",
        description: "Raio-x da operação e das finanças.",
      },
      {
        title: "Plano de ação",
        description: "Prioridades claras para os próximos meses.",
      },
      {
        title: "Mentoria individual",
        description: "Acompanhamento contínuo de decisões.",
      },
      {
        title: "Gestão financeira",
        description: "Organização de custos e precificação.",
      },
    ],
    testimonials: [
      {
        quote: "Consegui organizar as finanças do negócio em poucos meses.",
        author: "Cliente — pequeno empresário",
      },
      {
        quote: "Mentoria mudou a forma como eu tomava decisões.",
        author: "Cliente — empreendedora",
      },
    ],
  }),
];

export default niches;

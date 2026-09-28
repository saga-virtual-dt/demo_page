import nodemailer from "nodemailer";

// ───────────────────────────────────────────────────────────
// POST /api/send-brief
// Recebe o briefing preenchido pelo cliente (mesmo formato do
// client.js do boilerplate) + os dados de contato dele, valida e
// sanitiza tudo no servidor, e envia por e-mail via SMTP.
//
// Variáveis de ambiente necessárias (configure no dashboard da
// Vercel, NUNCA no código-fonte):
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
//   MAIL_TO        (opcional — padrão: virtusaga447@gmail.com)
//   ALLOWED_ORIGIN (opcional, mas recomendado em produção —
//                   ex: https://seusite.vercel.app)
// ───────────────────────────────────────────────────────────

const DEFAULT_TO = "virtusaga447@gmail.com";

// Rate limit simples em memória (por instância da função).
// Suficiente para coibir abuso trivial; para um limite robusto e
// consistente entre instâncias, use um serviço externo como
// Upstash Redis (@upstash/ratelimit) em produção com alto tráfego.
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 min
const RATE_LIMIT_MAX = 5;
const hits = new Map();

// Tempo mínimo (ms) entre o carregamento do formulário e o envio.
// Bots costumam enviar quase instantaneamente.
const MIN_FILL_TIME_MS = 4000;

const MAX_LEN = {
  short: 160,
  medium: 400,
  long: 2000,
};

function getIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length > 0)
    return fwd.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (hits.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

// Remove quebras de linha e caracteres de controle (evita injeção
// de cabeçalhos SMTP) e corta o tamanho máximo.
function cleanText(value, maxLen = MAX_LEN.medium) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\r\n\x00-\x08\x0B\x0C\x0E-\x1F]/g, " ")
    .trim()
    .slice(0, maxLen);
}

function cleanMultiline(value, maxLen = MAX_LEN.long) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, " ")
    .trim()
    .slice(0, maxLen);
}

function isValidEmail(email) {
  return (
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= MAX_LEN.short
  );
}

function cleanArray(arr, maxItems, mapFn) {
  if (!Array.isArray(arr)) return [];
  return arr.slice(0, maxItems).map(mapFn).filter(Boolean);
}

function buildEmailBody(d) {
  const lines = [
    `Novo pedido de landing page via formulário`,
    ``,
    `── Contato do cliente ──`,
    `Nome: ${d.contactName}`,
    `Telefone: ${d.contactPhone}`,
    `E-mail: ${d.contactEmail}`,
    ``,
    `── SEO / Identidade ──`,
    `Nome da empresa: ${d.brandName}`,
    `Título SEO: ${d.seoTitle}`,
    `Descrição SEO: ${d.seoDescription}`,
    `URL do site: ${d.siteUrl}`,
    ``,
    `── Contato do negócio ──`,
    `WhatsApp: ${d.whatsapp}`,
    `Mensagem padrão do WhatsApp: ${d.whatsappMessage}`,
    `Instagram: ${d.instagramHandle} (${d.instagramUrl})`,
    `Telefone de exibição: ${d.phoneDisplay}`,
    ``,
    `── Endereço ──`,
    `${d.address.street}, ${d.address.city}/${d.address.state} - ${d.address.zip} - ${d.address.country}`,
    `Mapa: ${d.mapEmbedUrl}`,
    `Schema.org type: ${d.schemaType}`,
    ``,
    `── Cores ──`,
    `paper: ${d.colors.paper} | paper2: ${d.colors.paper2} | ink: ${d.colors.ink}`,
    `brand: ${d.colors.brand} | brandDark: ${d.colors.brandDark} | trust: ${d.colors.trust} | line: ${d.colors.line}`,
    ``,
    `── Hero ──`,
    `Eyebrow: ${d.eyebrow}`,
    `Headline: ${d.headline}`,
    `Subheadline: ${d.subheadline}`,
    `Diferenciais: ${d.heroBullets.join(" | ")}`,
    ``,
    `── Estatísticas ──`,
    ...d.stats.map((s) => `${s.value} — ${s.label}`),
    ``,
    `── Serviços ──`,
    ...d.services.map((s, i) => `${i + 1}. ${s.title}: ${s.description}`),
    ``,
    `── Depoimentos ──`,
    ...d.testimonials.map((t, i) => `${i + 1}. "${t.quote}" — ${t.author}`),
    ``,
    `── CTA final ──`,
    `Título: ${d.finalCtaTitle}`,
    `Subtítulo: ${d.finalCtaSubtitle}`,
  ];
  return lines.join("\n");
}

// Gera o texto do client.js já preenchido, pronto para colar em
// src/config/client.js. JSON.stringify escapa aspas/quebras de linha
// com segurança — o resultado é sempre JS válido, mesmo que o
// cliente digite aspas, barras invertidas etc. nos campos.
function buildClientConfigFile(d) {
  const s = (v) => JSON.stringify(v || "");
  const bulletsBlock = (d.heroBullets.length ? d.heroBullets : ["", "", "", ""])
    .map((b) => `    ${s(b)},`)
    .join("\n");
  const statsBlock = d.stats
    .map((st) => `    { value: ${s(st.value)}, label: ${s(st.label)} },`)
    .join("\n");
  const servicesBlock = d.services
    .map(
      (sv) =>
        `    { title: ${s(sv.title)}, description: ${s(sv.description)} },`,
    )
    .join("\n");
  const testimonialsBlock = d.testimonials
    .map((t) => `    { quote: ${s(t.quote)}, author: ${s(t.author)} },`)
    .join("\n");

  return `// Solicitado por: ${d.contactName} <${d.contactEmail}> — ${d.contactPhone}
// Gerado automaticamente pelo formulário /solicitar

const client = {
  // SEO / metadados
  brandName: ${s(d.brandName)},
  seoTitle: ${s(d.seoTitle)},
  seoDescription:
    ${s(d.seoDescription)},
  siteUrl: ${s(d.siteUrl)},

  // Contato
  whatsapp: ${s(d.whatsapp)}, // só números, com DDI+DDD
  whatsappMessage: ${s(d.whatsappMessage)},
  instagramHandle: ${s(d.instagramHandle)},
  instagramUrl: ${s(d.instagramUrl)},
  phoneDisplay: ${s(d.phoneDisplay)},

  // Endereço (usado no rodapé, seção de localização e Schema.org)
  address: {
    street: ${s(d.address.street)},
    city: ${s(d.address.city)},
    state: ${s(d.address.state)},
    zip: ${s(d.address.zip)},
    country: ${s(d.address.country)},
  },
  mapEmbedUrl:
    ${s(d.mapEmbedUrl)},

  // Schema.org (ajuste o @type: LocalBusiness, Dentist, Restaurant, Store, etc.)
  schemaType: ${s(d.schemaType)},

  // Paleta — cada landing pode ter uma identidade visual diferente
  colors: {
    paper: ${s(d.colors.paper)},
    paper2: ${s(d.colors.paper2)},
    ink: ${s(d.colors.ink)},
    brand: ${s(d.colors.brand)},
    brandDark: ${s(d.colors.brandDark)},
    trust: ${s(d.colors.trust)},
    line: ${s(d.colors.line)},
  },

  // Hero
  eyebrow: ${s(d.eyebrow)},
  headline: ${s(d.headline)},
  subheadline: ${s(d.subheadline)},
  heroBullets: [
${bulletsBlock}
  ],

  // Barra de confiança (estatísticas rápidas)
  stats: [
${statsBlock}
  ],

  // Serviços / produtos (grid)
  services: [
${servicesBlock}
  ],

  // Depoimentos
  testimonials: [
${testimonialsBlock}
  ],

  // CTA final
  finalCtaTitle: ${s(d.finalCtaTitle)},
  finalCtaSubtitle: ${s(d.finalCtaSubtitle)},

  navLinks: [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Como chegar', href: '#local' },
  ],
}

export default client
`;
}

export default async function handler(req, res) {
  // Restringe a origem em produção, se configurada.
  const allowedOrigin = process.env.ALLOWED_ORIGIN;
  if (allowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST")
    return res.status(405).json({ ok: false, error: "Método não permitido" });

  if (allowedOrigin) {
    const origin = req.headers.origin;
    if (origin && origin !== allowedOrigin) {
      return res.status(403).json({ ok: false, error: "Origem não permitida" });
    }
  }

  const ip = getIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({
      ok: false,
      error: "Muitas solicitações. Tente novamente mais tarde.",
    });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: "JSON inválido" });
    }
  }
  if (!body || typeof body !== "object") {
    return res
      .status(400)
      .json({ ok: false, error: "Corpo da requisição inválido" });
  }

  // Honeypot: campo escondido que só um bot preencheria.
  if (cleanText(body.website, 200) !== "") {
    // Responde como sucesso para não revelar a lógica antispam ao bot.
    return res.status(200).json({ ok: true });
  }

  // Verifica tempo mínimo de preenchimento.
  const startedAt = Number(body.startedAt);
  if (
    !Number.isFinite(startedAt) ||
    Date.now() - startedAt < MIN_FILL_TIME_MS
  ) {
    return res
      .status(400)
      .json({ ok: false, error: "Envio muito rápido, tente novamente." });
  }

  // Sanitização e validação dos campos obrigatórios.
  const contactName = cleanText(body.contactName, MAX_LEN.short);
  const contactPhone = cleanText(body.contactPhone, 40);
  const contactEmail = cleanText(body.contactEmail, MAX_LEN.short);
  const brandName = cleanText(body.brandName, MAX_LEN.short);
  const headline = cleanText(body.headline, MAX_LEN.medium);

  if (!contactName || !isValidEmail(contactEmail) || !brandName || !headline) {
    return res.status(400).json({
      ok: false,
      error: "Preencha ao menos nome, e-mail, nome da empresa e headline.",
    });
  }

  const addr = body.address || {};
  const colors = body.colors || {};

  const data = {
    contactName,
    contactPhone,
    contactEmail,
    brandName,
    seoTitle: cleanText(body.seoTitle, MAX_LEN.medium),
    seoDescription: cleanText(body.seoDescription, MAX_LEN.medium),
    siteUrl: cleanText(body.siteUrl, MAX_LEN.short),
    whatsapp: cleanText(body.whatsapp, 40),
    whatsappMessage: cleanText(body.whatsappMessage, MAX_LEN.medium),
    instagramHandle: cleanText(body.instagramHandle, MAX_LEN.short),
    instagramUrl: cleanText(body.instagramUrl, MAX_LEN.short),
    phoneDisplay: cleanText(body.phoneDisplay, 40),
    address: {
      street: cleanText(addr.street, MAX_LEN.medium),
      city: cleanText(addr.city, MAX_LEN.short),
      state: cleanText(addr.state, 10),
      zip: cleanText(addr.zip, 20),
      country: cleanText(addr.country, 10) || "BR",
    },
    mapEmbedUrl: cleanText(body.mapEmbedUrl, MAX_LEN.medium),
    schemaType: cleanText(body.schemaType, MAX_LEN.short) || "LocalBusiness",
    colors: {
      paper: cleanText(colors.paper, 20),
      paper2: cleanText(colors.paper2, 20),
      ink: cleanText(colors.ink, 20),
      brand: cleanText(colors.brand, 20),
      brandDark: cleanText(colors.brandDark, 20),
      trust: cleanText(colors.trust, 20),
      line: cleanText(colors.line, 20),
    },
    eyebrow: cleanText(body.eyebrow, MAX_LEN.medium),
    headline,
    subheadline: cleanText(body.subheadline, MAX_LEN.medium),
    heroBullets: cleanArray(body.heroBullets, 6, (b) =>
      cleanText(b, MAX_LEN.short),
    ),
    stats: cleanArray(body.stats, 6, (s) => ({
      value: cleanText(s?.value, 40),
      label: cleanText(s?.label, MAX_LEN.short),
    })),
    services: cleanArray(body.services, 12, (s) => ({
      title: cleanText(s?.title, MAX_LEN.short),
      description: cleanMultiline(s?.description, MAX_LEN.medium),
    })),
    testimonials: cleanArray(body.testimonials, 8, (t) => ({
      quote: cleanMultiline(t?.quote, MAX_LEN.long),
      author: cleanText(t?.author, MAX_LEN.short),
    })),
    finalCtaTitle: cleanText(body.finalCtaTitle, MAX_LEN.medium),
    finalCtaSubtitle: cleanText(body.finalCtaSubtitle, MAX_LEN.medium),
  };

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error(
      "SMTP não configurado — defina SMTP_HOST/PORT/USER/PASS nas variáveis de ambiente da Vercel.",
    );
    return res.status(500).json({
      ok: false,
      error: "Envio de e-mail não configurado no servidor.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO || DEFAULT_TO,
      replyTo: contactEmail,
      subject: cleanText(
        `Novo briefing de landing page — ${brandName}`,
        MAX_LEN.short,
      ),
      text: buildEmailBody(data),
      attachments: [
        {
          filename: `client-${
            data.brandName
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .slice(0, 40) || "briefing"
          }.txt`,
          content: buildClientConfigFile(data),
          contentType: "text/plain; charset=utf-8",
        },
      ],
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Falha ao enviar e-mail:", err);
    return res.status(502).json({
      ok: false,
      error: "Não foi possível enviar o e-mail agora. Tente novamente.",
    });
  }
}

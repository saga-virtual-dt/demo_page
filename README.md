# Landing Demo Site

Site de demonstração com uma landing page por nicho, em rotas do tipo
`seusite.vercel.app/barbearia`, cobrindo os 3 templates (Serviços, Empresa,
Profissional) e 17 nichos.

## Rodando localmente

```bash
npm install
npm run dev
```

## Rotas disponíveis

- `/` — página inicial com links para todas as demonstrações
- `/precos` — tabela de preços
- Template 1 (Serviços): `/salao` `/estetica` `/barbearia` `/clinica` `/fotografo` `/autonomo`
- Template 2 (Empresa): `/engenharia` `/energia-solar` `/manutencao` `/industria` `/software` `/consultoria`
- Template 3 (Profissional): `/advogado` `/arquiteto` `/contador` `/nutricionista` `/consultor`

## Formulário de briefing (`/solicitar`)

O botão **"Quero uma página como esta"**, na faixa de demonstração, leva ao
formulário `/solicitar`, que reproduz os campos do `client.js` do
boilerplate (SEO, contato, endereço, cores, hero, estatísticas, serviços,
depoimentos, CTA final) + os dados de quem está pedindo (nome, telefone,
e-mail). Ao enviar, os dados vão para a função serverless
`api/send-brief.js`, que valida, sanitiza e envia por e-mail via SMTP.

### Configurar o envio de e-mail

1. Copie `.env.example` e defina as variáveis reais **no dashboard da
   Vercel** (Project Settings → Environment Variables) — nunca num arquivo
   commitado:
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — credenciais do
     servidor de e-mail (Gmail com "senha de app", ou um serviço
     transacional como Resend/SendGrid/Mailgun, recomendado em produção).
   - `MAIL_TO` — para quem o briefing é enviado (padrão:
     `virtusaga447@gmail.com`, se não definido).
   - `ALLOWED_ORIGIN` — defina com a URL do seu domínio publicado depois
     do primeiro deploy, para travar a API contra chamadas de outros sites.
2. Rode `vercel env pull` localmente se quiser testar o envio em
   desenvolvimento (`npm run dev` roda só o front — a função `/api` só
   funciona rodando com `vercel dev` ou já publicada).

### Proteções implementadas em `api/send-brief.js`

- **Validação e sanitização no servidor**: todo campo é tratado como
  string, tem tamanho máximo e caracteres de controle/quebras de linha
  removidos antes de compor o e-mail (evita injeção de cabeçalho SMTP).
- **Honeypot**: campo invisível (`website`) que só um bot preencheria —
  se vier preenchido, a submissão é descartada silenciosamente.
- **Checagem de tempo mínimo**: rejeita envios feitos em menos de 4s desde
  o carregamento do formulário (comportamento típico de bot).
- **Rate limit por IP**: no máx. 5 envios a cada 15 min por IP (em memória
  da função — para tráfego alto/multi-região, troque por um serviço como
  Upstash Redis, que persiste entre instâncias).
- **CORS/origem travados**: se `ALLOWED_ORIGIN` estiver definida, só aceita
  requisições feitas a partir do seu próprio domínio.
- **Sem banco de dados**: não há SQL nem qualquer storage persistente
  nesta função, então não existe superfície para SQL injection — os dados
  só passam pela validação e viram texto puro no corpo do e-mail (nunca
  HTML), o que também evita injeção de script no e-mail recebido.
- **Segredos fora do código**: credenciais de e-mail só existem como
  variável de ambiente na Vercel, nunca no repositório.

Para endurecer ainda mais (tráfego alto/produção): adicionar reCAPTCHA v3
ou hCaptcha no formulário, e mover o rate limit para Upstash Redis.

## O que editar

- **`src/config/site.js`** — WhatsApp do botão "Quero uma página como esta"
  (que aparece na faixa preta no topo de toda demonstração) e a tabela de
  preços (pacote essencial + adicionais).
- **`src/config/niches.js`** — um objeto por rota: nome do cliente fictício
  (aparece na faixa de demonstração), textos, serviços, depoimentos e cores
  de cada nicho.
- **`src/components/TemplateFloaters.jsx`** — botões flutuantes de
  WhatsApp/Instagram/LinkedIn *do template em si* (ilustrativos na
  demonstração). Quando um template virar o site real de um cliente, troque
  os `href="#"` pelo contato de fato do cliente.

Não é necessário mexer nos componentes de `LandingTemplate.jsx` para
adicionar um novo nicho — basta adicionar uma entrada em `niches.js` e uma
rota em `App.jsx` seguirá funcionando automaticamente via `/:slug`.

## Deploy na Vercel

```bash
npm install -g vercel
vercel
```

Ou conecte o repositório no dashboard da Vercel. O `vercel.json` já
configura o build (Vite) e o rewrite necessário para as rotas do
React Router funcionarem em `seusite.vercel.app/qualquer-rota`.

## Stack

- React 18 + React Router 6
- Tailwind CSS 3.4
- Vite 5

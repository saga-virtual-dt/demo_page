import TemplateFloaters from "./TemplateFloaters";

// ─── Caminhos das imagens da seção "serviços" ───────────────────────────────
const IMG_ESQUERDA = "/img/destaque.png"; // ← IMG 1 (ex.: "/img/consultorio.jpg")
const IMG_DENTE = "/img/dente.png"; // ← IMG 2, dente decorativo (ex.: "/img/dente.png")

// ─── Diferenciais (ícones Material Symbols) ─────────────────────────────────
const diferenciais = [
  {
    icon: "dentistry",
    title: "Equipamentos modernos",
    text: "Mais precisão, conforto e segurança nos tratamentos.",
  },
  {
    icon: "verified_user",
    title: "Ambiente seguro",
    text: "Tudo pensado para a sua saúde e bem-estar.",
  },
  {
    icon: "stethoscope",
    title: "Equipe especializada",
    text: "Profissionais qualificados e em constante atualização.",
  },
  {
    icon: "favorite",
    title: "Atendimento humanizado",
    text: "Aqui, você é sempre bem-vindo.",
  },
];

const MIcon = ({ name }) => (
  <span
    className="material-symbols-outlined"
    style={{
      fontSize: "clamp(26px, 3vw, 30px)",
      fontVariationSettings: "'wght' 300",
    }}
    aria-hidden="true"
  >
    {name}
  </span>
);

const Check = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="mt-0.5 h-4 w-4 flex-shrink-0"
    style={{ color: "var(--trust)" }}
  >
    <path d="M5 13l4 4L19 7" />
  </svg>
);

export default function LandingTemplate({ data }) {
  const c = data.colors;
  const isEmpresa = data.variant === "empresa";
  const isProfissional = data.variant === "profissional";
  const isServicos = data.variant === "servicos";
  const ctaColor = c.cta || c.accent;
  const ctaDark = c.ctaDark || c.accentDark;

  const vars = {
    "--paper": c.paper,
    "--paper2": c.paper2,
    "--ink": c.ink,
    "--accent": c.accent,
    "--accent-dark": c.accentDark,
    "--trust": c.trust,
    "--line": c.line,
    "--cta": ctaColor,
    "--cta-dark": ctaDark,
  };
  const heading = { fontFamily: c.font };

  const whatsappHref = `https://wa.me/55SEUNUMERO?text=${encodeURIComponent("Olá! Quero agendar/solicitar um orçamento.")}`;

  return (
    <div
      style={vars}
      className="bg-[var(--paper)] text-[var(--ink)] font-['Inter',sans-serif]"
    >
      {/* header */}
      <header className="sticky top-[42px] z-20 border-b border-[var(--line)] bg-[var(--paper)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div style={heading} className="text-lg">
            {data.clientName}
          </div>
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#servicos">
              {isProfissional ? "Áreas de atuação" : "Serviços"}
            </a>
            {isEmpresa && <a href="#processo">Como trabalhamos</a>}
            <a href="#depoimentos">Depoimentos</a>
            <a href="#contato">Contato</a>
          </nav>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded px-4 py-2 text-sm font-semibold text-white bg-[var(--cta)] hover:bg-[var(--cta-dark)]"
          >
            {isProfissional
              ? "Agendar consulta"
              : isEmpresa
                ? "Solicitar orçamento"
                : "Agendar horário"}
          </a>
        </div>
      </header>

      <main>
        {/* hero */}
        <section className="border-b border-[var(--line)] px-6 py-16">
          <div
            className={`mx-auto max-w-5xl items-center gap-12 md:grid ${isProfissional ? "md:grid-cols-[0.85fr_1.15fr]" : "md:grid-cols-[1.1fr_0.9fr]"}`}
          >
            {isProfissional && (
              <div
                className="mb-8 flex aspect-[4/5] items-center justify-center border border-[var(--line)] bg-[var(--paper2)] p-6 text-center text-sm md:order-1 md:mb-0"
                style={{ color: "var(--accent)" }}
              >
                Foto do profissional
              </div>
            )}
            <div className={isProfissional ? "md:order-0" : ""}>
              <p
                className="mb-3 text-sm font-semibold"
                style={{ color: "var(--trust)" }}
              >
                {data.eyebrow}
              </p>
              <h1
                style={heading}
                className="max-w-[15ch] text-4xl leading-tight md:text-5xl"
              >
                {data.headline}
              </h1>
              {isProfissional && (
                <span
                  className="mt-3 inline-block rounded border px-2.5 py-1 text-xs font-semibold"
                  style={{
                    color: "var(--accent)",
                    borderColor: "var(--accent)",
                  }}
                >
                  {data.credential}
                </span>
              )}
              <p className="mt-4 max-w-md text-lg opacity-80">
                {data.subheadline}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded px-6 py-3.5 font-semibold text-white bg-[var(--cta)] hover:bg-[var(--cta-dark)]"
                >
                  Falar no WhatsApp agora
                </a>
                <a
                  href="#servicos"
                  className="rounded border border-[var(--ink)] px-6 py-3.5 font-semibold"
                >
                  {isEmpresa ? "Ver projetos entregues" : "Ver serviços"}
                </a>
              </div>
            </div>
            {!isProfissional && (
              <div className="border border-[var(--line)] bg-[var(--paper2)] p-7">
                <h3 className="mb-3.5 font-semibold">
                  Por que escolher {data.clientName}
                </h3>
                <ul className="grid gap-2.5 text-sm">
                  {data.heroBullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* trust bar */}
        <div className="border-b border-[var(--line)] px-6 py-5">
          <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-4 text-center">
            {data.stats.map((s) => (
              <div key={s.label}>
                <b style={heading} className="block text-2xl">
                  {s.value}
                </b>
                <span className="text-sm opacity-70">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* sobre (só profissional) */}
        {isProfissional && (
          <section id="sobre" className="px-6 py-16">
            <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h2 style={heading} className="mb-5 text-3xl">
                  Sobre {data.clientName}
                </h2>
                <p className="opacity-85">{data.subheadline}</p>
              </div>
              <ul className="grid gap-3">
                {data.formacao.map((f) => (
                  <li
                    key={f.title}
                    className="border-l-2 pl-3.5 text-sm"
                    style={{ borderColor: "var(--accent)" }}
                  >
                    <b className="block">{f.title}</b>
                    {f.detail}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* serviços */}
        <section id="servicos" className="bg-[var(--paper2)]">
          {/* container alinhado com o restante da página */}
          <div className="relative mx-auto max-w-5xl overflow-hidden">
            {/* IMG 2 — dente decorativo (só em telas grandes) */}
            {IMG_DENTE ? (
              <img
                src={IMG_DENTE}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 top-8 hidden h-[85%] w-auto max-w-[28%] object-contain opacity-40 lg:block"
              />
            ) : null}

            {/* mobile: 1 coluna | md: 2 colunas | lg: 3 colunas (layout do print) */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[32%_28%_40%]">
              {/* IMG 1 — esquerda (no md ocupa as duas linhas da coluna esquerda) */}
              <div className="aspect-[4/3] md:row-span-2 md:aspect-auto md:min-h-[420px] lg:row-span-1">
                {IMG_ESQUERDA ? (
                  <img
                    src={IMG_ESQUERDA}
                    alt="Nosso consultório"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center border border-dashed border-[var(--line)] text-sm opacity-50">
                    IMG 1
                  </div>
                )}
              </div>

              {/* TEXTO — centro */}
              <div className="flex flex-col justify-center px-6 pt-10 pb-2 md:px-10 md:pt-12 lg:px-8 lg:py-10">
                <h2
                  style={heading}
                  className="text-3xl leading-tight md:text-4xl lg:text-3xl"
                >
                  Tecnologia e cuidado em cada sorriso.
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed opacity-80 md:mt-6">
                  Contamos com estrutura moderna e profissionais experientes
                  para oferecer um atendimento seguro, confortável e de alta
                  qualidade.
                </p>
              </div>

              {/* ÍCONES — grade 2x2 em todos os tamanhos */}
              <div className="grid grid-cols-2 content-center gap-x-4 gap-y-8 px-6 py-10 md:px-10 md:pb-12 lg:gap-x-6 lg:px-8 lg:py-10">
                {diferenciais.map((d) => (
                  <div key={d.title} className="min-w-0">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-black/5 md:mb-4 md:h-16 md:w-16">
                      <MIcon name={d.icon} />
                    </div>
                    <h3 className="text-sm font-semibold sm:text-base">
                      {d.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed opacity-70 sm:text-sm">
                      {d.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* metodologia (só empresa) */}
        {isEmpresa && (
          <section id="processo" className="bg-[var(--paper2)] px-6 py-16">
            <div className="mx-auto max-w-5xl">
              <h2 style={heading} className="mb-10 text-3xl">
                Como conduzimos cada projeto
              </h2>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {data.process.map((p, i) => (
                  <div
                    key={p.title}
                    className="border-t-2 pt-3.5"
                    style={{ borderColor: "var(--accent)" }}
                  >
                    <div
                      className="text-sm font-bold"
                      style={{ color: "var(--accent)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-1.5 font-semibold">{p.title}</h3>
                    <p className="mt-1.5 text-sm opacity-70">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* galeria/projetos (servicos e empresa) */}
        {!isProfissional && (
          <section
            id="galeria"
            className={
              isEmpresa ? "px-6 py-16" : "bg-[var(--paper2)] px-6 py-16"
            }
          >
            <div className="mx-auto max-w-5xl">
              <h2 style={heading} className="mb-10 text-3xl">
                {isEmpresa ? "Projetos entregues" : "Nosso trabalho"}
              </h2>
              <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
                {data.gallery.map((g, index) => {
                  const isImage =
                    typeof g === "string" &&
                    (g.startsWith("/") ||
                      g.startsWith("http") ||
                      /\.(png|jpe?g|webp|svg)$/i.test(g));

                  return (
                    <div
                      key={index}
                      className="flex aspect-[4/3] items-center justify-center overflow-hidden border border-dashed border-[var(--line)] bg-[var(--paper)] text-center text-xs"
                      style={{ color: "var(--accent)" }}
                    >
                      {isImage ? (
                        <img
                          src={g}
                          alt={`Trabalho ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="p-2">{g}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* depoimentos */}
        <section
          id="depoimentos"
          className={
            isProfissional
              ? "px-6 py-16"
              : isEmpresa
                ? "bg-[var(--paper2)] px-6 py-16"
                : "px-6 py-16"
          }
        >
          <div className="mx-auto max-w-5xl">
            <h2 style={heading} className="mb-10 text-3xl">
              O que dizem os clientes
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.testimonials.map((t) => (
                <div
                  key={t.author}
                  className="border border-[var(--line)] bg-[var(--paper)] p-6"
                >
                  <p className={`opacity-85 ${isProfissional ? "italic" : ""}`}>
                    {t.quote}
                  </p>
                  <div
                    className="mt-4 text-sm font-semibold"
                    style={{ color: "var(--trust)" }}
                  >
                    {t.author}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* contato */}
        <section
          id="contato"
          className={
            isProfissional ? "bg-[var(--paper2)] px-6 py-16" : "px-6 py-16"
          }
        >
          <div className="mx-auto max-w-5xl">
            <h2 style={heading} className="mb-10 text-3xl">
              {isProfissional
                ? "Agende uma conversa"
                : isEmpresa
                  ? "Fale com um especialista"
                  : "Fácil de chegar, fácil de agendar"}
            </h2>
            <div className="grid gap-10 md:grid-cols-2">
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 text-sm">
                <dt className="font-semibold" style={{ color: "var(--trust)" }}>
                  Endereço
                </dt>
                <dd>[Rua, número, bairro — Cidade, UF, CEP]</dd>
                <dt className="font-semibold" style={{ color: "var(--trust)" }}>
                  WhatsApp
                </dt>
                <dd>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    [(DDD) 9XXXX-XXXX]
                  </a>
                </dd>
                <dt className="font-semibold" style={{ color: "var(--trust)" }}>
                  {data.secondaryType === "instagram"
                    ? "Instagram"
                    : "LinkedIn"}
                </dt>
                <dd>[@ ou /perfil]</dd>
              </dl>
              <div className="aspect-[4/3] border border-[var(--line)] bg-[var(--paper2)] overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.610271852134!2d-46.640280722869335!3d-23.546515811050387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5968aaa1ad71%3A0xd92b6ce64c7cb535!2sPrefeitura%20Municipal%20de%20S%C3%A3o%20Paulo!5e0!3m2!1spt-PT!2sbr!4v1790211565795!5m2!1spt-PT!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização"
                />
              </div>
            </div>
          </div>
        </section>

        {/* cta final */}
        <section
          className="px-6 py-16 text-center text-white"
          style={{ backgroundColor: isEmpresa ? c.ink : ctaColor }}
        >
          <h2
            style={heading}
            className="mx-auto max-w-[20ch] text-3xl text-white md:text-4xl"
          >
            {isProfissional
              ? "Dê o próximo passo com quem entende do assunto"
              : isEmpresa
                ? "Pronto para o próximo projeto?"
                : "Seu atendimento não precisa esperar mais um dia"}
          </h2>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded px-6 py-3.5 font-semibold"
            style={{ backgroundColor: "white", color: ctaDark }}
          >
            Falar pelo WhatsApp
          </a>
        </section>
      </main>

      <footer className="border-t border-[var(--line)] px-6 py-10 text-center text-sm opacity-65">
        {data.clientName} — landing page de demonstração
      </footer>

      <TemplateFloaters secondaryType={data.secondaryType} />
    </div>
  );
}

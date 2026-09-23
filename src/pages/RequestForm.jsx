import { useEffect, useRef, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import site from '../config/site'

const emptyClient = {
  brandName: '',
  seoTitle: '',
  seoDescription: '',
  siteUrl: '',
  whatsapp: '',
  whatsappMessage: 'Olá! Quero agendar uma consulta.',
  instagramHandle: '',
  instagramUrl: '',
  phoneDisplay: '',
  address: { street: '', city: '', state: '', zip: '', country: 'BR' },
  mapEmbedUrl: '',
  schemaType: 'LocalBusiness',
  colors: { paper: '#faf6ef', paper2: '#f3ecdf', ink: '#2b2318', brand: '#a9744a', brandDark: '#7c5333', trust: '#4b6b58', line: '#e4d9c6' },
  eyebrow: '',
  headline: '',
  subheadline: '',
  heroBullets: ['', '', '', ''],
  stats: [{ value: '', label: '' }, { value: '', label: '' }, { value: '', label: '' }],
  services: [{ title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }],
  testimonials: [{ quote: '', author: '' }, { quote: '', author: '' }],
  finalCtaTitle: '',
  finalCtaSubtitle: '',
}

function Field({ label, ...props }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-neutral-700">{label}</span>
      <input
        {...props}
        className="rounded border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
      />
    </label>
  )
}

function TextAreaField({ label, ...props }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-neutral-700">{label}</span>
      <textarea
        {...props}
        rows={props.rows || 2}
        className="rounded border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
      />
    </label>
  )
}

function Section({ title, children }) {
  return (
    <div className="border-t border-neutral-200 pt-8 first:border-0 first:pt-0">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <div className="grid gap-4">{children}</div>
    </div>
  )
}

export default function RequestForm() {
  const [params] = useSearchParams()
  const startedAt = useRef(Date.now())
  const [status, setStatus] = useState('idle') // idle | sending | ok | error
  const [errorMsg, setErrorMsg] = useState('')
  const [contact, setContact] = useState({ contactName: '', contactPhone: '', contactEmail: '' })
  const [website, setWebsite] = useState('') // honeypot
  const [client, setClient] = useState({
    ...emptyClient,
    brandName: params.get('cliente') || '',
  })

  useEffect(() => {
    document.title = 'Solicitar landing page'
  }, [])

  const set = (key, value) => setClient((c) => ({ ...c, [key]: value }))
  const setNested = (key, subkey, value) => setClient((c) => ({ ...c, [key]: { ...c[key], [subkey]: value } }))
  const setListItem = (key, index, value) =>
    setClient((c) => {
      const list = [...c[key]]
      list[index] = value
      return { ...c, [key]: list }
    })
  const setListObjItem = (key, index, subkey, value) =>
    setClient((c) => {
      const list = c[key].map((item, i) => (i === index ? { ...item, [subkey]: value } : item))
      return { ...c, [key]: list }
    })
  const addListItem = (key, item) => setClient((c) => ({ ...c, [key]: [...c[key], item] }))
  const removeListItem = (key, index) => setClient((c) => ({ ...c, [key]: c[key].filter((_, i) => i !== index) }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/send-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contact,
          ...client,
          website, // honeypot
          startedAt: startedAt.current,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Falha ao enviar')
      setStatus('ok')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  if (status === 'ok') {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">Recebemos seu briefing! 🎉</h1>
        <p className="mt-3 text-neutral-600">
          Vamos analisar as informações e retornar em breve pelo e-mail ou telefone informado.
        </p>
        <Link to="/" className="mt-6 inline-block underline">← Voltar</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-14 text-neutral-900">
      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl rounded border border-neutral-200 bg-white p-8">
        <Link to="/" className="text-sm text-neutral-500 hover:underline">← Voltar</Link>
        <h1 className="mt-4 text-2xl font-bold">Solicitar minha landing page</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Preencha os dados abaixo — quanto mais completo, mais rápido montamos sua página.
          Prefere falar direto?{' '}
          <a
            className="underline"
            href={`https://wa.me/${site.ctaWhatsapp}?text=${encodeURIComponent('Olá! Quero pedir uma landing page.')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Chame no WhatsApp
          </a>.
        </p>

        <div className="mt-8 grid gap-8">
          <Section title="Seus dados">
            <Field label="Seu nome *" required value={contact.contactName} onChange={(e) => setContact((c) => ({ ...c, contactName: e.target.value }))} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Telefone" value={contact.contactPhone} onChange={(e) => setContact((c) => ({ ...c, contactPhone: e.target.value }))} />
              <Field label="E-mail *" type="email" required value={contact.contactEmail} onChange={(e) => setContact((c) => ({ ...c, contactEmail: e.target.value }))} />
            </div>
          </Section>

          {/* Honeypot — invisível para pessoas, bots costumam preencher */}
          <div className="hidden" aria-hidden="true">
            <label>
              Não preencha este campo
              <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </label>
          </div>

          <Section title="Identidade e SEO">
            <Field label="Nome da empresa *" required value={client.brandName} onChange={(e) => set('brandName', e.target.value)} />
            <Field label="Título SEO" value={client.seoTitle} onChange={(e) => set('seoTitle', e.target.value)} />
            <TextAreaField label="Descrição SEO (até 160 caracteres)" maxLength={160} value={client.seoDescription} onChange={(e) => set('seoDescription', e.target.value)} />
            <Field label="URL do site" value={client.siteUrl} onChange={(e) => set('siteUrl', e.target.value)} />
          </Section>

          <Section title="Contato do negócio">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="WhatsApp (DDI+DDD+número)" value={client.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} />
              <Field label="Telefone de exibição" value={client.phoneDisplay} onChange={(e) => set('phoneDisplay', e.target.value)} />
            </div>
            <Field label="Mensagem padrão do botão WhatsApp" value={client.whatsappMessage} onChange={(e) => set('whatsappMessage', e.target.value)} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="@ do Instagram" value={client.instagramHandle} onChange={(e) => set('instagramHandle', e.target.value)} />
              <Field label="URL do Instagram" value={client.instagramUrl} onChange={(e) => set('instagramUrl', e.target.value)} />
            </div>
          </Section>

          <Section title="Endereço">
            <Field label="Rua e número" value={client.address.street} onChange={(e) => setNested('address', 'street', e.target.value)} />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Cidade" value={client.address.city} onChange={(e) => setNested('address', 'city', e.target.value)} />
              <Field label="UF" value={client.address.state} onChange={(e) => setNested('address', 'state', e.target.value)} />
              <Field label="CEP" value={client.address.zip} onChange={(e) => setNested('address', 'zip', e.target.value)} />
            </div>
            <Field label="Link do Google Maps (embed)" value={client.mapEmbedUrl} onChange={(e) => set('mapEmbedUrl', e.target.value)} />
          </Section>

          <Section title="Paleta de cores">
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-7">
              {Object.entries(client.colors).map(([key, value]) => (
                <label key={key} className="grid gap-1 text-center text-xs">
                  <span className="text-neutral-600">{key}</span>
                  <input type="color" value={value} onChange={(e) => setNested('colors', key, e.target.value)} className="h-9 w-full cursor-pointer rounded" />
                </label>
              ))}
            </div>
          </Section>

          <Section title="Hero">
            <Field label="Eyebrow (categoria/segmento)" value={client.eyebrow} onChange={(e) => set('eyebrow', e.target.value)} />
            <Field label="Título principal (headline) *" required value={client.headline} onChange={(e) => set('headline', e.target.value)} />
            <TextAreaField label="Frase de apoio (subheadline)" value={client.subheadline} onChange={(e) => set('subheadline', e.target.value)} />
            <div className="grid gap-2">
              <span className="text-sm font-medium text-neutral-700">Diferenciais</span>
              {client.heroBullets.map((b, i) => (
                <input key={i} value={b} placeholder={`Diferencial ${i + 1}`} onChange={(e) => setListItem('heroBullets', i, e.target.value)} className="rounded border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500" />
              ))}
            </div>
          </Section>

          <Section title="Estatísticas (barra de confiança)">
            {client.stats.map((s, i) => (
              <div key={i} className="grid grid-cols-2 gap-3">
                <input placeholder="Valor (ex: +470)" value={s.value} onChange={(e) => setListObjItem('stats', i, 'value', e.target.value)} className="rounded border border-neutral-300 px-3 py-2 text-sm" />
                <input placeholder="Legenda (ex: clientes atendidos)" value={s.label} onChange={(e) => setListObjItem('stats', i, 'label', e.target.value)} className="rounded border border-neutral-300 px-3 py-2 text-sm" />
              </div>
            ))}
          </Section>

          <Section title="Serviços">
            {client.services.map((s, i) => (
              <div key={i} className="grid gap-2 rounded border border-neutral-200 p-3">
                <input placeholder="Nome do serviço" value={s.title} onChange={(e) => setListObjItem('services', i, 'title', e.target.value)} className="rounded border border-neutral-300 px-3 py-2 text-sm" />
                <textarea rows={2} placeholder="Descrição curta" value={s.description} onChange={(e) => setListObjItem('services', i, 'description', e.target.value)} className="rounded border border-neutral-300 px-3 py-2 text-sm" />
                {client.services.length > 1 && (
                  <button type="button" onClick={() => removeListItem('services', i)} className="justify-self-start text-xs text-red-600 underline">Remover</button>
                )}
              </div>
            ))}
            {client.services.length < 12 && (
              <button type="button" onClick={() => addListItem('services', { title: '', description: '' })} className="justify-self-start text-sm underline">
                + Adicionar serviço
              </button>
            )}
          </Section>

          <Section title="Depoimentos">
            {client.testimonials.map((t, i) => (
              <div key={i} className="grid gap-2 rounded border border-neutral-200 p-3">
                <textarea rows={2} placeholder="Depoimento" value={t.quote} onChange={(e) => setListObjItem('testimonials', i, 'quote', e.target.value)} className="rounded border border-neutral-300 px-3 py-2 text-sm" />
                <input placeholder="Nome ou identificação" value={t.author} onChange={(e) => setListObjItem('testimonials', i, 'author', e.target.value)} className="rounded border border-neutral-300 px-3 py-2 text-sm" />
                {client.testimonials.length > 1 && (
                  <button type="button" onClick={() => removeListItem('testimonials', i)} className="justify-self-start text-xs text-red-600 underline">Remover</button>
                )}
              </div>
            ))}
            {client.testimonials.length < 8 && (
              <button type="button" onClick={() => addListItem('testimonials', { quote: '', author: '' })} className="justify-self-start text-sm underline">
                + Adicionar depoimento
              </button>
            )}
          </Section>

          <Section title="Chamada final (CTA)">
            <Field label="Título da chamada final" value={client.finalCtaTitle} onChange={(e) => set('finalCtaTitle', e.target.value)} />
            <TextAreaField label="Subtítulo" value={client.finalCtaSubtitle} onChange={(e) => set('finalCtaSubtitle', e.target.value)} />
          </Section>
        </div>

        {status === 'error' && (
          <p className="mt-6 rounded bg-red-50 px-4 py-3 text-sm text-red-700">{errorMsg || 'Algo deu errado. Tente novamente.'}</p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="mt-8 w-full rounded bg-neutral-900 px-6 py-3.5 font-semibold text-white hover:bg-neutral-800 disabled:opacity-60"
        >
          {status === 'sending' ? 'Enviando...' : 'Enviar briefing'}
        </button>
      </form>
    </div>
  )
}

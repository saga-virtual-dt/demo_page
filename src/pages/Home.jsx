import { Link } from 'react-router-dom'
import niches from '../config/niches'

const groups = [
  { variant: 'servicos', title: 'Template 1 — Serviços' },
  { variant: 'empresa', title: 'Template 2 — Empresa' },
  { variant: 'profissional', title: 'Template 3 — Profissional' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-16 text-neutral-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Landing pages de demonstração</h1>
        <p className="mt-3 text-neutral-600">
          Escolha um nicho para ver a landing page de demonstração correspondente.
        </p>

        {groups.map((g) => (
          <div key={g.variant} className="mt-10">
            <h2 className="mb-3 text-lg font-semibold">{g.title}</h2>
            <div className="flex flex-wrap gap-2">
              {niches
                .filter((n) => n.variant === g.variant)
                .map((n) => (
                  <Link
                    key={n.slug}
                    to={`/${n.slug}`}
                    className="rounded border border-neutral-300 bg-white px-3.5 py-2 text-sm hover:border-neutral-500"
                  >
                    /{n.slug}
                  </Link>
                ))}
            </div>
          </div>
        ))}

        <div className="mt-12 border-t border-neutral-200 pt-8">
          <Link to="/precos" className="font-semibold underline">
            Ver tabela de preços →
          </Link>
        </div>
      </div>
    </div>
  )
}

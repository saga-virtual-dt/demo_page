import { Link } from 'react-router-dom'
import site from '../config/site'

export default function Pricing() {
  const { essential, addons, addonsTitle } = site.pricing

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-16 text-neutral-900">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="text-sm text-neutral-500 hover:underline">← Voltar</Link>

        <div className="mt-6 rounded border border-neutral-300 bg-white p-8">
          <h1 className="text-2xl font-bold">{essential.title}</h1>
          <p className="mt-2 text-3xl font-bold text-neutral-900">{essential.price}</p>
          <p className="mt-1 text-sm text-neutral-500">Inclui:</p>
          <ul className="mt-3 grid gap-2">
            {essential.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-900" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <h2 className="mt-12 mb-4 text-xl font-bold">{addonsTitle}</h2>
        <div className="overflow-hidden rounded border border-neutral-300 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-100 text-left">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Adicional</th>
                <th className="px-4 py-2.5 font-semibold">Preço</th>
              </tr>
            </thead>
            <tbody>
              {addons.map((a, i) => (
                <tr key={a.label} className={i % 2 ? 'bg-neutral-50' : ''}>
                  <td className="border-t border-neutral-200 px-4 py-2.5">{a.label}</td>
                  <td className="border-t border-neutral-200 px-4 py-2.5">{a.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs text-neutral-400">
          Valores e itens editáveis em src/config/site.js
        </p>
      </div>
    </div>
  )
}

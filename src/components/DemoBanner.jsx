import { Link } from 'react-router-dom'

export default function DemoBanner({ clientName }) {
  return (
    <div className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 bg-neutral-900 px-4 py-2.5 text-sm text-white">
      <span>
        Landing page demonstrativa para <b>{clientName}</b>
      </span>
      <Link
        to={`/solicitar?cliente=${encodeURIComponent(clientName)}`}
        className="whitespace-nowrap rounded bg-white px-3.5 py-1.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-200"
      >
        Quero uma página como esta
      </Link>
    </div>
  )
}

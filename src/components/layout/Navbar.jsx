import { Search, Warehouse } from 'lucide-react'

export default function Navbar({ query, setQuery }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/92 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center xl:px-10">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-text">
            <Warehouse className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black leading-none text-text-primary">SIMS</h1>
              <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] font-black text-text-secondary">
                V4.0
              </span>
            </div>
            <p className="mt-1 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-text-secondary">
              Warehouse Telemetry Hub
            </p>
          </div>
        </div>

        <div className="relative lg:ml-auto lg:w-[420px]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8A7A6B]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-9 w-full rounded-full border border-[#D8C8B7] bg-surface pl-10 pr-4 text-[11px] outline-none transition placeholder:text-[#8A7A6B]/80 focus:border-accent"
            placeholder="Query product ID, name, rack location..."
          />
        </div>
      </div>
    </header>
  )
}

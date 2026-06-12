import { AlertTriangle } from 'lucide-react'

export default function StockAlert({ item, openRestock }) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-[#E1D3C3] bg-[#FFFDF9] px-5 py-3.5 md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <AlertTriangle className="h-4 w-4 shrink-0 text-[#B8752A]" />
        <div className="min-w-0">
          <p className="truncate text-xs font-bold text-text-primary">{item.name}</p>
          <p className="mt-1 text-[10px] text-text-secondary">
            Rack {item.rack} - Max target {item.maxTarget || item.minThreshold || 30}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => openRestock(item)}
        className="h-8 rounded-md bg-[#8A7A6B] px-3.5 font-mono text-[9px] font-black uppercase tracking-[0.08em] text-white transition hover:bg-[#75675B]"
      >
        Auto-Restock
      </button>
    </article>
  )
}

import { Mail, Truck } from 'lucide-react'
import { matchesQuery } from '../utils/validators.js'

export default function Suppliers({ suppliers, query, openPoModal }) {
  const visibleSuppliers = suppliers.filter((supplier) =>
    matchesQuery([supplier.name], query),
  )

  return (
    <section>
      <div className="mb-7">
        <h2 className="text-[26px] font-black leading-tight text-text-primary">
          Verified Suppliers Directory
        </h2>
        <p className="mt-1 font-mono text-[11px] text-text-secondary">
          Supplier contracts, quality indexes, and active payload queues
        </p>
      </div>

      <div className="grid gap-7 lg:grid-cols-2">
        {visibleSuppliers.map((supplier) => (
          <article
            key={supplier.name}
            className="min-h-[205px] rounded-xl border border-[#DED2C4] bg-surface px-7 py-7 shadow-[0_1px_3px_rgba(61,47,40,0.08)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[#D8CEC1] bg-[#F7F4EF] text-[#7A6D61]">
                  <Truck className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <h2 className="truncate text-[14px] font-black leading-5 text-text-primary">
                    {supplier.name}
                  </h2>
                  <p className="mt-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-text-secondary">
                    {supplier.type}
                  </p>
                </div>
              </div>
              <span className="shrink-0 rounded border border-[#BDEFD8] bg-[#E9FFF4] px-2.5 py-1 font-mono text-[9px] font-black text-score">
                {supplier.score} Score
              </span>
            </div>

            <div className="mt-7 border-t border-[#E5DCD1] pt-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.12em] text-[#7A6D61]">
                    Contact Node
                  </p>
                  <p className="mt-2 flex min-w-0 items-center gap-1.5 text-[11px] font-semibold text-text-primary">
                    <Mail className="h-3.5 w-3.5 shrink-0 text-[#7A6D61]" />
                    <span className="truncate">{supplier.email}</span>
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.12em] text-[#7A6D61]">
                    Transit Payload
                  </p>
                  <p className="mt-2 font-mono text-[11px] font-black text-text-primary">
                    {supplier.activeOrders} Active orders
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => openPoModal(supplier.name)}
                className="h-8 rounded-lg border border-[#E1D3C3] bg-[#F8F2EA] px-3.5 text-[10px] font-black text-text-primary shadow-[0_1px_2px_rgba(61,47,40,0.06)] transition hover:border-[#CDBBA8] hover:bg-[#F5ECE1]"
              >
                Draft New Order
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

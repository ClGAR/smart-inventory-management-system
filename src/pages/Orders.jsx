import { PackagePlus } from 'lucide-react'
import Table from '../components/common/Table.jsx'
import { formatCurrency, statusClasses } from '../utils/formatters.js'
import { matchesQuery } from '../utils/validators.js'

export default function Orders({ purchaseOrders, query, openPoModal }) {
  const visibleOrders = purchaseOrders.filter((order) =>
    matchesQuery([order.hash], query),
  )

  return (
    <section>
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[26px] font-black leading-tight text-text-primary">
            Active Purchase Order Logs
          </h2>
          <p className="mt-1 text-[11px] text-text-secondary">
            Simulated dispatch logs tracking live cargo shipments and supplier status
          </p>
        </div>
        <div className="sm:pt-1">
          <button
            type="button"
            onClick={() => openPoModal()}
            className="inline-flex h-8 items-center justify-center gap-2 rounded-lg bg-[#8A7A6B] px-4 text-[11px] font-black text-white shadow-[0_2px_5px_rgba(61,47,40,0.18)] transition hover:bg-[#75675B]"
          >
            <PackagePlus className="h-3.5 w-3.5" aria-hidden="true" />
            Draft Custom PO
          </button>
        </div>
      </div>

      <Table>
        <thead className="border-b border-[#DED2C4] bg-[#FFFDF9]">
          <tr className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[#7A6D61]">
            <th className="px-5 py-4">PO Unique Hash</th>
            <th className="px-5 py-4">Supplier Contract</th>
            <th className="px-5 py-4">Cargo Date</th>
            <th className="px-5 py-4">Payload Count</th>
            <th className="px-5 py-4">Total Cost ($)</th>
            <th className="px-5 py-4 text-right">Cargo Status</th>
          </tr>
        </thead>
        <tbody>
          {visibleOrders.map((order, index) => (
            <tr
              key={order.hash}
              className={`border-b border-[#ECE4DA] last:border-0 ${
                index % 2 === 1 ? 'bg-[#FFFDF9]' : 'bg-surface'
              }`}
            >
              <td className="px-5 py-5 font-mono text-[10px] font-semibold text-text-primary">
                {order.hash}
              </td>
              <td className="px-5 py-5 text-xs font-black text-text-primary">{order.supplier}</td>
              <td className="px-5 py-5 font-mono text-[11px] text-text-primary">{order.date}</td>
              <td className="px-5 py-5 font-mono text-xs font-black text-text-primary">
                {order.items} line-items
              </td>
              <td className="px-5 py-5 font-mono text-xs font-black text-text-primary">
                {formatCurrency(order.cost)}
              </td>
              <td className="px-5 py-5 text-right">
                <span
                  className={`inline-flex h-7 items-center rounded-full px-3 font-mono text-[9px] font-black tracking-[0.08em] ${statusClasses(order.status)}`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  )
}

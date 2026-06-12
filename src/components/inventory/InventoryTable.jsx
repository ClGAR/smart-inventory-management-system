import { MapPin, Pencil, Trash2 } from 'lucide-react'
import Table from '../common/Table.jsx'
import { formatCurrency, statusClasses } from '../../utils/formatters.js'
import { getStatus } from '../../utils/validators.js'

export default function InventoryTable({
  inventory,
  openInventoryDrawer,
  deleteInventoryItem,
}) {
  return (
    <Table minWidth="min-w-[980px]">
      <thead className="border-b border-[#DED2C4] bg-[#FFFDF9]">
        <tr className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[#7A6D61]">
          <th className="px-5 py-4">Coordinates</th>
          <th className="px-5 py-4">Asset Matrix Item</th>
          <th className="px-5 py-4">Category</th>
          <th className="px-5 py-4">Available Units</th>
          <th className="px-5 py-4">Valuation Matrix</th>
          <th className="px-5 py-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((item, index) => {
          const status = getStatus(item.units)
          return (
            <tr
              key={item.id}
              className={`border-b border-[#ECE4DA] last:border-0 ${
                index % 2 === 1 ? 'bg-[#FFFDF9]' : 'bg-surface'
              }`}
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-[#8A7A6B]" />
                  <span className="inline-flex h-6 items-center rounded border border-[#E1D3C3] bg-[#FFFDF9] px-2 font-mono text-[9px] font-black text-text-primary">
                    {item.rack}
                  </span>
                </div>
              </td>
              <td className="px-5 py-4">
                <p className="text-xs font-semibold text-text-primary">{item.name}</p>
                <p className="mt-1 font-mono text-[9px] text-text-secondary">{item.id}</p>
              </td>
              <td className="px-5 py-4 text-xs text-text-primary">{item.category}</td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-text-primary">{item.units}</span>
                  <span
                    className={`rounded px-2 py-1 font-mono text-[9px] font-black tracking-[0.08em] ${statusClasses(status)}`}
                  >
                    {status}
                  </span>
                </div>
              </td>
              <td className="px-5 py-4">
                <p className="text-xs font-black text-text-primary">
                  {formatCurrency(item.price)}
                </p>
                <p className="mt-1 text-[9px] text-text-secondary">Est. asset valuation</p>
              </td>
              <td className="px-5 py-4">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => openInventoryDrawer(item)}
                    className="grid h-7 w-7 place-items-center rounded border border-[#E1D3C3] bg-[#FFFDF9] text-[#7A6D61] hover:border-accent hover:text-accent"
                    aria-label={`Edit ${item.name}`}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteInventoryItem(item)}
                    className="grid h-7 w-7 place-items-center rounded border border-[#FFD3D3] bg-[#FFECEC] text-status-critical-text hover:border-status-critical-text"
                    aria-label={`Delete ${item.name}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

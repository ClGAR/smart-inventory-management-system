import { dotClasses } from '../../utils/formatters.js'
import { getStatus } from '../../utils/validators.js'

export default function ProductCard({ item }) {
  const status = getStatus(item.units)
  const rackBorder = {
    OPTIMAL: 'border-[#D8CEC1]',
    LOW: 'border-[#E5C88D]',
    CRITICAL: 'border-[#FFB6B6]',
  }[status]

  return (
    <button
      type="button"
      className={`min-w-[150px] snap-start rounded-xl border bg-[#FFFDF9] px-5 py-4 text-left transition hover:bg-white ${rackBorder}`}
      title={`${item.rack} ${item.name}`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[9px] font-black text-text-secondary">
          {item.rack}
        </span>
        <span
          className={`h-2.5 w-2.5 rounded-full ${dotClasses(status)} shadow-[0_0_10px_currentColor]`}
        />
      </div>
      <p className="mt-4 truncate text-xs font-black text-text-primary">{item.name}</p>
      <p className="mt-2 text-[10px] text-text-secondary">{item.units} units</p>
    </button>
  )
}

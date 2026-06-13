import {
  AlertTriangle,
  CircleDollarSign,
  Grid3X3,
  MapPin,
  ShieldCheck,
  Waves,
} from 'lucide-react'
import ProductCard from '../components/inventory/ProductCard.jsx'
import StatCard from '../components/inventory/StatCard.jsx'
import StockAlert from '../components/inventory/StockAlert.jsx'
import { formatCurrency } from '../utils/formatters.js'
import { getStatus } from '../utils/validators.js'

export default function Dashboard({ inventory, stats, openRestock }) {
  const alerts = inventory.filter((item) => getStatus(item.units) !== 'OPTIMAL')
  const chartData = Object.values(
    inventory.reduce((groups, item) => {
      const category = item.category || 'Uncategorized'
      const value = Number(item.units) * Number(item.price)

      groups[category] = groups[category] || { label: category, value: 0 }
      groups[category].value += value

      return groups
    }, {}),
  )
  const maxValue = Math.max(...chartData.map((bar) => bar.value), 0)
  const tickMax = maxValue > 0 ? Math.ceil(maxValue / 50000) * 50000 : 100000
  const ticks = Array.from({ length: 5 }, (_, index) => (tickMax / 4) * index)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Assets"
          value={stats.totalAssets}
          sublabel="Distributed globally on active racks"
          icon={Grid3X3}
        />
        <StatCard
          label="Inventory Capitalization"
          value={formatCurrency(stats.capitalization)}
          sublabel="Valuated at current procurement indices"
          icon={CircleDollarSign}
          valueTone="text-[#0F6B5F]"
          iconTone="text-[#0F8A75]"
          iconBg="bg-[#DDF8EF] border-[#BEEBD8]"
        />
        <StatCard
          label="Low-Stock Warnings"
          value={stats.lowWarnings}
          sublabel="Exceeding safe threshold targets"
          icon={AlertTriangle}
          valueTone="text-[#B86B00]"
          iconTone="text-[#D98B19]"
          iconBg="bg-[#FFF8EA] border-[#F1DFC1]"
        />
        <StatCard
          label="Depleted Segments"
          value={stats.depletedSegments}
          sublabel="Urgent replacement required"
          icon={ShieldCheck}
          valueTone="text-text-primary"
          iconTone="text-[#D21F2B]"
          iconBg="bg-[#FFECEC] border-[#FFB9B9]"
        />
      </div>

      <section className="rounded-xl border border-[#DED2C4] bg-surface px-7 py-6 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#8A7A6B]" aria-hidden="true" />
              <h2 className="text-sm font-black uppercase tracking-normal text-text-primary">
                VIRTUAL WAREHOUSE FLOOR HEATMAP
              </h2>
            </div>
            <p className="mt-1 text-[11px] text-text-secondary">
              Interactive structural coordinates map. Click individual rack codes to inspect current allocations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 font-mono text-[9px] font-bold text-text-secondary">
            <span className="flex items-center gap-1.5">
              <i className="h-2.5 w-2.5 rounded-full border border-status-optimal-text" /> Optimal (60%+)
            </span>
            <span className="flex items-center gap-1.5">
              <i className="h-2.5 w-2.5 rounded-full border border-status-low-text" /> Low (Threshold)
            </span>
            <span className="flex items-center gap-1.5">
              <i className="h-2.5 w-2.5 rounded-full border border-status-critical-text" /> Depleted
            </span>
          </div>
        </div>

        <div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-1">
          {inventory.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-xl border border-[#DED2C4] bg-surface px-7 py-6 shadow-soft">
          <div className="mb-6">
            <h2 className="text-sm font-black uppercase tracking-normal text-text-primary">
              ASSET VALUE SPECTRUM
            </h2>
            <p className="mt-1 text-[11px] text-text-secondary">
              Capital concentration distribution metrics across operating product categories
            </p>
          </div>
          <div className="h-[245px] overflow-hidden">
            <svg viewBox="0 0 640 245" className="h-full w-full" role="img">
              {ticks.map((tick, index) => {
                const y = 215 - index * 43
                return (
                  <g key={tick}>
                    <line
                      x1="46"
                      x2="635"
                      y1={y}
                      y2={y}
                      stroke="#E9E0D6"
                      strokeDasharray="4 4"
                    />
                    <text
                      x="0"
                      y={y + 4}
                      fill="#6B6560"
                      fontSize="9"
                      fontFamily="system-ui, sans-serif"
                    >
                      ${Math.round(tick / 1000)}k
                    </text>
                  </g>
                )
              })}
              {chartData.map((bar, index) => {
                const x =
                  chartData.length === 1
                    ? 292
                    : 88 + index * (498 / Math.max(chartData.length - 1, 1))
                const height =
                  bar.value > 0 ? Math.max(4, (bar.value / tickMax) * 160) : 0
                const y = 215 - height

                return (
                  <g key={bar.label}>
                  <rect
                    x={x}
                    y={y}
                    width="56"
                    height={height}
                    rx="8"
                    fill="#9A8879"
                  />
                  <text
                    x={x + 28}
                    y="236"
                    fill="#6B6560"
                    fontSize="8.5"
                    fontFamily="system-ui, sans-serif"
                    textAnchor="middle"
                  >
                    {bar.label}
                  </text>
                </g>
                )
              })}
            </svg>
          </div>
        </section>

        <section className="rounded-xl border border-[#DED2C4] bg-surface p-5 shadow-soft">
          <div className="mb-10">
            <div className="flex items-center gap-2">
              <Waves className="h-4 w-4 text-[#8A7A6B]" aria-hidden="true" />
              <h2 className="text-sm font-black uppercase tracking-normal text-text-primary">
                SYSTEM INTELLIGENCE LOG
              </h2>
            </div>
            <p className="mt-1 text-[11px] text-text-secondary">
              Real-time alerts tracking critical, low, and automated restocking queues
            </p>
          </div>
          <div className="space-y-3">
            {alerts.map((item) => (
              <StockAlert key={item.id} item={item} openRestock={openRestock} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

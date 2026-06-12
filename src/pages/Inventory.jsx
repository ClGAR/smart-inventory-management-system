import { PackagePlus } from 'lucide-react'
import InventoryTable from '../components/inventory/InventoryTable.jsx'
import { CATEGORIES } from '../constants/index.js'
import { matchesQuery } from '../utils/validators.js'

export default function Inventory({
  inventory,
  query,
  activeCategory,
  setActiveCategory,
  openInventoryDrawer,
  deleteInventoryItem,
}) {
  const visibleInventory = inventory.filter((item) => {
    const matchesCategory =
      activeCategory === 'ALL' || item.category.toUpperCase() === activeCategory
    const matchesSearch = matchesQuery([item.name, item.id, item.rack], query)
    return matchesCategory && matchesSearch
  })

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-black leading-tight text-text-primary">
            Active Matrix Registry
          </h2>
          <p className="mt-1 text-[11px] text-text-secondary">
            Detailed index of products, allocation indices, coordinates, and pricing values
          </p>
        </div>
        <div className="sm:pt-1">
          <button
            type="button"
            onClick={() => openInventoryDrawer()}
            className="inline-flex h-8 items-center justify-center gap-2 rounded-lg bg-[#8A7A6B] px-4 text-[11px] font-black text-white shadow-[0_2px_5px_rgba(61,47,40,0.18)] transition hover:bg-[#75675B]"
          >
            <PackagePlus className="h-3.5 w-3.5" aria-hidden="true" />
            Assign New Item
          </button>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2.5">
        {['ALL', ...CATEGORIES.map((category) => category.toUpperCase())].map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`h-7 rounded-full border bg-white px-3.5 font-mono text-[9px] font-black uppercase tracking-[0.1em] text-text-primary transition ${
              activeCategory === category
                ? 'border-accent shadow-[0_3px_8px_rgba(61,47,40,0.24)]'
                : 'border-[#E1D6C8] shadow-[0_1px_2px_rgba(61,47,40,0.14)] hover:border-accent hover:shadow-[0_2px_5px_rgba(61,47,40,0.18)]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <InventoryTable
        inventory={visibleInventory}
        openInventoryDrawer={openInventoryDrawer}
        deleteInventoryItem={deleteInventoryItem}
      />
    </section>
  )
}

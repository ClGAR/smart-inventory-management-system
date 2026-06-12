import { useState } from 'react'
import { X } from 'lucide-react'
import Field from '../common/Field.jsx'
import { BLANK_INVENTORY_FORM, CATEGORIES } from '../../constants/index.js'

export default function InventoryDrawer({ drawer, suppliers, closeDrawer, saveInventory }) {
  const [form, setForm] = useState(() => {
    if (!drawer.item) return BLANK_INVENTORY_FORM
    return {
      name: drawer.item.name,
      category: drawer.item.category,
      rack: drawer.item.rack,
      units: drawer.item.units,
      minThreshold: drawer.item.minThreshold || 20,
      price: drawer.item.price,
      supplier: drawer.item.supplier || suppliers[0].name,
    }
  })

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function submitForm(event) {
    event.preventDefault()
    saveInventory({
      ...form,
      units: Number(form.units),
      minThreshold: Number(form.minThreshold),
      price: Number(form.price),
    })
  }

  return (
    <div className="fixed inset-0 z-40">
      <button
        type="button"
        className="absolute inset-0 bg-black/30"
        onClick={closeDrawer}
        aria-label="Close shelf assignment drawer"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col border-l border-border bg-surface shadow-2xl">
        <div className="flex items-start justify-between border-b border-border p-5">
          <div>
            <h2 className="text-xl font-black text-text-primary">SHELF ASSIGNMENT CORE</h2>
            <p className="mt-1 text-sm text-text-secondary">Matrix Database Modifier Console</p>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border text-text-secondary"
            aria-label="Close drawer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={submitForm} className="flex flex-1 flex-col overflow-y-auto p-5">
          <div className="space-y-4">
            <Field label="Asset Name">
              <input
                required
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                placeholder="e.g. Holo-Chassis V4"
                className="field"
              />
            </Field>
            <Field label="Asset Category">
              <select
                value={form.category}
                onChange={(event) => updateField('category', event.target.value)}
                className="field"
              >
                {CATEGORIES.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </Field>
            <Field label="Shelf Coordinates (Rack)">
              <input
                required
                value={form.rack}
                onChange={(event) => updateField('rack', event.target.value.toUpperCase())}
                placeholder="e.g. A-14"
                className="field"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Current Stock Count">
                <input
                  min="0"
                  type="number"
                  value={form.units}
                  onChange={(event) => updateField('units', event.target.value)}
                  className="field"
                />
              </Field>
              <Field label="Min Safe Threshold">
                <input
                  min="0"
                  type="number"
                  value={form.minThreshold}
                  onChange={(event) => updateField('minThreshold', event.target.value)}
                  placeholder="e.g. 20"
                  className="field"
                />
              </Field>
            </div>
            <Field label="Price Unit ($)">
              <input
                min="0"
                type="number"
                value={form.price}
                onChange={(event) => updateField('price', event.target.value)}
                className="field"
              />
            </Field>
            <Field label="Preferred Supplier">
              <select
                value={form.supplier}
                onChange={(event) => updateField('supplier', event.target.value)}
                className="field"
              >
                {suppliers.map((supplier) => (
                  <option key={supplier.name}>{supplier.name}</option>
                ))}
              </select>
            </Field>
          </div>
          <div className="mt-auto pt-6">
            <button
              type="submit"
              className="h-12 w-full rounded-lg bg-accent px-4 font-mono text-xs font-black uppercase tracking-[0.12em] text-accent-text"
            >
              Commit Changes To Database
            </button>
            <p className="mt-4 text-xs leading-5 text-text-secondary">
              Saving changes dynamically triggers safety threshold logs and updates telemetry
              matrices on active visual rack floors instantly.
            </p>
          </div>
        </form>
      </aside>
    </div>
  )
}

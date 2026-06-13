import { useState } from 'react'
import { X } from 'lucide-react'
import Field from '../common/Field.jsx'
import { BLANK_INVENTORY_FORM, CATEGORIES } from '../../constants/index.js'

const CUSTOM_CATEGORY = '__custom_category__'

export default function InventoryDrawer({
  drawer,
  categories = [],
  suppliers,
  closeDrawer,
  saveInventory,
}) {
  const categoryOptions = Array.from(
    new Set([
      ...CATEGORIES,
      ...categories.map((category) => category.name).filter(Boolean),
    ]),
  )
  const initialCategory = drawer.item?.category || BLANK_INVENTORY_FORM.category
  const [isCustomCategory, setIsCustomCategory] = useState(
    Boolean(drawer.item?.category) && !categoryOptions.includes(initialCategory),
  )
  const [customCategory, setCustomCategory] = useState(
    categoryOptions.includes(initialCategory) ? '' : initialCategory,
  )
  const [form, setForm] = useState(() => {
    if (!drawer.item) return BLANK_INVENTORY_FORM
    return {
      name: drawer.item.name,
      category: drawer.item.category,
      rack: drawer.item.rack,
      units: drawer.item.units,
      minThreshold: drawer.item.minThreshold || 20,
      price: drawer.item.price,
      supplier: drawer.item.supplier || '',
    }
  })

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function updateCategory(value) {
    if (value === CUSTOM_CATEGORY) {
      setIsCustomCategory(true)
      setForm((current) => ({ ...current, category: customCategory }))
      return
    }

    setIsCustomCategory(false)
    setCustomCategory('')
    updateField('category', value)
  }

  function updateCustomCategory(value) {
    setCustomCategory(value)
    updateField('category', value)
  }

  function submitForm(event) {
    event.preventDefault()
    saveInventory({
      ...form,
      category: isCustomCategory ? customCategory.trim() : form.category,
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
                required
                value={isCustomCategory ? CUSTOM_CATEGORY : form.category}
                onChange={(event) => updateCategory(event.target.value)}
                className="field"
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
                <option value={CUSTOM_CATEGORY}>Custom category</option>
              </select>
            </Field>
            {isCustomCategory ? (
              <Field label="New Category Name">
                <input
                  required
                  value={customCategory}
                  onChange={(event) => updateCustomCategory(event.target.value)}
                  placeholder="e.g. Safety Equipment"
                  className="field"
                />
              </Field>
            ) : null}
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
                required
                value={form.supplier}
                onChange={(event) => updateField('supplier', event.target.value)}
                className="field"
              >
                <option value="">Select supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id || supplier.name} value={supplier.name}>
                    {supplier.name}
                  </option>
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

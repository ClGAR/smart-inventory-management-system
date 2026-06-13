import { useState } from 'react'
import { X } from 'lucide-react'
import Field from '../common/Field.jsx'
import Modal from '../common/Modal.jsx'
import { BLANK_PO_FORM } from '../../constants/index.js'

export default function PurchaseOrderModal({
  poModal,
  suppliers,
  closePoModal,
  createPurchaseOrder,
}) {
  const [form, setForm] = useState(() => ({
    ...BLANK_PO_FORM,
    supplier: poModal.supplier || BLANK_PO_FORM.supplier,
  }))

  function submitForm(event) {
    event.preventDefault()
    createPurchaseOrder({
      supplier: form.supplier,
      items: Number(form.items),
      cost: Number(form.cost),
    })
  }

  return (
    <Modal>
      <div className="w-full max-w-[520px] rounded-xl border border-border bg-surface p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-text-primary">DRAFT PURCHASE ORDER CONTRACT</h2>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-text-secondary">
              B2B Procurement Pipeline Controller
            </p>
          </div>
          <button
            type="button"
            onClick={closePoModal}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border text-text-secondary"
            aria-label="Close purchase order modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={submitForm} className="mt-6 space-y-4">
          <Field label="Target Supplier Contract">
            <select
              required
              value={form.supplier}
              onChange={(event) =>
                setForm((current) => ({ ...current, supplier: event.target.value }))
              }
              className="field"
            >
              <option value="">Select supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id || supplier.name} value={supplier.name}>
                  {supplier.name} ({supplier.type?.replace(' Supplier', '') || 'Supplier'})
                </option>
              ))}
            </select>
          </Field>
          <Field label="Payload Line-Items">
            <input
              min="1"
              type="number"
              value={form.items}
              onChange={(event) =>
                setForm((current) => ({ ...current, items: event.target.value }))
              }
              className="field"
            />
          </Field>
          <Field label="Estimated Value ($)">
            <input
              min="0"
              type="number"
              value={form.cost}
              onChange={(event) =>
                setForm((current) => ({ ...current, cost: event.target.value }))
              }
              className="field"
            />
          </Field>
          <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closePoModal}
              className="h-11 rounded-lg border border-border px-4 font-bold text-text-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-11 rounded-lg bg-accent px-4 font-bold text-accent-text"
            >
              Confirm Contract Dispatch
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

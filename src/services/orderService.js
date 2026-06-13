import { supabase } from '../lib/supabaseClient.js'
import { todayStamp } from '../utils/formatters.js'

const ORDER_SELECT = `
  *,
  suppliers(name)
`

function toPurchaseOrder(row) {
  return {
    id: row.id,
    hash: row.id,
    supplierId: row.supplier_id,
    supplier: row.suppliers?.name || '',
    items: row.items,
    cost: row.cost,
    status: row.status,
    date: row.order_date,
    createdAt: row.created_at,
  }
}

function nextPoHash(purchaseOrders) {
  const maxId = purchaseOrders.reduce((max, order) => {
    const value = Number(String(order.id || order.hash).replace('PO-2026-', ''))
    return Number.isNaN(value) ? max : Math.max(max, value)
  }, 0)
  return `PO-2026-${String(maxId + 1).padStart(2, '0')}`
}

async function resolveSupplierId(supplier) {
  if (!supplier) return null

  const { data, error } = await supabase
    .from('suppliers')
    .select('id')
    .eq('name', supplier)
    .maybeSingle()

  if (error) throw error
  if (!data) throw new Error(`Supplier "${supplier}" was not found in Supabase.`)
  return data.id
}

async function buildOrderPayload(form) {
  return {
    supplier_id: form.supplierId || form.supplier_id || (await resolveSupplierId(form.supplier)),
    items: Number(form.items ?? 0),
    cost: Number(form.cost ?? 0),
    status: form.status || 'PROCESSING',
    order_date: form.date || form.order_date || todayStamp(),
  }
}

export async function getAll() {
  const { data, error } = await supabase
    .from('purchase_orders')
    .select(ORDER_SELECT)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data.map(toPurchaseOrder)
}

export async function getById(id) {
  const { data, error } = await supabase
    .from('purchase_orders')
    .select(ORDER_SELECT)
    .eq('id', id)
    .single()

  if (error) throw error
  return toPurchaseOrder(data)
}

export async function create(form, purchaseOrders = []) {
  const payload = {
    id: form.id || form.hash || nextPoHash(purchaseOrders),
    ...(await buildOrderPayload(form)),
  }

  const { data, error } = await supabase
    .from('purchase_orders')
    .insert(payload)
    .select(ORDER_SELECT)
    .single()

  if (error) throw error
  return toPurchaseOrder(data)
}

export async function update(id, form) {
  const payload = await buildOrderPayload(form)

  const { data, error } = await supabase
    .from('purchase_orders')
    .update(payload)
    .eq('id', id)
    .select(ORDER_SELECT)
    .single()

  if (error) throw error
  return toPurchaseOrder(data)
}

export async function remove(id) {
  const { error } = await supabase.from('purchase_orders').delete().eq('id', id)

  if (error) throw error
  return id
}

export function createPurchaseOrderRecord(purchaseOrders, form) {
  return {
    hash: nextPoHash(purchaseOrders),
    supplier: form.supplier,
    date: todayStamp(),
    items: form.items,
    cost: form.cost,
    status: 'PROCESSING',
  }
}

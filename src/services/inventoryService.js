import { supabase } from '../lib/supabaseClient.js'
import { getStatus } from '../utils/validators.js'

const INVENTORY_SELECT = `
  *,
  categories(name),
  suppliers(name)
`

function toInventoryItem(row) {
  return {
    id: row.id,
    name: row.name,
    rack: row.rack,
    categoryId: row.category_id,
    category: row.categories?.name || '',
    units: row.units,
    price: row.price,
    minThreshold: row.min_threshold,
    maxTarget: row.max_target,
    supplierId: row.supplier_id,
    supplier: row.suppliers?.name || '',
    createdAt: row.created_at,
  }
}

function nextInventoryId(inventory) {
  const maxId = inventory.reduce((max, item) => {
    const value = Number(String(item.id).replace('INV-', ''))
    return Number.isNaN(value) ? max : Math.max(max, value)
  }, 100)
  return `INV-${String(maxId + 1).padStart(3, '0')}`
}

async function resolveCategoryId(category) {
  const categoryName = category?.trim()
  if (!categoryName) return null

  const { data, error } = await supabase
    .from('categories')
    .select('id')
    .eq('name', categoryName)
    .maybeSingle()

  if (error) throw error
  if (data) return data.id

  const { data: createdCategory, error: createError } = await supabase
    .from('categories')
    .insert({ name: categoryName })
    .select('id')
    .single()

  if (createError) throw createError
  return createdCategory.id
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

async function buildInventoryPayload(form) {
  const minThreshold = Number(form.minThreshold ?? form.min_threshold ?? 0)
  const units = Number(form.units ?? 0)

  return {
    name: form.name,
    rack: form.rack,
    category_id: form.categoryId || form.category_id || (await resolveCategoryId(form.category)),
    units,
    price: Number(form.price ?? 0),
    min_threshold: minThreshold,
    max_target: Number(
      form.maxTarget ?? form.max_target ?? Math.max(minThreshold * 2, units),
    ),
    supplier_id: form.supplierId || form.supplier_id || (await resolveSupplierId(form.supplier)),
  }
}

export async function getAll() {
  const { data, error } = await supabase
    .from('inventory_items')
    .select(INVENTORY_SELECT)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data.map(toInventoryItem)
}

export async function getById(id) {
  const { data, error } = await supabase
    .from('inventory_items')
    .select(INVENTORY_SELECT)
    .eq('id', id)
    .single()

  if (error) throw error
  return toInventoryItem(data)
}

export async function create(form, inventory = []) {
  const payload = {
    id: form.id || nextInventoryId(inventory),
    ...(await buildInventoryPayload(form)),
  }

  const { data, error } = await supabase
    .from('inventory_items')
    .insert(payload)
    .select(INVENTORY_SELECT)
    .single()

  if (error) throw error
  return toInventoryItem(data)
}

export async function update(id, form) {
  const payload = await buildInventoryPayload(form)

  const { data, error } = await supabase
    .from('inventory_items')
    .update(payload)
    .eq('id', id)
    .select(INVENTORY_SELECT)
    .single()

  if (error) throw error
  return toInventoryItem(data)
}

export async function remove(id) {
  const { error } = await supabase.from('inventory_items').delete().eq('id', id)

  if (error) throw error
  return id
}

export function getInitialInventory() {
  return []
}

export function getInitialSuppliers() {
  return []
}

export function getInitialPurchaseOrders() {
  return []
}

export function calculateInventoryStats(inventory) {
  return inventory.reduce(
    (accumulator, item) => {
      const status = getStatus(item.units)
      accumulator.totalAssets += 1
      accumulator.capitalization += item.units * item.price
      if (status === 'LOW') accumulator.lowWarnings += 1
      if (status === 'CRITICAL') accumulator.depletedSegments += 1
      return accumulator
    },
    {
      totalAssets: 0,
      capitalization: 0,
      lowWarnings: 0,
      depletedSegments: 0,
    },
  )
}

export function createInventoryRecord(inventory, form) {
  return {
    ...form,
    id: nextInventoryId(inventory),
    maxTarget: Math.max(Number(form.minThreshold) * 2, Number(form.units)),
  }
}

export function updateInventoryRecord(item, form) {
  return { ...item, ...form }
}

export function createPurchaseOrderRecord() {
  throw new Error('createPurchaseOrderRecord has moved to orderService.js.')
}

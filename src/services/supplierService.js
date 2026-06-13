import { supabase } from '../lib/supabaseClient.js'

function toSupplier(row) {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    score: row.score,
    email: row.email,
    activeOrders: row.activeOrders || 0,
    createdAt: row.created_at,
  }
}

export async function getAll() {
  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) throw error
  return data.map(toSupplier)
}

export async function getById(id) {
  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return toSupplier(data)
}

export async function create(form) {
  const payload = {
    name: form.name,
    type: form.type,
    score: Number(form.score ?? 0),
    email: form.email,
  }

  const { data, error } = await supabase
    .from('suppliers')
    .insert(payload)
    .select('*')
    .single()

  if (error) throw error
  return toSupplier(data)
}

export async function update(id, form) {
  const payload = {
    name: form.name,
    type: form.type,
    score: Number(form.score ?? 0),
    email: form.email,
  }

  const { data, error } = await supabase
    .from('suppliers')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return toSupplier(data)
}

export async function remove(id) {
  const { error } = await supabase.from('suppliers').delete().eq('id', id)

  if (error) throw error
  return id
}

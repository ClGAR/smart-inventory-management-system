import { supabase } from '../lib/supabaseClient.js'

function toCategory(row) {
  return {
    id: row.id,
    name: row.name,
    createdAt: row.created_at,
  }
}

export async function getAll() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  if (error) throw error
  return data.map(toCategory)
}

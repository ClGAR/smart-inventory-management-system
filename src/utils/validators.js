export function getStatus(units) {
  if (Number(units) < 10) return 'CRITICAL'
  if (Number(units) < 30) return 'LOW'
  return 'OPTIMAL'
}

export function matchesQuery(values, query) {
  const needle = query.trim().toLowerCase()
  if (!needle) return true
  return values.some((value) => String(value).toLowerCase().includes(needle))
}

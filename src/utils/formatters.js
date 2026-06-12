export function statusClasses(status) {
  const classes = {
    OPTIMAL: 'bg-status-optimal-bg text-status-optimal-text',
    LOW: 'bg-status-low-bg text-status-low-text',
    CRITICAL: 'bg-status-critical-bg text-status-critical-text',
    PROCESSING: 'bg-status-low-bg text-status-low-text',
    DELIVERED: 'bg-status-optimal-bg text-status-optimal-text',
    SHIPPED: 'border border-text-secondary/50 text-text-secondary bg-transparent',
  }
  return classes[status] || classes.SHIPPED
}

export function dotClasses(status) {
  const classes = {
    OPTIMAL: 'bg-status-optimal-text',
    LOW: 'bg-status-low-text',
    CRITICAL: 'bg-status-critical-text',
  }
  return classes[status] || 'bg-text-secondary'
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function todayStamp() {
  return new Date().toISOString().slice(0, 10)
}

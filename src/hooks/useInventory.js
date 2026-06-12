import { useMemo, useState } from 'react'
import {
  calculateInventoryStats,
  createInventoryRecord,
  createPurchaseOrderRecord,
  getInitialInventory,
  getInitialPurchaseOrders,
  getInitialSuppliers,
  updateInventoryRecord,
} from '../services/inventoryService.js'

export function useInventory() {
  const [appState, setAppState] = useState(() => ({
    inventory: getInitialInventory(),
    suppliers: getInitialSuppliers(),
    purchaseOrders: getInitialPurchaseOrders(),
    activeTab: 'telemetry',
    query: '',
    activeCategory: 'ALL',
    drawer: null,
    poModal: null,
  }))

  const stats = useMemo(
    () => calculateInventoryStats(appState.inventory),
    [appState.inventory],
  )

  function setActiveTab(activeTab) {
    setAppState((current) => ({ ...current, activeTab }))
  }

  function setQuery(query) {
    setAppState((current) => ({ ...current, query }))
  }

  function setActiveCategory(activeCategory) {
    setAppState((current) => ({ ...current, activeCategory }))
  }

  function openInventoryDrawer(item = null) {
    setAppState((current) => ({
      ...current,
      activeTab: 'assets',
      drawer: { mode: item ? 'edit' : 'add', item },
    }))
  }

  function closeDrawer() {
    setAppState((current) => ({ ...current, drawer: null }))
  }

  function saveInventory(form) {
    setAppState((current) => {
      if (current.drawer?.mode === 'edit') {
        return {
          ...current,
          drawer: null,
          inventory: current.inventory.map((item) =>
            item.id === current.drawer.item.id ? updateInventoryRecord(item, form) : item,
          ),
        }
      }

      return {
        ...current,
        drawer: null,
        inventory: [...current.inventory, createInventoryRecord(current.inventory, form)],
      }
    })
  }

  function deleteInventoryItem(item) {
    const confirmed = window.confirm(`Remove ${item.name} from the matrix registry?`)
    if (!confirmed) return
    setAppState((current) => ({
      ...current,
      inventory: current.inventory.filter((entry) => entry.id !== item.id),
    }))
  }

  function openPoModal(supplier = null) {
    setAppState((current) => ({
      ...current,
      poModal: { supplier: supplier || current.suppliers[0].name },
    }))
  }

  function closePoModal() {
    setAppState((current) => ({ ...current, poModal: null }))
  }

  function createPurchaseOrder(form) {
    setAppState((current) => ({
      ...current,
      poModal: null,
      activeTab: 'orders',
      purchaseOrders: [
        ...current.purchaseOrders,
        createPurchaseOrderRecord(current.purchaseOrders, form),
      ],
      suppliers: current.suppliers.map((supplier) =>
        supplier.name === form.supplier
          ? { ...supplier, activeOrders: supplier.activeOrders + 1 }
          : supplier,
      ),
    }))
  }

  return {
    ...appState,
    stats,
    setActiveTab,
    setQuery,
    setActiveCategory,
    openInventoryDrawer,
    closeDrawer,
    saveInventory,
    deleteInventoryItem,
    openPoModal,
    closePoModal,
    createPurchaseOrder,
  }
}

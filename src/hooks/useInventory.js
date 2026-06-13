import { useEffect, useMemo, useState } from 'react'
import { calculateInventoryStats } from '../services/inventoryService.js'
import * as categoryService from '../services/categoryService.js'
import * as inventoryService from '../services/inventoryService.js'
import * as orderService from '../services/orderService.js'
import * as supplierService from '../services/supplierService.js'

function errorMessage(error) {
  return error?.message || 'Unable to connect to Supabase.'
}

function withActiveOrderCounts(suppliers, purchaseOrders) {
  const activeCounts = purchaseOrders.reduce((counts, order) => {
    if (order.status === 'DELIVERED') return counts
    counts[order.supplier] = (counts[order.supplier] || 0) + 1
    return counts
  }, {})

  return suppliers.map((supplier) => ({
    ...supplier,
    activeOrders: activeCounts[supplier.name] || 0,
  }))
}

export function useInventory() {
  const [appState, setAppState] = useState(() => ({
    inventory: [],
    categories: [],
    suppliers: [],
    purchaseOrders: [],
    activeTab: 'telemetry',
    query: '',
    activeCategory: 'ALL',
    drawer: null,
    poModal: null,
    loading: true,
    error: '',
  }))

  useEffect(() => {
    let isMounted = true

    async function loadInventoryData() {
      setAppState((current) => ({ ...current, loading: true, error: '' }))

      try {
        const [inventory, categories, suppliers, purchaseOrders] = await Promise.all([
          inventoryService.getAll(),
          categoryService.getAll(),
          supplierService.getAll(),
          orderService.getAll(),
        ])

        if (!isMounted) return

        setAppState((current) => ({
          ...current,
          inventory,
          categories,
          suppliers: withActiveOrderCounts(suppliers, purchaseOrders),
          purchaseOrders,
          loading: false,
          error: '',
        }))
      } catch (error) {
        if (!isMounted) return
        setAppState((current) => ({
          ...current,
          loading: false,
          error: errorMessage(error),
        }))
      }
    }

    loadInventoryData()

    return () => {
      isMounted = false
    }
  }, [])

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

  async function saveInventory(form) {
    const drawer = appState.drawer
    if (!drawer) return

    setAppState((current) => ({ ...current, loading: true, error: '' }))

    try {
      const savedItem =
        drawer.mode === 'edit'
          ? await inventoryService.update(drawer.item.id, form)
          : await inventoryService.create(form, appState.inventory)

      setAppState((current) => ({
        ...current,
        drawer: null,
        loading: false,
        categories: current.categories.some(
          (category) => category.name.toLowerCase() === savedItem.category.toLowerCase(),
        )
          ? current.categories
          : [...current.categories, { id: savedItem.categoryId, name: savedItem.category }],
        inventory:
          drawer.mode === 'edit'
            ? current.inventory.map((item) =>
                item.id === savedItem.id ? savedItem : item,
              )
            : [...current.inventory, savedItem],
      }))
    } catch (error) {
      setAppState((current) => ({
        ...current,
        loading: false,
        error: errorMessage(error),
      }))
    }
  }

  async function deleteInventoryItem(item) {
    const confirmed = window.confirm(`Remove ${item.name} from the matrix registry?`)
    if (!confirmed) return

    setAppState((current) => ({ ...current, loading: true, error: '' }))

    try {
      await inventoryService.remove(item.id)
      setAppState((current) => ({
        ...current,
        loading: false,
        inventory: current.inventory.filter((entry) => entry.id !== item.id),
      }))
    } catch (error) {
      setAppState((current) => ({
        ...current,
        loading: false,
        error: errorMessage(error),
      }))
    }
  }

  function openPoModal(supplier = null) {
    setAppState((current) => ({
      ...current,
      poModal: { supplier: supplier || '' },
    }))
  }

  function closePoModal() {
    setAppState((current) => ({ ...current, poModal: null }))
  }

  async function createPurchaseOrder(form) {
    setAppState((current) => ({ ...current, loading: true, error: '' }))

    try {
      const purchaseOrder = await orderService.create(form, appState.purchaseOrders)

      setAppState((current) => {
        const purchaseOrders = [...current.purchaseOrders, purchaseOrder]
        return {
          ...current,
          poModal: null,
          activeTab: 'orders',
          purchaseOrders,
          suppliers: withActiveOrderCounts(current.suppliers, purchaseOrders),
          loading: false,
        }
      })
    } catch (error) {
      setAppState((current) => ({
        ...current,
        loading: false,
        error: errorMessage(error),
      }))
    }
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

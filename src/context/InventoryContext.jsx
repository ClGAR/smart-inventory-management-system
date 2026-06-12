/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react'
import { useInventory } from '../hooks/useInventory.js'

const InventoryContext = createContext(null)

export function InventoryProvider({ children }) {
  const inventory = useInventory()

  return (
    <InventoryContext.Provider value={inventory}>
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventoryContext() {
  const value = useContext(InventoryContext)
  if (!value) {
    throw new Error('useInventoryContext must be used within an InventoryProvider')
  }
  return value
}

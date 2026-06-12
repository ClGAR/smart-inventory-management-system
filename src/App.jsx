import InventoryDrawer from './components/inventory/InventoryDrawer.jsx'
import PurchaseOrderModal from './components/inventory/PurchaseOrderModal.jsx'
import Layout from './components/layout/Layout.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { InventoryProvider, useInventoryContext } from './context/InventoryContext.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Inventory from './pages/Inventory.jsx'
import Orders from './pages/Orders.jsx'
import Suppliers from './pages/Suppliers.jsx'

function AppRoutes() {
  const inventory = useInventoryContext()

  return (
    <Layout
      activeTab={inventory.activeTab}
      query={inventory.query}
      setActiveTab={inventory.setActiveTab}
      setQuery={inventory.setQuery}
    >
      {inventory.activeTab === 'telemetry' ? (
        <Dashboard
          inventory={inventory.inventory}
          stats={inventory.stats}
          openRestock={(item) => inventory.openPoModal(item.supplier)}
        />
      ) : null}

      {inventory.activeTab === 'assets' ? (
        <Inventory
          inventory={inventory.inventory}
          query={inventory.query}
          activeCategory={inventory.activeCategory}
          setActiveCategory={inventory.setActiveCategory}
          openInventoryDrawer={inventory.openInventoryDrawer}
          deleteInventoryItem={inventory.deleteInventoryItem}
        />
      ) : null}

      {inventory.activeTab === 'suppliers' ? (
        <Suppliers
          suppliers={inventory.suppliers}
          query={inventory.query}
          openPoModal={inventory.openPoModal}
        />
      ) : null}

      {inventory.activeTab === 'orders' ? (
        <Orders
          purchaseOrders={inventory.purchaseOrders}
          query={inventory.query}
          openPoModal={inventory.openPoModal}
        />
      ) : null}

      {inventory.drawer ? (
        <InventoryDrawer
          key={inventory.drawer.item?.id || 'new'}
          drawer={inventory.drawer}
          suppliers={inventory.suppliers}
          closeDrawer={inventory.closeDrawer}
          saveInventory={inventory.saveInventory}
        />
      ) : null}

      {inventory.poModal ? (
        <PurchaseOrderModal
          key={inventory.poModal.supplier}
          poModal={inventory.poModal}
          suppliers={inventory.suppliers}
          closePoModal={inventory.closePoModal}
          createPurchaseOrder={inventory.createPurchaseOrder}
        />
      ) : null}
    </Layout>
  )
}

function App() {
  return (
    <AuthProvider>
      <InventoryProvider>
        <AppRoutes />
      </InventoryProvider>
    </AuthProvider>
  )
}

export default App

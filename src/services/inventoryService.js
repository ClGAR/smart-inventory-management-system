import { todayStamp } from '../utils/formatters.js'
import { getStatus } from '../utils/validators.js'

const seedInventory = [
  {
    rack: 'A-04',
    name: 'Quantum Core V2',
    id: 'INV-101',
    category: 'Energy',
    units: 140,
    price: 1250,
    supplier: 'Aether Kinetics',
    minThreshold: 30,
    maxTarget: 160,
  },
  {
    rack: 'B-12',
    name: 'Holo-Optic Lens',
    id: 'INV-102',
    category: 'Cybernetics',
    units: 24,
    price: 450,
    supplier: 'Synapse Tech',
    minThreshold: 30,
    maxTarget: 80,
  },
  {
    rack: 'C-02',
    name: 'Bio-Synth Gel Pack',
    id: 'INV-103',
    category: 'Biotech',
    units: 8,
    price: 85,
    supplier: 'Nova BioLabs',
    minThreshold: 30,
    maxTarget: 60,
  },
  {
    rack: 'B-09',
    name: 'Neural Link Adapter',
    id: 'INV-104',
    category: 'Cybernetics',
    units: 85,
    price: 920,
    supplier: 'Synapse Tech',
    minThreshold: 30,
    maxTarget: 100,
  },
  {
    rack: 'A-15',
    name: 'Graphene Matrix Panel',
    id: 'INV-105',
    category: 'Energy',
    units: 12,
    price: 680,
    supplier: 'Aether Kinetics',
    minThreshold: 30,
    maxTarget: 40,
  },
  {
    rack: 'D-01',
    name: 'Titanium Shell Chassis',
    id: 'INV-106',
    category: 'Hardware',
    units: 3,
    price: 1500,
    supplier: 'Apex Photonics',
    minThreshold: 30,
    maxTarget: 35,
  },
  {
    rack: 'C-08',
    name: 'Myo-Elastic Fiber Bundle',
    id: 'INV-107',
    category: 'Biotech',
    units: 110,
    price: 340,
    supplier: 'Nova BioLabs',
    minThreshold: 30,
    maxTarget: 130,
  },
]

const seedSuppliers = [
  {
    name: 'Aether Kinetics',
    type: 'Energy Supplier',
    score: 4.9,
    email: 'procure@aether.io',
    activeOrders: 2,
  },
  {
    name: 'Apex Photonics',
    type: 'Hardware Supplier',
    score: 4.7,
    email: 'sales@apexphoto.com',
    activeOrders: 1,
  },
  {
    name: 'Nova BioLabs',
    type: 'Biotech Supplier',
    score: 4.5,
    email: 'supply@novabio.org',
    activeOrders: 3,
  },
  {
    name: 'Synapse Tech',
    type: 'Cybernetics Supplier',
    score: 4.8,
    email: 'b2b@synapsetech.co',
    activeOrders: 0,
  },
]

const seedPurchaseOrders = [
  {
    hash: 'PO-2026-01',
    supplier: 'Aether Kinetics',
    date: '2026-06-10',
    items: 3,
    cost: 3750,
    status: 'SHIPPED',
  },
  {
    hash: 'PO-2026-02',
    supplier: 'Nova BioLabs',
    date: '2026-06-12',
    items: 5,
    cost: 425,
    status: 'PROCESSING',
  },
  {
    hash: 'PO-2026-03',
    supplier: 'Apex Photonics',
    date: '2026-06-08',
    items: 1,
    cost: 1500,
    status: 'DELIVERED',
  },
]

function nextInventoryId(inventory) {
  const maxId = inventory.reduce((max, item) => {
    const value = Number(item.id.replace('INV-', ''))
    return Number.isNaN(value) ? max : Math.max(max, value)
  }, 100)
  return `INV-${String(maxId + 1).padStart(3, '0')}`
}

function nextPoHash(purchaseOrders) {
  const maxId = purchaseOrders.reduce((max, order) => {
    const value = Number(order.hash.replace('PO-2026-', ''))
    return Number.isNaN(value) ? max : Math.max(max, value)
  }, 0)
  return `PO-2026-${String(maxId + 1).padStart(2, '0')}`
}

export function getInitialInventory() {
  return seedInventory.map((item) => ({ ...item }))
}

export function getInitialSuppliers() {
  return seedSuppliers.map((supplier) => ({ ...supplier }))
}

export function getInitialPurchaseOrders() {
  return seedPurchaseOrders.map((order) => ({ ...order }))
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

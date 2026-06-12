import { Boxes, ClipboardList, Radar, Truck } from 'lucide-react'

export const CATEGORIES = ['Energy', 'Cybernetics', 'Biotech', 'Hardware']

export const NAV_TABS = [
  { id: 'telemetry', label: 'Telemetry Hub', icon: Radar },
  { id: 'assets', label: 'Matrix Assets', icon: Boxes },
  { id: 'suppliers', label: 'Suppliers', icon: Truck },
  { id: 'orders', label: 'PO Registry', icon: ClipboardList },
]

export const BLANK_INVENTORY_FORM = {
  name: '',
  category: 'Energy',
  rack: '',
  units: 0,
  minThreshold: 20,
  price: 100,
  supplier: 'Aether Kinetics',
}

export const BLANK_PO_FORM = {
  supplier: 'Aether Kinetics',
  items: 1,
  cost: 100,
}

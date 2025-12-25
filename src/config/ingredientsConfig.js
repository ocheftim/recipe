// src/config/ingredientsConfig.js
export const FIELD_WIDTHS = {
  name: '200px',
  supplier: '200px',        // ✅ ADDED: Supplier column
  category: '100px',
  apCost: '100px',
  costPerUnit: '120px',     // ✅ INCREASED: For "$0.30/each" format
  allergens: '150px',
  updatedAtFormatted: '100px',
  stock: '100px',
  actions: '80px'
  // ✅ REMOVED: caseDescription (omitted from table)
};

export const COLUMN_CONFIG = {
  name: {
    label: 'Ingredient Name',
    width: FIELD_WIDTHS.name,
    sortable: true,
    defaultVisible: true,
    align: 'left'
  },
  supplier: {                // ✅ ADDED: Supplier column config
    label: 'Supplier',
    width: FIELD_WIDTHS.supplier,
    sortable: true,
    defaultVisible: true,
    align: 'center'
  },
  category: {
    label: 'Category',
    width: FIELD_WIDTHS.category,
    sortable: true,
    defaultVisible: true,
    align: 'center'
  },
  apCost: {
    label: 'AP Cost',
    width: FIELD_WIDTHS.apCost,
    sortable: true,
    defaultVisible: true,
    align: 'right'
  },
  costPerUnit: {
    label: 'Cost/Unit',
    width: FIELD_WIDTHS.costPerUnit,
    sortable: true,
    defaultVisible: true,
    align: 'right'           // ✅ UPDATED: Right-aligned for currency with padding
  },
  allergens: {
    label: 'Allergens',
    width: FIELD_WIDTHS.allergens,
    sortable: false,
    defaultVisible: true,    // ✅ CHANGED: Now visible by default
    align: 'center'
  },
  updatedAtFormatted: {
    label: 'Updated',
    width: FIELD_WIDTHS.updatedAtFormatted,
    sortable: true,
    defaultVisible: true,
    align: 'center'
  },
  stock: {
    label: 'Stock',
    width: FIELD_WIDTHS.stock,
    sortable: true,
    defaultVisible: true,
    align: 'center'
  }
  // ✅ REMOVED: caseDescription completely
};

// ✅ UPDATED: New column order as requested
// Name + SKU → Supplier → Category → AP Cost → Cost/Unit → Allergens → Updated → Stock → Actions
export const DEFAULT_COLUMN_ORDER = [
  'name', 
  'supplier', 
  'category', 
  'apCost', 
  'costPerUnit', 
  'allergens', 
  'updatedAtFormatted', 
  'stock'
];

export const DEFAULT_VISIBLE_COLUMNS = Object.keys(COLUMN_CONFIG).reduce((acc, key) => {
  acc[key] = COLUMN_CONFIG[key].defaultVisible;
  return acc;
}, {});
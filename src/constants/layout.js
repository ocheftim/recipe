// src/constants/layout.js

// Color constants for consistent theming
export const COLORS = {
  navbar: {
    active: '#427bc2',        // Proper 6-digit hex color (blue)
    hover: '#E5E7EB',        // Current hover state (gray-300)
    iconActive: '#FFFFFF',    // White icons when active
    iconInactive: '#4B5563',  // Gray icons when inactive
    iconHover: '#1F2937'      // Darker gray icons on hover
  },
  primary: '#3B82F6',        // Blue for buttons, etc.
  secondary: '#6B7280',      // Gray for secondary elements
  // Add more as needed
};

// Fixed field widths for consistent UI alignment
export const FIELD_WIDTHS = {
  // Search and filters
  search: 300,
  category: 140,
  supplier: 180,
  // Form fields
  short: 80,
  medium: 120,
  long: 200,
  extraLong: 280,
  // Table columns
  name: 200,
  vendorName: 250,
  unit: 80,
  cost: 100,
  caseSize: 150,
  stock: 80,
  reorder: 80,
  actions: 120
};

export const TABLE_COLUMNS = {
  name: 'w-48', // 192px
  category: 'w-32', // 128px
  unit: 'w-24', // 96px
  apCost: 'w-32', // 128px
  unitCost: 'w-32', // 128px
  caseSize: 'w-40', // 160px
  stock: 'w-24', // 96px
  reorder: 'w-24', // 96px
  supplier: 'w-40', // 160px
  actions: 'w-32' // 128px
};
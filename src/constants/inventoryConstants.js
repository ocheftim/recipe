// src/constants/inventoryConstants.js
// Color Constants
export const COLORS = {
    primary: '#2A3E51',
    secondary: '#3797FC',
    secondaryHover: '#2563eb',
    background: '#EDF1F2',
    border: '#D8E1E1',
    hoverBackground: '#C5E598',
    white: '#ffffff',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    green600: '#059669',
    green100: '#DCFCE7',
    green800: '#166534',
    yellow100: '#FEF3C7',
    yellow800: '#92400E',
    red50: '#FEF2F2',
    red100: '#FEE2E2',
    red600: '#DC2626',
    red700: '#B91C1C',
    orange100: '#FED7AA',
    orange800: '#9A3412'
  };
  
  // Field Width Constants for Inventory
  export const FIELD_WIDTHS = {
    name: '200px',
    code: '100px',
    category: '140px',
    supplier: '150px',
    currentStock: '100px',
    unit: '80px',
    minStock: '90px',
    maxStock: '90px',
    status: '120px',
    costPerUnit: '110px',
    lastReceived: '120px',
    expirationDate: '130px',
    location: '150px',
    actions: '120px'
  };
  
  // Layout Constants
  export const LAYOUT = {
    maxWidth: 'max-w-7xl',
    padding: 'p-6',
    background: 'bg-white',
    minHeight: 'min-h-screen',
    headerMargin: 'mb-6',
    toolbarMargin: 'mb-6',
    statsMargin: 'mb-4'
  };
  
  // Component Spacing
  export const SPACING = {
    small: '8px',
    medium: '16px',
    large: '24px',
    xlarge: '32px'
  };
  
  // Inventory Status Colors
  export const STATUS_COLORS = {
    'In Stock': {
      background: 'bg-green-100',
      text: 'text-green-800'
    },
    'Low Stock': {
      background: 'bg-yellow-100',
      text: 'text-yellow-800'
    },
    'Out of Stock': {
      background: 'bg-red-100',
      text: 'text-red-800'
    },
    'On Order': {
      background: 'bg-blue-100',
      text: 'text-blue-800'
    }
  };
  
  // Button Styles
  export const BUTTON_STYLES = {
    primary: 'px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm font-medium',
    secondary: 'px-3 py-2 text-sm bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors',
    success: 'px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors',
    warning: 'px-3 py-2 text-sm bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors',
    danger: 'px-3 py-2 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors',
    link: 'text-blue-600 hover:text-blue-800 text-sm'
  };
  
  // Input Styles
  export const INPUT_STYLES = {
    search: 'pl-10 pr-4 py-3 w-72 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
    select: 'px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
  };
  
  // Inventory Categories
  export const INVENTORY_CATEGORIES = [
    'Meat',
    'Seafood',
    'Poultry',
    'Vegetables',
    'Fruits',
    'Dairy',
    'Grains & Starches',
    'Oils & Vinegars',
    'Seasonings',
    'Beverages',
    'Frozen',
    'Canned Goods',
    'Baking Supplies',
    'Cleaning Supplies',
    'Paper Goods'
  ];
  
  // Units of Measurement
  export const INVENTORY_UNITS = [
    'lbs',
    'kg',
    'oz',
    'g',
    'gallons',
    'liters',
    'quarts',
    'cups',
    'pieces',
    'cases',
    'boxes',
    'bottles',
    'containers',
    'bags'
  ];
  
  // Storage Locations
  export const STORAGE_LOCATIONS = [
    'Walk-in Cooler A',
    'Walk-in Cooler B',
    'Walk-in Freezer',
    'Dry Storage',
    'Pantry',
    'Wine Cellar',
    'Prep Kitchen',
    'Bar Storage',
    'Cleaning Closet'
  ];
  
  // Inventory Statuses
  export const INVENTORY_STATUSES = [
    'In Stock',
    'Low Stock', 
    'Out of Stock',
    'On Order',
    'Discontinued'
  ];
  
  // Alert Thresholds
  export const ALERT_SETTINGS = {
    lowStockDays: 3,
    expirationWarningDays: 3,
    criticalStockPercentage: 25
  };
  
  // Inventory Table CSS
  export const TABLE_CSS = `
    .inventory-table tbody tr {
      background-color: white;
      border-bottom: 1px solid #D8E1E1;
      height: 50px;
    }
    .inventory-table tbody tr:hover {
      background-color: #C5E598 !important;
    }
    .inventory-table tbody tr.active {
      background-color: #C5E598;
    }
    .inventory-table th {
      background-color: #EDF1F2;
      color: #2A3E51;
      border-right: 1px solid #D8E1E1;
      padding: 8px 16px;
    }
    .inventory-table td {
      border-right: 1px solid #D8E1E1;
      padding: 8px 16px;
    }
    .inventory-table a, 
    .inventory-table .text-link,
    .inventory-table .item-name,
    .inventory-table .item-name button,
    .inventory-table .item-name a,
    .inventory-table button.link-style,
    .inventory-table .edit-link,
    .inventory-table [data-clickable="true"] {
      color: #3797FC !important;
      text-decoration: none;
      cursor: pointer;
    }
    .inventory-table .item-name:hover,
    .inventory-table .edit-link:hover {
      color: #2563eb !important;
      text-decoration: underline;
    }
    .inventory-table .status-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
    .inventory-table .stock-level {
      font-weight: 600;
    }
    .inventory-table .low-stock {
      color: #92400E;
    }
    .inventory-table .out-of-stock {
      color: #B91C1C;
    }
    .inventory-table .in-stock {
      color: #166534;
    }
  `;
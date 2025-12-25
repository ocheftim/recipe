// src/constants/recipeConstants.js - FIXED - All required constants
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
  red700: '#B91C1C'
};

// Field Width Constants (matching your Ingredients system)
export const FIELD_WIDTHS = {
  name: '200px',
  code: '100px',
  category: '120px',
  cuisine: '120px',
  outlet: '100px',
  menu: '100px',
  yield: '100px',
  costPerServing: '120px',
  menuPrice: '120px',
  foodCostPercent: '120px',
  profitMargin: '120px',
  status: '100px',
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

// Recipe Status Colors
export const STATUS_COLORS = {
  Active: {
    background: 'bg-green-100',
    text: 'text-green-800'
  },
  Draft: {
    background: 'bg-yellow-100',
    text: 'text-yellow-800'
  },
  Archived: {
    background: 'bg-gray-100',
    text: 'text-gray-800'
  }
};

// Button Styles
export const BUTTON_STYLES = {
  primary: 'px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm font-medium',
  secondary: 'px-3 py-2 text-sm bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors',
  danger: 'px-3 py-2 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors',
  link: 'text-blue-600 hover:text-blue-800 text-sm'
};

// Input Styles
export const INPUT_STYLES = {
  search: 'pl-10 pr-4 py-3 w-72 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
};

// Recipe Data Constants (required by existing components)
export const RECIPE_CATEGORIES = [
  'Appetizer',
  'Soup',
  'Salad', 
  'Main',
  'Side',
  'Dessert',
  'Beverage',
  'Sauce',
  'Snack'
];

export const RECIPE_CUISINES = [
  'American',
  'Italian',
  'French',
  'Mediterranean',
  'Asian',
  'Mexican',
  'Indian',
  'Thai',
  'Japanese',
  'Chinese',
  'Greek',
  'Spanish',
  'Middle Eastern'
];

export const RECIPE_OUTLETS = [
  'Bistro',
  'Fine Dining',
  'Casual Dining',
  'Fast Casual',
  'Bar',
  'Catering',
  'Takeout'
];

export const RECIPE_STATUSES = [
  'Active',
  'Draft', 
  'Archived',
  'Testing'
];

export const YIELD_UNITS = [
  'servings',
  'portions',
  'pieces',
  'cups',
  'liters',
  'pounds',
  'kilograms'
];

export const DIETARY_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Nut-Free',
  'Low-Carb',
  'Keto',
  'Paleo'
];

// Cost Settings (required by RecipeModal and MenuPricingTab)
export const COST_SETTINGS = {
  defaultFoodCostTarget: 30,
  defaultProfitMargin: 15,
  laborCostPercentage: 25,
  overheadPercentage: 15,
  currency: 'USD',
  currencySymbol: '$'
};

// Recipe Table CSS (to be moved to proper CSS file)
export const TABLE_CSS = `
  .recipe-table tbody tr {
    background-color: white;
    border-bottom: 1px solid #D8E1E1;
    height: 50px;
  }
  .recipe-table tbody tr:hover {
    background-color: #C5E598 !important;
  }
  .recipe-table tbody tr.active {
    background-color: #C5E598;
  }
  .recipe-table th {
    background-color: #EDF1F2;
    color: #2A3E51;
    border-right: 1px solid #D8E1E1;
    padding: 8px 16px;
  }
  .recipe-table td {
    border-right: 1px solid #D8E1E1;
    padding: 8px 16px;
  }
  .recipe-table a, 
  .recipe-table .text-link,
  .recipe-table .recipe-name,
  .recipe-table .recipe-name button,
  .recipe-table .recipe-name a,
  .recipe-table button.link-style,
  .recipe-table .edit-link,
  .recipe-table [data-clickable="true"] {
    color: #3797FC !important;
    text-decoration: none;
    cursor: pointer;
  }
  .recipe-table .recipe-name:hover,
  .recipe-table .edit-link:hover {
    color: #2563eb !important;
    text-decoration: underline;
  }
`;
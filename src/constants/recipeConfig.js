// src/constants/recipeConfig.js

export const COLUMN_CONFIG = {
  select: { 
    label: 'Select', 
    width: '50px',
    alwaysVisible: true  // Mark as always visible for bulk operations
  },
  name: { 
    label: 'Recipe Name', 
    width: '200px',
    alwaysVisible: true  // Name should always be visible
  },
  category: { 
    label: 'Category', 
    width: '120px' 
  },
  servings: { 
    label: 'Servings', 
    width: '80px' 
  },
  costPerServing: { 
    label: 'Cost/Serving', 
    width: '120px' 
  },
  totalCost: { 
    label: 'Total Cost', 
    width: '100px' 
  },
  sellingPrice: { 
    label: 'Selling Price', 
    width: '120px' 
  },
  foodCost: { 
    label: 'Food Cost %', 
    width: '120px' 
  },
  updated: { 
    label: 'Updated', 
    width: '100px' 
  },
  actions: { 
    label: 'Actions', 
    width: '80px',
    alwaysVisible: true  // Actions should always be visible
  }
};

export const FILTER_OPTIONS = {
  category: [
    'Appetizers',
    'Salads',
    'Soups',
    'Entrées',
    'Desserts',
    'Beverages',
    'Sides'
  ],
  foodCostRange: [
    { value: 'under20', label: 'Under 20%' },
    { value: '20to30', label: '20% - 30%' },
    { value: 'over30', label: 'Over 30%' }
  ]
};
// src/config/recipesConfig.js - External configuration for RecipeTable

// Recipe column configuration - matches IngredientsTable structure exactly
export const COLUMN_CONFIG = {
  name: { 
    label: 'Recipe Name', 
    sortable: true, 
    align: 'left' 
  },
  category: { 
    label: 'Category', 
    sortable: true, 
    align: 'left' 
  },
  cuisine: { 
    label: 'Cuisine', 
    sortable: true, 
    align: 'left' 
  },
  outlet: { 
    label: 'Outlet', 
    sortable: true, 
    align: 'left' 
  },
  menu: { 
    label: 'Menu', 
    sortable: true, 
    align: 'left' 
  },
  yield: { 
    label: 'Yield', 
    sortable: true, 
    align: 'left' 
  },
  totalCost: { 
    label: 'AP $', 
    sortable: true, 
    align: 'right' 
  },
  costPerServing: { 
    label: 'Cost/Unit', 
    sortable: true, 
    align: 'right' 
  },
  menuPrice: { 
    label: 'Menu $', 
    sortable: true, 
    align: 'right' 
  },
  foodCostPercent: { 
    label: 'FC %', 
    sortable: true, 
    align: 'right' 
  },
  dietary: { 
    label: 'Dietary', 
    sortable: false, 
    align: 'left' 
  },
  lastUpdated: { 
    label: 'Updated', 
    sortable: true, 
    align: 'left' 
  }
};

// Recipe field widths - matches IngredientsTable structure exactly
export const FIELD_WIDTHS = {
  name: '200px',
  category: '100px',
  cuisine: '100px',
  outlet: '110px',
  menu: '100px', 
  yield: '110px',
  totalCost: '90px',
  costPerServing: '90px',
  menuPrice: '90px',
  foodCostPercent: '90px',
  dietary: '80px',
  lastUpdated: '80px',
  actions: '80px'
};
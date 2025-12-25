// src/config/recipeColumns.js

export const RECIPE_COLUMNS = [
  { 
    key: 'name', 
    label: 'Recipe Name', 
    header: 'Recipe Name',
    sortable: true, 
    width: '180px' 
  },
  { 
    key: 'category', 
    label: 'Category', 
    header: 'Category',
    sortable: true, 
    width: '80px', 
    type: 'badge' 
  },
  { 
    key: 'cuisine', 
    label: 'Cuisine', 
    header: 'Cuisine',
    sortable: true, 
    width: '80px' 
  },
  { 
    key: 'outlet', 
    label: 'Outlet', 
    header: 'Outlet',
    sortable: true, 
    width: '100px' 
  },
  { 
    key: 'yield', 
    label: 'Yield', 
    header: 'Yield',
    sortable: true, 
    width: '70px' 
  },
  { 
    key: 'costPerServing', 
    label: 'Cost/Srv', 
    header: 'Cost/Srv',
    sortable: true, 
    width: '80px', 
    type: 'currency', 
    align: 'right' 
  },
  { 
    key: 'menuPrice', 
    label: 'Price', 
    header: 'Price',
    sortable: true, 
    width: '80px', 
    type: 'currency', 
    align: 'right' 
  },
  { 
    key: 'foodCostPercent', 
    label: 'Cost %', 
    header: 'Cost %',
    sortable: true, 
    width: '70px', 
    type: 'percentage', 
    align: 'right' 
  },
  { 
    key: 'dietary', 
    label: 'Diet', 
    header: 'Diet',
    width: '120px', 
    type: 'tags' 
  },
  { 
    key: 'actions', 
    label: 'Actions', 
    header: 'Actions',
    width: '120px', 
    type: 'actions' 
  }
];

export default RECIPE_COLUMNS;
// src/config/ingredientColumns.js
export const INGREDIENT_COLUMNS = [
  {
    key: 'name',
    header: 'Ingredient Name',
    label: 'Ingredient Name',
    sortable: true,
    width: '200px',
    type: 'name'
  },
  {
    key: 'supplier',
    header: 'Supplier',
    label: 'Supplier', 
    sortable: true,
    width: '150px',
    type: 'text'
  },
  {
    key: 'category',
    header: 'Category',
    label: 'Category',
    sortable: true,
    width: '120px',
    type: 'text'
  },
  {
    key: 'apCost',
    header: 'AP Cost',
    label: 'AP Cost',
    sortable: true,
    width: '100px',
    type: 'currency'
  },
  {
    key: 'costPerUnit',
    header: 'Cost/Unit',
    label: 'Cost/Unit',
    sortable: true,
    width: '120px',
    type: 'currency'
  },
  {
    key: 'allergens',
    header: 'Allergens',
    label: 'Allergens',
    sortable: false,
    width: '140px',
    type: 'tags'
  },
  {
    key: 'lastUpdated',
    header: 'Updated',
    label: 'Updated',
    sortable: true,
    width: '100px',
    type: 'text'
  },
  {
    key: 'stock',
    header: 'Stock',
    label: 'Stock',
    sortable: true,
    width: '80px',
    type: 'text'
  },
  {
    key: 'actions',
    header: 'Actions',
    label: 'Actions',
    sortable: false,
    width: '100px',
    type: 'actions'
  }
];
// Column configuration for ingredients table
export const COLUMN_LABELS = {
    name: 'Name',
    vendor: 'Vendor', 
    category: 'Category',
    apCost: 'AP Cost',
    caseDescription: 'Description',
    costPerUnit: 'Cost/Unit',
    allergens: 'Allergens',
    lastUpdated: 'Updated',
    stock: 'Stock'
    // Note: Removed 'dietaryTags' - that belongs to recipes, not ingredients
  };
  
  export const REQUIRED_COLUMNS = ['name'];
  
  export const COLUMN_MENU_CONFIG = {
    maxHeight: 400,
    itemHeight: 36,
    headerHeight: 40
  };
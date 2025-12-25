// src/data/Ingredients/ingredientsData.js

// Main ingredient data array
export const ingredientData = [
  // PROTEINS
  {
    id: 1,
    name: 'Chicken Breast',
    category: 'Proteins',
    subcategory: 'Poultry',
    supplier: 'US Foods',
    price: 45.00,
    apCost: 45.00,
    apCostPerUnit: 45.00,
    costPerUnit: 2.25,
    caseDescription: 'Case of 40 lbs',
    caseQuantity: 40,
    caseUnit: 'lb',
    unit: 'lb',
    defaultUnit: 'lb',
    sku: 'USF-4521',
    storageLocation: 'Walk-in Cooler',
    minimumStock: 2,
    reorderPoint: 3,
    allergens: [],
    dietaryFlags: ['Gluten-Free'],
    updated: '2024-01-15T10:30:00Z',
    provisional: false
  },
  {
    id: 2,
    name: 'Ground Beef 80/20',
    category: 'Proteins',
    subcategory: 'Beef',
    supplier: 'Sysco',
    price: 65.00,
    apCost: 65.00,
    apCostPerUnit: 65.00,
    costPerUnit: 3.25,
    caseDescription: 'Case of 20 lbs',
    caseQuantity: 20,
    caseUnit: 'lb',
    unit: 'lb',
    defaultUnit: 'lb',
    sku: 'SYS-8821',
    storageLocation: 'Walk-in Cooler',
    minimumStock: 3,
    reorderPoint: 5,
    allergens: [],
    dietaryFlags: ['Gluten-Free'],
    updated: '2024-01-15T10:30:00Z',
    provisional: false
  },
  {
    id: 3,
    name: 'Salmon Fillet',
    category: 'Proteins',
    subcategory: 'Seafood',
    supplier: 'Pacific Seafood',
    price: 120.00,
    apCost: 120.00,
    apCostPerUnit: 120.00,
    costPerUnit: 12.00,
    caseDescription: 'Case of 10 lbs',
    caseQuantity: 10,
    caseUnit: 'lb',
    unit: 'lb',
    defaultUnit: 'lb',
    sku: 'PS-3301',
    storageLocation: 'Walk-in Cooler',
    minimumStock: 1,
    reorderPoint: 2,
    allergens: ['Fish'],
    dietaryFlags: ['Gluten-Free'],
    updated: '2024-01-15T10:30:00Z',
    provisional: false
  },
  {
    id: 4,
    name: 'Pork Shoulder',
    category: 'Proteins',
    subcategory: 'Pork',
    supplier: 'US Foods',
    price: 55.00,
    apCost: 55.00,
    apCostPerUnit: 55.00,
    costPerUnit: 2.75,
    caseDescription: 'Case of 20 lbs',
    caseQuantity: 20,
    caseUnit: 'lb',
    unit: 'lb',
    defaultUnit: 'lb',
    sku: 'USF-3392',
    storageLocation: 'Walk-in Cooler',
    minimumStock: 2,
    reorderPoint: 3,
    allergens: [],
    dietaryFlags: ['Gluten-Free'],
    updated: '2024-01-14T09:15:00Z',
    provisional: false
  },

  // PRODUCE
  {
    id: 5,
    name: 'Tomatoes',
    category: 'Produce',
    subcategory: 'Vegetables',
    supplier: 'Fresh Produce Co',
    price: 28.00,
    apCost: 28.00,
    apCostPerUnit: 28.00,
    costPerUnit: 1.12,
    caseDescription: 'Case of 25 lbs',
    caseQuantity: 25,
    caseUnit: 'lb',
    unit: 'lb',
    defaultUnit: 'lb',
    sku: 'FP-1122',
    storageLocation: 'Produce Cooler',
    minimumStock: 2,
    reorderPoint: 3,
    allergens: [],
    dietaryFlags: ['Vegan', 'Gluten-Free'],
    updated: '2024-01-16T08:00:00Z',
    provisional: false
  },
  {
    id: 6,
    name: 'Russet Potatoes',
    category: 'Produce',
    subcategory: 'Vegetables',
    supplier: 'Fresh Produce Co',
    price: 18.00,
    apCost: 18.00,
    apCostPerUnit: 18.00,
    costPerUnit: 0.36,
    caseDescription: 'Case of 50 lbs',
    caseQuantity: 50,
    caseUnit: 'lb',
    unit: 'lb',
    defaultUnit: 'lb',
    sku: 'FP-2211',
    storageLocation: 'Dry Storage',
    minimumStock: 3,
    reorderPoint: 5,
    allergens: [],
    dietaryFlags: ['Vegan', 'Gluten-Free'],
    updated: '2024-01-16T08:00:00Z',
    provisional: false
  },
  {
    id: 7,
    name: 'Yellow Onions',
    category: 'Produce',
    subcategory: 'Vegetables',
    supplier: 'Fresh Produce Co',
    price: 22.00,
    apCost: 22.00,
    apCostPerUnit: 22.00,
    costPerUnit: 0.44,
    caseDescription: 'Case of 50 lbs',
    caseQuantity: 50,
    caseUnit: 'lb',
    unit: 'lb',
    defaultUnit: 'lb',
    sku: 'FP-3344',
    storageLocation: 'Dry Storage',
    minimumStock: 2,
    reorderPoint: 3,
    allergens: [],
    dietaryFlags: ['Vegan', 'Gluten-Free'],
    updated: '2024-01-16T08:00:00Z',
    provisional: false
  },
  {
    id: 8,
    name: 'Garlic',
    category: 'Produce',
    subcategory: 'Vegetables',
    supplier: 'Fresh Produce Co',
    price: 45.00,
    apCost: 45.00,
    apCostPerUnit: 45.00,
    costPerUnit: 4.50,
    caseDescription: 'Case of 10 lbs',
    caseQuantity: 10,
    caseUnit: 'lb',
    unit: 'lb',
    defaultUnit: 'clove',
    sku: 'FP-4455',
    storageLocation: 'Dry Storage',
    minimumStock: 1,
    reorderPoint: 2,
    allergens: [],
    dietaryFlags: ['Vegan', 'Gluten-Free'],
    updated: '2024-01-16T08:00:00Z',
    provisional: false
  },
  {
    id: 9,
    name: 'Romaine Lettuce',
    category: 'Produce',
    subcategory: 'Vegetables',
    supplier: 'Fresh Produce Co',
    price: 32.00,
    apCost: 32.00,
    apCostPerUnit: 32.00,
    costPerUnit: 1.33,
    caseDescription: 'Case of 24 heads',
    caseQuantity: 24,
    caseUnit: 'head',
    unit: 'head',
    defaultUnit: 'head',
    sku: 'FP-5566',
    storageLocation: 'Produce Cooler',
    minimumStock: 2,
    reorderPoint: 4,
    allergens: [],
    dietaryFlags: ['Vegan', 'Gluten-Free'],
    updated: '2024-01-16T08:00:00Z',
    provisional: false
  },

  // DAIRY
  {
    id: 10,
    name: 'Heavy Cream',
    category: 'Dairy',
    subcategory: 'Cream',
    supplier: 'Dairy Fresh',
    price: 48.00,
    apCost: 48.00,
    apCostPerUnit: 48.00,
    costPerUnit: 12.00,
    caseDescription: 'Case of 4 quarts',
    caseQuantity: 4,
    caseUnit: 'qt',
    unit: 'qt',
    defaultUnit: 'cup',
    sku: 'DF-5566',
    storageLocation: 'Walk-in Cooler',
    minimumStock: 2,
    reorderPoint: 4,
    allergens: ['Milk'],
    dietaryFlags: ['Vegetarian', 'Gluten-Free'],
    updated: '2024-01-15T11:00:00Z',
    provisional: false
  },
  {
    id: 11,
    name: 'Butter',
    category: 'Dairy',
    subcategory: 'Butter',
    supplier: 'Dairy Fresh',
    price: 54.00,
    apCost: 54.00,
    apCostPerUnit: 54.00,
    costPerUnit: 3.37,
    caseDescription: 'Case of 16 lbs',
    caseQuantity: 16,
    caseUnit: 'lb',
    unit: 'lb',
    defaultUnit: 'tbsp',
    sku: 'DF-6677',
    storageLocation: 'Walk-in Cooler',
    minimumStock: 2,
    reorderPoint: 3,
    allergens: ['Milk'],
    dietaryFlags: ['Vegetarian', 'Gluten-Free'],
    updated: '2024-01-15T11:00:00Z',
    provisional: false
  },
  {
    id: 12,
    name: 'Parmesan Cheese',
    category: 'Dairy',
    subcategory: 'Cheese',
    supplier: 'Italian Imports',
    price: 85.00,
    apCost: 85.00,
    apCostPerUnit: 85.00,
    costPerUnit: 8.50,
    caseDescription: 'Case of 10 lbs',
    caseQuantity: 10,
    caseUnit: 'lb',
    unit: 'lb',
    defaultUnit: 'oz',
    sku: 'II-7788',
    storageLocation: 'Walk-in Cooler',
    minimumStock: 1,
    reorderPoint: 2,
    allergens: ['Milk'],
    dietaryFlags: ['Vegetarian', 'Gluten-Free'],
    updated: '2024-01-15T11:00:00Z',
    provisional: false
  },
  {
    id: 13,
    name: 'Mozzarella Cheese',
    category: 'Dairy',
    subcategory: 'Cheese',
    supplier: 'Italian Imports',
    price: 65.00,
    apCost: 65.00,
    apCostPerUnit: 65.00,
    costPerUnit: 4.33,
    caseDescription: 'Case of 15 lbs',
    caseQuantity: 15,
    caseUnit: 'lb',
    unit: 'lb',
    defaultUnit: 'oz',
    sku: 'II-8899',
    storageLocation: 'Walk-in Cooler',
    minimumStock: 2,
    reorderPoint: 3,
    allergens: ['Milk'],
    dietaryFlags: ['Vegetarian', 'Gluten-Free'],
    updated: '2024-01-15T11:00:00Z',
    provisional: false
  },

  // DRY GOODS
  {
    id: 14,
    name: 'All-Purpose Flour',
    category: 'Dry Goods',
    subcategory: 'Baking',
    supplier: 'King Arthur',
    price: 25.00,
    apCost: 25.00,
    apCostPerUnit: 25.00,
    costPerUnit: 0.50,
    caseDescription: 'Bag of 50 lbs',
    caseQuantity: 50,
    caseUnit: 'lb',
    unit: 'lb',
    defaultUnit: 'cup',
    sku: 'KA-8899',
    storageLocation: 'Dry Storage',
    minimumStock: 2,
    reorderPoint: 3,
    allergens: ['Wheat'],
    dietaryFlags: ['Vegetarian', 'Vegan'],
    updated: '2024-01-14T14:00:00Z',
    provisional: false
  },
  {
    id: 15,
    name: 'White Rice',
    category: 'Dry Goods',
    subcategory: 'Grains',
    supplier: 'Sysco',
    price: 30.00,
    apCost: 30.00,
    apCostPerUnit: 30.00,
    costPerUnit: 0.60,
    caseDescription: 'Bag of 50 lbs',
    caseQuantity: 50,
    caseUnit: 'lb',
    unit: 'lb',
    defaultUnit: 'cup',
    sku: 'SYS-9900',
    storageLocation: 'Dry Storage',
    minimumStock: 2,
    reorderPoint: 3,
    allergens: [],
    dietaryFlags: ['Vegan', 'Gluten-Free'],
    updated: '2024-01-14T14:00:00Z',
    provisional: false
  },
  {
    id: 16,
    name: 'Pasta - Penne',
    category: 'Dry Goods',
    subcategory: 'Pasta',
    supplier: 'Italian Imports',
    price: 28.00,
    apCost: 28.00,
    apCostPerUnit: 28.00,
    costPerUnit: 1.40,
    caseDescription: 'Case of 20 lbs',
    caseQuantity: 20,
    caseUnit: 'lb',
    unit: 'lb',
    defaultUnit: 'lb',
    sku: 'II-1010',
    storageLocation: 'Dry Storage',
    minimumStock: 3,
    reorderPoint: 5,
    allergens: ['Wheat'],
    dietaryFlags: ['Vegetarian', 'Vegan'],
    updated: '2024-01-14T14:00:00Z',
    provisional: false
  },

  // OILS & VINEGARS
  {
    id: 17,
    name: 'Olive Oil',
    category: 'Oils & Vinegars',
    subcategory: 'Oils',
    supplier: 'Mediterranean Foods',
    price: 95.00,
    apCost: 95.00,
    apCostPerUnit: 95.00,
    costPerUnit: 23.75,
    caseDescription: 'Case of 4 gallons',
    caseQuantity: 4,
    caseUnit: 'gal',
    unit: 'gal',
    defaultUnit: 'tbsp',
    sku: 'MF-9900',
    storageLocation: 'Dry Storage',
    minimumStock: 1,
    reorderPoint: 2,
    allergens: [],
    dietaryFlags: ['Vegan', 'Gluten-Free'],
    updated: '2024-01-13T16:30:00Z',
    provisional: false
  },
  {
    id: 18,
    name: 'Balsamic Vinegar',
    category: 'Oils & Vinegars',
    subcategory: 'Vinegars',
    supplier: 'Mediterranean Foods',
    price: 65.00,
    apCost: 65.00,
    apCostPerUnit: 65.00,
    costPerUnit: 16.25,
    caseDescription: 'Case of 4 gallons',
    caseQuantity: 4,
    caseUnit: 'gal',
    unit: 'gal',
    defaultUnit: 'tbsp',
    sku: 'MF-8811',
    storageLocation: 'Dry Storage',
    minimumStock: 1,
    reorderPoint: 2,
    allergens: [],
    dietaryFlags: ['Vegan', 'Gluten-Free'],
    updated: '2024-01-13T16:30:00Z',
    provisional: false
  },

  // SEASONINGS & SPICES
  {
    id: 19,
    name: 'Kosher Salt',
    category: 'Seasonings',
    subcategory: 'Salt',
    supplier: 'Sysco',
    price: 12.00,
    apCost: 12.00,
    apCostPerUnit: 12.00,
    costPerUnit: 0.48,
    caseDescription: 'Case of 25 lbs',
    caseQuantity: 25,
    caseUnit: 'lb',
    unit: 'lb',
    defaultUnit: 'tsp',
    sku: 'SYS-1011',
    storageLocation: 'Dry Storage',
    minimumStock: 1,
    reorderPoint: 2,
    allergens: [],
    dietaryFlags: ['Vegan', 'Gluten-Free'],
    updated: '2024-01-12T12:00:00Z',
    provisional: false
  },
  {
    id: 20,
    name: 'Black Pepper',
    category: 'Seasonings',
    subcategory: 'Spices',
    supplier: 'Spice World',
    price: 65.00,
    apCost: 65.00,
    apCostPerUnit: 65.00,
    costPerUnit: 13.00,
    caseDescription: 'Case of 5 lbs',
    caseQuantity: 5,
    caseUnit: 'lb',
    unit: 'lb',
    defaultUnit: 'tsp',
    sku: 'SW-1122',
    storageLocation: 'Dry Storage',
    minimumStock: 1,
    reorderPoint: 2,
    allergens: [],
    dietaryFlags: ['Vegan', 'Gluten-Free'],
    updated: '2024-01-12T12:00:00Z',
    provisional: false
  },

  // CANNED GOODS
  {
    id: 21,
    name: 'Crushed Tomatoes',
    category: 'Canned Goods',
    subcategory: 'Tomatoes',
    supplier: 'San Marzano',
    price: 36.00,
    apCost: 36.00,
    apCostPerUnit: 36.00,
    costPerUnit: 6.00,
    caseDescription: 'Case of 6 #10 cans',
    caseQuantity: 6,
    caseUnit: 'can',
    unit: 'can',
    defaultUnit: 'can',
    sku: 'SM-3344',
    storageLocation: 'Dry Storage',
    minimumStock: 2,
    reorderPoint: 4,
    allergens: [],
    dietaryFlags: ['Vegan', 'Gluten-Free'],
    updated: '2024-01-11T09:45:00Z',
    provisional: false
  },
  {
    id: 22,
    name: 'Chicken Stock',
    category: 'Stocks & Broths',
    subcategory: 'Stocks',
    supplier: 'Kitchen Basics',
    price: 28.00,
    apCost: 28.00,
    apCostPerUnit: 28.00,
    costPerUnit: 1.75,
    caseDescription: 'Case of 16 quarts',
    caseQuantity: 16,
    caseUnit: 'qt',
    unit: 'qt',
    defaultUnit: 'cup',
    sku: 'KB-4455',
    storageLocation: 'Dry Storage',
    minimumStock: 2,
    reorderPoint: 4,
    allergens: [],
    dietaryFlags: ['Gluten-Free'],
    updated: '2024-01-11T09:45:00Z',
    provisional: false
  },

  // PROVISIONAL INGREDIENTS (Need validation)
  {
    id: 23,
    name: 'Fresh Basil',
    category: 'Herbs',
    subcategory: '',
    supplier: '',
    price: 0,
    apCost: 0,
    apCostPerUnit: 0,
    costPerUnit: 0,
    caseDescription: '',
    caseQuantity: 0,
    caseUnit: '',
    unit: 'bunch',
    defaultUnit: 'bunch',
    sku: '',
    storageLocation: '',
    minimumStock: 0,
    reorderPoint: 0,
    allergens: [],
    dietaryFlags: [],
    updated: '2024-01-17T10:00:00Z',
    provisional: true  // This needs validation
  },
  {
    id: 24,
    name: 'Saffron',
    category: '',
    subcategory: '',
    supplier: '',
    price: 0,
    apCost: 0,
    apCostPerUnit: 0,
    costPerUnit: 0,
    caseDescription: '',
    caseQuantity: 0,
    caseUnit: '',
    unit: 'g',
    defaultUnit: 'g',
    sku: '',
    storageLocation: '',
    minimumStock: 0,
    reorderPoint: 0,
    allergens: [],
    dietaryFlags: [],
    updated: '2024-01-17T11:00:00Z',
    provisional: true  // This needs validation
  }
];

// Export as initialIngredients for compatibility with InventoryManagement.js
export const initialIngredients = ingredientData;

// Helper function to get ingredient by ID or name
export const getIngredient = (idOrName) => {
  return ingredientData.find(ing => 
    ing.id === idOrName || 
    ing.id === parseInt(idOrName) ||
    ing.name.toLowerCase() === idOrName.toLowerCase()
  );
};

// Helper function to get ingredients by category
export const getIngredientsByCategory = (category) => {
  return ingredientData.filter(ing => 
    ing.category?.toLowerCase() === category.toLowerCase()
  );
};

// Helper function to search ingredients
export const searchIngredients = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return ingredientData.filter(ing => 
    ing.name.toLowerCase().includes(term) ||
    ing.category?.toLowerCase().includes(term) ||
    ing.subcategory?.toLowerCase().includes(term) ||
    ing.supplier?.toLowerCase().includes(term) ||
    ing.sku?.toLowerCase().includes(term)
  );
};

// Helper function to get provisional ingredients (those needing validation)
export const getProvisionalIngredients = () => {
  return ingredientData.filter(ing => ing.provisional === true);
};

// Helper function to validate an ingredient
export const validateIngredient = (ingredientId, validatedData) => {
  const index = ingredientData.findIndex(ing => 
    ing.id === ingredientId || ing.id === parseInt(ingredientId)
  );
  
  if (index !== -1) {
    // Update the ingredient with validated data
    ingredientData[index] = {
      ...ingredientData[index],
      ...validatedData,
      provisional: false,
      updated: new Date().toISOString()
    };
    return ingredientData[index];
  }
  return null;
};

// Helper function to add new ingredient
export const addIngredient = (newIngredient) => {
  // Find the highest existing ID
  const maxId = Math.max(...ingredientData.map(ing => 
    typeof ing.id === 'number' ? ing.id : 0
  ), 0);
  
  const ingredient = {
    id: newIngredient.id || maxId + 1,
    name: newIngredient.name,
    category: newIngredient.category || '',
    subcategory: newIngredient.subcategory || '',
    supplier: newIngredient.supplier || '',
    price: newIngredient.price || newIngredient.apCost || 0,
    apCost: newIngredient.apCost || newIngredient.price || 0,
    apCostPerUnit: newIngredient.apCostPerUnit || newIngredient.apCost || 0,
    costPerUnit: newIngredient.costPerUnit || 0,
    caseDescription: newIngredient.caseDescription || '',
    caseQuantity: newIngredient.caseQuantity || 0,
    caseUnit: newIngredient.caseUnit || '',
    unit: newIngredient.unit || '',
    defaultUnit: newIngredient.defaultUnit || newIngredient.unit || '',
    sku: newIngredient.sku || '',
    storageLocation: newIngredient.storageLocation || '',
    minimumStock: newIngredient.minimumStock || 0,
    reorderPoint: newIngredient.reorderPoint || 0,
    allergens: newIngredient.allergens || [],
    dietaryFlags: newIngredient.dietaryFlags || [],
    updated: newIngredient.updated || new Date().toISOString(),
    provisional: newIngredient.provisional !== undefined ? newIngredient.provisional : true,
    ...newIngredient
  };
  
  ingredientData.push(ingredient);
  return ingredient;
};

// Helper function to update an existing ingredient
export const updateIngredient = (ingredientId, updates) => {
  const index = ingredientData.findIndex(ing => 
    ing.id === ingredientId || ing.id === parseInt(ingredientId)
  );
  
  if (index !== -1) {
    ingredientData[index] = {
      ...ingredientData[index],
      ...updates,
      updated: new Date().toISOString()
    };
    return ingredientData[index];
  }
  return null;
};

// Helper function to delete an ingredient
export const deleteIngredient = (ingredientId) => {
  const index = ingredientData.findIndex(ing => 
    ing.id === ingredientId || ing.id === parseInt(ingredientId)
  );
  
  if (index !== -1) {
    const deleted = ingredientData.splice(index, 1);
    return deleted[0];
  }
  return null;
};

// Helper function to get ingredient statistics
export const getIngredientStats = () => {
  const total = ingredientData.length;
  const validated = ingredientData.filter(ing => !ing.provisional).length;
  const provisional = ingredientData.filter(ing => ing.provisional).length;
  const categories = [...new Set(ingredientData.map(ing => ing.category).filter(Boolean))];
  const suppliers = [...new Set(ingredientData.map(ing => ing.supplier).filter(Boolean))];
  
  return {
    total,
    validated,
    provisional,
    categoriesCount: categories.length,
    suppliersCount: suppliers.length,
    categories,
    suppliers
  };
};

// Helper function to export ingredients to CSV format
export const exportToCSV = (ingredients = ingredientData) => {
  const headers = [
    'ID', 'Name', 'Category', 'Subcategory', 'Supplier', 
    'AP Cost', 'Unit', 'Case Description', 'Case Quantity', 
    'Case Unit', 'SKU', 'Storage', 'Status', 'Updated'
  ];
  
  const rows = ingredients.map(ing => [
    ing.id,
    ing.name,
    ing.category || '',
    ing.subcategory || '',
    ing.supplier || '',
    ing.apCost || ing.price || '',
    ing.unit || '',
    ing.caseDescription || '',
    ing.caseQuantity || '',
    ing.caseUnit || '',
    ing.sku || '',
    ing.storageLocation || '',
    ing.provisional ? 'Provisional' : 'Validated',
    ing.updated || ''
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
  
  return csvContent;
};
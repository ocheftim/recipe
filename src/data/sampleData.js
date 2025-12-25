// src/data/sampleData.js

export const SAMPLE_SUPPLIERS = [
  {
    id: 1,
    name: 'Fresh Foods Distributor',
    contact: 'John Smith',
    email: 'john@freshfoods.com',
    phone: '555-0100',
    address: '123 Market St, City, State 12345',
    category: 'Produce',
    terms: 'Net 30',
    minimumOrder: 100,
    deliveryDays: ['Monday', 'Wednesday', 'Friday'],
    notes: 'Primary produce supplier, reliable delivery'
  },
  {
    id: 2,
    name: 'Prime Meats Co.',
    contact: 'Sarah Johnson',
    email: 'sarah@primemeats.com',
    phone: '555-0101',
    address: '456 Butcher Ave, City, State 12346',
    category: 'Meat',
    terms: 'Net 15',
    minimumOrder: 150,
    deliveryDays: ['Tuesday', 'Thursday', 'Saturday'],
    notes: 'High quality meats, USDA certified'
  },
  {
    id: 3,
    name: 'Dairy Direct',
    contact: 'Mike Wilson',
    email: 'mike@dairydirect.com',
    phone: '555-0102',
    address: '789 Cream Lane, City, State 12347',
    category: 'Dairy',
    terms: 'COD',
    minimumOrder: 75,
    deliveryDays: ['Daily'],
    notes: 'Local dairy products, organic options available'
  },
  {
    id: 4,
    name: 'Pantry Essentials',
    contact: 'Lisa Chen',
    email: 'lisa@pantryessentials.com',
    phone: '555-0103',
    address: '321 Storage Rd, City, State 12348',
    category: 'Dry Goods',
    terms: 'Net 45',
    minimumOrder: 200,
    deliveryDays: ['Monday', 'Thursday'],
    notes: 'Bulk dry goods, spices, and pantry items'
  },
  {
    id: 5,
    name: 'Ocean Fresh Seafood',
    contact: 'Tom Rodriguez',
    email: 'tom@oceanfresh.com',
    phone: '555-0104',
    address: '654 Harbor Blvd, City, State 12349',
    category: 'Seafood',
    terms: 'Net 7',
    minimumOrder: 100,
    deliveryDays: ['Tuesday', 'Friday'],
    notes: 'Fresh daily catch, sustainable sources'
  }
];

export const SAMPLE_COST_HISTORY = [
  {
    id: 1,
    ingredientId: 1,
    ingredientName: 'Beef Chuck',
    date: '2025-08-01',
    oldCost: 6.50,
    newCost: 6.99,
    supplier: 'Prime Meats Co.',
    reason: 'Market price increase',
    changedBy: 'Admin'
  },
  {
    id: 2,
    ingredientId: 2,
    ingredientName: 'Carrots',
    date: '2025-07-15',
    oldCost: 1.19,
    newCost: 1.29,
    supplier: 'Fresh Foods Distributor',
    reason: 'Seasonal adjustment',
    changedBy: 'Admin'
  },
  {
    id: 3,
    ingredientId: 3,
    ingredientName: 'Chicken Breast',
    date: '2025-07-01',
    oldCost: 5.49,
    newCost: 5.99,
    supplier: 'Prime Meats Co.',
    reason: 'Supplier price change',
    changedBy: 'Manager'
  },
  {
    id: 4,
    ingredientId: 4,
    ingredientName: 'Arborio Rice',
    date: '2025-06-20',
    oldCost: 4.50,
    newCost: 4.99,
    supplier: 'Pantry Essentials',
    reason: 'Import cost increase',
    changedBy: 'Admin'
  },
  {
    id: 5,
    ingredientId: 5,
    ingredientName: 'Gruyere Cheese',
    date: '2025-06-01',
    oldCost: 11.99,
    newCost: 12.99,
    supplier: 'Dairy Direct',
    reason: 'Quality upgrade',
    changedBy: 'Chef'
  }
];

// Additional sample data that might be needed
export const sampleIngredients = [
  {
    id: 1,
    name: 'Beef Chuck',
    category: 'Meat',
    unit: 'lb',
    unitCost: 6.99,
    supplier: 'Prime Meats Co.',
    allergens: [],
    inStock: true,
    parLevel: 50,
    currentStock: 45
  },
  {
    id: 2,
    name: 'Carrots',
    category: 'Vegetables',
    unit: 'lb',
    unitCost: 1.29,
    supplier: 'Fresh Foods Distributor',
    allergens: [],
    inStock: true,
    parLevel: 30,
    currentStock: 35
  },
  {
    id: 3,
    name: 'Chicken Breast',
    category: 'Meat',
    unit: 'lb',
    unitCost: 5.99,
    supplier: 'Prime Meats Co.',
    allergens: [],
    inStock: true,
    parLevel: 40,
    currentStock: 38
  },
  {
    id: 4,
    name: 'Arborio Rice',
    category: 'Grains',
    unit: 'lb',
    unitCost: 4.99,
    supplier: 'Pantry Essentials',
    allergens: ['Gluten'],
    inStock: true,
    parLevel: 20,
    currentStock: 22
  },
  {
    id: 5,
    name: 'Gruyere Cheese',
    category: 'Dairy',
    unit: 'lb',
    unitCost: 12.99,
    supplier: 'Dairy Direct',
    allergens: ['Dairy'],
    inStock: true,
    parLevel: 15,
    currentStock: 12
  }
];
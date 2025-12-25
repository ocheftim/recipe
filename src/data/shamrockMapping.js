export const shamrockMapping = {
  'All-Purpose Flour': {
    itemCode: 'SF-BAK-1001',
    productName: 'All-Purpose Flour',
    brand: 'Gold Medal',
    packSize: '50 lb bag',
    pricePerUnit: 0.45,
    category: 'Baking'
  },
  'Baking Powder': {
    itemCode: 'SF-BAK-1015',
    productName: 'Double-Acting Baking Powder',
    brand: 'Clabber Girl',
    packSize: '5 lb can',
    pricePerUnit: 2.85,
    category: 'Baking'
  },
  'Salt': {
    itemCode: 'SF-BAK-1025',
    productName: 'Kosher Salt',
    brand: "Diamond Crystal",
    packSize: '3 lb box',
    pricePerUnit: 0.35,
    category: 'Baking'
  },
  'Baking Soda': {
    itemCode: 'SF-BAK-1020',
    productName: 'Baking Soda',
    brand: 'Arm & Hammer',
    packSize: '5 lb box',
    pricePerUnit: 1.25,
    category: 'Baking'
  },
  'Butter': {
    itemCode: 'SF-DAI-2001',
    productName: 'Unsalted Butter',
    brand: 'Challenge',
    packSize: '1 lb (4 sticks)',
    pricePerUnit: 4.25,
    category: 'Dairy'
  },
  'Buttermilk': {
    itemCode: 'SF-DAI-2015',
    productName: 'Cultured Buttermilk',
    brand: 'Shamrock Farms',
    packSize: '1 gallon',
    pricePerUnit: 5.50,
    category: 'Dairy'
  },
  'Granulated Sugar': {
    itemCode: 'SF-BAK-1030',
    productName: 'Granulated White Sugar',
    brand: 'C&H',
    packSize: '50 lb bag',
    pricePerUnit: 0.62,
    category: 'Baking'
  },
  'Eggs': {
    itemCode: 'SF-DAI-2025',
    productName: 'Large Eggs (Grade A)',
    brand: 'Hickman\'s',
    packSize: '15 dozen case',
    pricePerUnit: 2.95,
    category: 'Dairy'
  },
  'Vanilla Extract': {
    itemCode: 'SF-BAK-1045',
    productName: 'Pure Vanilla Extract',
    brand: 'Nielsen-Massey',
    packSize: '16 oz bottle',
    pricePerUnit: 18.50,
    category: 'Baking'
  },
  'Fresh Blueberries': {
    itemCode: 'SF-PRO-3001',
    productName: 'Fresh Blueberries',
    brand: 'Driscoll\'s',
    packSize: '1 pint (18 oz)',
    pricePerUnit: 4.25,
    category: 'Produce'
  },
  'Brown Sugar': {
    itemCode: 'SF-BAK-1035',
    productName: 'Light Brown Sugar',
    brand: 'C&H',
    packSize: '50 lb bag',
    pricePerUnit: 0.68,
    category: 'Baking'
  },
  'Heavy Cream': {
    itemCode: 'SF-DAI-2020',
    productName: 'Heavy Whipping Cream',
    brand: 'Shamrock Farms',
    packSize: '1 quart',
    pricePerUnit: 6.75,
    category: 'Dairy'
  },
  'Orange Zest': {
    itemCode: 'SF-PRO-3015',
    productName: 'Fresh Oranges (Valencia)',
    brand: 'Sunkist',
    packSize: '40 lb box',
    pricePerUnit: 1.35,
    category: 'Produce'
  },
  'Dried Cranberries': {
    itemCode: 'SF-BAK-1050',
    productName: 'Dried Sweetened Cranberries',
    brand: 'Ocean Spray',
    packSize: '5 lb bag',
    pricePerUnit: 3.85,
    category: 'Baking'
  },
  'Turbinado Sugar': {
    itemCode: 'SF-BAK-1040',
    productName: 'Turbinado Raw Sugar',
    brand: 'Sugar In The Raw',
    packSize: '6 lb bag',
    pricePerUnit: 1.95,
    category: 'Baking'
  },
  'Yellow Cornmeal': {
    itemCode: 'SF-BAK-1005',
    productName: 'Yellow Cornmeal (Medium Grind)',
    brand: 'Bob\'s Red Mill',
    packSize: '25 lb bag',
    pricePerUnit: 1.15,
    category: 'Baking'
  },
  'Vegetable Oil': {
    itemCode: 'SF-OIL-4001',
    productName: 'Vegetable Oil',
    brand: 'Wesson',
    packSize: '1 gallon',
    pricePerUnit: 8.25,
    category: 'Oils'
  }
};

// Helper function to get all available items
export const getAllShamrockItems = () => {
  return Object.entries(shamrockMapping).map(([ingredient, details]) => ({
    ingredient,
    ...details
  }));
};

// Helper function to search items by category
export const getItemsByCategory = (category) => {
  return Object.entries(shamrockMapping)
    .filter(([_, details]) => details.category === category)
    .map(([ingredient, details]) => ({
      ingredient,
      ...details
    }));
};

// Helper function to convert various units to a base unit for calculations
export const convertToBaseUnit = (quantity, unit) => {
  // Conversion factors to base units
  const conversions = {
    // Volume conversions (to cups)
    'tsp': 1 / 48,
    'tbsp': 1 / 16,
    'cup': 1,
    'cups': 1,
    'pint': 2,
    'quart': 4,
    'gallon': 16,
    'oz': 1 / 8,
    'fl oz': 1 / 8,
    
    // Weight conversions (to pounds)
    'lb': 1,
    'lbs': 1,
    'oz-weight': 1 / 16,
    'g': 0.00220462,
    'kg': 2.20462,
    
    // Count (pieces/each)
    'each': 1,
    'piece': 1,
    'pieces': 1,
  };

  const normalizedUnit = unit.toLowerCase().trim();
  const conversionFactor = conversions[normalizedUnit] || 1;
  
  return quantity * conversionFactor;
};
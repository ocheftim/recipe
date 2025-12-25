export const foodServiceHelpers = {
  /**
   * Calculate portions from ingredient quantity
   */
  calculatePortions: (ingredientWeight, portionSize) => {
    return Math.floor(ingredientWeight / portionSize);
  },

  /**
   * Convert between common food service units
   */
  convertUnits: (quantity, fromUnit, toUnit) => {
    const conversions = {
      // Weight conversions (to grams)
      'lb': 453.592,
      'oz': 28.3495,
      'kg': 1000,
      'g': 1,
      
      // Volume conversions (to milliliters)
      'gal': 3785.41,
      'qt': 946.353,
      'pt': 473.176,
      'cup': 236.588,
      'fl oz': 29.5735,
      'tbsp': 14.7868,
      'tsp': 4.92892,
      'ml': 1,
      'l': 1000,
      
      // Count conversions
      'each': 1,
      'dozen': 12,
      'pair': 2
    };
    
    // If same unit, return original quantity
    if (fromUnit === toUnit) return quantity;
    
    // Get conversion factors
    const fromFactor = conversions[fromUnit.toLowerCase()];
    const toFactor = conversions[toUnit.toLowerCase()];
    
    if (!fromFactor || !toFactor) {
      console.warn(`Conversion not supported: ${fromUnit} to ${toUnit}`);
      return quantity;
    }
    
    // Check if both are weight or both are volume
    const weightUnits = ['lb', 'oz', 'kg', 'g'];
    const volumeUnits = ['gal', 'qt', 'pt', 'cup', 'fl oz', 'tbsp', 'tsp', 'ml', 'l'];
    
    const fromIsWeight = weightUnits.includes(fromUnit.toLowerCase());
    const toIsWeight = weightUnits.includes(toUnit.toLowerCase());
    const fromIsVolume = volumeUnits.includes(fromUnit.toLowerCase());
    const toIsVolume = volumeUnits.includes(toUnit.toLowerCase());
    
    if ((fromIsWeight && !toIsWeight) || (fromIsVolume && !toIsVolume)) {
      console.warn(`Cannot convert between different measurement types: ${fromUnit} to ${toUnit}`);
      return quantity;
    }
    
    // Convert: quantity * fromFactor / toFactor
    return (quantity * fromFactor) / toFactor;
  },

  /**
   * Calculate food cost percentage
   */
  calculateFoodCostPercentage: (foodCost, sellingPrice) => {
    if (sellingPrice <= 0) return 0;
    return (foodCost / sellingPrice) * 100;
  },

  /**
   * Get food safety storage temperature
   */
  getStorageTemp: (category) => {
    const temps = {
      'Protein': { min: 32, max: 38, unit: '°F' },
      'Dairy & Eggs': { min: 32, max: 38, unit: '°F' },
      'Produce': { min: 32, max: 40, unit: '°F' },
      'Frozen': { min: -10, max: 0, unit: '°F' },
      'Pantry': { min: 50, max: 70, unit: '°F' }
    };
    
    return temps[category] || { min: 32, max: 40, unit: '°F' };
  },

  /**
   * Calculate shelf life remaining
   */
  getShelfLifeStatus: (deliveryDate, shelfLifeDays) => {
    const today = new Date();
    const delivered = new Date(deliveryDate);
    const expiry = new Date(delivered);
    expiry.setDate(delivered.getDate() + shelfLifeDays);
    
    const daysRemaining = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    
    if (daysRemaining < 0) return { status: 'expired', daysRemaining: 0, color: 'red' };
    if (daysRemaining <= 2) return { status: 'critical', daysRemaining, color: 'red' };
    if (daysRemaining <= 7) return { status: 'warning', daysRemaining, color: 'yellow' };
    return { status: 'good', daysRemaining, color: 'green' };
  },

  /**
   * Generate order suggestions based on usage and stock
   */
  generateOrderSuggestion: (ingredient, avgWeeklyUsage) => {
    const currentStock = ingredient.cases || 0;
    const reorderPoint = ingredient.reorderPoint || 1;
    const leadTimeDays = 3; // Default lead time
    const safetyStock = Math.ceil(avgWeeklyUsage * 0.5); // 50% safety stock
    
    const weeklyUsageInCases = avgWeeklyUsage / (ingredient.caseWeight || ingredient.caseCount || 1);
    const leadTimeUsage = weeklyUsageInCases * (leadTimeDays / 7);
    const totalNeeded = leadTimeUsage + safetyStock;
    
    const orderQuantity = Math.max(0, totalNeeded - currentStock);
    
    return {
      shouldOrder: currentStock <= reorderPoint,
      suggestedQuantity: Math.ceil(orderQuantity),
      urgency: currentStock === 0 ? 'critical' : currentStock <= reorderPoint * 0.5 ? 'high' : 'normal',
      daysOfStockRemaining: currentStock / (weeklyUsageInCases / 7)
    };
  }
};

/**
 * Local storage utilities
 */

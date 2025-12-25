// src/utils/costCalculator.js
// Enhanced cost calculation utility that works with parsed case data

export const WEIGHT_UNITS = {
    'oz': 1,
    'ounce': 1,
    'ounces': 1,
    'lb': 16,
    'lbs': 16,
    'pound': 16,
    'pounds': 16,
    'kg': 35.274,
    'kilogram': 35.274,
    'kilograms': 35.274,
    'g': 0.035274,
    'gram': 0.035274,
    'grams': 0.035274
  };
  
  export const VOLUME_UNITS = {
    'fl oz': 1,
    'fluid ounce': 1,
    'fluid ounces': 1,
    'cup': 8,
    'cups': 8,
    'pt': 16,
    'pint': 16,
    'pints': 16,
    'qt': 32,
    'quart': 32,
    'quarts': 32,
    'gal': 128,
    'gallon': 128,
    'gallons': 128,
    'ml': 0.033814,
    'milliliter': 0.033814,
    'milliliters': 0.033814,
    'l': 33.814,
    'liter': 33.814,
    'liters': 33.814
  };
  
  /**
   * Calculate unit costs from parsed case data
   * @param {Object} caseData - Parsed case information
   * @param {number} casePrice - Total price for the case
   * @param {number} yieldFactor - Prep yield (0.8 for 80% yield after trimming)
   * @returns {Object} Calculated costs per various units
   */
  export function calculateUnitCosts(caseData, casePrice, yieldFactor = 1.0) {
    if (!caseData || !casePrice || casePrice <= 0) {
      return null;
    }
  
    const { caseQuantity, caseUnit } = caseData;
    
    if (!caseQuantity || !caseUnit || caseQuantity <= 0) {
      return null;
    }
  
    // Calculate base cost per unit (before yield adjustment)
    const baseCostPerUnit = casePrice / caseQuantity;
    
    // Apply yield factor for prep waste
    const adjustedCostPerUnit = baseCostPerUnit / yieldFactor;
  
    const calculations = {
      baseCostPerUnit,
      adjustedCostPerUnit,
      yieldFactor,
      originalUnit: caseUnit,
      costs: {}
    };
  
    // Normalize unit for calculations
    const normalizedUnit = caseUnit.toLowerCase().replace(/[^a-z]/g, '');
  
    // Calculate costs for weight-based ingredients
    if (WEIGHT_UNITS[normalizedUnit]) {
      const ozPerUnit = WEIGHT_UNITS[normalizedUnit];
      const costPerOz = adjustedCostPerUnit / ozPerUnit;
      
      calculations.costs = {
        perOunce: costPerOz,
        perPound: costPerOz * 16,
        perKilogram: costPerOz * 35.274,
        perGram: costPerOz * 0.035274,
        per100g: costPerOz * 3.5274
      };
    }
    
    // Calculate costs for volume-based ingredients
    else if (VOLUME_UNITS[normalizedUnit]) {
      const flOzPerUnit = VOLUME_UNITS[normalizedUnit];
      const costPerFlOz = adjustedCostPerUnit / flOzPerUnit;
      
      calculations.costs = {
        perFluidOunce: costPerFlOz,
        perCup: costPerFlOz * 8,
        perPint: costPerFlOz * 16,
        perQuart: costPerFlOz * 32,
        perGallon: costPerFlOz * 128,
        perLiter: costPerFlOz * 33.814,
        per100ml: costPerFlOz * 3.3814
      };
    }
    
    // Calculate costs for count-based ingredients (each, dozen, etc.)
    else if (['each', 'ea', 'piece', 'pieces', 'head', 'heads', 'bunch', 'bunches'].includes(normalizedUnit)) {
      calculations.costs = {
        perEach: adjustedCostPerUnit,
        perDozen: adjustedCostPerUnit * 12,
        per100count: adjustedCostPerUnit * 100
      };
    }
  
    return calculations;
  }
  
  /**
   * Calculate recipe cost impact when ingredient price changes
   * @param {Array} recipes - Array of recipes using this ingredient
   * @param {number} newCostPerUnit - New cost per recipe unit
   * @param {string} recipeUnit - Unit used in recipes
   * @returns {Array} Updated recipe costs
   */
  export function calculateRecipeImpact(recipes, newCostPerUnit, recipeUnit) {
    if (!recipes || !newCostPerUnit) return [];
  
    return recipes.map(recipe => {
      const ingredientCost = (recipe.quantity || 0) * newCostPerUnit;
      const totalCost = recipe.totalCost - (recipe.currentIngredientCost || 0) + ingredientCost;
      const costPerServing = totalCost / (recipe.servings || 1);
      
      return {
        ...recipe,
        currentIngredientCost: ingredientCost,
        totalCost,
        costPerServing,
        costChange: ingredientCost - (recipe.currentIngredientCost || 0)
      };
    });
  }
  
  /**
   * Suggest optimal purchasing units based on usage patterns
   * @param {Array} usageHistory - Historical usage data
   * @param {Object} availablePackSizes - Available pack sizes from suppliers
   * @returns {Object} Recommendations for optimal purchasing
   */
  export function suggestOptimalPurchasing(usageHistory, availablePackSizes) {
    if (!usageHistory || usageHistory.length === 0) {
      return { recommendation: 'Insufficient usage data' };
    }
  
    // Calculate average weekly usage
    const avgWeeklyUsage = usageHistory.reduce((sum, week) => sum + week.quantity, 0) / usageHistory.length;
    
    // Find most cost-effective pack size
    const recommendations = availablePackSizes.map(pack => {
      const weeksSupply = pack.quantity / avgWeeklyUsage;
      const costPerUnit = pack.price / pack.quantity;
      const totalCostPerWeek = avgWeeklyUsage * costPerUnit;
      
      return {
        ...pack,
        weeksSupply,
        costPerUnit,
        totalCostPerWeek,
        efficiency: pack.quantity / pack.price // Higher is better
      };
    });
  
    // Sort by cost efficiency
    recommendations.sort((a, b) => b.efficiency - a.efficiency);
    
    return {
      recommendation: recommendations[0],
      alternatives: recommendations.slice(1, 3),
      avgWeeklyUsage
    };
  }
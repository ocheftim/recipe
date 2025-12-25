// Professional foodservice costing utilities

/**
* Calculate unit costs based on case information
* @param {number} apCost - As Purchased cost per case
* @param {number} caseWeight - Weight of case in pounds (optional)
* @param {number} caseCount - Number of pieces in case (optional)
* @returns {object} Object containing calculated unit costs
*/
export const calculateUnitCosts = (apCost, caseWeight = 0, caseCount = 0) => {
  const costs = {};
  
  if (apCost > 0) {
    // Calculate cost per each if case count is provided
    if (caseCount > 0) {
      costs.costPerEach = apCost / caseCount;
      
      // Calculate cost per dozen if applicable (case has 12+ pieces)
      if (caseCount >= 12) {
        costs.costPerDozen = apCost / (caseCount / 12);
      }
    }
    
    // Calculate cost per pound if case weight is provided
    if (caseWeight > 0) {
      costs.costPerPound = apCost / caseWeight;
      
      // Calculate cost per ounce
      costs.costPerOunce = costs.costPerPound / 16;
      
      // Calculate cost per kilogram
      costs.costPerKilogram = costs.costPerPound * 2.205;
    }
  }
  
  return costs;
};

/**
* Calculate Edible Portion costs from As Purchased costs
* @param {number} apCosts - As Purchased cost
* @param {number} yieldPercentage - Yield percentage after trim and cooking loss
* @returns {number} Edible Portion cost
*/
export const calculateEPCosts = (apCosts, yieldPercentage) => {
  if (yieldPercentage <= 0 || yieldPercentage > 100) {
    return 0;
  }
  return apCosts / (yieldPercentage / 100);
};

/**
* Calculate EP cost from AP cost with trim and cooking losses
* @param {number} apCost - As Purchased cost
* @param {number} trimLoss - Trim loss percentage
* @param {number} cookingLoss - Cooking loss percentage  
* @returns {number} Edible Portion cost
*/
export const calculateEpCost = (apCost, trimLoss, cookingLoss) => {
  const yieldPercentage = (100 - trimLoss - cookingLoss) / 100;
  return yieldPercentage > 0 ? apCost / yieldPercentage : 0;
};

/**
* Calculate line cost for recipe ingredient
* @param {number} quantity - Ingredient quantity
* @param {number} apCost - As Purchased cost per unit
* @param {number} trimLoss - Trim loss percentage
* @param {number} cookingLoss - Cooking loss percentage
* @returns {number} Total line cost
*/
export const calculateLineCost = (quantity, apCost, trimLoss, cookingLoss) => {
  const epCost = calculateEpCost(apCost, trimLoss, cookingLoss);
  return quantity * epCost;
};

/**
* Calculate yield percentage from losses
* @param {number} trimWaste - Trim waste percentage (default: 0)
* @param {number} cookingLoss - Cooking loss percentage (default: 0)  
* @returns {number} Final yield percentage
*/
export const calculateYieldPercentage = (trimWaste = 0, cookingLoss = 0) => {
  return Math.max(0, 100 - trimWaste - cookingLoss);
};

/**
* Get default trim loss percentage by ingredient category
* @param {string} category - Ingredient category
* @returns {number} Default trim loss percentage
*/
export const getDefaultTrimLoss = (category) => {
  const defaults = {
    "Protein": 10,
    "Seafood": 8,
    "Produce": 15,
    "Pantry": 0,
    "Dairy": 0,
    "Oil": 0,
    "Seasoning": 0,
    "Herbs": 5,
    "Stock": 0
  };
  return defaults[category] || 5;
};

/**
* Get default cooking loss percentage by ingredient category
* @param {string} category - Ingredient category
* @returns {number} Default cooking loss percentage
*/
export const getDefaultCookingLoss = (category) => {
  const defaults = {
    "Protein": 20,
    "Seafood": 12,
    "Produce": 10,
    "Pantry": 0,
    "Dairy": 5,
    "Oil": 0,
    "Seasoning": 0,
    "Herbs": 0,
    "Stock": 15
  };
  return defaults[category] || 0;
};

/**
* Create a complete ingredient object with calculated costs
* @param {object} ingredientData - Basic ingredient data
* @returns {object} Complete ingredient with calculated values
*/
export const createCompleteIngredient = (ingredientData) => {
  const yieldPercentage = calculateYieldPercentage(
    ingredientData.trimWaste || 0,
    ingredientData.cookingLoss || 0
  );
  
  const epCost = calculateEPCosts(ingredientData.apCost || 0, yieldPercentage);
  
  return {
    ...ingredientData,
    yieldPercentage,
    epCost,
    lastUpdated: new Date().toISOString().split('T')[0]
  };
};

/**
* Validate ingredient data for completeness and accuracy
* @param {object} ingredientData - Ingredient data to validate
* @returns {object} Validation result with isValid flag and errors array
*/
export const validateIngredient = (ingredientData) => {
  const errors = [];
  
  if (!ingredientData.name || ingredientData.name.trim() === '') {
    errors.push('Ingredient name is required');
  }
  
  if (!ingredientData.apCost || ingredientData.apCost <= 0) {
    errors.push('Valid AP cost is required');
  }
  
  if (!ingredientData.apUnit || ingredientData.apUnit.trim() === '') {
    errors.push('AP unit is required');
  }
  
  if (ingredientData.trimWaste < 0 || ingredientData.trimWaste > 100) {
    errors.push('Trim waste must be between 0 and 100%');
  }
  
  if (ingredientData.cookingLoss < 0 || ingredientData.cookingLoss > 100) {
    errors.push('Cooking loss must be between 0 and 100%');
  }
  
  const totalLoss = (ingredientData.trimWaste || 0) + (ingredientData.cookingLoss || 0);
  if (totalLoss >= 100) {
    errors.push('Combined trim waste and cooking loss cannot be 100% or more');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
* Calculate total recipe cost from ingredients
* @param {array} recipeIngredients - Array of recipe ingredients with quantities
* @param {array} ingredients - Master ingredients list
* @returns {object} Recipe cost analysis
*/
export const calculateRecipeCost = (recipeIngredients, ingredients) => {
  let totalCost = 0;
  const costBreakdown = [];
  
  recipeIngredients.forEach(recipeIng => {
    const ingredient = ingredients.find(ing => ing.id === recipeIng.ingredientId);
    if (ingredient) {
      const lineCost = calculateLineCost(
        recipeIng.quantity,
        ingredient.apCost,
        ingredient.trimWaste || 0,
        ingredient.cookingLoss || 0
      );
      totalCost += lineCost;
      costBreakdown.push({
        ...recipeIng,
        ingredientName: ingredient.name,
        lineCost
      });
    }
  });
  
  return {
    totalCost,
    costBreakdown
  };
};

/**
* Calculate margin data for menu pricing
* @param {number} foodCost - Total food cost
* @param {number} targetFoodCostPercentage - Target food cost percentage (default: 30)
* @returns {object} Margin analysis with suggested pricing
*/
export const calculateMarginData = (foodCost, targetFoodCostPercentage = 30) => {
  const targetDecimal = targetFoodCostPercentage / 100;
  const suggestedPrice = foodCost / targetDecimal;
  const markup = suggestedPrice / foodCost;
  const profit = suggestedPrice - foodCost;
  const profitMargin = (profit / suggestedPrice) * 100;
  
  return {
    foodCost,
    suggestedPrice,
    markup,
    profit,
    profitMargin,
    targetFoodCostPercentage
  };
};

/**
* Calculate cost per serving
* @param {number} totalRecipeCost - Total recipe cost
* @param {number} servings - Number of servings
* @returns {number} Cost per serving
*/
export const calculateCostPerServing = (totalRecipeCost, servings) => {
  return servings > 0 ? totalRecipeCost / servings : 0;
};

/**
* Calculate recipe totals (helper for recipe components)
* @param {array} ingredients - Recipe ingredients array
* @param {number} yield - Recipe yield
* @returns {object} Total cost and cost per serving
*/
export const calculateRecipeTotals = (ingredients, recipeYield) => {
  const totalCost = ingredients.reduce((sum, ing) => 
    sum + calculateLineCost(ing.quantity, ing.apCost, ing.trimLoss, ing.cookingLoss), 0
  );
  const costPerServing = recipeYield > 0 ? totalCost / recipeYield : 0;
  return { totalCost, costPerServing };
};

/**
* Convert between different units
* @param {number} quantity - Quantity to convert
* @param {string} fromUnit - Unit to convert from
* @param {string} toUnit - Unit to convert to
* @returns {number} Converted quantity
*/
export const convertUnits = (quantity, fromUnit, toUnit) => {
  // Simple conversion table - can be expanded
  const conversions = {
    'lb': { 'oz': 16, 'kg': 0.453592, 'g': 453.592 },
    'oz': { 'lb': 0.0625, 'g': 28.3495, 'kg': 0.0283495 },
    'kg': { 'lb': 2.20462, 'g': 1000, 'oz': 35.274 },
    'g': { 'kg': 0.001, 'lb': 0.00220462, 'oz': 0.035274 }
  };
  
  if (fromUnit === toUnit) return quantity;
  
  if (conversions[fromUnit] && conversions[fromUnit][toUnit]) {
    return quantity * conversions[fromUnit][toUnit];
  }
  
  return quantity; // Return original if conversion not found
};

/**
* Calculate food cost percentage from cost and menu price
* @param {number} foodCost - Food cost
* @param {number} menuPrice - Menu price
* @returns {number} Food cost percentage
*/
export const calculateFoodCostPercentage = (foodCost, menuPrice) => {
  return menuPrice > 0 ? (foodCost / menuPrice) * 100 : 0;
};

/**
* Analyze cost trends from historical data
* @param {array} costHistory - Array of cost history records
* @returns {object} Trend analysis
*/
export const analyzeCostTrends = (costHistory) => {
  if (!costHistory || costHistory.length < 2) {
    return { trend: 'insufficient-data' };
  }
  
  const sortedHistory = costHistory.sort((a, b) => new Date(a.date) - new Date(b.date));
  const recent = sortedHistory[sortedHistory.length - 1];
  const previous = sortedHistory[sortedHistory.length - 2];
  
  const change = recent.apCost - previous.apCost;
  const percentChange = (change / previous.apCost) * 100;
  
  return {
    trend: change > 0 ? 'increasing' : change < 0 ? 'decreasing' : 'stable',
    change,
    percentChange,
    recentCost: recent.apCost,
    previousCost: previous.apCost
  };
};
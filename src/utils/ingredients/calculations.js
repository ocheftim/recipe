// src/utils/ingredients/calculations.js
import { conversions as conversionFactors } from '../../data/Ingredients/conversions';

export const calculateUnitPrice = (ingredient, targetUnit) => {
  // Safety checks
  if (!ingredient || !ingredient.price) {
    return 0;
  }
  
  const basePrice = parseFloat(ingredient.price) || 0;
  const currentUnit = ingredient.unit || 'lbs';
  
  // If target unit is the same as current unit, return the base price
  if (currentUnit === targetUnit) {
    return basePrice;
  }
  
  // Get conversion factors for this ingredient
  const conversions = ingredient.alternateUnits || conversionFactors[ingredient.name] || {
    lbs: 1,
    oz: 16,
    cups: 0,
    each: 0
  };
  
  // Convert to base unit (lbs) first, then to target unit
  let pricePerLb = basePrice;
  
  // Convert current price to per lb if needed
  if (currentUnit !== 'lbs') {
    const currentFactor = conversions[currentUnit] || 1;
    if (currentFactor > 0) {
      pricePerLb = basePrice * currentFactor;
    }
  }
  
  // Convert from per lb to target unit
  if (targetUnit === 'lbs') {
    return pricePerLb;
  }
  
  const targetFactor = conversions[targetUnit] || 1;
  if (targetFactor === 0) {
    return 0; // Unit not available for this ingredient
  }
  
  return pricePerLb / targetFactor;
};

export const calculateInventoryValue = (ingredients) => {
  if (!Array.isArray(ingredients)) {
    return 0;
  }
  
  return ingredients.reduce((total, ingredient) => {
    const price = parseFloat(ingredient.price) || 0;
    const stock = parseFloat(ingredient.stock) || 0;
    return total + (price * stock);
  }, 0);
};

export const calculateLowStockItems = (ingredients) => {
  if (!Array.isArray(ingredients)) {
    return [];
  }
  
  return ingredients.filter(ingredient => {
    const stock = parseFloat(ingredient.stock) || 0;
    const par = parseFloat(ingredient.par) || 1;
    return stock < par;
  });
};

export const parseCaseSize = (caseSize) => {
  if (!caseSize || typeof caseSize !== 'string') {
    return 1;
  }
  
  // Handle formats like "6x1lb", "12 units", "24", etc.
  const match = caseSize.match(/(\d+)/);
  return match ? parseInt(match[1]) : 1;
};

export const calculateCostPerServing = (recipe, ingredients) => {
  if (!recipe || !recipe.ingredients || !Array.isArray(recipe.ingredients)) {
    return 0;
  }
  
  const totalCost = recipe.ingredients.reduce((sum, recipeIng) => {
    const ingredient = ingredients.find(ing => ing.id === recipeIng.id || ing.name === recipeIng.name);
    if (!ingredient) return sum;
    
    const quantity = parseFloat(recipeIng.quantity) || 0;
    const unitPrice = calculateUnitPrice(ingredient, recipeIng.unit);
    
    return sum + (quantity * unitPrice);
  }, 0);
  
  const servings = parseInt(recipe.servings) || 1;
  return totalCost / servings;
};

export const calculateFoodCostPercentage = (costPerServing, sellingPrice) => {
  const cost = parseFloat(costPerServing) || 0;
  const price = parseFloat(sellingPrice) || 0;
  
  if (price === 0) return 0;
  
  return (cost / price) * 100;
};

export const getReorderQuantity = (ingredient) => {
  if (!ingredient) return 0;
  
  const par = parseFloat(ingredient.par) || 0;
  const stock = parseFloat(ingredient.stock) || 0;
  const caseSize = parseCaseSize(ingredient.caseSize);
  
  const needed = par - stock;
  if (needed <= 0) return 0;
  
  // Round up to nearest case
  return Math.ceil(needed / caseSize) * caseSize;
};
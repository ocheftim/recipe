// src/utils/ingredientConversions.js
// STEP 1: Simple volume conversions for common dry ingredients

/**
 * Basic ingredient densities (grams per cup)
 * Starting with the most common restaurant ingredients
 */
export const INGREDIENT_DENSITIES = {
    'flour': 120,           // All-purpose flour
    'sugar': 200,           // Granulated sugar  
    'brown sugar': 213,     // Packed brown sugar
    'salt': 288,            // Table salt (18g per tbsp × 16)
    'rice': 185,            // White rice
    'oats': 90,             // Rolled oats
    'cocoa': 85             // Cocoa powder
  };
  
  /**
   * Convert cost per pound to recipe volume costs
   * @param {number} costPerPound - Cost per pound from your case calculations
   * @param {string} ingredientType - Type: 'flour', 'sugar', 'salt', etc.
   * @returns {Object} Volume-based costs
   */
  export function calculateVolumeCosts(costPerPound, ingredientType) {
    console.log(`🥄 Calculating volume costs for ${ingredientType} at $${costPerPound}/lb`);
    
    const type = ingredientType.toLowerCase().trim();
    
    // Get density (grams per cup)
    let gramsPerCup = INGREDIENT_DENSITIES[type];
    
    if (!gramsPerCup) {
      console.log(`⚠️ No density data for "${type}", using flour default`);
      gramsPerCup = 120; // Default to flour
    }
    
    // Convert: 1 pound = 453.6 grams
    const cupsPerPound = 453.6 / gramsPerCup;
    const costPerCup = costPerPound / cupsPerPound;
    const costPerTbsp = costPerCup / 16;    // 16 tablespoons per cup
    const costPerTsp = costPerCup / 48;     // 48 teaspoons per cup
    
    const result = {
      ingredientType: type,
      costPerPound,
      gramsPerCup,
      cupsPerPound: parseFloat(cupsPerPound.toFixed(2)),
      costPerCup: parseFloat(costPerCup.toFixed(4)),
      costPerTbsp: parseFloat(costPerTbsp.toFixed(4)),
      costPerTsp: parseFloat(costPerTsp.toFixed(4))
    };
    
    console.log('📊 Volume conversion result:', result);
    return result;
  }
  
  /**
   * Get recipe examples for an ingredient
   * @param {Object} volumeCosts - Result from calculateVolumeCosts
   * @returns {Array} Example recipe costs
   */
  export function getRecipeExamples(volumeCosts) {
    const examples = [];
    
    if (volumeCosts.costPerCup) {
      examples.push({
        amount: '3 cups',
        ingredient: volumeCosts.ingredientType,
        cost: volumeCosts.costPerCup * 3,
        example: `Bread recipe: "3 cups ${volumeCosts.ingredientType}"`
      });
    }
    
    if (volumeCosts.costPerTbsp) {
      examples.push({
        amount: '2 tbsp',
        ingredient: volumeCosts.ingredientType,
        cost: volumeCosts.costPerTbsp * 2,
        example: `Sauce recipe: "2 tbsp ${volumeCosts.ingredientType}"`
      });
    }
    
    if (volumeCosts.costPerTsp) {
      examples.push({
        amount: '1 tsp',
        ingredient: volumeCosts.ingredientType,
        cost: volumeCosts.costPerTsp * 1,
        example: `Seasoning: "1 tsp ${volumeCosts.ingredientType}"`
      });
    }
    
    return examples;
  }
  
  export default calculateVolumeCosts;
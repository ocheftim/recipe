// src/utils/ingredients/ingredientRecipeConnector.js
import { ingredientData, addIngredient, getIngredient, searchIngredients } from '../../data/Ingredients/ingredientsData';

/**
 * Fuzzy match ingredient names to handle variations
 */
const fuzzyMatchIngredient = (searchName, threshold = 0.8) => {
  const cleanName = searchName.toLowerCase().trim();
  
  // First try exact match
  const exactMatch = ingredientData.find(ing => 
    ing.name.toLowerCase().trim() === cleanName
  );
  if (exactMatch) return exactMatch;
  
  // Try contains match
  const containsMatch = ingredientData.find(ing => {
    const ingName = ing.name.toLowerCase();
    return ingName.includes(cleanName) || cleanName.includes(ingName);
  });
  if (containsMatch) return containsMatch;
  
  // Try word overlap (e.g., "chicken breast" matches "chicken breast boneless")
  const searchWords = cleanName.split(/\s+/).filter(w => w.length > 2);
  if (searchWords.length > 0) {
    const wordMatch = ingredientData.find(ing => {
      const ingWords = ing.name.toLowerCase().split(/\s+/);
      const matchCount = searchWords.filter(word => 
        ingWords.some(iWord => iWord.includes(word) || word.includes(iWord))
      ).length;
      return matchCount / searchWords.length >= threshold;
    });
    if (wordMatch) return wordMatch;
  }
  
  return null;
};

/**
 * Determine ingredient category based on name
 */
const determineCategory = (name) => {
  const lowerName = name.toLowerCase();
  
  // Proteins
  if (/chicken|beef|pork|lamb|turkey|fish|salmon|tuna|shrimp|crab|lobster|bacon|sausage/i.test(lowerName)) {
    return 'Proteins';
  }
  
  // Dairy
  if (/milk|cream|cheese|butter|yogurt|sour cream|cottage/i.test(lowerName)) {
    return 'Dairy';
  }
  
  // Produce - Vegetables
  if (/tomato|onion|garlic|pepper|carrot|celery|potato|lettuce|spinach|broccoli|cauliflower|mushroom|corn|peas|beans|cabbage/i.test(lowerName)) {
    return 'Produce';
  }
  
  // Produce - Fruits
  if (/apple|banana|orange|lemon|lime|berry|strawberry|grape|mango|pineapple|peach|pear/i.test(lowerName)) {
    return 'Produce';
  }
  
  // Grains
  if (/flour|rice|pasta|bread|oats|quinoa|barley|wheat|noodle/i.test(lowerName)) {
    return 'Dry Goods';
  }
  
  // Oils & Condiments
  if (/oil|vinegar|sauce|mayo|mustard|ketchup|dressing/i.test(lowerName)) {
    return 'Oils & Vinegars';
  }
  
  // Seasonings
  if (/salt|pepper|spice|herb|seasoning|cinnamon|paprika|cumin|oregano|basil|thyme|rosemary/i.test(lowerName)) {
    return 'Seasonings';
  }
  
  // Canned/Packaged
  if (/canned|can of|jar of|package|box/i.test(lowerName)) {
    return 'Canned Goods';
  }
  
  return 'Other';
};

/**
 * Process recipe ingredients and link to master ingredient list
 * Returns updated recipe with linked ingredients
 */
export const processRecipeIngredients = (recipe) => {
  if (!recipe.ingredients || !Array.isArray(recipe.ingredients)) {
    return recipe;
  }
  
  const processedIngredients = [];
  const newIngredientsAdded = [];
  const duplicatesFound = [];
  
  recipe.ingredients.forEach(recipeIng => {
    // Extract the ingredient name (handle different formats)
    let ingredientName = '';
    if (typeof recipeIng === 'string') {
      // Simple string format: "2 cups flour"
      const parts = recipeIng.split(' ');
      ingredientName = parts.slice(2).join(' '); // Skip quantity and unit
    } else if (recipeIng.ingredient) {
      ingredientName = recipeIng.ingredient;
    } else if (recipeIng.name) {
      ingredientName = recipeIng.name;
    }
    
    if (!ingredientName) {
      processedIngredients.push(recipeIng);
      return;
    }
    
    // Try to find existing ingredient
    const existingIngredient = fuzzyMatchIngredient(ingredientName);
    
    if (existingIngredient) {
      // Link to existing ingredient
      duplicatesFound.push({
        recipeName: ingredientName,
        matchedTo: existingIngredient.name
      });
      
      processedIngredients.push({
        ...recipeIng,
        ingredientId: existingIngredient.id,
        linkedName: existingIngredient.name,
        cost: existingIngredient.price || existingIngredient.apCost || 0,
        unit: recipeIng.unit || existingIngredient.unit,
        isLinked: true
      });
    } else {
      // Create new ingredient
      const newIngredient = {
        name: ingredientName,
        category: determineCategory(ingredientName),
        supplier: '',
        price: 0,
        apCost: 0,
        unit: recipeIng.unit || 'each',
        provisional: true, // Mark as needing validation
        source: `Recipe: ${recipe.name}`,
        importDate: new Date().toISOString()
      };
      
      // Add to master list
      const added = addIngredient(newIngredient);
      newIngredientsAdded.push(added);
      
      processedIngredients.push({
        ...recipeIng,
        ingredientId: added.id,
        linkedName: added.name,
        cost: 0,
        unit: recipeIng.unit || added.unit,
        isLinked: true,
        isNew: true,
        needsValidation: true
      });
    }
  });
  
  // Return enhanced recipe with processing report
  return {
    ...recipe,
    ingredients: processedIngredients,
    importReport: {
      totalIngredients: recipe.ingredients.length,
      existingMatched: duplicatesFound.length,
      newCreated: newIngredientsAdded.length,
      duplicatesFound,
      newIngredientsAdded: newIngredientsAdded.map(i => i.name)
    }
  };
};

/**
 * Batch process multiple recipes
 */
export const processMultipleRecipes = (recipes) => {
  const reports = [];
  const processedRecipes = recipes.map(recipe => {
    const processed = processRecipeIngredients(recipe);
    if (processed.importReport) {
      reports.push({
        recipeName: recipe.name,
        ...processed.importReport
      });
    }
    return processed;
  });
  
  // Generate summary report
  const summary = {
    totalRecipes: recipes.length,
    totalIngredients: reports.reduce((sum, r) => sum + r.totalIngredients, 0),
    totalMatched: reports.reduce((sum, r) => sum + r.existingMatched, 0),
    totalNewCreated: reports.reduce((sum, r) => sum + r.newCreated, 0),
    reports
  };
  
  return {
    recipes: processedRecipes,
    summary
  };
};

/**
 * Get all provisional ingredients that need validation
 */
export const getProvisionalIngredientsFromRecipes = () => {
  return ingredientData.filter(ing => ing.provisional === true);
};

/**
 * Validate and update a provisional ingredient
 */
export const validateProvisionalIngredient = (ingredientId, validationData) => {
  const ingredient = ingredientData.find(ing => ing.id === ingredientId);
  if (!ingredient) return null;
  
  // Update the ingredient with validated data
  Object.assign(ingredient, {
    ...validationData,
    provisional: false,
    validatedAt: new Date().toISOString()
  });
  
  // Update any recipes using this ingredient
  // This would need to trigger a recipe update in your RecipePage
  return ingredient;
};

/**
 * Merge duplicate ingredients
 */
export const mergeDuplicateIngredients = (keepId, mergeIds) => {
  const keepIngredient = ingredientData.find(ing => ing.id === keepId);
  if (!keepIngredient) return false;
  
  // Remove duplicates from master list
  mergeIds.forEach(mergeId => {
    const index = ingredientData.findIndex(ing => ing.id === mergeId);
    if (index > -1) {
      ingredientData.splice(index, 1);
    }
  });
  
  // Would need to update all recipes using the merged ingredients
  // This requires access to recipe data
  
  return true;
};

/**
 * Generate ingredient usage report
 */
export const getIngredientUsageReport = (recipes) => {
  const usage = {};
  
  recipes.forEach(recipe => {
    if (recipe.ingredients) {
      recipe.ingredients.forEach(ing => {
        const id = ing.ingredientId || ing.id;
        if (id) {
          if (!usage[id]) {
            usage[id] = {
              ingredientId: id,
              name: ing.linkedName || ing.name || ing.ingredient,
              usedInRecipes: [],
              totalQuantity: 0,
              units: new Set()
            };
          }
          usage[id].usedInRecipes.push(recipe.name);
          usage[id].totalQuantity += parseFloat(ing.quantity) || 0;
          if (ing.unit) usage[id].units.add(ing.unit);
        }
      });
    }
  });
  
  return Object.values(usage).map(u => ({
    ...u,
    units: Array.from(u.units),
    recipeCount: u.usedInRecipes.length
  }));
};
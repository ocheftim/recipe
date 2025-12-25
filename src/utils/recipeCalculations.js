// src/utils/recipeCalculations.js

export const calculateRecipeCost = (recipe) => {
  if (!recipe.ingredients) return 0;
  
  return recipe.ingredients.reduce((total, ing) => {
    const quantity = parseFloat(ing.quantity) || 0;
    const cost = parseFloat(ing.cost) || 0;
    return total + (quantity * cost);
  }, 0);
};

export const calculateCostPerServing = (recipe) => {
  const totalCost = calculateRecipeCost(recipe);
  const servings = parseInt(recipe.servings) || 1;
  return totalCost / servings;
};

export const sortRecipes = (recipes, sortConfig) => {
  return [...recipes].sort((a, b) => {
    const aValue = a[sortConfig.key] || '';
    const bValue = b[sortConfig.key] || '';
    
    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

export const filterRecipes = (recipes, { searchTerm, category }) => {
  let filtered = [...recipes];
  
  if (searchTerm) {
    filtered = filtered.filter(recipe => 
      recipe.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  if (category) {
    filtered = filtered.filter(recipe => recipe.category === category);
  }
  
  return filtered;
};

// Recipe-related utility functions

export const formatCost = (cost) => {
    if (typeof cost !== 'number' || isNaN(cost)) return '$0.00';
    return `${cost.toFixed(2)}`;
  };
  
  export const formatCurrency = (value) => {
    const num = parseFloat(value) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(num);
  };
  
  export const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit'
    });
  };
  
  export const formatFoodCostPercent = (percent) => {
    if (typeof percent !== 'number' || isNaN(percent)) return '0%';
    return `${percent.toFixed(1)}%`;
  };
  
  export const getDietaryBadges = (dietary) => {
    if (!dietary) return [];
    
    const dietaryArray = typeof dietary === 'string' ? 
      dietary.split(',').map(d => d.trim()).filter(d => d) : 
      Array.isArray(dietary) ? dietary : [];
  
    return dietaryArray;
  };
  
  // Recipe calculations
  export const calculateFoodCostPercent = (costPerServing, menuPrice) => {
    if (!menuPrice || menuPrice === 0) return 0;
    return (costPerServing / menuPrice) * 100;
  };
  
  export const calculateTotalCost = (ingredients) => {
    if (!ingredients || !Array.isArray(ingredients)) return 0;
    return ingredients.reduce((total, ing) => total + (parseFloat(ing.cost) || 0), 0);
  };
  
  export const calculateCostPerServing = (totalCost, recipeYield) => {
    if (!recipeYield || recipeYield === 0) return 0;
    return totalCost / recipeYield;
  };
  
  // Sort helper
  export const sortRecipes = (recipes, sortConfig) => {
    if (!sortConfig.key) return recipes;
    
    return [...recipes].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      
      // Handle date objects for updated field
      if (sortConfig.key === 'updated') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      
      if (aVal < bVal) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aVal > bVal) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };
  
  // Filter helper
  export const filterRecipes = (recipes, searchTerm) => {
    if (!searchTerm) return recipes;
    
    const term = searchTerm.toLowerCase();
    return recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(term) ||
      recipe.category.toLowerCase().includes(term) ||
      recipe.cuisine.toLowerCase().includes(term) ||
      (recipe.outlet && recipe.outlet.toLowerCase().includes(term)) ||
      (recipe.description && recipe.description.toLowerCase().includes(term))
    );
  };
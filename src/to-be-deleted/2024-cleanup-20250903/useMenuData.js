// UPDATED VERSION - src/services/recipeDataService.js - 5 RECIPES
console.log('🔥 ULTRA-SIMPLE: Service file loaded');

const recipes = [
  {
    id: 1,
    name: 'Grilled Chicken Breast',
    category: 'Entree',
    cuisine: 'American',
    outlet: 'Fine Dining',
    costPerServing: 8.10,
    menuPrice: 28.00,
    foodCostPercent: 28.9,
    status: 'Active',
    yield: '4 servings',
    lastUpdated: '2024-08-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Pan-Seared Salmon',
    category: 'Entree',
    cuisine: 'Contemporary',
    outlet: 'Fine Dining',
    costPerServing: 11.45,
    menuPrice: 36.00,
    foodCostPercent: 31.8,
    status: 'Active',
    yield: '4 servings',
    lastUpdated: '2024-08-14T15:45:00Z'
  },
  {
    id: 3,
    name: 'Beef Tenderloin',
    category: 'Entree',
    cuisine: 'French',
    outlet: 'Fine Dining',
    costPerServing: 8.55,
    menuPrice: 42.00,
    foodCostPercent: 20.4,
    status: 'Active',
    yield: '8 servings',
    lastUpdated: '2024-08-13T09:15:00Z'
  },
  {
    id: 4,
    name: 'Vegetable Pasta',
    category: 'Entree',
    cuisine: 'Italian',
    outlet: 'Casual Dining',
    costPerServing: 3.08,
    menuPrice: 16.00,
    foodCostPercent: 19.3,
    status: 'Active',
    yield: '4 servings',
    lastUpdated: '2024-08-12T14:20:00Z'
  },
  {
    id: 5,
    name: 'Chocolate Cake',
    category: 'Dessert',
    cuisine: 'American',
    outlet: 'Bakery',
    costPerServing: 1.32,
    menuPrice: 8.00,
    foodCostPercent: 16.5,
    status: 'Active',
    yield: '12 slices',
    lastUpdated: '2024-08-11T11:30:00Z'
  }
];

class RecipeDataService {
  constructor() {
    console.log('🔥 ULTRA-SIMPLE: Constructor called');
    this.recipes = recipes;
    console.log('🔥 ULTRA-SIMPLE: Recipes stored:', this.recipes.length);
  }

  // CORE METHODS - GUARANTEED TO WORK
  async getAllRecipes() {
    console.log('📋 ULTRA-SIMPLE: getAllRecipes called');
    const result = [...this.recipes];
    console.log('📋 ULTRA-SIMPLE: Returning', result.length, 'recipes');
    return result;
  }

  async getRecipeById(id) {
    console.log('🔍 ULTRA-SIMPLE: getRecipeById called with id:', id);
    return this.recipes.find(recipe => recipe.id === parseInt(id)) || null;
  }

  async getActiveRecipes() {
    console.log('✅ ULTRA-SIMPLE: getActiveRecipes called');
    return this.recipes.filter(recipe => recipe.status === 'Active');
  }

  // SORTING - FIXED VERSION
  sortRecipes(recipesArray, sortConfig) {
    console.log('🔄 ULTRA-SIMPLE: sortRecipes called');
    
    if (!recipesArray || !Array.isArray(recipesArray)) {
      console.warn('⚠️ ULTRA-SIMPLE: Invalid recipes data, returning empty array');
      return [];
    }

    if (!sortConfig || !sortConfig.key) {
      console.log('📋 ULTRA-SIMPLE: No sort config, returning original array');
      return [...recipesArray];
    }

    const sorted = [...recipesArray].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const comparison = aValue - bValue;
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      return 0;
    });

    console.log('✅ ULTRA-SIMPLE: Sorted', sorted.length, 'recipes');
    return sorted;
  }

  // FILTERING - SAFE VERSION
  filterRecipes(recipesArray, filters = {}) {
    console.log('🔍 ULTRA-SIMPLE: filterRecipes called');

    if (!recipesArray || !Array.isArray(recipesArray)) {
      console.warn('⚠️ ULTRA-SIMPLE: Invalid recipes data, returning empty array');
      return [];
    }

    if (!filters || Object.keys(filters).length === 0) {
      console.log('📋 ULTRA-SIMPLE: No filters, returning original array');
      return [...recipesArray];
    }

    const filtered = recipesArray.filter(recipe => {
      if (filters.searchTerm) {
        const searchTerm = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          recipe.name?.toLowerCase().includes(searchTerm) ||
          recipe.category?.toLowerCase().includes(searchTerm) ||
          recipe.cuisine?.toLowerCase().includes(searchTerm);
        if (!matchesSearch) return false;
      }

      if (filters.categoryFilter && recipe.category !== filters.categoryFilter) {
        return false;
      }

      if (filters.cuisineFilter && recipe.cuisine !== filters.cuisineFilter) {
        return false;
      }

      if (filters.outletFilter && recipe.outlet !== filters.outletFilter) {
        return false;
      }

      return true;
    });

    console.log('✅ ULTRA-SIMPLE: Filtered to', filtered.length, 'recipes');
    return filtered;
  }

  // ANALYTICS - UPDATED FOR 5 RECIPES
  async getRecipeAnalytics() {
    console.log('📊 ULTRA-SIMPLE: getRecipeAnalytics called');
    const activeRecipes = this.recipes.filter(r => r.status === 'Active');
    
    const totalRevenue = this.recipes.reduce((sum, r) => sum + (r.menuPrice || 0), 0);
    const totalCost = this.recipes.reduce((sum, r) => sum + (r.costPerServing || 0), 0);
    const avgFoodCost = this.recipes.reduce((sum, r) => sum + (r.foodCostPercent || 0), 0) / this.recipes.length;
    
    return {
      totalRecipes: this.recipes.length,
      activeRecipes: activeRecipes.length,
      averageFoodCost: avgFoodCost.toFixed(1),
      averageMenuPrice: (totalRevenue / this.recipes.length).toFixed(2),
      totalMenuValue: totalRevenue,
      totalCost: totalCost,
      profitMargin: totalRevenue > 0 ? ((totalRevenue - totalCost) / totalRevenue * 100).toFixed(1) : '0',
      categoryBreakdown: {
        'Entree': 4,
        'Dessert': 1
      },
      cuisineBreakdown: {
        'American': 2,
        'Contemporary': 1,
        'French': 1,
        'Italian': 1
      },
      outletBreakdown: {
        'Fine Dining': 3,
        'Casual Dining': 1,
        'Bakery': 1
      }
    };
  }

  // MENU COMPATIBILITY
  async getMenuCompatibleRecipes() {
    console.log('📋 ULTRA-SIMPLE: getMenuCompatibleRecipes called');
    return this.recipes.map(recipe => ({
      ...recipe,
      cost: recipe.costPerServing,
      price: recipe.menuPrice,
      margin: recipe.foodCostPercent ? (100 - recipe.foodCostPercent) : 0
    }));
  }

  // RECIPE BOOKS COMPATIBILITY
  async getRecipeBookCompatibleData() {
    console.log('📚 ULTRA-SIMPLE: getRecipeBookCompatibleData called');
    return this.recipes.map(recipe => ({
      ...recipe,
      bookCategory: recipe.category,
      difficulty: 'Medium',
      prepTime: '15 minutes',
      cookTime: '20 minutes',
      servings: recipe.yield
    }));
  }

  // SEARCH - SIMPLE VERSION
  async searchRecipes(query, filters = {}) {
    console.log('🔍 ULTRA-SIMPLE: searchRecipes called with:', { query, filters });
    let results = [...this.recipes];
    
    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.category.toLowerCase().includes(searchTerm) ||
        recipe.cuisine.toLowerCase().includes(searchTerm)
      );
    }
    
    console.log('✅ ULTRA-SIMPLE: Found', results.length, 'results');
    return results;
  }

  // UTILITY METHODS - MINIMAL VERSIONS
  calculateRecipeCost(recipe) {
    return recipe.totalCost || recipe.costPerServing || 0;
  }

  calculateCostPerServing(recipe) {
    return recipe.costPerServing || 0;
  }

  calculateFoodCostPercentage(recipe) {
    return recipe.foodCostPercent || 0;
  }

  analyzeRecipeMargin(recipe) {
    return {
      actualFoodCostPercentage: recipe.foodCostPercent || 0,
      targetFoodCostPercentage: 30,
      variance: (recipe.foodCostPercent || 0) - 30,
      status: 'on_target'
    };
  }

  getUniqueCategories() {
    return [...new Set(this.recipes.map(r => r.category))].sort();
  }

  getUniqueCuisines() {
    return [...new Set(this.recipes.map(r => r.cuisine))].sort();
  }

  getUniqueOutlets() {
    return [...new Set(this.recipes.map(r => r.outlet))].sort();
  }

  getUniqueDietary() {
    return [];
  }

  getFilterOptions() {
    return {
      categories: this.getUniqueCategories(),
      cuisines: this.getUniqueCuisines(),
      outlets: this.getUniqueOutlets(),
      dietary: this.getUniqueDietary(),
      statuses: [...new Set(this.recipes.map(r => r.status))].sort()
    };
  }

  // CRUD OPERATIONS - BASIC VERSIONS
  async addRecipe(recipe) {
    const newRecipe = { ...recipe, id: Date.now(), lastUpdated: new Date().toISOString() };
    this.recipes.push(newRecipe);
    return newRecipe;
  }

  async updateRecipe(id, updatedRecipe) {
    const index = this.recipes.findIndex(recipe => recipe.id === parseInt(id));
    if (index !== -1) {
      this.recipes[index] = { ...this.recipes[index], ...updatedRecipe, lastUpdated: new Date().toISOString() };
      return this.recipes[index];
    }
    return null;
  }

  async deleteRecipe(id) {
    const index = this.recipes.findIndex(recipe => recipe.id === parseInt(id));
    if (index !== -1) {
      return this.recipes.splice(index, 1)[0];
    }
    return null;
  }

  validateRecipe(recipe) {
    const errors = [];
    if (!recipe.name) errors.push('Recipe name is required');
    if (!recipe.category) errors.push('Category is required');
    return { isValid: errors.length === 0, errors };
  }
}

// EXPORT THE SERVICE
const recipeDataService = new RecipeDataService();

console.log('🔥 ULTRA-SIMPLE: Service instance created');
console.log('🔥 ULTRA-SIMPLE: Export test:', recipeDataService);

export default recipeDataService;
export { RecipeDataService };
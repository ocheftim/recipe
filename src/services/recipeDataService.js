// ULTRA SIMPLE TEST VERSION WITH UPDATED DATES
console.log('🔥 ULTRA-SIMPLE: Service file loaded');

const recipes = [
  { 
    id: 1, 
    name: 'Classic Beef Stew', 
    category: 'Entree', 
    cuisine: 'American', 
    outlet: 'Fine Dining', 
    costPerServing: 3.06, 
    menuPrice: 12.95, 
    status: 'active',
    lastUpdated: '08/31/25'
  },
  { 
    id: 2, 
    name: 'Pan-Seared Salmon with Herbs', 
    category: 'Entree', 
    cuisine: 'Mediterranean', 
    outlet: 'Fine Dining', 
    costPerServing: 8.25, 
    menuPrice: 26.95, 
    status: 'active',
    lastUpdated: '08/30/25'
  },
  { 
    id: 3, 
    name: 'Herb-Crusted Chicken Breast', 
    category: 'Entree', 
    cuisine: 'American', 
    outlet: 'Casual', 
    costPerServing: 4.12, 
    menuPrice: 16.95, 
    status: 'active',
    lastUpdated: '08/29/25'
  },
  { 
    id: 4, 
    name: 'Roasted Vegetable Medley', 
    category: 'Side', 
    cuisine: 'Mediterranean', 
    outlet: 'Casual', 
    costPerServing: 1.89, 
    menuPrice: 7.95, 
    status: 'seasonal',
    lastUpdated: '08/28/25'
  },
  { 
    id: 5, 
    name: 'Creamy Tomato Basil Soup', 
    category: 'Soup', 
    cuisine: 'Italian', 
    outlet: 'Casual', 
    costPerServing: 2.45, 
    menuPrice: 8.95, 
    status: 'active',
    lastUpdated: '08/27/25'
  }
];

class RecipeDataService {
  constructor() {
    console.log('🔥 ULTRA-SIMPLE: Constructor called');
    this.recipes = recipes;
    console.log('🔥 ULTRA-SIMPLE: Recipes stored:', this.recipes.length);
  }

  async getAllRecipes() {
    console.log('🔥 ULTRA-SIMPLE: getAllRecipes called');
    console.log('🔥 ULTRA-SIMPLE: this.recipes =', this.recipes);
    const result = this.recipes;
    console.log('🔥 ULTRA-SIMPLE: Returning:', result);
    return result;
  }

  sortRecipes(recipes, sortConfig) {
    console.log('🔥 ULTRA-SIMPLE: sortRecipes called');
    console.log('🔥 ULTRA-SIMPLE: recipes input:', recipes);
    if (!recipes || !Array.isArray(recipes)) {
      console.log('🔥 ULTRA-SIMPLE: Invalid input, returning empty array');
      return [];
    }
    console.log('🔥 ULTRA-SIMPLE: Returning recipes as-is');
    return recipes;
  }

  filterRecipes(recipes, filters) {
    console.log('🔥 ULTRA-SIMPLE: filterRecipes called');
    if (!recipes || !Array.isArray(recipes)) return [];
    return recipes;
  }

  async getRecipeAnalytics() {
    return {
      totalRecipes: 5,
      activeRecipes: 4,
      averageFoodCost: '5.54',
      averageMenuPrice: '16.46'
    };
  }

  async getMenuCompatibleRecipes() {
    return this.recipes.map(r => ({ ...r, cost: r.costPerServing, price: r.menuPrice }));
  }

  getUniqueCategories() { return ['Entree', 'Side', 'Soup']; }
  getUniqueCuisines() { return ['American', 'Mediterranean', 'Italian']; }
  getUniqueOutlets() { return ['Fine Dining', 'Casual']; }
  getUniqueDietary() { return []; }
  getFilterOptions() { return { categories: this.getUniqueCategories(), cuisines: this.getUniqueCuisines() }; }

  calculateRecipeCost() { return 0; }
  calculateCostPerServing() { return 0; }
  calculateFoodCostPercentage() { return 0; }
  analyzeRecipeMargin() { return { status: 'on_target' }; }
  validateRecipe() { return { isValid: true, errors: [] }; }

  async getRecipeById(id) { return this.recipes.find(r => r.id === parseInt(id)); }
  async getActiveRecipes() { return this.recipes.filter(r => r.status === 'active'); }
  async addRecipe(recipe) { return recipe; }
  async updateRecipe(id, recipe) { return recipe; }
  async deleteRecipe(id) { return {}; }
}

const recipeDataService = new RecipeDataService();

console.log('🔥 ULTRA-SIMPLE: Service instance created');
console.log('🔥 ULTRA-SIMPLE: Export test:', recipeDataService);

export default recipeDataService;
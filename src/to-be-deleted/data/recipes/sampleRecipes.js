const RecipeContext = createContext();

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState(sampleRecipes);

  // Enhanced calculation functions
  const calculateRecipeCost = (recipe) => {
    if (!recipe.ingredients) return 0;
    return recipe.ingredients.reduce((total, ingredient) => {
      const cost = parseFloat(ingredient.unit_cost) || 0;
      const quantity = parseFloat(ingredient.quantity) || 0;
      return total + (cost * quantity);
    }, 0);
  };

  const calculateCostPerServing = (recipe) => {
    const totalCost = calculateRecipeCost(recipe);
    const yield_amount = recipe.yield || 1;
    return totalCost / yield_amount;
  };

  const calculateFoodCostPercentage = (recipe) => {
    const costPerServing = calculateCostPerServing(recipe);
    const menuPrice = recipe.target_menu_price || 0;
    return menuPrice > 0 ? (costPerServing / menuPrice) * 100 : 0;
  };

  const analyzeRecipeMargin = (recipe) => {
    const actualFoodCost = calculateFoodCostPercentage(recipe);
    const targetFoodCost = recipe.target_food_cost_percentage || 30;
    const variance = actualFoodCost - targetFoodCost;
    
    return {
      actual_food_cost_percentage: actualFoodCost,
      target_food_cost_percentage: targetFoodCost,
      variance: variance,
      status: variance > 5 ? 'over_budget' : variance < -5 ? 'under_budget' : 'on_target'
    };
  };

  // CRUD Operations
  const addRecipe = (recipe) => {
    const newRecipe = { ...recipe, id: Date.now() };
    setRecipes(prev => [...prev, newRecipe]);
    return newRecipe;
  };

  const updateRecipe = (id, updatedRecipe) => {
    setRecipes(prev => prev.map(recipe => 
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    ));
  };

  const deleteRecipe = (id) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== id));
  };

  const getRecipeById = (id) => {
    return recipes.find(recipe => recipe.id === parseInt(id));
  };

  // Analytics functions
  const getRecipeAnalytics = () => {
    const totalRecipes = recipes.length;
    const avgCostPerServing = recipes.reduce((sum, recipe) => 
      sum + calculateCostPerServing(recipe), 0) / totalRecipes;
    
    return {
      total_recipes: totalRecipes,
      average_cost_per_serving: avgCostPerServing,
      high_cost_count: recipes.filter(r => calculateFoodCostPercentage(r) > 35).length
    };
  };

  const getHighCostRecipes = (threshold = 35) => {
    return recipes.filter(r => calculateFoodCostPercentage(r) > threshold);
  };

  const getLowMarginRecipes = () => {
    return recipes.filter(r => {
      const margin = analyzeRecipeMargin(r);
      return margin.variance > 0;
    });
  };

  const value = {
    recipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipeById,
    calculateRecipeCost,
    calculateCostPerServing,
    calculateFoodCostPercentage,
    analyzeRecipeMargin,
    getRecipeAnalytics,
    getHighCostRecipes,
    getLowMarginRecipes
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};
export default sampleRecipes;

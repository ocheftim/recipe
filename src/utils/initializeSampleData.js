// src/utils/initializeSampleData.js
// Run this function once to populate your localStorage with sample data

export const initializeSampleData = () => {
    // Check if data already exists
    const existingIngredients = localStorage.getItem('toqueworks_ingredients');
    const existingRecipes = localStorage.getItem('toqueworks_recipes');
    
    if (existingIngredients && existingRecipes) {
      const confirm = window.confirm('Sample data already exists. Do you want to replace it with fresh sample data?');
      if (!confirm) return false;
    }
  
    // Sample Ingredients
    const sampleIngredients = [
      { id: 1, name: 'Salmon Fillet', category: 'Seafood', unit: 'lb', costPerUnit: 12.99, supplier: 'Ocean Fresh', minStock: 10, maxStock: 50 },
      { id: 2, name: 'Chicken Breast', category: 'Meat', unit: 'lb', costPerUnit: 4.99, supplier: 'Farm Direct', minStock: 20, maxStock: 80 },
      { id: 3, name: 'Ground Beef', category: 'Meat', unit: 'lb', costPerUnit: 5.49, supplier: 'Farm Direct', minStock: 15, maxStock: 60 },
      { id: 4, name: 'Pasta (Penne)', category: 'Dry Goods', unit: 'lb', costPerUnit: 1.99, supplier: 'Italian Imports', minStock: 25, maxStock: 100 },
      { id: 5, name: 'Tomatoes', category: 'Produce', unit: 'lb', costPerUnit: 2.49, supplier: 'Local Farms', minStock: 10, maxStock: 40 },
      { id: 6, name: 'Lettuce (Romaine)', category: 'Produce', unit: 'each', costPerUnit: 1.99, supplier: 'Local Farms', minStock: 20, maxStock: 50 },
      { id: 7, name: 'Onions', category: 'Produce', unit: 'lb', costPerUnit: 0.99, supplier: 'Local Farms', minStock: 30, maxStock: 100 },
      { id: 8, name: 'Garlic', category: 'Produce', unit: 'lb', costPerUnit: 3.99, supplier: 'Local Farms', minStock: 5, maxStock: 20 },
      { id: 9, name: 'Olive Oil', category: 'Dry Goods', unit: 'L', costPerUnit: 8.99, supplier: 'Italian Imports', minStock: 10, maxStock: 30 },
      { id: 10, name: 'Butter', category: 'Dairy', unit: 'lb', costPerUnit: 3.99, supplier: 'Dairy Best', minStock: 10, maxStock: 40 },
      { id: 11, name: 'Heavy Cream', category: 'Dairy', unit: 'L', costPerUnit: 4.49, supplier: 'Dairy Best', minStock: 5, maxStock: 20 },
      { id: 12, name: 'Parmesan Cheese', category: 'Dairy', unit: 'lb', costPerUnit: 11.99, supplier: 'Italian Imports', minStock: 5, maxStock: 25 },
      { id: 13, name: 'Flour (All Purpose)', category: 'Dry Goods', unit: 'lb', costPerUnit: 0.99, supplier: 'Bulk Foods Co', minStock: 50, maxStock: 200 },
      { id: 14, name: 'Sugar', category: 'Dry Goods', unit: 'lb', costPerUnit: 0.79, supplier: 'Bulk Foods Co', minStock: 25, maxStock: 100 },
      { id: 15, name: 'Eggs', category: 'Dairy', unit: 'dozen', costPerUnit: 3.99, supplier: 'Farm Direct', minStock: 10, maxStock: 50 }
    ];
  
    // Sample Recipes with calculated costs
    const sampleRecipes = [
      {
        id: 'recipe_001',
        name: 'Grilled Salmon with Lemon Butter',
        description: 'Fresh Atlantic salmon grilled to perfection with house-made lemon butter sauce',
        category: 'Seafood',
        servings: 4,
        prepTime: 15,
        cookTime: 20,
        menuPrice: 28.99,
        status: 'active',
        importSource: 'manual',
        ingredients: [
          { ingredientId: 1, name: 'Salmon Fillet', quantity: 2, unit: 'lb', cost: 25.98 },
          { ingredientId: 10, name: 'Butter', quantity: 0.25, unit: 'lb', cost: 1.00 },
          { ingredientId: 8, name: 'Garlic', quantity: 0.1, unit: 'lb', cost: 0.40 },
          { ingredientId: 9, name: 'Olive Oil', quantity: 0.1, unit: 'L', cost: 0.90 }
        ],
        instructions: [
          'Season salmon fillets with salt and pepper',
          'Heat olive oil in a grill pan over medium-high heat',
          'Grill salmon for 4-5 minutes per side',
          'Prepare lemon butter sauce with garlic',
          'Serve salmon topped with lemon butter'
        ],
        totalCost: 28.28,
        costPerServing: 7.07,
        foodCostPercent: 24.4,
        profitMargin: 75.6
      },
      {
        id: 'recipe_002',
        name: 'Chicken Parmesan',
        description: 'Breaded chicken breast with marinara sauce and melted parmesan',
        category: 'Poultry',
        servings: 6,
        prepTime: 30,
        cookTime: 45,
        menuPrice: 22.99,
        status: 'active',
        importSource: 'manual',
        ingredients: [
          { ingredientId: 2, name: 'Chicken Breast', quantity: 3, unit: 'lb', cost: 14.97 },
          { ingredientId: 5, name: 'Tomatoes', quantity: 2, unit: 'lb', cost: 4.98 },
          { ingredientId: 12, name: 'Parmesan Cheese', quantity: 0.5, unit: 'lb', cost: 6.00 },
          { ingredientId: 13, name: 'Flour', quantity: 0.5, unit: 'lb', cost: 0.50 },
          { ingredientId: 15, name: 'Eggs', quantity: 0.25, unit: 'dozen', cost: 1.00 },
          { ingredientId: 9, name: 'Olive Oil', quantity: 0.2, unit: 'L', cost: 1.80 }
        ],
        instructions: [
          'Pound chicken breasts to even thickness',
          'Set up breading station with flour, eggs, and breadcrumbs',
          'Bread the chicken breasts',
          'Pan fry until golden brown',
          'Top with marinara and cheese, bake until melted'
        ],
        totalCost: 29.25,
        costPerServing: 4.88,
        foodCostPercent: 21.2,
        profitMargin: 78.8
      },
      {
        id: 'recipe_003',
        name: 'Classic Beef Bolognese',
        description: 'Slow-simmered meat sauce with herbs served over fresh pasta',
        category: 'Pasta',
        servings: 8,
        prepTime: 20,
        cookTime: 120,
        menuPrice: 18.99,
        status: 'active',
        importSource: 'manual',
        ingredients: [
          { ingredientId: 3, name: 'Ground Beef', quantity: 2, unit: 'lb', cost: 10.98 },
          { ingredientId: 4, name: 'Pasta (Penne)', quantity: 2, unit: 'lb', cost: 3.98 },
          { ingredientId: 5, name: 'Tomatoes', quantity: 3, unit: 'lb', cost: 7.47 },
          { ingredientId: 7, name: 'Onions', quantity: 1, unit: 'lb', cost: 0.99 },
          { ingredientId: 8, name: 'Garlic', quantity: 0.2, unit: 'lb', cost: 0.80 },
          { ingredientId: 9, name: 'Olive Oil', quantity: 0.15, unit: 'L', cost: 1.35 }
        ],
        instructions: [
          'Brown the ground beef in olive oil',
          'Add diced onions and garlic, sauté until soft',
          'Add crushed tomatoes and herbs',
          'Simmer on low heat for 2 hours',
          'Cook pasta al dente and serve with sauce'
        ],
        totalCost: 25.57,
        costPerServing: 3.20,
        foodCostPercent: 16.9,
        profitMargin: 83.1
      },
      {
        id: 'recipe_004',
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce with house-made Caesar dressing and croutons',
        category: 'Salads',
        servings: 4,
        prepTime: 15,
        cookTime: 0,
        menuPrice: 12.99,
        status: 'active',
        importSource: 'manual',
        ingredients: [
          { ingredientId: 6, name: 'Lettuce (Romaine)', quantity: 3, unit: 'each', cost: 5.97 },
          { ingredientId: 12, name: 'Parmesan Cheese', quantity: 0.25, unit: 'lb', cost: 3.00 },
          { ingredientId: 15, name: 'Eggs', quantity: 0.083, unit: 'dozen', cost: 0.33 },
          { ingredientId: 9, name: 'Olive Oil', quantity: 0.1, unit: 'L', cost: 0.90 },
          { ingredientId: 8, name: 'Garlic', quantity: 0.05, unit: 'lb', cost: 0.20 }
        ],
        instructions: [
          'Wash and chop romaine lettuce',
          'Prepare Caesar dressing with egg yolk, garlic, and olive oil',
          'Toss lettuce with dressing',
          'Top with shaved parmesan and croutons',
          'Serve immediately'
        ],
        totalCost: 10.40,
        costPerServing: 2.60,
        foodCostPercent: 20.0,
        profitMargin: 80.0
      },
      {
        id: 'recipe_005',
        name: 'Fettuccine Alfredo',
        description: 'Fresh pasta in a rich cream and parmesan sauce',
        category: 'Pasta',
        servings: 6,
        prepTime: 10,
        cookTime: 20,
        menuPrice: 16.99,
        status: 'active',
        importSource: 'manual',
        ingredients: [
          { ingredientId: 4, name: 'Pasta (Penne)', quantity: 1.5, unit: 'lb', cost: 2.99 },
          { ingredientId: 11, name: 'Heavy Cream', quantity: 0.5, unit: 'L', cost: 2.25 },
          { ingredientId: 12, name: 'Parmesan Cheese', quantity: 0.5, unit: 'lb', cost: 6.00 },
          { ingredientId: 10, name: 'Butter', quantity: 0.25, unit: 'lb', cost: 1.00 },
          { ingredientId: 8, name: 'Garlic', quantity: 0.05, unit: 'lb', cost: 0.20 }
        ],
        instructions: [
          'Cook pasta according to package directions',
          'In a large pan, melt butter and sauté garlic',
          'Add heavy cream and bring to a simmer',
          'Add parmesan cheese and stir until melted',
          'Toss pasta with sauce and serve'
        ],
        totalCost: 12.44,
        costPerServing: 2.07,
        foodCostPercent: 12.2,
        profitMargin: 87.8
      }
    ];
  
    // Store in localStorage
    localStorage.setItem('toqueworks_ingredients', JSON.stringify(sampleIngredients));
    localStorage.setItem('toqueworks_recipes', JSON.stringify(sampleRecipes));
    
    // Initialize empty inventory
    const inventory = {};
    sampleIngredients.forEach(ing => {
      inventory[ing.id] = {
        currentStock: Math.random() * (ing.maxStock - ing.minStock) + ing.minStock,
        lastUpdated: new Date().toISOString()
      };
    });
    localStorage.setItem('toqueworks_inventory', JSON.stringify(inventory));
  
    console.log('Sample data initialized successfully!');
    console.log(`- ${sampleIngredients.length} ingredients added`);
    console.log(`- ${sampleRecipes.length} recipes added`);
    
    return true;
  };
  
  // Add this function to App.js or call it from Dashboard
  export const checkAndInitializeSampleData = () => {
    const hasIngredients = localStorage.getItem('toqueworks_ingredients');
    const hasRecipes = localStorage.getItem('toqueworks_recipes');
    
    if (!hasIngredients || !hasRecipes) {
      console.log('No data found. Initializing sample data...');
      initializeSampleData();
    }
  };
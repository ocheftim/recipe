// src/contexts/RecipeContext.js - SCHEMA-ALIGNED VERSION
import React, { createContext, useContext, useState } from 'react';
import { enhancedRecipes } from '../data/recipeData';

const RecipeContext = createContext();

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState(enhancedRecipes);

  // PROFESSIONAL CALCULATION FUNCTIONS - Aligned with enhancedRecipes schema
  const calculateRecipeCost = (recipe) => {
    if (!recipe.ingredients) return 0;
    
    return recipe.ingredients.reduce((total, ingredient) => {
      // Use professional schema: apCost, quantity, trimLoss, cookingLoss
      const apCost = parseFloat(ingredient.apCost) || 0;
      const quantity = parseFloat(ingredient.quantity) || 0;
      const trimLoss = parseFloat(ingredient.trimLoss) || 0;
      const cookingLoss = parseFloat(ingredient.cookingLoss) || 0;
      
      // Calculate actual usable quantity after losses
      const afterTrimLoss = quantity * (1 - trimLoss / 100);
      const finalQuantity = afterTrimLoss * (1 - cookingLoss / 100);
      
      // Cost = AP Cost * Original Quantity (we pay for what we buy, not what we use)
      const ingredientCost = apCost * quantity;
      
      return total + ingredientCost;
    }, 0);
  };

  const calculateCostPerServing = (recipe) => {
    // Use existing totalCost if available, otherwise calculate
    const totalCost = recipe.totalCost || calculateRecipeCost(recipe);
    const yieldAmount = recipe.yield || 1;
    return totalCost / yieldAmount;
  };

  const calculateFoodCostPercentage = (recipe) => {
    const costPerServing = calculateCostPerServing(recipe);
    // Use professional schema: menuPrice instead of target_menu_price
    const menuPrice = recipe.menuPrice || 0;
    return menuPrice > 0 ? (costPerServing / menuPrice) * 100 : 0;
  };

  // Enhanced analysis using professional data
  const analyzeRecipeMargin = (recipe) => {
    const actualFoodCost = calculateFoodCostPercentage(recipe);
    // Use foodCostPercent from data if available, otherwise default to 30%
    const targetFoodCost = recipe.foodCostPercent || 30;
    const variance = actualFoodCost - targetFoodCost;
    
    return {
      actual_food_cost_percentage: actualFoodCost,
      target_food_cost_percentage: targetFoodCost,
      variance: variance,
      status: variance > 5 ? 'over_budget' : variance < -5 ? 'under_budget' : 'on_target',
      profit_margin: recipe.profitMargin || 0,
      cost_per_serving: calculateCostPerServing(recipe),
      menu_price: recipe.menuPrice || 0
    };
  };

  // Professional ingredient analysis
  const analyzeIngredientImpact = (recipe, ingredientId) => {
    const ingredient = recipe.ingredients.find(ing => ing.id === ingredientId);
    if (!ingredient) return null;
    
    const ingredientCost = parseFloat(ingredient.apCost) * parseFloat(ingredient.quantity);
    const totalRecipeCost = calculateRecipeCost(recipe);
    const impactPercentage = totalRecipeCost > 0 ? (ingredientCost / totalRecipeCost) * 100 : 0;
    
    return {
      ingredient_name: ingredient.name,
      cost: ingredientCost,
      impact_percentage: impactPercentage,
      vendor: ingredient.vendor,
      trim_loss: ingredient.trimLoss,
      cooking_loss: ingredient.cookingLoss
    };
  };

  // CRUD Operations with professional features
  const addRecipe = (recipe) => {
    const newRecipe = { 
      ...recipe, 
      id: `recipe-${Date.now()}`,
      lastUpdated: new Date().toISOString().split('T')[0],
      status: recipe.status || 'Draft'
    };
    
    // Calculate professional metrics
    newRecipe.totalCost = calculateRecipeCost(newRecipe);
    newRecipe.costPerServing = calculateCostPerServing(newRecipe);
    if (newRecipe.menuPrice) {
      newRecipe.foodCostPercent = calculateFoodCostPercentage(newRecipe);
      newRecipe.profitMargin = newRecipe.menuPrice - newRecipe.costPerServing;
    }
    
    setRecipes(prev => [...prev, newRecipe]);
    return newRecipe;
  };

  const updateRecipe = (id, updatedRecipe) => {
    setRecipes(prev => prev.map(recipe => {
      if (recipe.id === id) {
        const updated = { 
          ...recipe, 
          ...updatedRecipe,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
        
        // Recalculate professional metrics
        updated.totalCost = calculateRecipeCost(updated);
        updated.costPerServing = calculateCostPerServing(updated);
        if (updated.menuPrice) {
          updated.foodCostPercent = calculateFoodCostPercentage(updated);
          updated.profitMargin = updated.menuPrice - updated.costPerServing;
        }
        
        return updated;
      }
      return recipe;
    }));
  };

  const deleteRecipe = (id) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== id));
  };

  const getRecipeById = (id) => {
    return recipes.find(recipe => recipe.id === id || recipe.id === parseInt(id));
  };

  // Professional analytics
  const getRecipeAnalytics = () => {
    if (recipes.length === 0) return {
      total_recipes: 0,
      average_cost_per_serving: 0,
      high_cost_count: 0,
      average_food_cost_percent: 0,
      profit_margin_total: 0
    };

    const totalRecipes = recipes.length;
    const totalCostPerServing = recipes.reduce((sum, recipe) => 
      sum + calculateCostPerServing(recipe), 0);
    const avgCostPerServing = totalCostPerServing / totalRecipes;
    
    const avgFoodCostPercent = recipes.reduce((sum, recipe) => 
      sum + calculateFoodCostPercentage(recipe), 0) / totalRecipes;
    
    const totalProfitMargin = recipes.reduce((sum, recipe) => 
      sum + (recipe.profitMargin || 0), 0);
    
    return {
      total_recipes: totalRecipes,
      average_cost_per_serving: avgCostPerServing,
      average_food_cost_percent: avgFoodCostPercent,
      high_cost_count: recipes.filter(r => calculateFoodCostPercentage(r) > 35).length,
      profit_margin_total: totalProfitMargin,
      active_recipes: recipes.filter(r => r.status === 'Active').length,
      draft_recipes: recipes.filter(r => r.status === 'Draft').length
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

  // Professional filtering and search
  const getRecipesByCategory = (category) => {
    return recipes.filter(r => r.category === category);
  };

  const getRecipesByOutlet = (outlet) => {
    return recipes.filter(r => r.outlet === outlet);
  };

  const getRecipesByStatus = (status) => {
    return recipes.filter(r => r.status === status);
  };

  const searchRecipes = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    return recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(term) ||
      recipe.category.toLowerCase().includes(term) ||
      recipe.cuisine.toLowerCase().includes(term) ||
      (recipe.code && recipe.code.toLowerCase().includes(term))
    );
  };

  const value = {
    // Data
    recipes,
    
    // CRUD Operations
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipeById,
    
    // Calculations
    calculateRecipeCost,
    calculateCostPerServing,
    calculateFoodCostPercentage,
    analyzeRecipeMargin,
    analyzeIngredientImpact,
    
    // Analytics
    getRecipeAnalytics,
    getHighCostRecipes,
    getLowMarginRecipes,
    
    // Professional Features
    getRecipesByCategory,
    getRecipesByOutlet,
    getRecipesByStatus,
    searchRecipes
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};

export default enhancedRecipes;
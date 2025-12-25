// src/hooks/useRecipeManagement.js

import { useState, useEffect } from 'react';
import { processRecipeIngredients } from '../utils/ingredients/ingredientRecipeConnector';

/**
 * Custom hook for recipe state management
 */
export const useRecipeManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [filters, setFilters] = useState({ category: '' });
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  // Load recipes from localStorage on mount
  useEffect(() => {
    console.log('🔍 Loading recipes...');
    
    let recipesToLoad = [];
    
    // First check for recovered recipes
    const recoveredRecipes = localStorage.getItem('toqueworks_recipes_recovered');
    if (recoveredRecipes) {
      try {
        const parsed = JSON.parse(recoveredRecipes);
        if (Array.isArray(parsed)) {
          // Filter out items that are clearly ingredients, not recipes
          recipesToLoad = parsed.filter(item => {
            const hasRecipeProps = item.instructions || item.servings || item.prepTime || item.cookTime;
            const isIngredient = item.name?.includes('Sample Ingredient') || 
                                ['Protein', 'Dairy', 'Produce', 'Grain', 'Spice', 'Pantry', 'Beverage', 'Condiment', 'Frozen', 'Snack'].includes(item.category);
            
            return hasRecipeProps || !isIngredient;
          });
          
          console.log(`✅ Loaded ${recipesToLoad.length} valid recipes from recovered data`);
          
          // Save cleaned recipes back to main storage
          localStorage.setItem('toqueworks_recipes', JSON.stringify(recipesToLoad));
          localStorage.removeItem('toqueworks_recipes_recovered');
          console.log('Migrated cleaned recipes to main storage');
        }
      } catch (e) {
        console.error('Error loading recovered recipes:', e);
      }
    }
    
    // If no recovered recipes, load from normal storage
    if (recipesToLoad.length === 0) {
      const normalRecipes = localStorage.getItem('toqueworks_recipes');
      if (normalRecipes) {
        try {
          const parsed = JSON.parse(normalRecipes);
          if (Array.isArray(parsed)) {
            recipesToLoad = parsed;
            console.log(`Loaded ${parsed.length} recipes from toqueworks_recipes`);
          } else if (parsed && typeof parsed === 'object') {
            recipesToLoad = [parsed];
            console.log('Loaded single recipe, converting to array');
          }
        } catch (e) {
          console.error('Error loading recipes:', e);
        }
      }
    }
    
    // Ensure all recipes have required fields
    recipesToLoad = recipesToLoad.filter(r => r && r.name).map(r => ({
      ...r,
      id: r.id || `recipe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }));
    
    setRecipes(recipesToLoad);
    setFilteredRecipes(recipesToLoad);
    
    console.log(`Total recipes loaded: ${recipesToLoad.length}`);
    if (recipesToLoad.length > 0) {
      console.log('First few recipes:', recipesToLoad.slice(0, 5).map(r => r.name));
    }
  }, []);

  // Filter and sort recipes
  useEffect(() => {
    let filtered = [...recipes];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(recipe => 
        recipe.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(recipe => recipe.category === filters.category);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key] || '';
      const bValue = b[sortConfig.key] || '';
      
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredRecipes(filtered);
  }, [recipes, searchTerm, filters, sortConfig]);

  return {
    recipes,
    setRecipes,
    filteredRecipes,
    searchTerm,
    setSearchTerm,
    selectedRecipes,
    setSelectedRecipes,
    filters,
    setFilters,
    sortConfig,
    setSortConfig
  };
};

/**
 * Custom hook for recipe operations
 */
export const useRecipeOperations = (recipes, setRecipes) => {
  
  // Save recipes to localStorage
  const saveRecipesToStorage = (updatedRecipes) => {
    try {
      localStorage.setItem('toqueworks_recipes', JSON.stringify(updatedRecipes));
      console.log(`Saved ${updatedRecipes.length} recipes to toqueworks_recipes`);
    } catch (error) {
      console.error('Error saving recipes:', error);
    }
  };

  // Calculate recipe cost from linked ingredients
  const calculateRecipeCost = (recipe) => {
    if (!recipe.ingredients) return 0;
    
    return recipe.ingredients.reduce((total, ing) => {
      const quantity = parseFloat(ing.quantity) || 0;
      const cost = parseFloat(ing.cost) || 0;
      return total + (quantity * cost);
    }, 0);
  };

  // Calculate cost per serving
  const calculateCostPerServing = (recipe) => {
    const totalCost = calculateRecipeCost(recipe);
    const servings = parseInt(recipe.servings) || 1;
    return totalCost / servings;
  };

  // Save recipe (create or update)
  const handleSaveRecipe = (recipeData) => {
    // Process ingredients if it's a manually created recipe
    let processedRecipe = recipeData;
    if (!recipeData.importReport && recipeData.ingredients) {
      processedRecipe = processRecipeIngredients(recipeData);
      
      if (processedRecipe.importReport && processedRecipe.importReport.newCreated > 0) {
        console.log(`Added ${processedRecipe.importReport.newCreated} new ingredients to master list`);
      }
    }
    
    // Load current recipes from storage
    const currentStorage = localStorage.getItem('toqueworks_recipes');
    let currentRecipes = [];
    
    try {
      const parsed = currentStorage ? JSON.parse(currentStorage) : [];
      if (Array.isArray(parsed)) {
        currentRecipes = parsed;
      } else if (parsed && typeof parsed === 'object') {
        currentRecipes = [parsed];
      }
    } catch (e) {
      console.error('Error loading current recipes for save:', e);
      currentRecipes = recipes;
    }
    
    console.log(`Current recipes in storage: ${currentRecipes.length}`);
    
    let updatedRecipes;
    
    if (processedRecipe.id && currentRecipes.find(r => r.id === processedRecipe.id)) {
      // Update existing recipe
      console.log(`Updating existing recipe: ${processedRecipe.name}`);
      updatedRecipes = currentRecipes.map(r => 
        r.id === processedRecipe.id 
          ? { 
              ...processedRecipe, 
              updatedAt: new Date().toISOString(),
              totalCost: calculateRecipeCost(processedRecipe),
              costPerServing: calculateCostPerServing(processedRecipe)
            } 
          : r
      );
    } else {
      // Add new recipe
      const newRecipe = {
        ...processedRecipe,
        id: processedRecipe.id || `recipe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: processedRecipe.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        totalCost: calculateRecipeCost(processedRecipe),
        costPerServing: calculateCostPerServing(processedRecipe)
      };
      
      console.log(`Adding new recipe: ${newRecipe.name}`);
      updatedRecipes = [...currentRecipes, newRecipe];
      console.log(`Total recipes after adding: ${updatedRecipes.length}`);
    }
    
    // Save to storage
    localStorage.setItem('toqueworks_recipes', JSON.stringify(updatedRecipes));
    console.log(`✅ Saved ${updatedRecipes.length} recipes to storage`);
    
    // Update state to reflect changes
    setRecipes(updatedRecipes);
    
    return updatedRecipes;
  };

  // Delete recipe
  const handleDeleteRecipe = (recipeId) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      const updatedRecipes = recipes.filter(r => r.id !== recipeId);
      setRecipes(updatedRecipes);
      saveRecipesToStorage(updatedRecipes);
    }
  };

  // Copy recipe
  const handleCopyRecipe = (recipe) => {
    const copiedRecipe = {
      ...recipe,
      id: `recipe_${Date.now()}`,
      name: `${recipe.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedRecipes = [...recipes, copiedRecipe];
    setRecipes(updatedRecipes);
    saveRecipesToStorage(updatedRecipes);
    
    alert(`Recipe "${copiedRecipe.name}" created successfully!`);
    return copiedRecipe;
  };

  // Delete multiple recipes
  const handleDeleteSelected = (selectedRecipeIds) => {
    if (selectedRecipeIds.length === 0) return;
    
    if (window.confirm(`Delete ${selectedRecipeIds.length} selected recipes?`)) {
      const updatedRecipes = recipes.filter(r => !selectedRecipeIds.includes(r.id));
      setRecipes(updatedRecipes);
      saveRecipesToStorage(updatedRecipes);
      return true;
    }
    return false;
  };

  return {
    handleSaveRecipe,
    handleDeleteRecipe,
    handleCopyRecipe,
    handleDeleteSelected,
    calculateRecipeCost,
    calculateCostPerServing,
    saveRecipesToStorage
  };
};
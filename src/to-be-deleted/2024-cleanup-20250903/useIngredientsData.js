// src/hooks/useIngredientsData.js
// CORRECTED VERSION - Matches your exact data structure from sampleData.js

import { useState, useEffect, useMemo } from 'react';
import { SAMPLE_INGREDIENTS, SAMPLE_SUPPLIERS, SAMPLE_COST_HISTORY } from '../data/sampleData';

export const useIngredientsData = () => {
  console.log('🚀 useIngredientsData hook initializing...');
  
  const [ingredients, setIngredients] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [costHistory, setCostHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('🔄 Loading ingredients data...');
    console.log('📦 Sample ingredients structure check:', SAMPLE_INGREDIENTS[0]);
    
    const loadData = () => {
      try {
        // Check localStorage first
        const storedIngredients = localStorage.getItem('ingredients');
        const storedSuppliers = localStorage.getItem('suppliers');
        const storedCostHistory = localStorage.getItem('costHistory');

        if (storedIngredients && JSON.parse(storedIngredients).length > 0) {
          // Use localStorage data if it exists and has content
          console.log('📦 Loading data from localStorage...');
          const parsedIngredients = JSON.parse(storedIngredients);
          console.log('📊 Loaded ingredients count:', parsedIngredients.length);
          console.log('📊 First ingredient structure:', parsedIngredients[0]);
          
          setIngredients(parsedIngredients);
          setSuppliers(storedSuppliers ? JSON.parse(storedSuppliers) : SAMPLE_SUPPLIERS);
          setCostHistory(storedCostHistory ? JSON.parse(storedCostHistory) : SAMPLE_COST_HISTORY);
          console.log('✅ localStorage data loaded');
        } else {
          // Use sample data if localStorage is empty or invalid
          console.log('🔍 Loading sample data (localStorage empty or invalid)...');
          console.log('📊 Sample ingredients count:', SAMPLE_INGREDIENTS.length);
          console.log('📊 First sample ingredient:', SAMPLE_INGREDIENTS[0]);
          
          setIngredients(SAMPLE_INGREDIENTS);
          setSuppliers(SAMPLE_SUPPLIERS);
          setCostHistory(SAMPLE_COST_HISTORY);
          
          // Save sample data to localStorage for persistence
          localStorage.setItem('ingredients', JSON.stringify(SAMPLE_INGREDIENTS));
          localStorage.setItem('suppliers', JSON.stringify(SAMPLE_SUPPLIERS));
          localStorage.setItem('costHistory', JSON.stringify(SAMPLE_COST_HISTORY));
          
          console.log('✅ Sample data loaded and saved to localStorage');
        }
      } catch (error) {
        console.error('❌ Error loading data:', error);
        // Fallback to sample data on error
        setIngredients(SAMPLE_INGREDIENTS);
        setSuppliers(SAMPLE_SUPPLIERS);
        setCostHistory(SAMPLE_COST_HISTORY);
        console.log('🔄 Fallback to sample data due to error');
      }
      
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Debug: Log when ingredients state changes
  useEffect(() => {
    if (ingredients.length > 0) {
      console.log('📊 Ingredients state updated:', ingredients.length, 'ingredients');
      console.log('📊 First ingredient structure in state:', {
        id: ingredients[0].id,
        name: ingredients[0].name,
        vendor: ingredients[0].vendor,
        category: ingredients[0].category,
        apCost: ingredients[0].apCost,
        apUnit: ingredients[0].apUnit
      });
    }
  }, [ingredients]);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (ingredients.length > 0 && !isLoading) {
      localStorage.setItem('ingredients', JSON.stringify(ingredients));
      console.log('💾 Ingredients saved to localStorage');
    }
  }, [ingredients, isLoading]);

  useEffect(() => {
    if (suppliers.length > 0 && !isLoading) {
      localStorage.setItem('suppliers', JSON.stringify(suppliers));
      console.log('💾 Suppliers saved to localStorage');
    }
  }, [suppliers, isLoading]);

  useEffect(() => {
    if (costHistory.length > 0 && !isLoading) {
      localStorage.setItem('costHistory', JSON.stringify(costHistory));
      console.log('💾 Cost history saved to localStorage');
    }
  }, [costHistory, isLoading]);

  // ===== COMPUTED VALUES =====
  
  // Extract categories from ingredients (using YOUR field names)
  const categories = useMemo(() => {
    const categoriesSet = new Set();
    
    ingredients.forEach(ingredient => {
      if (ingredient.category) categoriesSet.add(ingredient.category);
    });
    
    // Add some default categories if none exist
    if (categoriesSet.size === 0) {
      ['Protein', 'Produce', 'Seafood', 'Dairy', 'Pantry'].forEach(cat => 
        categoriesSet.add(cat)
      );
    }
    
    const sortedCategories = Array.from(categoriesSet).sort();
    console.log('📂 Computed categories:', sortedCategories);
    return sortedCategories;
  }, [ingredients]);

  // ===== CRUD OPERATIONS MATCHING YOUR DATA STRUCTURE =====

  const addIngredient = (ingredientData) => {
    console.log('➕ Adding ingredient with data:', ingredientData);
    
    // Generate new ID
    const newId = Date.now().toString();
    
    // Create ingredient matching YOUR structure
    const newIngredient = {
      id: newId,
      name: ingredientData.name || '',
      code: ingredientData.code || ingredientData.sku || `CODE-${newId}`,
      category: ingredientData.category || 'Uncategorized',
      vendor: ingredientData.vendor || ingredientData.supplier || '',
      apCost: parseFloat(ingredientData.apCost || ingredientData.casePrice || 0),
      apUnit: ingredientData.apUnit || ingredientData.caseUnit || 'each',
      description: ingredientData.description || ingredientData.notes || '',
      allergens: ingredientData.allergens || ['None'],
      storage: ingredientData.storage || ingredientData.storageLocation || 'Dry Storage',
      
      // Add timestamp
      lastUpdated: new Date().toISOString().split('T')[0],
      
      // Preserve any additional fields
      ...ingredientData
    };
    
    console.log('➕ Created ingredient with structure:', newIngredient);
    setIngredients(prev => [...prev, newIngredient]);
  };

  const updateIngredient = (id, updatedData) => {
    console.log('✏️ Updating ingredient:', id, 'with data:', updatedData);
    
    setIngredients(prev =>
      prev.map(ingredient =>
        ingredient.id === id
          ? { 
              ...ingredient, 
              // Update using YOUR field structure
              name: updatedData.name || ingredient.name,
              code: updatedData.code || updatedData.sku || ingredient.code,
              category: updatedData.category || ingredient.category,
              vendor: updatedData.vendor || updatedData.supplier || ingredient.vendor,
              apCost: parseFloat(updatedData.apCost || updatedData.casePrice || ingredient.apCost),
              apUnit: updatedData.apUnit || updatedData.caseUnit || ingredient.apUnit,
              description: updatedData.description || updatedData.notes || ingredient.description,
              allergens: updatedData.allergens || ingredient.allergens,
              storage: updatedData.storage || updatedData.storageLocation || ingredient.storage,
              
              // Update timestamp
              lastUpdated: new Date().toISOString().split('T')[0],
              
              // Preserve other fields
              ...updatedData
            }
          : ingredient
      )
    );
    
    console.log('✅ Ingredient updated successfully');
  };

  const deleteIngredient = (id) => {
    console.log('🗑️ Deleting ingredient:', id);
    setIngredients(prev => prev.filter(ingredient => ingredient.id !== id));
    console.log('✅ Ingredient deleted successfully');
  };

  const addCostHistory = (ingredientId, costData) => {
    const newCostEntry = {
      id: Date.now().toString(),
      ingredientId,
      date: new Date().toISOString().split('T')[0],
      apCost: parseFloat(costData.apCost || 0),
      supplier: costData.supplier || costData.vendor || '',
      notes: costData.notes || '',
      ...costData
    };
    console.log('💰 Adding cost history:', newCostEntry);
    setCostHistory(prev => [...prev, newCostEntry]);
  };

  // Force reload sample data (for testing/reset)
  const reloadSampleData = () => {
    console.log('🔄 Force reloading sample data...');
    setIngredients(SAMPLE_INGREDIENTS);
    setSuppliers(SAMPLE_SUPPLIERS);
    setCostHistory(SAMPLE_COST_HISTORY);
    
    localStorage.setItem('ingredients', JSON.stringify(SAMPLE_INGREDIENTS));
    localStorage.setItem('suppliers', JSON.stringify(SAMPLE_SUPPLIERS));
    localStorage.setItem('costHistory', JSON.stringify(SAMPLE_COST_HISTORY));
    
    console.log('✅ Sample data force reloaded');
  };

  return {
    // Data
    ingredients,
    suppliers,
    costHistory,
    categories,
    isLoading,
    
    // Operations
    addIngredient,
    updateIngredient,
    deleteIngredient,
    addCostHistory,
    reloadSampleData
  };
};
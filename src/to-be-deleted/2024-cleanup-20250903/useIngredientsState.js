// src/hooks/useIngredientsState.js
// ToqueWorks - CONSERVATIVE refactor: Extract only state declarations
// Preserves 100% of your working logic, imports, and utilities

import { useState, useEffect, useMemo } from 'react';
import { SAMPLE_SUPPLIERS, SAMPLE_COST_HISTORY } from '../data/sampleData';
import { enhancedIngredientsData } from '../data/enhancedIngredientsData';
import { generateMoreIngredients, ensureIngredientsHaveDates, migrateIngredientsWithDates } from '../utils/ingredientsUtils';
import {
  DEFAULT_COLUMN_ORDER,
  DEFAULT_VISIBLE_COLUMNS,
  COLUMN_CONFIG
} from '../config/ingredientsConfig';
import {
  getStoredValue,
  setStoredValue,
  sanitizeColumnOrder,
  sanitizeVisibleColumns
} from '../utils/ingredientsHelpers';
import useIngredientsFiltering from '../components/ingredients-page/useIngredientsFiltering';

// Your existing Local Storage Hook (moved here)
const useLocalStorageState = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const stored = getStoredValue(key, defaultValue);
    if (key === 'ingredientColumnOrder') {
      const validColumns = Object.keys(COLUMN_CONFIG);
      return sanitizeColumnOrder(stored, validColumns);
    }
    if (key === 'ingredientVisibleColumns') {
      const validColumns = Object.keys(COLUMN_CONFIG);
      return sanitizeVisibleColumns(stored, validColumns);
    }
    return stored;
  });

  useEffect(() => {
    setStoredValue(key, value);
  }, [key, value]);

  return [value, setValue];
};

/**
 * Custom hook that extracts ALL state management from IngredientsPage
 * Preserves 100% of your existing logic - just organizes it better
 */
export const useIngredientsState = () => {
  // ===== DATA STATE (Your exact logic preserved) =====
  
  // ✅ FIXED: Load ingredients from localStorage with persistence AND date validation
  const [ingredients, setIngredients] = useState(() => {
    // Try to load from localStorage first
    const savedIngredients = localStorage.getItem('persistedIngredients');
    if (savedIngredients) {
      try {
        const parsed = JSON.parse(savedIngredients);
        if (Array.isArray(parsed) && parsed.length > 0) {
          console.log(`Loading ${parsed.length} ingredients from localStorage`);
          // ✅ CRITICAL: Ensure all loaded ingredients have dates
          return ensureIngredientsHaveDates(parsed);
        }
      } catch (e) {
        console.warn('Could not parse saved ingredients:', e);
      }
    }
    
    // Fallback to sample data if no saved ingredients
    console.log('No saved ingredients found, using sample data');
    return generateMoreIngredients(enhancedIngredientsData);
  });
  
  // Core Data State
  const [suppliers, setSuppliers] = useState(SAMPLE_SUPPLIERS);
  const [costHistory, setCostHistory] = useState(SAMPLE_COST_HISTORY);

  // ✅ NEW: Sample recipes for cost impact analysis
  const [recipes] = useState([
    {
      id: 1,
      name: 'Garden Salad',
      ingredients: [{ name: 'Carrots, Baby', quantity: 0.5 }],
      servings: 4,
      totalCost: 12.50,
      currentIngredientCost: 2.25
    },
    {
      id: 2,
      name: 'Roasted Vegetable Medley', 
      ingredients: [{ name: 'Carrots, Baby', quantity: 1.2 }],
      servings: 6,
      totalCost: 18.75,
      currentIngredientCost: 5.40
    },
    {
      id: 3,
      name: 'Beef Stew',
      ingredients: [
        { name: 'Beef Chuck', quantity: 2.0 },
        { name: 'Carrots, Baby', quantity: 0.8 }
      ],
      servings: 8,
      totalCost: 32.40,
      currentIngredientCost: 3.60
    }
  ]);

  // ===== FILTER STATE =====
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [excludedAllergens, setExcludedAllergens] = useState([]);

  // ===== SORTING STATE =====
  // ✅ ENHANCED: Persistent sorting with localStorage
  const [sortConfig, setSortConfig] = useLocalStorageState('ingredientSortConfig', { 
    key: 'updatedAtFormatted', 
    direction: 'desc' 
  });

  // ===== UI STATE =====
  const [hoveredButton, setHoveredButton] = useState(null);

  // ===== MODAL STATE =====
  // ✅ ENHANCED: Modal State with loading and error handling
  const [editingIngredient, setEditingIngredient] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);
  
  const [costHistoryModal, setCostHistoryModal] = useState({
    isOpen: false,
    ingredient: null
  });
  const [showSupplierManager, setShowSupplierManager] = useState(false);

  // ===== PERSISTED STATE =====
  const [viewMode, setViewMode] = useLocalStorageState('ingredientsViewMode', 'list');
  const [columnOrder, setColumnOrder] = useLocalStorageState('ingredientColumnOrder', DEFAULT_COLUMN_ORDER);
  const [visibleColumns, setVisibleColumns] = useLocalStorageState('ingredientVisibleColumns', DEFAULT_VISIBLE_COLUMNS);

  // ===== EFFECTS (Your exact logic preserved) =====
  
  // ✅ PERSIST: Save ingredients to localStorage whenever they change WITH date validation
  useEffect(() => {
    // Ensure all ingredients have dates before saving
    const ingredientsWithDates = ensureIngredientsHaveDates(ingredients);
    localStorage.setItem('persistedIngredients', JSON.stringify(ingredientsWithDates));
    console.log(`Saved ${ingredientsWithDates.length} ingredients to localStorage`);
  }, [ingredients]);

  // ✅ MIGRATION: Run on component mount to fix existing ingredients
  useEffect(() => {
    const migrationCompleted = localStorage.getItem('ingredientsMigrationCompleted');
    if (!migrationCompleted) {
      console.log('🔧 Running ingredient date migration...');
      migrateIngredientsWithDates();
      
      // Also fix the persistedIngredients
      const saved = localStorage.getItem('persistedIngredients');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const withDates = ensureIngredientsHaveDates(parsed);
          localStorage.setItem('persistedIngredients', JSON.stringify(withDates));
          setIngredients(withDates);
          console.log('✅ Migration complete - updated persistedIngredients');
        } catch (error) {
          console.warn('Error during migration:', error);
        }
      }
    }
  }, []);

  // ===== COMPUTED VALUES (Your exact logic preserved) =====
  
  // Computed Values
  const categories = useMemo(() => {
    // ✅ ENHANCED: Better category extraction with fallbacks
    const categoriesSet = new Set();
    
    // Add categories from ingredients
    ingredients.forEach(ingredient => {
      if (ingredient.category) categoriesSet.add(ingredient.category);
    });
    
    // Add some default categories if none exist
    if (categoriesSet.size === 0) {
      ['Produce', 'Proteins', 'Dairy', 'Pantry', 'Spices & Seasonings', 'Beverages'].forEach(cat => 
        categoriesSet.add(cat)
      );
    }
    
    return Array.from(categoriesSet).sort();
  }, [ingredients]);

  const activeFilters = useMemo(() => [
    selectedCategory && `Category: ${selectedCategory}`,
    selectedSupplier && `Supplier: ${suppliers.find(s => s.id === parseInt(selectedSupplier))?.name}`,
    ...excludedAllergens.map(allergen => `Excludes: ${allergen}`)
  ].filter(Boolean), [selectedCategory, selectedSupplier, excludedAllergens, suppliers]);

  // Main filtering with custom hook (your existing hook)
  const filteredIngredients = useIngredientsFiltering(ingredients, {
    searchTerm, selectedCategory, selectedSupplier, excludedAllergens, sortConfig
  });

  // ===== RETURN ALL STATE AND SETTERS =====
  return {
    // Data State
    ingredients,
    setIngredients,
    suppliers,
    setSuppliers,
    costHistory,
    setCostHistory,
    recipes,

    // Filter State
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedSupplier,
    setSelectedSupplier,
    excludedAllergens,
    setExcludedAllergens,

    // Sorting State
    sortConfig,
    setSortConfig,

    // UI State
    hoveredButton,
    setHoveredButton,

    // Modal State
    editingIngredient,
    setEditingIngredient,
    modalLoading,
    setModalLoading,
    modalError,
    setModalError,
    costHistoryModal,
    setCostHistoryModal,
    showSupplierManager,
    setShowSupplierManager,

    // Persisted State
    viewMode,
    setViewMode,
    columnOrder,
    setColumnOrder,
    visibleColumns,
    setVisibleColumns,

    // Computed Values
    categories,
    activeFilters,
    filteredIngredients
  };
};
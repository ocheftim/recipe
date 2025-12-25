// src/hooks/useIngredientsUI.js
// ToqueWorks - UI state management hook  
// Compatible with your existing filtering and config setup

import { useState, useMemo } from 'react';
import {
  DEFAULT_COLUMN_ORDER,
  DEFAULT_VISIBLE_COLUMNS
} from '../config/ingredientsConfig';
import {
  getStoredValue,
  setStoredValue,
  sanitizeColumnOrder,
  sanitizeVisibleColumns
} from '../utils/ingredientsHelpers';
import { COLUMN_CONFIG } from '../config/ingredientsConfig';
import useIngredientsFiltering from '../components/ingredients-page/useIngredientsFiltering';

/**
 * Local Storage Hook for UI state
 */
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

  const updateValue = (newValue) => {
    setValue(newValue);
    setStoredValue(key, newValue);
  };

  return [value, updateValue];
};

/**
 * Custom hook for managing all UI-related state
 * Works with your existing useIngredientsFiltering hook
 */
export const useIngredientsUI = (ingredients, suppliers) => {
  console.log('🎛️ useIngredientsUI hook initializing...');
  console.log('📊 Received ingredients count:', ingredients?.length || 0);
  console.log('📊 Received suppliers count:', suppliers?.length || 0);

  // ===== FILTER STATE =====
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [excludedAllergens, setExcludedAllergens] = useState([]);

  // ===== SORTING STATE =====
  const [sortConfig, setSortConfig] = useLocalStorageState('ingredientSortConfig', { 
    key: 'updatedAtFormatted', 
    direction: 'desc' 
  });

  // ===== VIEW STATE =====
  const [viewMode, setViewMode] = useLocalStorageState('ingredientsViewMode', 'list');
  const [hoveredButton, setHoveredButton] = useState(null);

  // ===== COLUMN MANAGEMENT =====
  const [columnOrder, setColumnOrder] = useLocalStorageState('ingredientColumnOrder', DEFAULT_COLUMN_ORDER);
  const [visibleColumns, setVisibleColumns] = useLocalStorageState('ingredientVisibleColumns', DEFAULT_VISIBLE_COLUMNS);

  // ===== COMPUTED VALUES =====
  
  // Extract categories from ingredients
  const categories = useMemo(() => {
    if (!ingredients || ingredients.length === 0) {
      console.log('📂 No ingredients provided, using default categories');
      return ['Produce', 'Proteins', 'Dairy', 'Pantry', 'Spices & Seasonings', 'Beverages'];
    }

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
    
    const sortedCategories = Array.from(categoriesSet).sort();
    console.log('📂 Computed categories:', sortedCategories);
    return sortedCategories;
  }, [ingredients]);

  // Active filters for display
  const activeFilters = useMemo(() => {
    const filters = [
      selectedCategory && `Category: ${selectedCategory}`,
      selectedSupplier && `Supplier: ${suppliers?.find(s => s.id === parseInt(selectedSupplier))?.name || selectedSupplier}`,
      ...excludedAllergens.map(allergen => `Excludes: ${allergen}`)
    ].filter(Boolean);
    
    console.log('🔍 Active filters:', filters);
    return filters;
  }, [selectedCategory, selectedSupplier, excludedAllergens, suppliers]);

  // Apply filtering using your existing hook
  const filteredIngredients = useIngredientsFiltering(ingredients || [], {
    searchTerm, 
    selectedCategory, 
    selectedSupplier, 
    excludedAllergens, 
    sortConfig
  });

  console.log('🔍 Filtering results:', {
    total: ingredients?.length || 0,
    filtered: filteredIngredients?.length || 0,
    searchTerm,
    selectedCategory,
    selectedSupplier
  });

  // ===== FILTER OPERATIONS =====
  
  /**
   * Clear all active filters
   */
  const clearFilters = () => {
    console.log('🧹 Clearing all filters');
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedSupplier('');
    setExcludedAllergens([]);
  };

  /**
   * Set multiple filters at once
   */
  const setFilters = (filters) => {
    console.log('🔍 Setting multiple filters:', filters);
    if (filters.searchTerm !== undefined) setSearchTerm(filters.searchTerm);
    if (filters.selectedCategory !== undefined) setSelectedCategory(filters.selectedCategory);
    if (filters.selectedSupplier !== undefined) setSelectedSupplier(filters.selectedSupplier);
    if (filters.excludedAllergens !== undefined) setExcludedAllergens(filters.excludedAllergens);
  };

  /**
   * Get current filter state
   */
  const getFilterState = () => ({
    searchTerm,
    selectedCategory,
    selectedSupplier,
    excludedAllergens,
    hasActiveFilters: activeFilters.length > 0
  });

  // ===== SORTING OPERATIONS =====
  
  /**
   * Enhanced 3-way sort handler with persistence
   */
  const handleSort = (key, direction) => {
    const newSortConfig = { 
      key: direction ? key : null, 
      direction 
    };
    console.log('📊 Sorting changed:', newSortConfig);
    setSortConfig(newSortConfig);
  };

  /**
   * Clear sorting
   */
  const clearSort = () => {
    console.log('🧹 Clearing sort');
    setSortConfig({ key: null, direction: null });
  };

  // ===== COLUMN OPERATIONS =====
  
  /**
   * Toggle column visibility
   */
  const toggleColumn = (columnKey) => {
    console.log('👁️ Toggling column:', columnKey);
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  /**
   * Show/hide specific column
   */
  const setColumnVisibility = (columnKey, visible) => {
    console.log('👁️ Setting column visibility:', columnKey, visible);
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: visible
    }));
  };

  /**
   * Reset columns to default
   */
  const resetColumns = () => {
    console.log('🔄 Resetting columns to default');
    setVisibleColumns(DEFAULT_VISIBLE_COLUMNS);
    setColumnOrder(DEFAULT_COLUMN_ORDER);
  };

  /**
   * Reorder columns
   */
  const moveColumn = (fromIndex, toIndex) => {
    console.log('🔄 Moving column from', fromIndex, 'to', toIndex);
    const newOrder = [...columnOrder];
    const [movedColumn] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedColumn);
    setColumnOrder(newOrder);
  };

  // ===== VIEW MODE OPERATIONS =====
  
  /**
   * Toggle between list and grid view
   */
  const toggleViewMode = () => {
    const newMode = viewMode === 'list' ? 'grid' : 'list';
    console.log('👁️ Toggling view mode to:', newMode);
    setViewMode(newMode);
  };

  /**
   * Set specific view mode
   */
  const changeViewMode = (mode) => {
    if (['list', 'grid', 'card'].includes(mode)) {
      console.log('👁️ Changing view mode to:', mode);
      setViewMode(mode);
    }
  };

  // ===== STATISTICS =====
  
  const stats = useMemo(() => {
    const total = ingredients?.length || 0;
    const filtered = filteredIngredients?.length || 0;
    const categoryCounts = {};
    const supplierCounts = {};
    
    (filteredIngredients || []).forEach(ingredient => {
      // Category stats
      const category = ingredient.category || 'Uncategorized';
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      
      // Supplier stats
      const supplier = ingredient.supplier || 'Unknown';
      supplierCounts[supplier] = (supplierCounts[supplier] || 0) + 1;
    });

    const statsResult = {
      total,
      filtered,
      hidden: total - filtered,
      categories: categoryCounts,
      suppliers: supplierCounts,
      hasFilters: activeFilters.length > 0
    };

    console.log('📊 Computed stats:', statsResult);
    return statsResult;
  }, [ingredients, filteredIngredients, activeFilters]);

  // ===== BULK OPERATIONS =====
  
  /**
   * Reset all UI state to defaults
   */
  const resetUIState = () => {
    console.log('🔄 Resetting all UI state');
    clearFilters();
    clearSort();
    resetColumns();
    setViewMode('list');
    setHoveredButton(null);
  };

  // ===== RETURN INTERFACE =====
  return {
    // ===== FILTERING =====
    // State
    searchTerm,
    selectedCategory,
    selectedSupplier,
    excludedAllergens,
    activeFilters,
    
    // Operations
    setSearchTerm,
    setSelectedCategory,
    setSelectedSupplier,
    setExcludedAllergens,
    clearFilters,
    setFilters,
    getFilterState,

    // ===== SORTING =====
    // State
    sortConfig,
    
    // Operations
    handleSort,
    clearSort,
    setSortConfig,

    // ===== VIEW MANAGEMENT =====
    // State
    viewMode,
    hoveredButton,
    
    // Operations
    setViewMode,
    toggleViewMode,
    changeViewMode,
    setHoveredButton,

    // ===== COLUMN MANAGEMENT =====
    // State
    columnOrder,
    visibleColumns,
    
    // Operations
    setColumnOrder,
    setVisibleColumns,
    toggleColumn,
    setColumnVisibility,
    resetColumns,
    moveColumn,

    // ===== DATA =====
    filteredIngredients,
    categories,
    stats,

    // ===== UTILITIES =====
    resetUIState
  };
};
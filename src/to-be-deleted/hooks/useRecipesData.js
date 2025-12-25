// src/hooks/useRecipesData.js
import { useState, useMemo, useEffect } from 'react';
// ✅ TEMPORARILY DISABLED: import { useIngredientsState } from './useIngredientsState';

// Sample recipe data (extracted from component)
const SAMPLE_RECIPES = [
  {
    id: 'recipe-1',
    name: 'Classic Beef Stew',
    code: 'BS001',
    category: 'Main',
    cuisine: 'American',
    outlet: 'Bistro',
    menu: 'Regular',
    status: 'Active',
    yield: 8,
    yieldUnit: 'servings',
    totalCost: 24.50,
    costPerServing: 3.06,
    menuPrice: 12.95,
    foodCostPercent: 23.6,
    profitMargin: 76.4,
    lastUpdated: '2024-01-15',
    ingredients: [
      {
        ingredientId: 1,
        name: 'Beef Chuck',
        quantity: 2,
        unit: 'lb',
        apCost: 4.55,
        trimLoss: 10,
        cookingLoss: 25,
        vendor: 'Sysco'
      },
      {
        ingredientId: 2,
        name: 'Carrots',
        quantity: 1,
        unit: 'lb',
        apCost: 2.30,
        trimLoss: 15,
        cookingLoss: 5,
        vendor: 'Local Farm'
      }
    ]
  },
  {
    id: 'recipe-2',
    name: 'Grilled Salmon',
    code: 'GS002',
    category: 'Main',
    cuisine: 'Contemporary',
    outlet: 'Fine Dining',
    menu: 'Dinner',
    status: 'Active',
    yield: 4,
    yieldUnit: 'servings',
    totalCost: 32.80,
    costPerServing: 8.20,
    menuPrice: 28.95,
    foodCostPercent: 28.3,
    profitMargin: 71.7,
    lastUpdated: '2024-01-12',
    ingredients: [
      {
        ingredientId: 4,
        name: 'Salmon Fillet',
        quantity: 2,
        unit: 'lb',
        apCost: 24.50,
        trimLoss: 5,
        cookingLoss: 15,
        vendor: 'Fresh Fish Co'
      },
      {
        ingredientId: 5,
        name: 'Olive Oil',
        quantity: 0.25,
        unit: 'cup',
        apCost: 12.80,
        trimLoss: 0,
        cookingLoss: 0,
        vendor: 'Sysco'
      }
    ]
  },
  {
    id: 'recipe-3',
    name: 'Caesar Salad',
    code: 'CS003',
    category: 'Appetizer',
    cuisine: 'Italian',
    outlet: 'Bistro',
    menu: 'Regular',
    status: 'Active',
    yield: 6,
    yieldUnit: 'servings',
    totalCost: 18.30,
    costPerServing: 3.05,
    menuPrice: 14.95,
    foodCostPercent: 20.4,
    profitMargin: 79.6,
    lastUpdated: '2024-01-10',
    ingredients: [
      {
        ingredientId: 6,
        name: 'Romaine Lettuce',
        quantity: 2,
        unit: 'heads',
        apCost: 3.50,
        trimLoss: 20,
        cookingLoss: 0,
        vendor: 'Local Farm'
      },
      {
        ingredientId: 7,
        name: 'Parmesan Cheese',
        quantity: 0.5,
        unit: 'lb',
        apCost: 8.25,
        trimLoss: 5,
        cookingLoss: 0,
        vendor: 'Sysco'
      }
    ]
  },
  {
    id: 'recipe-4',
    name: 'Herb-Crusted Chicken',
    code: 'HC004',
    category: 'Main',
    cuisine: 'American',
    outlet: 'Bistro',
    menu: 'Regular',
    status: 'Draft',
    yield: 6,
    yieldUnit: 'servings',
    totalCost: 21.60,
    costPerServing: 3.60,
    menuPrice: 18.95,
    foodCostPercent: 19.0,
    profitMargin: 81.0,
    lastUpdated: '2024-01-08',
    ingredients: [
      {
        ingredientId: 8,
        name: 'Fresh Herbs',
        quantity: 2,
        unit: 'bunches',
        apCost: 2.50,
        trimLoss: 10,
        cookingLoss: 0,
        vendor: 'Local Farm'
      }
    ]
  },
  {
    id: 'recipe-5',
    name: 'Vegetable Stir Fry',
    code: 'VS005',
    category: 'Main',
    cuisine: 'Asian',
    outlet: 'Casual',
    menu: 'Lunch',
    status: 'Archived',
    yield: 4,
    yieldUnit: 'servings',
    totalCost: 12.40,
    costPerServing: 3.10,
    menuPrice: 16.95,
    foodCostPercent: 18.3,
    profitMargin: 81.7,
    lastUpdated: '2024-01-05',
    ingredients: [
      {
        ingredientId: 9,
        name: 'Onions',
        quantity: 1,
        unit: 'lb',
        apCost: 1.80,
        trimLoss: 10,
        cookingLoss: 5,
        vendor: 'Local Farm'
      },
      {
        ingredientId: 10,
        name: 'Celery',
        quantity: 0.5,
        unit: 'lb',
        apCost: 1.25,
        trimLoss: 15,
        cookingLoss: 5,
        vendor: 'Local Farm'
      }
    ]
  }
];

// ✅ DEFAULT COLUMNS - This is the fix!
const DEFAULT_VISIBLE_COLUMNS = [
  'name', 'category', 'cuisine', 'outlet', 'menu', 'yield', 
  'totalCost', 'costPerServing', 'menuPrice', 'foodCostPercent', 
  'profitMargin', 'lastUpdated', 'status', 'actions'
];

const DEFAULT_COLUMN_ORDER = [
  'name', 'category', 'cuisine', 'outlet', 'menu', 'yield',
  'totalCost', 'costPerServing', 'menuPrice', 'foodCostPercent',
  'profitMargin', 'lastUpdated', 'status', 'actions'
];

const useRecipesData = () => {
  console.log('🚀 useRecipesData CALLED!', SAMPLE_RECIPES.length, 'sample recipes');
  
  // ✅ TEMPORARILY DISABLED for testing: Get real ingredient data
  // const { ingredients, modalLoading } = useIngredientsState();
  
  // Core data state
  const [recipes, setRecipes] = useState(SAMPLE_RECIPES);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  
  console.log('🔍 State initialized - recipes:', recipes.length, 'searchTerm:', searchTerm, 'loading:', loading);
  
  // Temporary: Use sample ingredients to test if recipes show
  const TEMP_INGREDIENTS = [
    { id: 1, name: 'Beef Chuck', vendor: 'Sysco', apCost: 4.55, apUnit: 'lb' },
    { id: 2, name: 'Carrots', vendor: 'Local Farm', apCost: 2.30, apUnit: 'lb' }
  ];
  
  // View preferences with localStorage persistence
  const [viewMode, setViewMode] = useState(() => {
    const saved = localStorage.getItem('recipesViewMode') || 'table';
    console.log('🔍 ViewMode loaded:', saved);
    return saved;
  });

  // ✅ FIX: Proper visibleColumns with fallback
  const [visibleColumns, setVisibleColumns] = useState(() => {
    try {
      const saved = localStorage.getItem('recipesVisibleColumns');
      let result;
      if (saved) {
        const parsed = JSON.parse(saved);
        result = Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_VISIBLE_COLUMNS;
      } else {
        result = DEFAULT_VISIBLE_COLUMNS;
      }
      console.log('🔍 VisibleColumns loaded:', result.length, 'columns:', result);
      return result;
    } catch (error) {
      console.log('🚨 Error loading visibleColumns, using default:', error);
      return DEFAULT_VISIBLE_COLUMNS;
    }
  });

  // ✅ FIX: Proper columnOrder with fallback
  const [columnOrder, setColumnOrder] = useState(() => {
    try {
      const saved = localStorage.getItem('recipesColumnOrder');
      let result;
      if (saved) {
        const parsed = JSON.parse(saved);
        result = Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_COLUMN_ORDER;
      } else {
        result = DEFAULT_COLUMN_ORDER;
      }
      console.log('🔍 ColumnOrder loaded:', result.length, 'columns:', result);
      return result;
    } catch (error) {
      console.log('🚨 Error loading columnOrder, using default:', error);
      return DEFAULT_COLUMN_ORDER;
    }
  });

  // Sorting state
  const [sortConfig, setSortConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('recipesSortConfig');
      const result = saved ? JSON.parse(saved) : { key: 'lastUpdated', direction: 'desc' };
      console.log('🔍 SortConfig loaded:', result);
      return result;
    } catch (error) {
      console.log('🚨 Error loading sortConfig, using default:', error);
      return { key: 'lastUpdated', direction: 'desc' };
    }
  });

  // Modal state
  const [editingRecipe, setEditingRecipe] = useState(null);

  // ✅ TEMPORARILY USING SAMPLE DATA to test if recipes show
  const availableIngredients = useMemo(() => {
    console.log('🔍 AvailableIngredients memoized:', TEMP_INGREDIENTS.length);
    return TEMP_INGREDIENTS;
  }, []);

  // Persist preferences to localStorage
  useEffect(() => {
    localStorage.setItem('recipesViewMode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    if (visibleColumns && Array.isArray(visibleColumns) && visibleColumns.length > 0) {
      localStorage.setItem('recipesVisibleColumns', JSON.stringify(visibleColumns));
      console.log('🔍 Saved visibleColumns to localStorage:', visibleColumns.length);
    }
  }, [visibleColumns]);

  useEffect(() => {
    if (columnOrder && Array.isArray(columnOrder) && columnOrder.length > 0) {
      localStorage.setItem('recipesColumnOrder', JSON.stringify(columnOrder));
      console.log('🔍 Saved columnOrder to localStorage:', columnOrder.length);
    }
  }, [columnOrder]);

  useEffect(() => {
    localStorage.setItem('recipesSortConfig', JSON.stringify(sortConfig));
  }, [sortConfig]);

  // Filter and sort recipes
  const filteredAndSortedRecipes = useMemo(() => {
    console.log('🔍 Starting recipe filtering - input:', recipes.length, 'recipes');
    console.log('🔍 Search term:', searchTerm, 'Sort config:', sortConfig);
    
    let filtered = recipes;

    // Apply search filter
    if (searchTerm) {
      const beforeFilter = filtered.length;
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log('🔍 After search filter:', beforeFilter, '→', filtered.length, 'recipes');
    }

    // Apply sorting
    if (sortConfig.key) {
      const beforeSort = filtered.length;
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
      console.log('🔍 After sorting:', beforeSort, 'recipes (same count, just sorted)');
    }

    console.log('🔍 FINAL FILTERED RECIPES:', filtered.length, 'recipes');
    console.log('🔍 Recipe names:', filtered.map(r => r.name));
    return filtered;
  }, [recipes, searchTerm, sortConfig]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalRecipes = recipes.length;
    const activeRecipes = recipes.filter(r => r.status === 'Active').length;
    const draftRecipes = recipes.filter(r => r.status === 'Draft').length;
    const archivedRecipes = recipes.filter(r => r.status === 'Archived').length;
    
    const averageCostPerServing = recipes.length > 0 
      ? recipes.reduce((sum, r) => sum + r.costPerServing, 0) / recipes.length 
      : 0;
    
    const averageFoodCostPercent = recipes.length > 0
      ? recipes.reduce((sum, r) => sum + r.foodCostPercent, 0) / recipes.length
      : 0;

    const result = {
      totalRecipes,
      activeRecipes,
      draftRecipes,
      archivedRecipes,
      averageCostPerServing,
      averageFoodCostPercent
    };
    
    console.log('🔍 Stats calculated:', result);
    return result;
  }, [recipes]);

  // Handlers
  const handleSort = (key) => {
    console.log('🔍 HandleSort called with key:', key);
    setSortConfig(prevConfig => {
      if (prevConfig.key === key) {
        if (prevConfig.direction === 'asc') {
          return { key, direction: 'desc' };
        } else if (prevConfig.direction === 'desc') {
          return { key: null, direction: null };
        }
      }
      return { key, direction: 'asc' };
    });
  };

  const openRecipeModal = (recipe = null) => {
    console.log('🔍 OpenRecipeModal called with:', recipe?.name || 'new recipe');
    const recipeToEdit = recipe || {
      name: '',
      code: '',
      category: '',
      cuisine: '',
      status: 'Draft',
      outlet: '',
      menu: '',
      yield: 1,
      yieldUnit: 'servings',
      totalCost: 0,
      costPerServing: 0,
      menuPrice: 0,
      foodCostPercent: 0,
      profitMargin: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      ingredients: [],
      instructions: [],
      notes: '',
      prepTime: '',
      cookTime: '',
      difficulty: 'Medium',
      allergens: [],
      dietaryTags: []
    };
    setEditingRecipe(recipeToEdit);
  };

  const closeRecipeModal = () => {
    console.log('🔍 CloseRecipeModal called');
    setEditingRecipe(null);
  };

  const handleRecipeAction = (action, recipe) => {
    console.log('🔍 HandleRecipeAction called:', action, recipe.name);
    switch (action) {
      case 'edit':
        openRecipeModal(recipe);
        break;
      case 'duplicate':
        const duplicatedRecipe = {
          ...recipe,
          id: `recipe-${Date.now()}`,
          name: `${recipe.name} (Copy)`,
          code: `${recipe.code}-COPY`,
          status: 'Draft',
          lastUpdated: new Date().toISOString().split('T')[0]
        };
        setRecipes(prev => [...prev, duplicatedRecipe]);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete "${recipe.name}"?`)) {
          setRecipes(prev => prev.filter(r => r.id !== recipe.id));
        }
        break;
      case 'archive':
        setRecipes(prev => prev.map(r => 
          r.id === recipe.id ? { ...r, status: 'Archived' } : r
        ));
        break;
      case 'activate':
        setRecipes(prev => prev.map(r => 
          r.id === recipe.id ? { ...r, status: 'Active' } : r
        ));
        break;
      default:
        console.log(`Unhandled action: ${action}`);
    }
  };

  const handleRecipeSave = (recipeData) => {
    console.log('🔍 HandleRecipeSave called with:', recipeData.name);
    const updatedRecipe = {
      ...recipeData,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    if (editingRecipe && editingRecipe.id) {
      // Update existing recipe
      setRecipes(prev => prev.map(recipe => 
        recipe.id === editingRecipe.id ? updatedRecipe : recipe
      ));
    } else {
      // Add new recipe
      const newRecipe = {
        ...updatedRecipe,
        id: `recipe-${Date.now()}`
      };
      setRecipes(prev => [...prev, newRecipe]);
    }
    closeRecipeModal();
  };

  const returnData = {
    // Data
    recipes: filteredAndSortedRecipes,
    allRecipes: recipes,
    availableIngredients,
    stats,
    
    // UI State
    searchTerm,
    setSearchTerm,
    viewMode,
    setViewMode,
    loading: loading,
    editingRecipe,
    sortConfig,
    
    // Column management - ✅ FIXED: Always valid arrays
    visibleColumns,
    setVisibleColumns,
    columnOrder,
    setColumnOrder,
    
    // Actions
    handleSort,
    openRecipeModal,
    closeRecipeModal,
    handleRecipeAction,
    handleRecipeSave
  };
  
  console.log('🚀 useRecipesData RETURNING:', {
    recipesCount: returnData.recipes.length,
    allRecipesCount: returnData.allRecipes.length,
    viewMode: returnData.viewMode,
    loading: returnData.loading,
    searchTerm: returnData.searchTerm,
    editingRecipe: returnData.editingRecipe?.name || null,
    visibleColumnsCount: returnData.visibleColumns.length,
    columnOrderCount: returnData.columnOrder.length
  });
  
  return returnData;
};

export default useRecipesData;
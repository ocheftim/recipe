// src/hooks/useRecipeManagement.js
import { useState, useMemo } from 'react';

// Sample recipe data with proper structure
const initialRecipes = [
  {
    id: 1,
    name: 'Grilled Salmon',
    category: 'Entrées',
    servings: 4,
    costPerServing: 8.50,
    totalCost: 34.00,
    sellingPrice: 24.99,
    ingredients: [],
    updated: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  },
  {
    id: 2,
    name: 'Caesar Salad',
    category: 'Salads',
    servings: 2,
    costPerServing: 3.25,
    totalCost: 6.50,
    sellingPrice: 12.99,
    ingredients: [],
    updated: new Date(Date.now() - 86400000).toISOString() // Yesterday
  },
  {
    id: 3,
    name: 'Chocolate Lava Cake',
    category: 'Desserts',
    servings: 1,
    costPerServing: 2.75,
    totalCost: 2.75,
    sellingPrice: 8.99,
    ingredients: [],
    updated: new Date().toISOString() // Today
  }
];

export const useRecipeManagement = () => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: 'updated', direction: 'desc' });
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  // 3-way sorting logic matching Ingredients
  const handleSort = (key) => {
    setSortConfig(prevConfig => {
      // 3-way toggle: unsorted -> asc -> desc -> unsorted
      if (prevConfig.key !== key) {
        return { key, direction: 'asc' };
      }
      if (prevConfig.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      if (prevConfig.direction === 'desc') {
        return { key: null, direction: null };
      }
      return { key, direction: 'asc' };
    });
  };

  // Filter recipes
  const filteredRecipes = useMemo(() => {
    let filtered = [...recipes];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(recipe => recipe.category === filters.category);
    }

    if (filters.foodCostRange) {
      filtered = filtered.filter(recipe => {
        const foodCost = (recipe.costPerServing / recipe.sellingPrice) * 100;
        switch (filters.foodCostRange) {
          case 'under20': return foodCost < 20;
          case '20to30': return foodCost >= 20 && foodCost <= 30;
          case 'over30': return foodCost > 30;
          default: return true;
        }
      });
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        // Handle special cases
        if (sortConfig.key === 'updated') {
          aVal = new Date(a.updated || 0).getTime();
          bVal = new Date(b.updated || 0).getTime();
        } else if (sortConfig.key === 'foodCost') {
          aVal = (a.costPerServing / a.sellingPrice) * 100;
          bVal = (b.costPerServing / b.sellingPrice) * 100;
        }

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [recipes, searchTerm, filters, sortConfig]);

  // Selection handlers
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRecipes(filteredRecipes.map(r => r.id));
    } else {
      setSelectedRecipes([]);
    }
  };

  const handleSelectRecipe = (id) => {
    setSelectedRecipes(prev =>
      prev.includes(id)
        ? prev.filter(recipeId => recipeId !== id)
        : [...prev, id]
    );
  };

  // CRUD operations
  const handleSaveRecipe = (recipeData) => {
    if (recipeData.id) {
      setRecipes(prev => prev.map(r =>
        r.id === recipeData.id
          ? { ...recipeData, updated: new Date().toISOString() }
          : r
      ));
    } else {
      const newRecipe = {
        ...recipeData,
        id: Math.max(...recipes.map(r => r.id), 0) + 1,
        updated: new Date().toISOString()
      };
      // Add to beginning so it appears at top when sorted by updated desc
      setRecipes(prev => [newRecipe, ...prev]);
    }
  };

  const handleDeleteRecipe = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      setRecipes(prev => prev.filter(r => r.id !== id));
      setSelectedRecipes(prev => prev.filter(rId => rId !== id));
    }
  };

  const handleCopyRecipe = (recipe) => {
    const copied = {
      ...recipe,
      id: Math.max(...recipes.map(r => r.id), 0) + 1,
      name: `${recipe.name} (Copy)`,
      updated: new Date().toISOString()
    };
    // Add to beginning of array so it appears at top when sorted by updated desc
    setRecipes(prev => [copied, ...prev]);
    return copied;
  };

  // Bulk operations
  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedRecipes.length} selected recipes?`)) {
      setRecipes(prev => prev.filter(r => !selectedRecipes.includes(r.id)));
      setSelectedRecipes([]);
    }
  };

  const handleBulkExport = () => {
    const exportData = recipes
      .filter(r => selectedRecipes.includes(r.id))
      .map(r => ({
        Name: r.name,
        Category: r.category,
        Servings: r.servings,
        'Cost per Serving': r.costPerServing,
        'Total Cost': r.totalCost,
        'Selling Price': r.sellingPrice,
        'Food Cost %': ((r.costPerServing / r.sellingPrice) * 100).toFixed(2)
      }));

    const csv = [
      Object.keys(exportData[0]).join(','),
      ...exportData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recipes-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Cost analysis helper
  const prepareCostAnalysis = (recipe) => {
    return {
      ...recipe,
      ingredients: recipe.ingredients || [],
      laborCost: 0,
      overheadPercentage: 15,
      targetFoodCost: 30
    };
  };

  return {
    recipes,
    filteredRecipes,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    sortConfig,
    handleSort,
    selectedRecipes,
    handleSelectAll,
    handleSelectRecipe,
    handleSaveRecipe,
    handleDeleteRecipe,
    handleCopyRecipe,
    handleBulkDelete,
    handleBulkExport,
    prepareCostAnalysis
  };
};
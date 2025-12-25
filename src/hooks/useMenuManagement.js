// src/hooks/useMenuManagement.js
import { useState, useEffect, useMemo } from 'react';
import { enhancedRecipes } from '../data/recipeData';

// Convert enhanced recipes to the format menus expect
const getRecipesForMenus = () => {
  return enhancedRecipes.map(recipe => ({
    id: recipe.id,
    name: recipe.name,
    cost: recipe.costPerServing || 0,
    category: recipe.category || 'Uncategorized'
  }));
};

const INITIAL_SAMPLE_MENUS = [
  {
    id: 1,
    name: "Lunch Menu",
    description: "Our daily lunch offerings",
    type: "lunch",
    status: "active",
    items: [
      { id: 1, recipeId: 'recipe-1', price: 12.95, quantity: 1 },
      { id: 2, recipeId: 'recipe-3', price: 14.95, quantity: 1 }
    ],
    validFrom: '',
    validTo: '',
    targetFoodCost: 30,
    actualFoodCost: 0, // Will be calculated
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Dinner Special",
    description: "Weekend dinner menu",
    type: "dinner",
    status: "active",
    items: [
      { id: 3, recipeId: 'recipe-2', price: 24.99, quantity: 1 },
      { id: 4, recipeId: 'recipe-4', price: 19.99, quantity: 1 }
    ],
    validFrom: '',
    validTo: '',
    targetFoodCost: 32,
    actualFoodCost: 0, // Will be calculated
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const useMenuManagement = () => {
  const [menus, setMenus] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [showDropdownId, setShowDropdownId] = useState(null);

  // Load data from localStorage with sample data
  useEffect(() => {
    try {
      // Always use the shared recipe data from recipeData.js
      const sharedRecipes = getRecipesForMenus();
      setRecipes(sharedRecipes);
      
      const savedMenus = localStorage.getItem('toqueworks_menus');
      
      if (savedMenus) {
        const parsedMenus = JSON.parse(savedMenus);
        // Recalculate actual food cost with current recipe prices
        const updatedMenus = parsedMenus.map(menu => {
          if (menu.items && menu.items.length > 0) {
            const totalRevenue = menu.items.reduce((sum, item) => 
              sum + ((item.price || 0) * (item.quantity || 1)), 0);
            
            const totalCost = menu.items.reduce((sum, item) => {
              const recipe = sharedRecipes.find(r => r.id === item.recipeId);
              return sum + ((recipe?.cost || 0) * (item.quantity || 1));
            }, 0);
            
            const actualFoodCost = totalRevenue > 0 ? (totalCost / totalRevenue) * 100 : 0;
            return { ...menu, actualFoodCost: actualFoodCost.toFixed(1) };
          }
          return menu;
        });
        setMenus(updatedMenus);
      } else {
        // Calculate actual food cost for initial sample menus
        const menusWithCalculatedCosts = INITIAL_SAMPLE_MENUS.map(menu => {
          const totalRevenue = menu.items.reduce((sum, item) => 
            sum + ((item.price || 0) * (item.quantity || 1)), 0);
          
          const totalCost = menu.items.reduce((sum, item) => {
            const recipe = sharedRecipes.find(r => r.id === item.recipeId);
            return sum + ((recipe?.cost || 0) * (item.quantity || 1));
          }, 0);
          
          const actualFoodCost = totalRevenue > 0 ? (totalCost / totalRevenue) * 100 : 0;
          return { ...menu, actualFoodCost: actualFoodCost.toFixed(1) };
        });
        
        setMenus(menusWithCalculatedCosts);
        localStorage.setItem('toqueworks_menus', JSON.stringify(menusWithCalculatedCosts));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      const sharedRecipes = getRecipesForMenus();
      setRecipes(sharedRecipes);
      setMenus(INITIAL_SAMPLE_MENUS);
    }
  }, []);

  // Save menus to localStorage whenever they change
  useEffect(() => {
    if (menus.length > 0) {
      localStorage.setItem('toqueworks_menus', JSON.stringify(menus));
    }
  }, [menus]);

  // Calculate menu statistics
  const calculateMenuStats = (menu) => {
    if (!menu.items || menu.items.length === 0) return null;
    
    const totalRevenue = menu.items.reduce((sum, item) => {
      return sum + ((item.price || 0) * (item.quantity || 1));
    }, 0);
    
    const totalCost = menu.items.reduce((sum, item) => {
      const recipe = recipes.find(r => r.id === item.recipeId || r.id === String(item.recipeId));
      if (recipe && recipe.cost) {
        return sum + (recipe.cost * (item.quantity || 1));
      }
      return sum;
    }, 0);
    
    const profit = totalRevenue - totalCost;
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
    
    return {
      revenue: totalRevenue,
      cost: totalCost,
      profit: profit,
      margin: isNaN(margin) ? 0 : margin.toFixed(1),
      itemCount: menu.items.length
    };
  };

  // Filter and search menus
  const filteredMenus = useMemo(() => {
    return menus.filter(menu => {
      const matchesSearch = menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           menu.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || menu.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [menus, searchTerm, filterStatus]);

  // CRUD Operations
  const handleAddMenu = () => {
    setEditingMenu(null);
    setShowModal(true);
  };

  const handleEditMenu = (menu) => {
    setEditingMenu(menu);
    setShowModal(true);
  };

  const handleSaveMenu = (menuData) => {
    if (editingMenu) {
      // Update existing menu
      setMenus(menus.map(m => 
        m.id === editingMenu.id 
          ? { ...menuData, id: editingMenu.id, updatedAt: new Date().toISOString() }
          : m
      ));
    } else {
      // Add new menu
      const newMenu = {
        ...menuData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setMenus([...menus, newMenu]);
    }
    setShowModal(false);
    setEditingMenu(null);
  };

  const handleDeleteMenu = (menuId) => {
    if (window.confirm('Are you sure you want to delete this menu?')) {
      setMenus(menus.filter(m => m.id !== menuId));
    }
    setShowDropdownId(null);
  };

  const handleDuplicateMenu = (menu) => {
    const duplicatedMenu = {
      ...menu,
      id: Date.now(),
      name: `${menu.name} (Copy)`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setMenus([...menus, duplicatedMenu]);
    setShowDropdownId(null);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(menus, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `menus_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedMenus = JSON.parse(e.target.result);
          setMenus(importedMenus);
        } catch (error) {
          alert('Error importing file. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return {
    // State
    menus: filteredMenus,
    recipes,
    searchTerm,
    filterStatus,
    showModal,
    editingMenu,
    showDropdownId,
    
    // Setters
    setSearchTerm,
    setFilterStatus,
    setShowModal,
    setEditingMenu,  // This was already here but double-checking
    setShowDropdownId,
    
    // Handlers
    handleAddMenu,
    handleEditMenu,
    handleSaveMenu,
    handleDeleteMenu,
    handleDuplicateMenu,
    handleExport,
    handleImport,
    
    // Utilities
    calculateMenuStats
  };
};
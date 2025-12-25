// src/config/navigation.js - Intuitive workflow organization
export const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
  },
  {
    id: 'lab-planning',
    label: 'Lab Planning',
    description: 'Plan labs and generate requisitions'
  },
  {
    id: 'ingredients',
    label: 'Ingredients',
    dropdown: [
      {
        id: 'ingredients',
        label: 'Ingredients List',
        description: 'Manage ingredient costs and suppliers'
      },
      {
        id: 'inventory',
        label: 'Inventory',
        description: 'Track stock levels and par values'
      }
    ]
  },
  {
    id: 'restaurant',
    label: 'Restaurant',
    dropdown: [
      {
        id: 'recipes',
        label: 'Menu Recipes',
        description: 'Restaurant menu items and costing'
      },
      {
        id: 'recipe-cost-analysis',
        label: 'Recipe Cost Analysis',
        description: 'Financial analysis for menu items'
      },
      {
        id: 'recipe-scaling',
        label: 'Recipe Scaling',
        description: 'Scale menu recipes for different yields'
      },
      {
        id: 'menus',
        label: 'Menu Builder',
        description: 'Create and manage restaurant menus'
      },
      {
        id: 'recipe-books',
        label: 'Recipe Books',
        description: 'Organize menu recipes into collections'
      }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    dropdown: [
      {
        id: 'settings',
        label: 'General Settings',
        description: 'App preferences and configuration'
      },
      {
        id: 'admin',
        label: 'Admin Dashboard',
        description: 'Manage classes, recipes, and vendor pricing'
      },
      {
        id: 'recipe-options',
        label: 'Recipe Options',
        description: 'Manage categories, cuisines, and recipe settings'
      }
    ]
  }
];

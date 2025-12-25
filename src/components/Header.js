// src/config/pages.js - AVOID ALL BROKEN IMPORTS
import React from 'react';

// ✅ Use only confirmed working files from your grep results
import Dashboard from '../pages/Dashboard';
import Settings from '../pages/Settings';
import MenusPage from '../pages/MenusPage';
import RecipeBooksPage from '../pages/RecipeBooksPage';
import InventoryPage from '../components/inventory/InventoryPage';
import RecipeScalingPage from '../components/scaling/RecipeScalingPage';
import RecipeScalingSystem from '../components/recipes/RecipeScalingSystem';
import RecipeOptionsSettings from '../components/settings/RecipeOptionsSettings';

// Your theme object
const theme = {
  white: '#FFFFFF',
  seasalt: '#F6F8F8',
  silver: '#BBBFC2',
  charcoal: '#2A3E51',
  gunmetal: '#1F2D38',
  yellowGreen: '#8AC732'
};

// ✅ COMPLETELY AVOID broken src/pages/ files
export const pages = {
  dashboard: { component: <Dashboard /> },
  recipes: { component: <Dashboard /> }, // Use Dashboard until we find working recipe page
  ingredients: { component: <Dashboard /> }, // Use Dashboard until we find working ingredients page
  menus: { component: <MenusPage /> },
  'recipe-books': { component: <RecipeBooksPage /> },
  inventory: { component: <InventoryPage /> },
  'recipe-scaling': { component: <RecipeScalingPage /> },
  settings: { component: <Settings /> },
  'recipe-options': { component: <RecipeOptionsSettings theme={theme} /> }
};
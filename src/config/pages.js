// config/pages.js - Updated to match navigation.js IDs
import React from 'react';

// Import existing pages
import DashboardPage from '../pages/Dashboard';
import IngredientsPage from '../pages/IngredientsPage';
import InventoryPage from '../pages/InventoryPage';
import RecipePage from '../pages/RecipePage';
import RecipeScalingPage from '../pages/RecipeScalingPage';
import RecipeCostAnalysisPage from '../pages/RecipeCostAnalysisPage';
import RequisitionsPage from '../pages/RequisitionsPage';
import MenusPage from '../pages/MenusPage';
import RecipeBooksPage from '../pages/RecipeBooksPage';
import SettingsPage from '../pages/SettingsPage';
import RecipeOptionsPage from '../pages/RecipeOptionsPage';

// Import new workflow pages
import AdminDashboard from '../pages/AdminDashboard';
import LabPlanningPage from '../pages/LabPlanningPage';

export const pages = {
  // Dashboard
  'dashboard': {
    name: 'Dashboard',
    component: <DashboardPage />
  },
  
  // NEW: Admin Dashboard
  'admin': {
    name: 'Admin Dashboard',
    icon: '👨‍💼',
    component: <AdminDashboard />,
    description: 'Manage Classes, Recipes, Vendor Pricing'
  },
  
  // NEW: Lab Planning
  'lab-planning': {
    name: 'Lab Planning',
    icon: '📋',
    component: <LabPlanningPage />,
    description: 'Select Class, Week, Recipes'
  },
  
  // Ingredients
  'ingredients': {
    name: 'Ingredients List',
    component: <IngredientsPage />
  },
  'inventory': {
    name: 'Inventory',
    component: <InventoryPage />
  },
  
  // Recipes
  'recipes': {
    name: 'Recipe List',
    component: <RecipePage />
  },
  'recipe-cost-analysis': {
    name: 'Recipe Cost Analysis',
    component: <RecipeCostAnalysisPage />
  },
  'recipe-scaling': {
    name: 'Recipe Scaling',
    component: <RecipeScalingPage />
  },
  
  // Requisitions
  'requisitions': {
    name: 'Lab Requisitions',
    component: <RequisitionsPage />
  },
  
  // Menus
  'menus': {
    name: 'Menu Builder',
    component: <MenusPage />
  },
  'recipe-books': {
    name: 'Recipe Books',
    component: <RecipeBooksPage />
  },
  
  // Settings
  'settings': {
    name: 'General Settings',
    component: <SettingsPage />
  },
  'recipe-options': {
    name: 'Recipe Options',
    component: <RecipeOptionsPage />
  }
};

export default pages;

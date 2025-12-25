// src/hooks/recipes/useActionMenu.js
import { useState, useEffect } from 'react';

export const useActionMenu = () => {
  const [openActionMenu, setOpenActionMenu] = useState(null);

  // Close action menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      const isClickInsideMenu = event.target.closest('.action-menu-container');
      if (!isClickInsideMenu) {
        setOpenActionMenu(null);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleActionMenu = (recipeId) => {
    setOpenActionMenu(openActionMenu === recipeId ? null : recipeId);
  };

  const closeActionMenu = () => {
    setOpenActionMenu(null);
  };

  const isMenuOpen = (recipeId) => {
    return openActionMenu === recipeId;
  };

  return {
    openActionMenu,
    toggleActionMenu,
    closeActionMenu,
    isMenuOpen,
  };
};

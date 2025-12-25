// src/hooks/useIngredientsModals.js
// ToqueWorks - Modal state management hook
// Compatible with your existing useIngredientsData structure

import { useState } from 'react';

/**
 * Custom hook for managing all modal states and coordination
 * Works with your existing useIngredientsData hook
 */
export const useIngredientsModals = () => {
  console.log('🎭 useIngredientsModals hook initializing...');

  // ===== MODAL STATE =====
  
  // Ingredient Modal (add/edit)
  const [editingIngredient, setEditingIngredient] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);
  
  // Cost History Modal
  const [costHistoryModal, setCostHistoryModal] = useState({
    isOpen: false,
    ingredient: null
  });
  
  // Supplier Manager Modal
  const [showSupplierManager, setShowSupplierManager] = useState(false);

  // ===== INGREDIENT MODAL OPERATIONS =====
  
  /**
   * Open ingredient modal for new ingredient
   */
  const openNewIngredientModal = () => {
    console.log('➕ Opening new ingredient modal');
    setEditingIngredient({});
    setModalError(null);
    setModalLoading(false);
  };

  /**
   * Open ingredient modal for editing existing ingredient
   */
  const openEditIngredientModal = (ingredient) => {
    console.log('✏️ Opening edit ingredient modal for:', ingredient.name);
    setEditingIngredient(ingredient);
    setModalError(null);
    setModalLoading(false);
  };

  /**
   * Close ingredient modal with unsaved changes handling
   */
  const closeIngredientModal = (forcedClose = false) => {
    if (!forcedClose && modalLoading) {
      console.log('⏳ Cannot close modal while saving');
      return false;
    }
    
    console.log('❌ Closing ingredient modal');
    setEditingIngredient(null);
    setModalError(null);
    setModalLoading(false);
    return true;
  };

  /**
   * Set loading state for ingredient modal
   */
  const setIngredientModalLoading = (loading) => {
    console.log('⏳ Setting ingredient modal loading:', loading);
    setModalLoading(loading);
  };

  /**
   * Set error state for ingredient modal
   */
  const setIngredientModalError = (error) => {
    console.log('❌ Setting ingredient modal error:', error);
    setModalError(error);
  };

  // ===== COST HISTORY MODAL OPERATIONS =====
  
  /**
   * Open cost history modal for specific ingredient
   */
  const openCostHistoryModal = (ingredient) => {
    console.log('📈 Opening cost history modal for:', ingredient.name);
    setCostHistoryModal({
      isOpen: true,
      ingredient: ingredient
    });
  };

  /**
   * Close cost history modal
   */
  const closeCostHistoryModal = () => {
    console.log('❌ Closing cost history modal');
    setCostHistoryModal({
      isOpen: false,
      ingredient: null
    });
  };

  // ===== SUPPLIER MANAGER OPERATIONS =====
  
  /**
   * Open supplier manager modal
   */
  const openSupplierManager = () => {
    console.log('🏪 Opening supplier manager');
    setShowSupplierManager(true);
  };

  /**
   * Close supplier manager modal
   */
  const closeSupplierManager = () => {
    console.log('❌ Closing supplier manager');
    setShowSupplierManager(false);
  };

  // ===== INTEGRATED SAVE HANDLER =====
  
  /**
   * Handle ingredient save with proper modal state management
   * Works with your existing addIngredient/updateIngredient functions
   */
  const handleIngredientSave = async (ingredientData, dataHookFunctions) => {
    console.log('💾 Starting ingredient save process...');
    setModalLoading(true);
    setModalError(null);

    try {
      // Validate required fields
      if (!ingredientData.name || !ingredientData.name.trim()) {
        throw new Error('Ingredient name is required');
      }

      // Add timestamp if not present
      const dataToSave = {
        ...ingredientData,
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      // Simulate save delay for UX
      await new Promise(resolve => setTimeout(resolve, 300));

      if (editingIngredient && editingIngredient.id) {
        // Update existing ingredient
        console.log('✏️ Updating existing ingredient:', editingIngredient.id);
        dataHookFunctions.updateIngredient(editingIngredient.id, dataToSave);
      } else {
        // Add new ingredient  
        console.log('➕ Adding new ingredient');
        dataHookFunctions.addIngredient(dataToSave);
      }
      
      // Close modal on success
      console.log('✅ Ingredient saved successfully');
      closeIngredientModal(true); // Force close since save was successful
      
    } catch (error) {
      console.error('❌ Error saving ingredient:', error);
      setModalError(error.message || 'Failed to save ingredient. Please try again.');
      setModalLoading(false); // Keep modal open but stop loading
    }
  };

  // ===== MODAL STATE HELPERS =====
  
  /**
   * Check if any modal is currently open
   */
  const isAnyModalOpen = () => {
    const anyOpen = !!(editingIngredient || costHistoryModal.isOpen || showSupplierManager);
    return anyOpen;
  };

  /**
   * Close all modals (useful for cleanup or navigation)
   */
  const closeAllModals = () => {
    console.log('🧹 Closing all modals');
    closeIngredientModal(true);
    closeCostHistoryModal();
    closeSupplierManager();
  };

  /**
   * Get current modal state for debugging
   */
  const getModalState = () => {
    const state = {
      ingredientModal: {
        isOpen: !!editingIngredient,
        isEditing: editingIngredient && editingIngredient.id,
        isLoading: modalLoading,
        hasError: !!modalError
      },
      costHistoryModal: {
        isOpen: costHistoryModal.isOpen,
        hasIngredient: !!costHistoryModal.ingredient
      },
      supplierManager: {
        isOpen: showSupplierManager
      }
    };
    
    console.log('🎭 Current modal state:', state);
    return state;
  };

  // ===== RETURN INTERFACE =====
  return {
    // ===== INGREDIENT MODAL =====
    // State
    editingIngredient,
    modalLoading,
    modalError,
    
    // Operations
    openNewIngredientModal,
    openEditIngredientModal,
    closeIngredientModal,
    setIngredientModalLoading,
    setIngredientModalError,
    handleIngredientSave,

    // ===== COST HISTORY MODAL =====
    // State
    costHistoryModal,
    
    // Operations
    openCostHistoryModal,
    closeCostHistoryModal,

    // ===== SUPPLIER MANAGER =====
    // State
    showSupplierManager,
    
    // Operations
    openSupplierManager,
    closeSupplierManager,

    // ===== UTILITIES =====
    isAnyModalOpen,
    closeAllModals,
    getModalState,

    // ===== LEGACY COMPATIBILITY =====
    // For easier migration from existing code
    setEditingIngredient,
    setCostHistoryModal,
    setShowSupplierManager
  };
};
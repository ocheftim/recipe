// src/components/menus/MenuModal.js - REFACTORED VERSION
import React, { useState, useEffect } from 'react';
import MenuBasicInfo from './MenuBasicInfo';
import MenuItemsList from './MenuItemsList';
import MenuStatsDisplay from './MenuStatsDisplay';

const MenuModal = ({ menu, recipes, onSave, onClose, theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'lunch',
    status: 'draft',
    items: [],
    validFrom: '',
    validTo: '',
    targetFoodCost: 30,
    actualFoodCost: 0
  });

  useEffect(() => {
    if (menu) {
      setFormData(menu);
    } else {
      setFormData({
        name: '',
        description: '',
        type: 'lunch',
        status: 'draft',
        items: [],
        validFrom: '',
        validTo: '',
        targetFoodCost: 30,
        actualFoodCost: 0
      });
    }
  }, [menu]);

  const calculateMenuStats = () => {
    const totalCost = formData.items.reduce((sum, item) => {
      const recipe = recipes.find(r => r.id === item.recipeId);
      if (recipe) {
        return sum + (recipe.cost * item.quantity);
      }
      return sum;
    }, 0);

    const totalRevenue = formData.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    const actualFoodCost = totalRevenue > 0 ? (totalCost / totalRevenue) * 100 : 0;

    return {
      totalCost,
      totalRevenue,
      actualFoodCost: actualFoodCost.toFixed(1)
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stats = calculateMenuStats();
    onSave({
      ...formData,
      actualFoodCost: parseFloat(stats.actualFoodCost)
    });
  };

  const handleBasicInfoChange = (updatedData) => {
    setFormData(updatedData);
  };

  const handleItemsUpdate = (updatedItems) => {
    setFormData({ ...formData, items: updatedItems });
  };

  const stats = calculateMenuStats();

  return (
    <ModalOverlay onClose={onClose}>
      <ModalContent theme={theme}>
        <ModalHeader 
          title={menu ? 'Edit Menu' : 'Create New Menu'}
          onClose={onClose}
          theme={theme}
        />
        
        <form onSubmit={handleSubmit}>
          <ModalBody theme={theme}>
            <MenuBasicInfo
              formData={formData}
              onChange={handleBasicInfoChange}
              theme={theme}
            />
            
            <MenuItemsList
              items={formData.items}
              recipes={recipes}
              onUpdate={handleItemsUpdate}
              theme={theme}
            />
            
            <MenuStatsDisplay
              stats={stats}
              targetFoodCost={formData.targetFoodCost}
              theme={theme}
            />
          </ModalBody>
          
          <ModalFooter
            onCancel={onClose}
            submitLabel={menu ? 'Update Menu' : 'Create Menu'}
            theme={theme}
          />
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

// Modal Layout Components
const ModalOverlay = ({ children, onClose }) => (
  <div 
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}
    onClick={onClose}
  >
    <div onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>
);

const ModalContent = ({ children, theme }) => (
  <div style={{
    backgroundColor: theme.white,
    borderRadius: '8px',
    width: '90%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  }}>
    {children}
  </div>
);

const ModalHeader = ({ title, onClose, theme }) => (
  <div style={{
    padding: '24px',
    borderBottom: `1px solid ${theme.lightGray}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <h2 style={{
      fontSize: '20px',
      fontWeight: '600',
      color: theme.gunmetal
    }}>
      {title}
    </h2>
    <button
      type="button"
      onClick={onClose}
      style={{
        background: 'none',
        border: 'none',
        fontSize: '24px',
        color: theme.silver,
        cursor: 'pointer'
      }}
    >
      ×
    </button>
  </div>
);

const ModalBody = ({ children, theme }) => (
  <div style={{ padding: '24px' }}>
    {children}
  </div>
);

const ModalFooter = ({ onCancel, submitLabel, theme }) => (
  <div style={{
    padding: '24px',
    borderTop: `1px solid ${theme.lightGray}`,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px'
  }}>
    <button
      type="button"
      onClick={onCancel}
      style={{
        padding: '10px 20px',
        border: `1px solid ${theme.lightGray}`,
        borderRadius: '6px',
        backgroundColor: theme.white,
        color: theme.gunmetal,
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer'
      }}
    >
      Cancel
    </button>
    <button
      type="submit"
      style={{
        padding: '10px 20px',
        border: 'none',
        borderRadius: '6px',
        backgroundColor: theme.teaGreen,
        color: theme.white,
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer'
      }}
    >
      {submitLabel}
    </button>
  </div>
);

export default MenuModal;
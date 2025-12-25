// src/components/ingredients/ToqueWorksIngredientSystem.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Plus, Search, Upload, Download, Package, AlertTriangle, TrendingUp, DollarSign, Edit2, Trash2, X } from 'lucide-react';
import AddIngredientModal from './AddIngredientModal';
import EditIngredientModal from './EditIngredientModal';
import IngredientTable from './IngredientTable';
import InventoryManagement from './InventoryManagement';
import PendingIngredientsAlert from './PendingIngredientsAlert';

// Safely import globalStyles with comprehensive fallback
let STYLES, COLORS, TYPOGRAPHY, SPACING, CARDS, BUTTONS, TABS, UTILS, ANIMATIONS;
try {
  STYLES = require('../../styles/globalStyles').default;
  ({ COLORS, TYPOGRAPHY, SPACING, CARDS, BUTTONS, TABS, UTILS, ANIMATIONS } = STYLES);
} catch (e) {
  // Comprehensive fallback values if globalStyles can't be imported
  COLORS = {
    primary: '#1F2D38',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    accent: '#8AC732',
    background: '#FFFFFF',
    lightBackground: '#FAFAFA',
    border: '#E5E7EB',
    subtleBorder: '#F6F8F8',
    error: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981'
  };
  TYPOGRAPHY = {
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      xxl: '24px',
      xxxl: '32px'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  };
  SPACING = {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
    xxxl: '48px'
  };
  CARDS = {
    container: {
      backgroundColor: COLORS.background,
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: `1px solid ${COLORS.border}`
    }
  };
  BUTTONS = {
    primary: {
      backgroundColor: COLORS.primary,
      color: COLORS.background,
      border: 'none',
      borderRadius: '8px',
      padding: '8px 16px',
      cursor: 'pointer',
      fontWeight: 500
    },
    secondary: {
      backgroundColor: COLORS.background,
      color: COLORS.primary,
      border: `1px solid ${COLORS.border}`,
      borderRadius: '8px',
      padding: '8px 16px',
      cursor: 'pointer'
    }
  };
  TABS = {
    container: {
      display: 'flex',
      borderBottom: `1px solid ${COLORS.border}`
    },
    tab: {
      padding: '12px 24px',
      fontWeight: 500,
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }
  };
  UTILS = {
    flexBetween: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    flexCenter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  };
  ANIMATIONS = {
    transition: {
      fast: 'all 0.15s ease',
      normal: 'all 0.2s ease'
    }
  };
  console.warn('Using fallback styles - globalStyles not found');
}

const ToqueWorksIngredientSystem = () => {
  const [ingredients, setIngredients] = useState([]);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPendingAlert, setShowPendingAlert] = useState(true);

  // Component-specific styles
  const localStyles = {
    container: {
      padding: SPACING.xl
    },
    header: {
      marginBottom: SPACING.xl
    },
    title: {
      fontSize: TYPOGRAPHY.fontSize.xxl,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      color: COLORS.primary,
      marginBottom: SPACING.xs
    },
    subtitle: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.secondary
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: SPACING.lg,
      marginBottom: SPACING.xl
    },
    statCard: {
      ...CARDS.container,
      padding: SPACING.lg
    },
    statContent: {
      ...UTILS.flexBetween
    },
    statLabel: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.secondary
    },
    statValue: {
      fontSize: TYPOGRAPHY.fontSize.xxl,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      color: COLORS.primary
    },
    statIcon: {
      width: '32px',
      height: '32px'
    },
    tabsContainer: {
      ...CARDS.container,
      overflow: 'hidden'
    },
    tabsHeader: {
      ...TABS.container
    },
    tab: {
      ...TABS.tab,
      borderBottom: '2px solid transparent',
      transition: ANIMATIONS.transition.normal
    },
    tabActive: {
      color: COLORS.primary,
      borderBottomColor: COLORS.primary
    },
    tabInactive: {
      color: COLORS.secondary
    },
    tabContent: {
      padding: SPACING.xl
    },
    controls: {
      marginBottom: SPACING.lg,
      ...UTILS.flexBetween
    },
    controlsGroup: {
      display: 'flex',
      gap: SPACING.md
    },
    primaryButton: {
      ...BUTTONS.primary,
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.sm,
      fontSize: TYPOGRAPHY.fontSize.base,
      transition: ANIMATIONS.transition.fast
    },
    secondaryButton: {
      ...BUTTONS.secondary,
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.sm,
      fontSize: TYPOGRAPHY.fontSize.base,
      transition: ANIMATIONS.transition.fast
    },
    fileInputLabel: {
      ...BUTTONS.secondary,
      display: 'inline-flex',
      alignItems: 'center',
      gap: SPACING.sm,
      fontSize: TYPOGRAPHY.fontSize.base,
      transition: ANIMATIONS.transition.fast
    },
    hiddenInput: {
      display: 'none'
    },
    emptyState: {
      textAlign: 'center',
      padding: `${SPACING.xxxl} ${SPACING.xl}`,
      color: COLORS.secondary
    },
    emptyIcon: {
      width: '48px',
      height: '48px',
      margin: '0 auto',
      marginBottom: SPACING.lg,
      color: COLORS.border
    },
    emptyTitle: {
      fontSize: TYPOGRAPHY.fontSize.lg,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: COLORS.primary,
      marginBottom: SPACING.sm
    },
    emptyText: {
      fontSize: TYPOGRAPHY.fontSize.base,
      color: COLORS.secondary
    }
  };

  // Load ingredients on mount
  useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = () => {
    const stored = localStorage.getItem('toqueworks_ingredients');
    if (stored) {
      try {
        setIngredients(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading ingredients:', e);
        setIngredients([]);
      }
    }
  };

  const saveIngredients = (updatedIngredients) => {
    localStorage.setItem('toqueworks_ingredients', JSON.stringify(updatedIngredients));
    setIngredients(updatedIngredients);
  };

  // Add new ingredient
  const handleAddIngredient = (newIngredient) => {
    const updated = [...ingredients, { ...newIngredient, id: Date.now() }];
    saveIngredients(updated);
    setShowAddModal(false);
  };

  // Add multiple ingredients (from pending)
  const handleAddMultipleIngredients = (newIngredients) => {
    const updated = [...ingredients, ...newIngredients];
    saveIngredients(updated);
  };

  // Edit ingredient
  const handleEditIngredient = (ingredient) => {
    setEditingIngredient(ingredient);
    setShowEditModal(true);
  };

  // Save edited ingredient
  const handleSaveEdit = (updatedIngredient) => {
    const updated = ingredients.map(ing => 
      ing.id === updatedIngredient.id ? updatedIngredient : ing
    );
    saveIngredients(updated);
    
    // Update recipes that use this ingredient
    updateRecipesWithIngredient(updatedIngredient);
    
    setShowEditModal(false);
    setEditingIngredient(null);
  };

  // Delete ingredient
  const handleDeleteIngredient = (ingredientId) => {
    const updated = ingredients.filter(ing => ing.id !== ingredientId);
    saveIngredients(updated);
  };

  // Update recipes when ingredient changes
  const updateRecipesWithIngredient = (updatedIngredient) => {
    const recipes = JSON.parse(localStorage.getItem('toqueworks_recipes') || '[]');
    const updated = recipes.map(recipe => ({
      ...recipe,
      ingredients: recipe.ingredients?.map(ing => 
        ing.ingredientId === updatedIngredient.id
          ? {
              ...ing,
              name: updatedIngredient.name,
              unit: updatedIngredient.unit,
              cost: updatedIngredient.costPerUnit * ing.quantity
            }
          : ing
      )
    }));
    localStorage.setItem('toqueworks_recipes', JSON.stringify(updated));
  };

  // Export ingredients
  const handleExport = () => {
    const dataStr = JSON.stringify(ingredients, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `ingredients_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Import ingredients
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          if (Array.isArray(imported)) {
            const merged = [...ingredients];
            imported.forEach(imp => {
              if (!merged.find(ing => ing.name === imp.name)) {
                merged.push({ ...imp, id: Date.now() + Math.random() });
              }
            });
            saveIngredients(merged);
            alert(`Imported ${imported.length} ingredients successfully!`);
          }
        } catch (error) {
          alert('Error importing file. Please check the format.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Calculate stats
  const stats = {
    total: ingredients.length,
    categories: new Set(ingredients.map(ing => ing.category).filter(Boolean)).size,
    suppliers: new Set(ingredients.map(ing => ing.supplier).filter(Boolean)).size,
    totalValue: ingredients.reduce((sum, ing) => sum + (ing.costPerUnit || 0), 0)
  };

  // Helper function to get stat icon color
  const getStatIconColor = (type) => {
    switch(type) {
      case 'total': return COLORS.primary;
      case 'categories': return COLORS.accent;
      case 'suppliers': return COLORS.warning;
      case 'cost': return COLORS.primary;
      default: return COLORS.secondary;
    }
  };

  return (
    <div style={localStyles.container}>
      {/* Header */}
      <div style={localStyles.header}>
        <h1 style={localStyles.title}>
          Ingredient Management
        </h1>
        <p style={localStyles.subtitle}>
          Manage your ingredient master list, costs, and inventory
        </p>
      </div>

      {/* Pending Ingredients Alert */}
      {showPendingAlert && (
        <PendingIngredientsAlert
          onAddIngredients={handleAddMultipleIngredients}
          onDismiss={() => setShowPendingAlert(false)}
        />
      )}

      {/* Stats Cards */}
      <div style={localStyles.statsGrid}>
        <div style={localStyles.statCard}>
          <div style={localStyles.statContent}>
            <div>
              <p style={localStyles.statLabel}>Total Ingredients</p>
              <p style={localStyles.statValue}>{stats.total}</p>
            </div>
            <Package style={{ ...localStyles.statIcon, color: getStatIconColor('total') }} />
          </div>
        </div>

        <div style={localStyles.statCard}>
          <div style={localStyles.statContent}>
            <div>
              <p style={localStyles.statLabel}>Categories</p>
              <p style={localStyles.statValue}>{stats.categories}</p>
            </div>
            <TrendingUp style={{ ...localStyles.statIcon, color: getStatIconColor('categories') }} />
          </div>
        </div>

        <div style={localStyles.statCard}>
          <div style={localStyles.statContent}>
            <div>
              <p style={localStyles.statLabel}>Suppliers</p>
              <p style={localStyles.statValue}>{stats.suppliers}</p>
            </div>
            <AlertTriangle style={{ ...localStyles.statIcon, color: getStatIconColor('suppliers') }} />
          </div>
        </div>

        <div style={localStyles.statCard}>
          <div style={localStyles.statContent}>
            <div>
              <p style={localStyles.statLabel}>Avg Cost/Unit</p>
              <p style={localStyles.statValue}>
                ${stats.total > 0 ? (stats.totalValue / stats.total).toFixed(2) : '0.00'}
              </p>
            </div>
            <DollarSign style={{ ...localStyles.statIcon, color: getStatIconColor('cost') }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={localStyles.tabsContainer}>
        <div style={localStyles.tabsHeader}>
          <button
            onClick={() => setActiveTab('ingredients')}
            style={{
              ...localStyles.tab,
              ...(activeTab === 'ingredients' ? localStyles.tabActive : localStyles.tabInactive),
              borderBottomColor: activeTab === 'ingredients' ? COLORS.primary : 'transparent'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'ingredients') {
                e.currentTarget.style.backgroundColor = COLORS.lightBackground;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Ingredients
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            style={{
              ...localStyles.tab,
              ...(activeTab === 'inventory' ? localStyles.tabActive : localStyles.tabInactive),
              borderBottomColor: activeTab === 'inventory' ? COLORS.primary : 'transparent'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'inventory') {
                e.currentTarget.style.backgroundColor = COLORS.lightBackground;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('suppliers')}
            style={{
              ...localStyles.tab,
              ...(activeTab === 'suppliers' ? localStyles.tabActive : localStyles.tabInactive),
              borderBottomColor: activeTab === 'suppliers' ? COLORS.primary : 'transparent'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'suppliers') {
                e.currentTarget.style.backgroundColor = COLORS.lightBackground;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Suppliers
          </button>
        </div>

        {/* Tab Content */}
        <div style={localStyles.tabContent}>
          {activeTab === 'ingredients' && (
            <>
              {/* Controls */}
              <div style={localStyles.controls}>
                <div style={localStyles.controlsGroup}>
                  <button
                    onClick={() => setShowAddModal(true)}
                    style={localStyles.primaryButton}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    <Plus style={{ width: '20px', height: '20px' }} />
                    Add Ingredient
                  </button>
                  
                  <button
                    onClick={handleExport}
                    style={localStyles.secondaryButton}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = COLORS.lightBackground;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = COLORS.background;
                    }}
                  >
                    <Download style={{ width: '16px', height: '16px' }} />
                    Export
                  </button>
                  
                  <label 
                    style={localStyles.fileInputLabel}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = COLORS.lightBackground;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = COLORS.background;
                    }}
                  >
                    <Upload style={{ width: '16px', height: '16px' }} />
                    Import
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      style={localStyles.hiddenInput}
                    />
                  </label>
                </div>
              </div>

              {/* Ingredients Table */}
              <IngredientTable
                ingredients={ingredients}
                onEdit={handleEditIngredient}
                onDelete={handleDeleteIngredient}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </>
          )}

          {activeTab === 'inventory' && (
            <InventoryManagement
              ingredients={ingredients}
              onUpdateInventory={(data) => console.log('Inventory updated:', data)}
            />
          )}

          {activeTab === 'suppliers' && (
            <div style={localStyles.emptyState}>
              <Package style={localStyles.emptyIcon} />
              <h3 style={localStyles.emptyTitle}>
                Supplier Management
              </h3>
              <p style={localStyles.emptyText}>
                Supplier management features coming soon
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Ingredient Modal */}
      {showAddModal && (
        <AddIngredientModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddIngredient}
        />
      )}

      {/* Edit Ingredient Modal */}
      {showEditModal && editingIngredient && (
        <EditIngredientModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingIngredient(null);
          }}
          onSave={handleSaveEdit}
          ingredient={editingIngredient}
        />
      )}
    </div>
  );
};

export default ToqueWorksIngredientSystem;
// RecipeCostAnalysisPage.js - ToqueWorks Instructional Recipe Cost Analysis
import React, { useState, useMemo, useEffect } from 'react';
import { quickBreadsRecipes } from '../data/quickBreadsRecipes';
import { shamrockMapping } from '../data/shamrockMapping';
import STYLES from '../styles/globalStyles';

const {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BUTTONS,
  FORMS,
  TABLES,
  MODALS,
  CARDS,
  STATUS,
  UTILS,
  ANIMATIONS,
  combineStyles,
  getFoodCostColor
} = STYLES;

// Get current date helper function
const getCurrentDateString = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const year = String(now.getFullYear()).slice(-2);
  return `${month}/${day}/${year}`;
};

// Calculate ingredient cost from Shamrock data
const calculateIngredientCost = (recipe) => {
  return recipe.ingredients.reduce((sum, ing) => {
    const shamrockItem = shamrockMapping[ing.name];
    if (shamrockItem) {
      return sum + (ing.quantity * shamrockItem.pricePerUnit);
    }
    return sum;
  }, 0);
};

// Generate cost analysis from quickBreadsRecipes for instruction
const generateCostAnalysisFromRecipes = (budgetThreshold = 1.50) => {
  return quickBreadsRecipes.map((recipe, index) => {
    const ingredientCost = calculateIngredientCost(recipe);
    
    // Total cost is just ingredients for instructional purposes
    const totalCost = ingredientCost;
    const costPerServing = totalCost / recipe.yieldAmount;
    
    // Simple budget status: within budget or over budget
    const budgetStatus = costPerServing <= budgetThreshold ? 'within' : 'over';
    
    return {
      id: recipe.id,
      recipeName: recipe.name,
      category: 'Quick Breads',
      yield: recipe.yieldAmount,
      unit: recipe.yieldUnit,
      // Costs
      ingredientCost: parseFloat(ingredientCost.toFixed(2)),
      totalCost: parseFloat(totalCost.toFixed(2)),
      costPerServing: parseFloat(costPerServing.toFixed(2)),
      // Instructional metrics
      budgetStatus,
      prepTime: recipe.prepTime,
      bakeTime: recipe.bakeTime,
      totalTime: recipe.prepTime + ' + ' + recipe.bakeTime,
      modified: getCurrentDateString(),
      // Budget planning
      costFor12Students: parseFloat((costPerServing * 12).toFixed(2)),
      costFor24Students: parseFloat((costPerServing * 24).toFixed(2))
    };
  });
};

// Main RecipeCostAnalysisPage Component
const RecipeCostAnalysisPage = () => {
  const [budgetThreshold, setBudgetThreshold] = useState(1.50);
  const [costAnalysis, setCostAnalysis] = useState(() => generateCostAnalysisFromRecipes(1.50));
  const [searchTerm, setSearchTerm] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({ column: 'costPerServing', state: 1 });
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [classSize, setClassSize] = useState(12);

  // Regenerate analysis when budget threshold changes
  useEffect(() => {
    setCostAnalysis(generateCostAnalysisFromRecipes(budgetThreshold));
  }, [budgetThreshold]);

  // Component-specific styles
  const localStyles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: SPACING.xxl,
      backgroundColor: COLORS.background,
      minHeight: '100vh'
    },
    header: {
      marginBottom: SPACING.xxl
    },
    h1: {
      fontSize: TYPOGRAPHY.fontSize.xxxl,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      color: COLORS.primary,
      margin: 0,
      letterSpacing: 'normal'
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.md,
      marginBottom: SPACING.xl,
      position: 'relative'
    },
    btnPrimary: {
      ...BUTTONS.secondary,
      borderLeft: `3px solid ${COLORS.accent}`,
      whiteSpace: 'nowrap'
    },
    btn: {
      ...BUTTONS.secondary,
      whiteSpace: 'nowrap'
    },
    toolbarRight: {
      marginLeft: 'auto',
      display: 'flex',
      gap: SPACING.md,
      alignItems: 'center'
    },
    filterBar: {
      display: 'flex',
      gap: SPACING.md,
      padding: SPACING.lg,
      backgroundColor: COLORS.lightBackground,
      borderTop: `1px solid ${COLORS.border}`,
      borderBottom: `1px solid ${COLORS.border}`,
      alignItems: 'center'
    },
    searchInput: {
      ...FORMS.input.base,
      flex: 1,
      maxWidth: '400px'
    },
    select: {
      ...FORMS.select.base,
      minWidth: '140px'
    },
    table: {
      ...TABLES.container,
      borderRadius: 0
    },
    thead: {
      backgroundColor: COLORS.lightBackground
    },
    th: {
      ...TABLES.headerCell,
      cursor: 'pointer',
      userSelect: 'none'
    },
    thCentered: {
      ...TABLES.headerCell,
      textAlign: 'center',
      cursor: 'pointer',
      userSelect: 'none'
    },
    thNoSort: {
      cursor: 'default'
    },
    td: {
      ...TABLES.cell,
      borderBottom: `1px solid ${COLORS.subtleBorder}`
    },
    tdCentered: {
      ...TABLES.cell,
      borderBottom: `1px solid ${COLORS.subtleBorder}`,
      textAlign: 'center'
    },
    tableRow: {
      transition: ANIMATIONS.transition.fast
    },
    recipeName: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      fontWeight: TYPOGRAPHY.fontWeight.normal,
      color: COLORS.primary,
      cursor: 'pointer',
      textDecoration: 'underline',
      textDecorationColor: 'transparent',
      transition: ANIMATIONS.transition.normal
    },
    status: {
      display: 'inline-flex',
      alignItems: 'center',
      fontSize: TYPOGRAPHY.fontSize.xs
    },
    statusDot: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      marginRight: SPACING.xs
    },
    actionsMenu: {
      position: 'relative',
      className: 'actions-menu'
    },
    actionsButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: SPACING.xs,
      fontSize: '18px',
      color: COLORS.secondary,
      letterSpacing: '2px',
      transition: ANIMATIONS.transition.normal
    },
    actionsDropdown: {
      position: 'absolute',
      right: 0,
      top: '100%',
      marginTop: SPACING.xs,
      backgroundColor: COLORS.background,
      border: `1px solid ${COLORS.border}`,
      borderRadius: SPACING.sm,
      zIndex: 100,
      minWidth: '120px'
    },
    actionItem: {
      padding: `${SPACING.sm} ${SPACING.lg}`,
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.primary,
      cursor: 'pointer',
      transition: ANIMATIONS.transition.fast,
      border: 'none',
      background: 'transparent',
      width: '100%',
      textAlign: 'left',
      display: 'block'
    },
    footer: {
      padding: SPACING.lg,
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.secondary,
      textAlign: 'center'
    },
    modal: {
      ...MODALS.overlay
    },
    modalContent: {
      backgroundColor: COLORS.background,
      border: `1px solid ${COLORS.border}`,
      borderRadius: SPACING.sm,
      maxWidth: '1200px',
      width: '90%',
      maxHeight: '90vh',
      overflowY: 'auto'
    },
    modalHeader: {
      ...MODALS.header,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    modalTitle: {
      ...MODALS.title,
      margin: 0
    },
    modalClose: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '24px',
      color: COLORS.secondary,
      cursor: 'pointer',
      padding: '0',
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalBody: {
      ...MODALS.body
    },
    modalFooter: {
      ...MODALS.footer
    },
    formGroup: {
      marginBottom: SPACING.xl
    },
    formLabel: {
      ...FORMS.label,
      display: 'block',
      marginBottom: SPACING.sm
    },
    formInput: {
      ...FORMS.input.base,
      width: '100%'
    },
    checkbox: {
      width: '16px',
      height: '16px',
      accentColor: COLORS.accent,
      cursor: 'pointer'
    },
    tabs: {
      display: 'flex',
      gap: SPACING.xs,
      marginBottom: SPACING.xl,
      borderBottom: `2px solid ${COLORS.border}`
    },
    tab: {
      padding: `${SPACING.md} ${SPACING.xl}`,
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: '2px solid transparent',
      marginBottom: '-2px',
      cursor: 'pointer',
      fontSize: TYPOGRAPHY.fontSize.sm,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: COLORS.secondary,
      transition: ANIMATIONS.transition.normal
    },
    activeTab: {
      color: COLORS.primary,
      borderBottomColor: COLORS.accent
    },
    summaryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: SPACING.lg,
      marginTop: SPACING.xl
    },
    summaryCard: {
      padding: SPACING.lg,
      backgroundColor: COLORS.lightBackground,
      borderRadius: SPACING.sm,
      border: `1px solid ${COLORS.border}`
    },
    summaryLabel: {
      ...TYPOGRAPHY.label,
      marginBottom: SPACING.xs,
      fontSize: '11px',
      textTransform: 'uppercase',
      color: COLORS.secondary
    },
    summaryValue: {
      fontSize: '24px',
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      color: COLORS.primary,
      marginBottom: SPACING.xs
    },
    summarySubtext: {
      fontSize: TYPOGRAPHY.fontSize.xs,
      color: COLORS.secondary
    },
    metricCard: {
      padding: SPACING.md,
      backgroundColor: COLORS.background,
      borderRadius: SPACING.sm,
      border: `1px solid ${COLORS.border}`,
      marginBottom: SPACING.md
    },
    metricLabel: {
      fontSize: '11px',
      color: COLORS.secondary,
      marginBottom: SPACING.xs,
      textTransform: 'uppercase'
    },
    metricValue: {
      fontSize: TYPOGRAPHY.fontSize.lg,
      fontWeight: TYPOGRAPHY.fontWeight.semibold
    }
  };

  // Calculate totals for class
  const totals = useMemo(() => {
    const avgCostPerServing = costAnalysis.reduce((sum, item) => sum + item.costPerServing, 0) / costAnalysis.length;
    const totalCostAllRecipes = costAnalysis.reduce((sum, item) => sum + item.totalCost, 0);
    const withinBudget = costAnalysis.filter(item => item.budgetStatus === 'within').length;
    const overBudget = costAnalysis.filter(item => item.budgetStatus === 'over').length;
    const costForClass = costAnalysis.reduce((sum, item) => sum + (item.costPerServing * classSize), 0);
    
    return {
      avgCostPerServing,
      totalCostAllRecipes,
      withinBudget,
      overBudget,
      totalItems: costAnalysis.length,
      costForClass
    };
  }, [costAnalysis, classSize]);

  // Filter and sort data
  const filteredAnalysis = useMemo(() => {
    let filtered = costAnalysis.filter(item => {
      const matchesSearch = item.recipeName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBudget = !budgetFilter || item.budgetStatus === budgetFilter;
      return matchesSearch && matchesBudget;
    });

    if (sortConfig.column && sortConfig.state !== 0) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.column];
        let bVal = b[sortConfig.column];
        
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }
        
        if (sortConfig.state === 1) {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }
    
    return filtered;
  }, [costAnalysis, searchTerm, budgetFilter, sortConfig]);

  // Handle sort
  const handleSort = (column) => {
    setSortConfig(prev => {
      if (prev.column === column) {
        const nextState = (prev.state + 1) % 3;
        return { column: column, state: nextState };
      } else {
        return { column: column, state: 1 };
      }
    });
  };

  // Get sort indicator
  const getSortIndicator = (column) => {
    if (sortConfig.column === column) {
      if (sortConfig.state === 1) return ' ∧';
      if (sortConfig.state === 2) return ' ∨';
    }
    return '';
  };

  // Handle select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(filteredAnalysis.map(i => i.id));
    } else {
      setSelectedItems([]);
    }
  };

  // Handle individual selection
  const handleSelectItem = (id) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Handle analyze
  const handleAnalyze = (id) => {
    const item = costAnalysis.find(i => i.id === id);
    if (item) {
      setEditingItem(item);
      setActiveTab('overview');
      setShowModal(true);
    }
    setShowActionMenu(null);
  };

  // Handle export
  const handleExport = () => {
    const dataToExport = selectedItems.length > 0 
      ? costAnalysis.filter(i => selectedItems.includes(i.id))
      : costAnalysis;
    
    const csv = [
      ['Recipe', 'Yield', 'Ingredient Cost', 'Cost/Serving', 'Cost/12 Students', 'Cost/24 Students', 'Budget Status', 'Prep Time', 'Bake Time'],
      ...dataToExport.map(i => [
        i.recipeName,
        `${i.yield} ${i.unit}`,
        i.ingredientCost,
        i.costPerServing,
        i.costFor12Students,
        i.costFor24Students,
        i.budgetStatus === 'within' ? 'Within Budget' : 'Over Budget',
        i.prepTime,
        i.bakeTime
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `instructional_cost_analysis_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Get budget status color
  const getBudgetStatusColor = (status) => {
    return status === 'within' ? COLORS.success : COLORS.error;
  };

  // Close menus on outside click
  const handleContainerClick = (e) => {
    if (!e.target.closest('.actions-menu')) {
      setShowActionMenu(null);
    }
  };

  return (
    <div style={localStyles.container} onClick={handleContainerClick}>
      {/* Header */}
      <div style={localStyles.header}>
        <h1 style={localStyles.h1}>Recipe Cost Analysis</h1>
        <p style={{ fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.secondary, marginTop: SPACING.sm }}>
          CUL 140 Week 3: Quick Breads - Shamrock Foods Pricing
        </p>
      </div>

      {/* Toolbar */}
      <div style={localStyles.toolbar}>
        <button 
          style={localStyles.btn}
          onClick={handleExport}
          onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.lightBackground}
          onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.background}
        >
          Export Cost Analysis
        </button>
        
        <div style={localStyles.toolbarRight}>
          <label style={{ fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.secondary, display: 'flex', alignItems: 'center', gap: SPACING.sm }}>
            Budget Threshold:
            <span style={{ fontWeight: TYPOGRAPHY.fontWeight.semibold, color: COLORS.primary }}>$</span>
            <input 
              type="number"
              min="0.50"
              max="5.00"
              step="0.25"
              value={budgetThreshold.toFixed(2)}
              onChange={(e) => setBudgetThreshold(parseFloat(e.target.value) || 1.50)}
              style={{ ...localStyles.formInput, width: '80px' }}
            />
            <span>per serving</span>
          </label>
          
          <label style={{ fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.secondary, display: 'flex', alignItems: 'center', gap: SPACING.sm }}>
            Class Size:
            <input 
              type="number"
              min="1"
              max="30"
              value={classSize}
              onChange={(e) => setClassSize(parseInt(e.target.value) || 12)}
              style={{ ...localStyles.formInput, width: '70px' }}
            />
            students
          </label>
          
          {selectedItems.length > 0 && (
            <button 
              style={localStyles.btn}
              onClick={() => setSelectedItems([])}
              onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.lightBackground}
              onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.background}
            >
              Clear ({selectedItems.length})
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div style={localStyles.filterBar}>
        <input 
          type="text"
          style={localStyles.searchInput}
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={(e) => e.target.style.borderColor = COLORS.accent}
          onBlur={(e) => e.target.style.borderColor = COLORS.border}
        />
        <select 
          style={localStyles.select}
          value={budgetFilter}
          onChange={(e) => setBudgetFilter(e.target.value)}
          onFocus={(e) => e.target.style.borderColor = COLORS.accent}
          onBlur={(e) => e.target.style.borderColor = COLORS.border}
        >
          <option value="">All Recipes</option>
          <option value="within">Within Budget</option>
          <option value="over">Over Budget</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={localStyles.table}>
          <thead style={localStyles.thead}>
            <tr>
              <th style={{ ...localStyles.th, ...localStyles.thNoSort, width: '40px' }}>
                <input 
                  type="checkbox"
                  style={localStyles.checkbox}
                  checked={selectedItems.length === filteredAnalysis.length && filteredAnalysis.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th style={localStyles.th} onClick={() => handleSort('recipeName')}>
                Recipe Name{getSortIndicator('recipeName')}
              </th>
              <th style={localStyles.thCentered} onClick={() => handleSort('yield')}>
                Yield{getSortIndicator('yield')}
              </th>
              <th style={localStyles.thCentered} onClick={() => handleSort('ingredientCost')}>
                Recipe Cost{getSortIndicator('ingredientCost')}
              </th>
              <th style={localStyles.thCentered} onClick={() => handleSort('costPerServing')}>
                Cost/Serving{getSortIndicator('costPerServing')}
              </th>
              <th style={localStyles.thCentered} onClick={() => handleSort('costFor12Students')}>
                Cost/{classSize} Students{getSortIndicator('costFor12Students')}
              </th>
              <th style={localStyles.thCentered}>
                Prep + Bake Time
              </th>
              <th style={{ ...localStyles.thCentered, ...localStyles.thNoSort }}>Budget Status</th>
              <th style={{ ...localStyles.thCentered, ...localStyles.thNoSort, width: '60px' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAnalysis.map(item => {
              const costForClass = (item.costPerServing * classSize).toFixed(2);
              const statusColor = getBudgetStatusColor(item.budgetStatus);
              
              return (
                <tr 
                  key={item.id} 
                  style={localStyles.tableRow}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.lightBackground}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={localStyles.td}>
                    <input 
                      type="checkbox"
                      style={localStyles.checkbox}
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                    />
                  </td>
                  <td style={localStyles.td}>
                    <span 
                      style={localStyles.recipeName}
                      onClick={() => handleAnalyze(item.id)}
                      onMouseEnter={(e) => e.target.style.textDecorationColor = COLORS.accent}
                      onMouseLeave={(e) => e.target.style.textDecorationColor = 'transparent'}
                    >
                      {item.recipeName}
                    </span>
                  </td>
                  <td style={localStyles.tdCentered}>
                    {item.yield} {item.unit}
                  </td>
                  <td style={localStyles.tdCentered}>
                    <span style={{ fontWeight: TYPOGRAPHY.fontWeight.semibold }}>
                      ${item.ingredientCost.toFixed(2)}
                    </span>
                  </td>
                  <td style={localStyles.tdCentered}>
                    <span style={{ fontWeight: TYPOGRAPHY.fontWeight.semibold, fontSize: TYPOGRAPHY.fontSize.md, color: statusColor }}>
                      ${item.costPerServing.toFixed(2)}
                    </span>
                  </td>
                  <td style={localStyles.tdCentered}>
                    <span style={{ fontWeight: TYPOGRAPHY.fontWeight.semibold }}>
                      ${costForClass}
                    </span>
                  </td>
                  <td style={localStyles.tdCentered}>
                    <div style={{ fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.secondary }}>
                      {item.prepTime} + {item.bakeTime}
                    </div>
                  </td>
                  <td style={localStyles.tdCentered}>
                    <span style={localStyles.status}>
                      <span style={{
                        ...localStyles.statusDot,
                        backgroundColor: statusColor
                      }}></span>
                      {item.budgetStatus === 'within' ? 'Within Budget' : 'Over Budget'}
                    </span>
                  </td>
                  <td style={{ ...localStyles.tdCentered, position: 'relative' }}>
                    <div style={localStyles.actionsMenu} className="actions-menu">
                      <button 
                        style={localStyles.actionsButton}
                        onClick={(e) => {
                          e.stopPropagation(); 
                          setShowActionMenu(showActionMenu === item.id ? null : item.id);
                        }}
                        onMouseEnter={(e) => e.target.style.color = COLORS.primary}
                        onMouseLeave={(e) => e.target.style.color = COLORS.secondary}
                      >
                        •••
                      </button>
                      {showActionMenu === item.id && (
                        <div style={localStyles.actionsDropdown} onClick={(e) => e.stopPropagation()}>
                          <button 
                            style={localStyles.actionItem}
                            onClick={() => handleAnalyze(item.id)}
                            onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.lightBackground}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          >
                            View Details
                          </button>
                          <button 
                            style={localStyles.actionItem}
                            onClick={() => {
                              setEditingItem(item);
                              setActiveTab('ingredients');
                              setShowModal(true);
                              setShowActionMenu(null);
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.lightBackground}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          >
                            View Ingredients
                          </button>
                          <button 
                            style={localStyles.actionItem}
                            onClick={() => {
                              setEditingItem(item);
                              setActiveTab('scaling');
                              setShowModal(true);
                              setShowActionMenu(null);
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.lightBackground}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          >
                            Scale for Class
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={localStyles.footer}>
        Showing {filteredAnalysis.length} of {costAnalysis.length} recipes • Costs based on Shamrock Foods pricing • For instructional use
      </div>

      {/* Modal - I'll continue this in the next part due to length... */}
      {showModal && editingItem && (
        <div style={localStyles.modal}>
          <div style={localStyles.modalContent}>
            <div style={localStyles.modalHeader}>
              <h2 style={localStyles.modalTitle}>
                {editingItem.recipeName} - Cost Details
              </h2>
              <button
                style={localStyles.modalClose}
                onClick={() => {
                  setShowModal(false);
                  setEditingItem(null);
                  setActiveTab('overview');
                }}
              >
                ×
              </button>
            </div>
            
            {/* Tabs */}
            <div style={localStyles.tabs}>
              <button
                style={{
                  ...localStyles.tab,
                  ...(activeTab === 'overview' ? localStyles.activeTab : {})
                }}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                style={{
                  ...localStyles.tab,
                  ...(activeTab === 'ingredients' ? localStyles.activeTab : {})
                }}
                onClick={() => setActiveTab('ingredients')}
              >
                Ingredients & Costs
              </button>
              <button
                style={{
                  ...localStyles.tab,
                  ...(activeTab === 'scaling' ? localStyles.activeTab : {})
                }}
                onClick={() => setActiveTab('scaling')}
              >
                Class Scaling
              </button>
            </div>
            
            <div style={localStyles.modalBody}>
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: SPACING.lg }}>
                  <div style={localStyles.metricCard}>
                    <div style={localStyles.metricLabel}>Recipe Cost (1 batch)</div>
                    <div style={localStyles.metricValue}>${editingItem.ingredientCost.toFixed(2)}</div>
                    <div style={{ fontSize: '11px', color: COLORS.secondary }}>
                      Yields {editingItem.yield} {editingItem.unit}
                    </div>
                  </div>
                  <div style={localStyles.metricCard}>
                    <div style={localStyles.metricLabel}>Cost Per Serving</div>
                    <div style={{...localStyles.metricValue, color: getBudgetStatusColor(editingItem.budgetStatus)}}>
                      ${editingItem.costPerServing.toFixed(2)}
                    </div>
                    <div style={{ fontSize: '11px', color: COLORS.secondary }}>
                      Per {editingItem.unit}
                    </div>
                  </div>
                  <div style={localStyles.metricCard}>
                    <div style={localStyles.metricLabel}>Budget Status</div>
                    <div style={{...localStyles.metricValue, color: getBudgetStatusColor(editingItem.budgetStatus)}}>
                      {editingItem.budgetStatus === 'within' ? 'Within' : 'Over'}
                    </div>
                    <div style={{ fontSize: '11px', color: COLORS.secondary }}>
                      Threshold: ${budgetThreshold.toFixed(2)}
                    </div>
                  </div>
                  <div style={localStyles.metricCard}>
                    <div style={localStyles.metricLabel}>Cost for 12 Students</div>
                    <div style={localStyles.metricValue}>${editingItem.costFor12Students.toFixed(2)}</div>
                  </div>
                  <div style={localStyles.metricCard}>
                    <div style={localStyles.metricLabel}>Cost for 24 Students</div>
                    <div style={localStyles.metricValue}>${editingItem.costFor24Students.toFixed(2)}</div>
                  </div>
                  <div style={localStyles.metricCard}>
                    <div style={localStyles.metricLabel}>Total Time</div>
                    <div style={localStyles.metricValue}>
                      {editingItem.prepTime} + {editingItem.bakeTime}
                    </div>
                  </div>
                </div>
              )}

              {/* Ingredients Tab */}
              {activeTab === 'ingredients' && (() => {
                const recipe = quickBreadsRecipes.find(r => r.id === editingItem.id);
                return recipe ? (
                  <div>
                    <h3 style={{ ...TYPOGRAPHY.h4, marginBottom: SPACING.lg }}>Shamrock Foods Ingredient Breakdown</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: `2px solid ${COLORS.border}` }}>
                          <th style={{ textAlign: 'left', padding: SPACING.md, fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.secondary, textTransform: 'uppercase' }}>
                            Ingredient
                          </th>
                          <th style={{ textAlign: 'right', padding: SPACING.md, fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.secondary, textTransform: 'uppercase' }}>
                            Quantity
                          </th>
                          <th style={{ textAlign: 'right', padding: SPACING.md, fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.secondary, textTransform: 'uppercase' }}>
                            Unit Price
                          </th>
                          <th style={{ textAlign: 'right', padding: SPACING.md, fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.secondary, textTransform: 'uppercase' }}>
                            Cost
                          </th>
                          <th style={{ textAlign: 'left', padding: SPACING.md, fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.secondary, textTransform: 'uppercase' }}>
                            Shamrock Item
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {recipe.ingredients.map((ing, idx) => {
                          const shamrockItem = shamrockMapping[ing.name];
                          const cost = shamrockItem ? (ing.quantity * shamrockItem.pricePerUnit) : 0;
                          return (
                            <tr key={idx} style={{ borderBottom: `1px solid ${COLORS.subtleBorder}` }}>
                              <td style={{ padding: SPACING.md }}>
                                <div style={{ fontWeight: TYPOGRAPHY.fontWeight.medium }}>{ing.name}</div>
                                {ing.notes && (
                                  <div style={{ fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.secondary, fontStyle: 'italic' }}>
                                    {ing.notes}
                                  </div>
                                )}
                              </td>
                              <td style={{ textAlign: 'right', padding: SPACING.md }}>
                                {ing.quantity} {ing.unit}
                              </td>
                              <td style={{ textAlign: 'right', padding: SPACING.md }}>
                                {shamrockItem ? `$${shamrockItem.pricePerUnit.toFixed(2)}/${ing.unit}` : 'N/A'}
                              </td>
                              <td style={{ textAlign: 'right', padding: SPACING.md, fontWeight: TYPOGRAPHY.fontWeight.semibold }}>
                                ${cost.toFixed(2)}
                              </td>
                              <td style={{ padding: SPACING.md, fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.secondary }}>
                                {shamrockItem ? (
                                  <div>
                                    <div>{shamrockItem.productName}</div>
                                    <div style={{ color: COLORS.muted }}>{shamrockItem.itemCode}</div>
                                  </div>
                                ) : (
                                  <span style={{ color: COLORS.warning }}>Not in inventory</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr style={{ borderTop: `2px solid ${COLORS.border}`, fontWeight: TYPOGRAPHY.fontWeight.bold }}>
                          <td style={{ padding: SPACING.md }} colSpan="3">
                            Total Ingredient Cost
                          </td>
                          <td style={{ textAlign: 'right', padding: SPACING.md }}>
                            ${editingItem.ingredientCost.toFixed(2)}
                          </td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                ) : null;
              })()}

              {/* Scaling Tab */}
              {activeTab === 'scaling' && (
                <div>
                  <h3 style={{ ...TYPOGRAPHY.h4, marginBottom: SPACING.lg }}>Class Size Cost Calculator</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: SPACING.lg, marginBottom: SPACING.xl }}>
                    {[8, 12, 16, 20, 24, 30].map(size => {
                      const cost = (editingItem.costPerServing * size).toFixed(2);
                      return (
                        <div key={size} style={localStyles.metricCard}>
                          <div style={localStyles.metricLabel}>{size} Students</div>
                          <div style={localStyles.metricValue}>${cost}</div>
                          <div style={{ fontSize: '11px', color: COLORS.secondary }}>
                            ${editingItem.costPerServing.toFixed(2)} per student
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div style={{ padding: SPACING.lg, backgroundColor: COLORS.lightBackground, borderRadius: SPACING.sm }}>
                    <h4 style={{ ...TYPOGRAPHY.h5, marginBottom: SPACING.md }}>Custom Class Size</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.md }}>
                      <input 
                        type="number"
                        min="1"
                        max="50"
                        defaultValue={classSize}
                        style={{ ...localStyles.formInput, width: '100px' }}
                        onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                        onBlur={(e) => e.target.style.borderColor = COLORS.border}
                        onChange={(e) => {
                          const size = parseInt(e.target.value) || classSize;
                          const cost = (editingItem.costPerServing * size).toFixed(2);
                          e.target.nextElementSibling.textContent = `= $${cost} total cost`;
                        }}
                      />
                      <span style={{ fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.secondary }}>
                        students = ${(editingItem.costPerServing * classSize).toFixed(2)} total cost
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div style={localStyles.modalFooter}>
              <button 
                style={localStyles.btn}
                onClick={() => {
                  setShowModal(false);
                  setEditingItem(null);
                  setActiveTab('overview');
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.lightBackground}
                onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.background}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCostAnalysisPage;
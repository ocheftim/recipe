// src/components/ingredients/IngredientTable.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Edit2, Trash2, ChevronUp, ChevronDown, Search, Filter } from 'lucide-react';

// Import globalStyles directly - make sure the path is correct
import STYLES from '../../styles/globalStyles';

// Destructure what we need
const { 
  COLORS = {}, 
  TYPOGRAPHY = {}, 
  SPACING = {}, 
  TABLES = {}, 
  BUTTONS = {}, 
  FORMS = {},
  FIELD_WIDTHS = {},
  combineStyles = (...styles) => Object.assign({}, ...styles)
} = STYLES || {};

// Component-specific styles using global style system
const styles = {
  container: {
    width: '100%'
  },
  controlsBar: {
    marginBottom: SPACING.lg,
    display: 'flex',
    flexWrap: 'wrap',
    gap: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  controlsGroup: {
    display: 'flex',
    gap: SPACING.md,
    flex: 1
  },
  searchContainer: {
    position: 'relative',
    flex: 1,
    maxWidth: FIELD_WIDTHS.xlarge || '400px'
  },
  searchIcon: {
    position: 'absolute',
    left: SPACING.md,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '16px',
    height: '16px',
    color: COLORS.secondary
  },
  searchInput: {
    ...FORMS.input,
    paddingLeft: '40px',
    paddingRight: SPACING.lg,
    width: '100%'
  },
  categorySelect: {
    ...FORMS.select,
    minWidth: FIELD_WIDTHS.medium || '200px'
  },
  bulkDeleteButton: {
    ...BUTTONS.danger,
    padding: `${SPACING.sm} ${SPACING.lg}`
  },
  resultsCount: {
    fontSize: TYPOGRAPHY.fontSize?.sm || '14px',
    color: COLORS.secondary
  },
  tableContainer: {
    backgroundColor: COLORS.background,
    borderRadius: SPACING.sm,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  table: {
    ...TABLES.table,
    width: '100%'
  },
  thead: {
    ...TABLES.headerRow,
    backgroundColor: COLORS.lightBackground
  },
  sortIcon: {
    width: '16px',
    height: '16px',
    display: 'inline',
    marginLeft: SPACING.xs,
    verticalAlign: 'middle'
  },
  checkbox: {
    cursor: 'pointer'
  },
  tableCell: {
    ...TABLES.cell
  },
  ingredientName: {
    fontSize: TYPOGRAPHY.fontSize?.base || '16px',
    fontWeight: 500,
    color: COLORS.primary
  },
  ingredientSku: {
    fontSize: TYPOGRAPHY.fontSize?.sm || '14px',
    color: COLORS.secondary,
    marginTop: SPACING.xs
  },
  costCell: {
    ...TABLES.cell,
    textAlign: 'right',
    fontWeight: 500
  },
  usageBadge: {
    display: 'inline-block',
    padding: `${SPACING.xs} ${SPACING.sm}`,
    borderRadius: SPACING.xs,
    fontSize: TYPOGRAPHY.fontSize?.xs || '12px',
    fontWeight: 500,
    backgroundColor: '#E0F2FE',
    color: '#0369A1'
  },
  notUsedText: {
    fontSize: TYPOGRAPHY.fontSize?.sm || '14px',
    color: COLORS.border
  },
  actionButton: {
    padding: SPACING.sm,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: SPACING.xs,
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  deleteButton: {
    padding: SPACING.sm,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: SPACING.xs,
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  actionsCell: {
    display: 'flex',
    justifyContent: 'center',
    gap: SPACING.sm
  },
  emptyState: {
    textAlign: 'center',
    padding: `${SPACING.xl} ${SPACING.lg}`,
    color: COLORS.secondary
  },
  summaryFooter: {
    marginTop: SPACING.lg,
    padding: SPACING.lg,
    backgroundColor: COLORS.lightBackground,
    borderRadius: SPACING.sm
  },
  summaryItem: {
    fontSize: TYPOGRAPHY.fontSize?.sm || '14px'
  },
  summaryLabel: {
    color: COLORS.secondary
  },
  summaryValue: {
    marginLeft: SPACING.sm,
    fontWeight: 500,
    color: COLORS.primary
  }
};

const IngredientTable = ({ 
  ingredients = [], 
  onEdit, 
  onDelete, 
  searchTerm = '', 
  onSearchChange,
  selectedCategory = 'all',
  onCategoryChange 
}) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedItems, setSelectedItems] = useState([]);

  // Get unique categories from ingredients
  const categories = ['all', ...new Set(ingredients.map(ing => ing.category).filter(Boolean))];

  // Filter ingredients
  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ingredient.supplier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ingredient.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ingredient.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort ingredients
  const sortedIngredients = [...filteredIngredients].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    // Handle numeric sorting for cost
    if (sortField === 'costPerUnit') {
      aValue = parseFloat(aValue) || 0;
      bValue = parseFloat(bValue) || 0;
    }

    // Handle string sorting
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue?.toLowerCase() || '';
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(sortedIngredients.map(ing => ing.id));
    } else {
      setSelectedItems([]);
    }
  };

  // Handle individual select
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedItems.length} ingredient(s)?`)) {
      selectedItems.forEach(id => onDelete(id));
      setSelectedItems([]);
    }
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp style={styles.sortIcon} /> : 
      <ChevronDown style={styles.sortIcon} />;
  };

  // Calculate usage in recipes
  const getUsageCount = (ingredientId) => {
    const recipes = JSON.parse(localStorage.getItem('toqueworks_recipes') || '[]');
    return recipes.filter(recipe => 
      recipe.ingredients?.some(ing => ing.ingredientId === ingredientId)
    ).length;
  };

  return (
    <div style={styles.container}>
      {/* Controls Bar */}
      <div style={styles.controlsBar}>
        <div style={styles.controlsGroup}>
          {/* Search */}
          <div style={styles.searchContainer}>
            <Search style={styles.searchIcon} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search ingredients..."
              style={styles.searchInput}
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            style={styles.categorySelect}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          {/* Bulk Actions */}
          {selectedItems.length > 0 && (
            <button
              onClick={handleBulkDelete}
              style={styles.bulkDeleteButton}
            >
              Delete Selected ({selectedItems.length})
            </button>
          )}
        </div>

        {/* Results Count */}
        <div style={styles.resultsCount}>
          {filteredIngredients.length} of {ingredients.length} ingredients
        </div>
      </div>

      {/* Table */}
      <div style={styles.tableContainer}>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={{ ...TABLES.headerCell, width: '40px' }}>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedItems.length === sortedIngredients.length && sortedIngredients.length > 0}
                    style={styles.checkbox}
                  />
                </th>
                <th 
                  style={TABLES.headerCell}
                  onClick={() => handleSort('name')}
                >
                  Name {getSortIcon('name')}
                </th>
                <th 
                  style={TABLES.headerCell}
                  onClick={() => handleSort('category')}
                >
                  Category {getSortIcon('category')}
                </th>
                <th 
                  style={{ ...TABLES.headerCell, textAlign: 'center' }}
                  onClick={() => handleSort('unit')}
                >
                  Unit {getSortIcon('unit')}
                </th>
                <th 
                  style={{ ...TABLES.headerCell, textAlign: 'right' }}
                  onClick={() => handleSort('costPerUnit')}
                >
                  Cost/Unit {getSortIcon('costPerUnit')}
                </th>
                <th 
                  style={TABLES.headerCell}
                  onClick={() => handleSort('supplier')}
                >
                  Supplier {getSortIcon('supplier')}
                </th>
                <th 
                  style={{ ...TABLES.headerCell, textAlign: 'center' }}
                >
                  Used In
                </th>
                <th 
                  style={{ ...TABLES.headerCell, textAlign: 'center' }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedIngredients.map((ingredient, index) => {
                const usageCount = getUsageCount(ingredient.id);
                const rowStyle = {
                  backgroundColor: index % 2 === 0 ? COLORS.background : COLORS.lightBackground
                };
                
                return (
                  <tr 
                    key={ingredient.id} 
                    style={rowStyle}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.hover || '#F9FAFB'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = rowStyle.backgroundColor}
                  >
                    <td style={styles.tableCell}>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(ingredient.id)}
                        onChange={() => handleSelectItem(ingredient.id)}
                        style={styles.checkbox}
                      />
                    </td>
                    <td style={styles.tableCell}>
                      <div>
                        <div style={styles.ingredientName}>
                          {ingredient.name}
                        </div>
                        {ingredient.sku && (
                          <div style={styles.ingredientSku}>
                            SKU: {ingredient.sku}
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={{ ...styles.tableCell, color: COLORS.secondary }}>
                      {ingredient.category || '-'}
                    </td>
                    <td style={{ ...styles.tableCell, textAlign: 'center' }}>
                      {ingredient.unit}
                    </td>
                    <td style={styles.costCell}>
                      ${ingredient.costPerUnit?.toFixed(2) || '0.00'}
                    </td>
                    <td style={{ ...styles.tableCell, color: COLORS.secondary }}>
                      {ingredient.supplier || '-'}
                    </td>
                    <td style={{ ...styles.tableCell, textAlign: 'center' }}>
                      {usageCount > 0 ? (
                        <span style={styles.usageBadge}>
                          {usageCount} recipe{usageCount !== 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span style={styles.notUsedText}>
                          Not used
                        </span>
                      )}
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.actionsCell}>
                        <button
                          onClick={() => onEdit(ingredient)}
                          style={styles.actionButton}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.hover || '#F9FAFB'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          title="Edit Ingredient"
                        >
                          <Edit2 style={{ width: '16px', height: '16px', color: COLORS.secondary }} />
                        </button>
                        <button
                          onClick={() => {
                            if (usageCount > 0) {
                              if (window.confirm(`This ingredient is used in ${usageCount} recipe(s). Are you sure you want to delete it?`)) {
                                onDelete(ingredient.id);
                              }
                            } else {
                              if (window.confirm('Are you sure you want to delete this ingredient?')) {
                                onDelete(ingredient.id);
                              }
                            }
                          }}
                          style={styles.deleteButton}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          title="Delete Ingredient"
                        >
                          <Trash2 style={{ width: '16px', height: '16px', color: COLORS.error }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {sortedIngredients.length === 0 && (
            <div style={styles.emptyState}>
              <p>
                {searchTerm || selectedCategory !== 'all' 
                  ? 'No ingredients found matching your filters' 
                  : 'No ingredients added yet'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Footer */}
      {sortedIngredients.length > 0 && (
        <div style={styles.summaryFooter}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: SPACING.lg 
          }}>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>Total Ingredients:</span>
              <span style={styles.summaryValue}>{sortedIngredients.length}</span>
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>Total Value:</span>
              <span style={styles.summaryValue}>
                ${sortedIngredients.reduce((sum, ing) => sum + (ing.costPerUnit || 0), 0).toFixed(2)}
              </span>
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>Categories:</span>
              <span style={styles.summaryValue}>{categories.length - 1}</span>
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>Suppliers:</span>
              <span style={styles.summaryValue}>
                {new Set(sortedIngredients.map(ing => ing.supplier).filter(Boolean)).size}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

IngredientTable.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    unit: PropTypes.string,
    costPerUnit: PropTypes.number,
    supplier: PropTypes.string,
    sku: PropTypes.string
  })),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
  onSearchChange: PropTypes.func,
  selectedCategory: PropTypes.string,
  onCategoryChange: PropTypes.func
};

export default IngredientTable;
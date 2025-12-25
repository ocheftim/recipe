// src/components/ingredients-page/IngredientsSubHeader.js
import React from 'react';

const IngredientsSubHeader = ({
  selectedCategory,
  setSelectedCategory,
  selectedSupplier,
  setSelectedSupplier,
  excludedAllergens,
  setExcludedAllergens,
  suppliers,
  categories,
  activeFilters,
  clearFilters,
  theme
}) => {
  const commonAllergens = [
    'Dairy', 'Eggs', 'Fish', 'Shellfish', 'Tree Nuts', 
    'Peanuts', 'Wheat', 'Soybeans', 'Sesame'
  ];

  const hasActiveFilters = selectedCategory || selectedSupplier || excludedAllergens.length > 0;

  return (
    <div style={{
      backgroundColor: theme.white,
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '16px',
      boxShadow: '0 1px 3px 0 rgba(31, 45, 56, 0.1)'
    }}>
      {/* Filter Controls */}
      <div style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
      }}>
        {/* Category Filter */}
        <div style={{ minWidth: '160px' }}>
          <label style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: '600',
            color: theme.charcoal,
            marginBottom: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 10px',
              border: `1px solid ${theme.silver}`,
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: theme.white,
              color: theme.gunmetal
            }}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Supplier Filter */}
        <div style={{ minWidth: '160px' }}>
          <label style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: '600',
            color: theme.charcoal,
            marginBottom: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Supplier
          </label>
          <select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 10px',
              border: `1px solid ${theme.silver}`,
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: theme.white,
              color: theme.gunmetal
            }}
          >
            <option value="">All Suppliers</option>
            {suppliers.map(supplier => (
              <option key={supplier} value={supplier}>{supplier}</option>
            ))}
          </select>
        </div>

        {/* Allergens (Exclude) Filter - Simple Dropdown */}
        <div style={{ minWidth: '160px' }}>
          <label style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: '600',
            color: theme.charcoal,
            marginBottom: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Allergens (Exclude)
          </label>
          <select
            value={excludedAllergens.length > 0 ? excludedAllergens[0] : ''}
            onChange={(e) => setExcludedAllergens(e.target.value ? [e.target.value] : [])}
            style={{
              width: '100%',
              padding: '6px 10px',
              border: `1px solid ${theme.silver}`,
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: theme.white,
              color: theme.gunmetal
            }}
          >
            <option value="">No Exclusions</option>
            {commonAllergens.map(allergen => (
              <option key={allergen} value={allergen}>{allergen}</option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div style={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
            <button
              onClick={clearFilters}
              style={{
                padding: '8px 12px',
                border: `1px solid ${theme.silver}`,
                borderRadius: '6px',
                background: theme.white,
                cursor: 'pointer',
                fontSize: '13px',
                color: theme.charcoal,
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = theme.seasalt;
                e.target.style.color = theme.gunmetal;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = theme.white;
                e.target.style.color = theme.charcoal;
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div style={{
          marginTop: '12px',
          fontSize: '12px',
          color: theme.charcoal,
          fontStyle: 'italic'
        }}>
          Active filters: {[
            selectedCategory && `Category: ${selectedCategory}`,
            selectedSupplier && `Supplier: ${selectedSupplier}`,
            excludedAllergens.length > 0 && `Excluding: ${excludedAllergens[0]}`
          ].filter(Boolean).join(', ')}
        </div>
      )}
    </div>
  );
};

export default IngredientsSubHeader;
// src/components/recipes/RecipeSubHeader.js
import React from 'react';

const RecipeSubHeader = ({
  categoryFilter,
  setCategoryFilter,
  cuisineFilter,
  setCuisineFilter,
  outletFilter,
  setOutletFilter,
  dietFilter,
  setDietFilter,
  filterOptions,
  clearFilters,
  theme
}) => {
  const hasActiveFilters = categoryFilter || cuisineFilter || outletFilter || dietFilter;

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
        alignItems: 'center',
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
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
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
            {filterOptions.categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Cuisine Filter */}
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
            Cuisine
          </label>
          <select
            value={cuisineFilter}
            onChange={(e) => setCuisineFilter(e.target.value)}
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
            <option value="">All Cuisines</option>
            {filterOptions.cuisines.map(cuisine => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </select>
        </div>

        {/* Outlet Filter */}
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
            Outlet
          </label>
          <select
            value={outletFilter}
            onChange={(e) => setOutletFilter(e.target.value)}
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
            <option value="">All Outlets</option>
            {filterOptions.outlets.map(outlet => (
              <option key={outlet} value={outlet}>{outlet}</option>
            ))}
          </select>
        </div>

        {/* Diet Filter */}
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
            Diet
          </label>
          <select
            value={dietFilter}
            onChange={(e) => setDietFilter(e.target.value)}
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
            <option value="">All Diets</option>
            {filterOptions.diets && filterOptions.diets.map(diet => (
              <option key={diet} value={diet}>{diet}</option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div style={{ marginLeft: 'auto' }}>
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
            categoryFilter && `Category: ${categoryFilter}`,
            cuisineFilter && `Cuisine: ${cuisineFilter}`,
            outletFilter && `Outlet: ${outletFilter}`,
            dietFilter && `Diet: ${dietFilter}`
          ].filter(Boolean).join(', ')}
        </div>
      )}
    </div>
  );
};

export default RecipeSubHeader;
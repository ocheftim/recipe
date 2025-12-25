// src/components/recipes/RecipeFilters.js

import React from 'react';
import PropTypes from 'prop-types';

const RecipeFilters = ({ 
  searchTerm, 
  onSearchChange, 
  categoryFilter, 
  onCategoryChange, 
  categories 
}) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        
        {/* Category Filter */}
        <select 
          value={categoryFilter || ''} 
          onChange={(e) => onCategoryChange(e.target.value || undefined)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

// PropTypes validation
RecipeFilters.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  categoryFilter: PropTypes.string,
  onCategoryChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired
};

// Default props for optional values
RecipeFilters.defaultProps = {
  categoryFilter: ''
};

export default RecipeFilters;
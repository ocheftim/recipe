// src/components/recipes/RecipesStats.js
import React from 'react';

const RecipesStats = ({ 
  recipesCount, 
  totalRecipesCount, 
  viewMode,
  stats 
}) => {
  return (
    <div className="mb-4 flex justify-between items-center">
      <p className="text-sm" style={{ color: '#2A3E51' }}>
        Showing {recipesCount} of {totalRecipesCount} recipes
        {viewMode === 'list' && ' • Virtual scrolling enabled'}
      </p>
      
      {/* Optional: Additional stats */}
      {stats && (
        <div className="flex gap-4 text-xs text-gray-500">
          <span>{stats.activeRecipes} Active</span>
          <span>{stats.draftRecipes} Draft</span>
          <span>{stats.archivedRecipes} Archived</span>
        </div>
      )}
    </div>
  );
};

export default RecipesStats;
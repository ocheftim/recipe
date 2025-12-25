// src/components/recipes/RecipeHeader.js

import React from 'react';
import PropTypes from 'prop-types';

const RecipeHeader = ({ 
  totalRecipes, 
  filteredRecipes, 
  selectedRecipes,
  onDeleteSelected,
  onShowIngredientUsage,
  onExportRecipes,
  onImportRecipes,
  onAddRecipe,
  onImportImage
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Title and Stats */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Recipe Management</h1>
          <p className="text-gray-600 mt-1">
            {totalRecipes} total recipes • {filteredRecipes} filtered
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Selected Items Actions */}
          {selectedRecipes.length > 0 && (
            <>
              <span className="text-sm text-gray-500">
                {selectedRecipes.length} selected
              </span>
              <button
                onClick={onDeleteSelected}
                className="inline-flex items-center px-3 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 bg-white hover:bg-red-50 transition-colors"
              >
                Delete Selected
              </button>
            </>
          )}
          
          {/* Ingredient Usage Button */}
          <button
            onClick={onShowIngredientUsage}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            title="Show which ingredients are used most frequently"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
              />
            </svg>
            Ingredient Usage
          </button>
          
          {/* Export Button */}
          <button
            onClick={onExportRecipes}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            title={selectedRecipes.length > 0 ? "Export selected recipes" : "Export all recipes"}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
              />
            </svg>
            Export
          </button>

          {/* Import Button */}
          <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" 
              />
            </svg>
            Import
            <input
              type="file"
              accept=".json,.csv"
              onChange={onImportRecipes}
              className="hidden"
            />
          </label>

          {/* Import from Image Button */}
          <button
            onClick={onImportImage}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
            Import from Image
          </button>

          {/* Add Recipe Button */}
          <button 
            onClick={onAddRecipe}
            data-action="add-recipe"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: '#8AC732' }}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
              />
            </svg>
            Add Recipe
          </button>
        </div>
      </div>
    </header>
  );
};

// PropTypes validation
RecipeHeader.propTypes = {
  totalRecipes: PropTypes.number.isRequired,
  filteredRecipes: PropTypes.number.isRequired,
  selectedRecipes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDeleteSelected: PropTypes.func.isRequired,
  onShowIngredientUsage: PropTypes.func.isRequired,
  onExportRecipes: PropTypes.func.isRequired,
  onImportRecipes: PropTypes.func.isRequired,
  onAddRecipe: PropTypes.func.isRequired,
  onImportImage: PropTypes.func.isRequired
};

export default RecipeHeader;
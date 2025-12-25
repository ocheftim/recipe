// src/components/recipes/RecipeTable.js

import React from 'react';
import PropTypes from 'prop-types';

const RecipeTable = ({ 
  filteredRecipes, 
  selectedRecipes, 
  sortConfig,
  onSort,
  onSelectAll,
  onSelectRecipe,
  onEdit,
  onCopy,
  onDelete,
  searchTerm,
  filters
}) => {
  
  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectAll(filteredRecipes.map(r => r.id));
    } else {
      onSelectAll([]);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {/* Checkbox Column */}
            <th className="px-3 py-3">
              <input
                type="checkbox"
                checked={filteredRecipes.length > 0 && selectedRecipes.length === filteredRecipes.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
            </th>
            
            {/* Recipe Name Column */}
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('name')}
            >
              Recipe Name
              {sortConfig.key === 'name' && (
                <span className="ml-1">
                  {sortConfig.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
            
            {/* Category Column */}
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('category')}
            >
              Category
              {sortConfig.key === 'category' && (
                <span className="ml-1">
                  {sortConfig.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
            
            {/* Servings Column */}
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('servings')}
            >
              Servings
              {sortConfig.key === 'servings' && (
                <span className="ml-1">
                  {sortConfig.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
            
            {/* Total Cost Column */}
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('totalCost')}
            >
              Total Cost
              {sortConfig.key === 'totalCost' && (
                <span className="ml-1">
                  {sortConfig.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
            
            {/* Cost Per Serving Column */}
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('costPerServing')}
            >
              Cost/Serving
              {sortConfig.key === 'costPerServing' && (
                <span className="ml-1">
                  {sortConfig.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
            
            {/* Source Column */}
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('importSource')}
            >
              Source
              {sortConfig.key === 'importSource' && (
                <span className="ml-1">
                  {sortConfig.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
            
            {/* Actions Column */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredRecipes.length === 0 ? (
            <tr>
              <td colSpan="8" className="px-6 py-12 text-center">
                <RecipeEmptyState 
                  searchTerm={searchTerm}
                  hasFilters={!!filters.category}
                />
              </td>
            </tr>
          ) : (
            filteredRecipes.map((recipe) => (
              <RecipeTableRow
                key={recipe.id}
                recipe={recipe}
                isSelected={selectedRecipes.includes(recipe.id)}
                onSelect={() => onSelectRecipe(recipe.id)}
                onEdit={() => onEdit(recipe)}
                onCopy={() => onCopy(recipe)}
                onDelete={() => onDelete(recipe.id)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// Recipe Table Row Component
const RecipeTableRow = ({ recipe, isSelected, onSelect, onEdit, onCopy, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50">
      {/* Checkbox Cell */}
      <td className="px-3 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
        />
      </td>
      
      {/* Recipe Name Cell */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{recipe.name}</div>
        {recipe.description && (
          <div className="text-xs text-gray-500 truncate max-w-xs">{recipe.description}</div>
        )}
        {recipe.importReport && recipe.importReport.newCreated > 0 && (
          <div className="text-xs text-orange-600 mt-1">
            ⚠ {recipe.importReport.newCreated} ingredients need validation
          </div>
        )}
      </td>
      
      {/* Category Cell */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {recipe.category || 'Uncategorized'}
      </td>
      
      {/* Servings Cell */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {recipe.servings || '-'}
      </td>
      
      {/* Total Cost Cell */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        ${(recipe.totalCost || 0).toFixed(2)}
      </td>
      
      {/* Cost Per Serving Cell */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        ${(recipe.costPerServing || 0).toFixed(2)}
      </td>
      
      {/* Source Cell */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <RecipeSourceBadge source={recipe.importSource} />
      </td>
      
      {/* Actions Cell */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button 
          onClick={onEdit}
          className="text-indigo-600 hover:text-indigo-900 mr-3"
          title="Edit Recipe"
        >
          Edit
        </button>
        <button 
          onClick={onCopy}
          className="text-green-600 hover:text-green-900 mr-3"
          title="Copy Recipe"
        >
          Copy
        </button>
        <button 
          onClick={onDelete}
          className="text-red-600 hover:text-red-900"
          title="Delete Recipe"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

// Recipe Source Badge Component
const RecipeSourceBadge = ({ source }) => {
  if (source === 'image_ocr') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
        OCR Import
      </span>
    );
  }
  if (source === 'image_basic') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
        Image
      </span>
    );
  }
  if (source === 'manual') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
        Manual
      </span>
    );
  }
  return <span className="text-gray-400">-</span>;
};

// Empty State Component
const RecipeEmptyState = ({ searchTerm, hasFilters }) => {
  return (
    <div className="text-gray-500">
      <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p className="text-lg font-medium text-gray-900 mb-2">
        {searchTerm || hasFilters ? 'No recipes match your search' : 'No recipes found'}
      </p>
      <p className="text-gray-500 mb-4">
        {searchTerm || hasFilters ? 
          'Try adjusting your search or filters' : 
          'Get started by adding your first recipe or importing from an image'}
      </p>
      {!searchTerm && !hasFilters && (
        <div className="flex justify-center gap-3">
          <button 
            onClick={() => {
              document.querySelector('[data-action="add-recipe"]')?.click();
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: '#8AC732' }}
          >
            Add Recipe
          </button>
          <button
            onClick={() => {
              document.querySelector('[data-action="import-image"]')?.click();
            }}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Import from Image
          </button>
        </div>
      )}
    </div>
  );
};

// ======================
// PropTypes Definitions
// ======================

// PropTypes for main RecipeTable
RecipeTable.propTypes = {
  filteredRecipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string,
      servings: PropTypes.number,
      totalCost: PropTypes.number,
      costPerServing: PropTypes.number,
      importSource: PropTypes.string,
      description: PropTypes.string,
      importReport: PropTypes.shape({
        newCreated: PropTypes.number
      })
    })
  ).isRequired,
  selectedRecipes: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortConfig: PropTypes.shape({
    key: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(['asc', 'desc']).isRequired
  }).isRequired,
  onSort: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onSelectRecipe: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
  filters: PropTypes.shape({
    category: PropTypes.string
  })
};

RecipeTable.defaultProps = {
  searchTerm: '',
  filters: {}
};

// PropTypes for RecipeTableRow
RecipeTableRow.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    servings: PropTypes.number,
    totalCost: PropTypes.number,
    costPerServing: PropTypes.number,
    importSource: PropTypes.string,
    description: PropTypes.string,
    importReport: PropTypes.shape({
      newCreated: PropTypes.number
    })
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

// PropTypes for RecipeSourceBadge
RecipeSourceBadge.propTypes = {
  source: PropTypes.string
};

// PropTypes for RecipeEmptyState
RecipeEmptyState.propTypes = {
  searchTerm: PropTypes.string,
  hasFilters: PropTypes.bool
};

RecipeEmptyState.defaultProps = {
  searchTerm: '',
  hasFilters: false
};

export default RecipeTable;
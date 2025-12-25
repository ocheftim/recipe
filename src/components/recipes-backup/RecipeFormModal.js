// src/components/recipes/RecipeFormModal.js

import React from 'react';
import PropTypes from 'prop-types';

const RecipeFormModal = ({ recipe, onSave, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const recipeData = {
      ...recipe,
      name: formData.get('name'),
      category: formData.get('category'),
      servings: parseInt(formData.get('servings')),
      prepTime: parseInt(formData.get('prepTime')),
      cookTime: parseInt(formData.get('cookTime')),
      description: formData.get('description'),
      importSource: 'manual'
    };
    onSave(recipeData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>
        
        {/* Modal Content */}
        <div className="relative inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              {recipe ? 'Edit Recipe' : 'Add New Recipe'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Recipe Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Recipe Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipe Name*
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={recipe?.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  defaultValue={recipe?.description}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              {/* Category and Servings Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={recipe?.category || 'Main Dish'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option>Appetizers</option>
                    <option>Soups</option>
                    <option>Salads</option>
                    <option>Main Dish</option>
                    <option>Side Dishes</option>
                    <option>Desserts</option>
                    <option>Breakfast</option>
                    <option>Beverages</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Servings
                  </label>
                  <input
                    name="servings"
                    type="number"
                    min="1"
                    defaultValue={recipe?.servings || 4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              {/* Prep Time and Cook Time Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prep Time (minutes)
                  </label>
                  <input
                    name="prepTime"
                    type="number"
                    min="0"
                    defaultValue={recipe?.prepTime || 30}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cook Time (minutes)
                  </label>
                  <input
                    name="cookTime"
                    type="number"
                    min="0"
                    defaultValue={recipe?.cookTime || 30}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white"
                style={{ backgroundColor: '#8AC732' }}
              >
                {recipe ? 'Save Changes' : 'Create Recipe'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
RecipeFormModal.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    servings: PropTypes.number,
    prepTime: PropTypes.number,
    cookTime: PropTypes.number
  }),
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

// Default props for optional values
RecipeFormModal.defaultProps = {
  recipe: null
};

export default RecipeFormModal;
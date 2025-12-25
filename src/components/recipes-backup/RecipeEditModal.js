// src/components/recipes/RecipeEditModal.js
import React from 'react';

const RecipeEditModal = ({ 
  isOpen, 
  onClose, 
  recipe, 
  onSave,
  categories = ['Main Dish', 'Side Dish', 'Dessert', 'Appetizer', 'Soup', 'Salad', 'Breakfast', 'Beverage']
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedRecipe = {
      ...recipe,
      name: formData.get('name'),
      category: formData.get('category'),
      servings: parseInt(formData.get('servings')),
      prepTime: parseInt(formData.get('prepTime')),
      cookTime: parseInt(formData.get('cookTime')),
      description: formData.get('description'),
      importSource: recipe?.importSource || 'manual'
    };
    onSave(updatedRecipe);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />
        <div className="relative inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
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
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Name*</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={recipe?.name || ''}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    defaultValue={recipe?.category || 'Main Dish'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
                  <input
                    name="servings"
                    type="number"
                    defaultValue={recipe?.servings || 4}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time (min)</label>
                  <input
                    name="prepTime"
                    type="number"
                    defaultValue={recipe?.prepTime || 15}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cook Time (min)</label>
                  <input
                    name="cookTime"
                    type="number"
                    defaultValue={recipe?.cookTime || 30}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={recipe?.description || ''}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {recipe ? 'Update' : 'Create'} Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecipeEditModal;

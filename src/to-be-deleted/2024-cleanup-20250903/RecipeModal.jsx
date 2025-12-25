// src/components/recipes/RecipeModal.js
// COMPLETE FILE - CREATE THIS IF IT DOESN'T EXIST

import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const RecipeModal = ({ recipe, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Main',
    cuisine: '',
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    ingredients: [],
    method: [],
    notes: '',
    menuPrice: 0,
    targetFoodCost: 28,
    status: 'draft'
  });

  const [newIngredient, setNewIngredient] = useState('');
  const [newMethodStep, setNewMethodStep] = useState('');

  useEffect(() => {
    if (recipe) {
      setFormData({
        ...recipe,
        ingredients: recipe.ingredients || [],
        method: recipe.method || []
      });
    }
  }, [recipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, newIngredient.trim()]
      });
      setNewIngredient('');
    }
  };

  const removeIngredient = (index) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index)
    });
  };

  const addMethodStep = () => {
    if (newMethodStep.trim()) {
      setFormData({
        ...formData,
        method: [...formData.method, newMethodStep.trim()]
      });
      setNewMethodStep('');
    }
  };

  const removeMethodStep = (index) => {
    setFormData({
      ...formData,
      method: formData.method.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {recipe ? 'Edit Recipe' : 'Add New Recipe'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipe Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Main">Main</option>
                <option value="Side">Side</option>
                <option value="App">Appetizer</option>
                <option value="Dessert">Dessert</option>
                <option value="Salad">Salad</option>
                <option value="Soup">Soup</option>
                <option value="Sauce">Sauce</option>
                <option value="Base">Base</option>
                <option value="Beverage">Beverage</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cuisine
              </label>
              <input
                type="text"
                value={formData.cuisine}
                onChange={(e) => setFormData({...formData, cuisine: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Italian, Mexican, Asian"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prep Time (min)
              </label>
              <input
                type="number"
                value={formData.prepTime}
                onChange={(e) => setFormData({...formData, prepTime: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cook Time (min)
              </label>
              <input
                type="number"
                value={formData.cookTime}
                onChange={(e) => setFormData({...formData, cookTime: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Servings
              </label>
              <input
                type="number"
                value={formData.servings}
                onChange={(e) => setFormData({...formData, servings: parseInt(e.target.value) || 1})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="seasonal">Seasonal</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingredients
            </label>
            <div className="space-y-2 mb-2">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm">
                    {ingredient}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addIngredient();
                  }
                }}
                placeholder="Add ingredient (e.g., 2 cups flour)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addIngredient}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Method */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Method
            </label>
            <div className="space-y-2 mb-2">
              {formData.method.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm">
                    {step}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeMethodStep(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMethodStep}
                onChange={(e) => setNewMethodStep(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addMethodStep();
                  }
                }}
                placeholder="Add method step"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addMethodStep}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Menu Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.menuPrice}
                onChange={(e) => setFormData({...formData, menuPrice: parseFloat(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Food Cost (%)
              </label>
              <input
                type="number"
                value={formData.targetFoodCost}
                onChange={(e) => setFormData({...formData, targetFoodCost: parseInt(e.target.value) || 28})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0"
                max="100"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Any special notes or instructions..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {recipe ? 'Update Recipe' : 'Add Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeModal;
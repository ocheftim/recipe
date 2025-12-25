// src/components/recipes/RecipeBasicInfoTab.js - REFACTORED
import React from 'react';
import { Edit3, Eye, EyeOff } from 'lucide-react';
import { DIETARY_OPTIONS } from '../../constants/recipeConstants';
import { useRecipeBasicForm } from '../../hooks/recipes/useRecipeBasicForm';
import { useCustomizeModal } from '../../hooks/recipes/useCustomizeModal';
import CustomizeModal from './basicInfo/CustomizeModal';

const RecipeBasicInfoTab = ({ recipeForm, onRecipeFormChange, onSetIsDirty }) => {
  // Use extracted hooks
  const {
    customOptions,
    handleFieldChange,
    handleDietaryChange,
    handleCheckboxChange,
    updateCustomOptions,
  } = useRecipeBasicForm(recipeForm, onRecipeFormChange, onSetIsDirty);

  const {
    customizeModal,
    handleCustomize,
    handleCustomizeSave,
    handleCustomizeCancel,
  } = useCustomizeModal(customOptions, updateCustomOptions);

  return (
    <div className="space-y-6">
      {/* Basic Information Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recipe Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipe Name *
            </label>
            <input
              type="text"
              value={recipeForm.name || ''}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter recipe name"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <div className="flex space-x-2">
              <select
                value={recipeForm.category || ''}
                onChange={(e) => handleFieldChange('category', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select category</option>
                {customOptions.category.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button
                onClick={() => handleCustomize('category')}
                className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
                title="Customize Categories"
              >
                <Edit3 size={16} />
              </button>
            </div>
          </div>

          {/* Cuisine */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cuisine
            </label>
            <div className="flex space-x-2">
              <select
                value={recipeForm.cuisine || ''}
                onChange={(e) => handleFieldChange('cuisine', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select cuisine</option>
                {customOptions.cuisine.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
              <button
                onClick={() => handleCustomize('cuisine')}
                className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
                title="Customize Cuisines"
              >
                <Edit3 size={16} />
              </button>
            </div>
          </div>

          {/* Yield */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Yield *
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={recipeForm.yield || ''}
                onChange={(e) => handleFieldChange('yield', parseInt(e.target.value) || '')}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="1"
                required
              />
              <select
                value={recipeForm.yieldUnit || ''}
                onChange={(e) => handleFieldChange('yieldUnit', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Unit</option>
                {customOptions.yieldUnit.map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
              <button
                onClick={() => handleCustomize('yieldUnit')}
                className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
                title="Customize Units"
              >
                <Edit3 size={16} />
              </button>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <div className="flex space-x-2">
              <select
                value={recipeForm.status || ''}
                onChange={(e) => handleFieldChange('status', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select status</option>
                {customOptions.status.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <button
                onClick={() => handleCustomize('status')}
                className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
                title="Customize Statuses"
              >
                <Edit3 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={recipeForm.description || ''}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter recipe description"
          />
        </div>
      </div>

      {/* Dietary Options */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Dietary Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {DIETARY_OPTIONS.map((option) => (
            <label key={option} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={(recipeForm.dietary || []).includes(option)}
                onChange={() => handleDietaryChange(option)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Customize Modal */}
      <CustomizeModal
        isOpen={customizeModal.isOpen}
        title={customizeModal.title}
        items={customizeModal.items}
        originalItems={customizeModal.originalItems}
        onSave={handleCustomizeSave}
        onCancel={handleCustomizeCancel}
      />
    </div>
  );
};

export default RecipeBasicInfoTab;

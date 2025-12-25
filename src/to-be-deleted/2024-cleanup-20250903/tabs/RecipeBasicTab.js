// src/components/recipes/tabs/RecipeBasicTab.js
import React from 'react';

// Import these from a shared constants file or pass as props
const CATEGORY_OPTIONS = ['Main', 'Side', 'App', 'Dessert', 'Salad', 'Soup', 'Sauce', 'Base', 'Beverage'];
const CUISINE_OPTIONS = ['American', 'Italian', 'Mexican', 'Asian', 'French', 'Mediterranean', 'Indian', 'Other'];
const OUTLET_OPTIONS = ['Main Kitchen', 'Grill Station', 'Cold Station', 'Pastry Station', 'Prep Kitchen', 'Banquet Kitchen'];
const STATUS_OPTIONS = ['Draft', 'Active', 'Seasonal', 'Archived'];
const DIETARY_OPTIONS = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Keto', 'Low-Carb'];
const YIELD_UNITS = ['servings', 'portions', 'pieces', 'cups', 'quarts', 'gallons', 'lbs'];
const SOURCE_OPTIONS = ['House Recipe', 'Chef Special', 'Family Recipe', 'Cookbook', 'Online', 'Customer Request'];

const RecipeBasicTab = ({ 
  formData, 
  onChange, 
  onCheckboxChange,
  onSourceChange,
  customSource,
  onCustomSourceSave,
  setCustomSource,
  errors, 
  theme 
}) => {
  return (
    <div className="space-y-6">
      {/* Recipe Name and Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: theme.charcoal }}>
            Recipe Name <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ 
              borderColor: errors.name ? 'red' : theme.silver,
              backgroundColor: theme.white,
              color: theme.gunmetal
            }}
            placeholder="Enter recipe name"
          />
          {errors.name && (
            <p className="mt-1 text-sm" style={{ color: 'red' }}>{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: theme.charcoal }}>
            Recipe Code
          </label>
          <input
            type="text"
            value={formData.code || ''}
            onChange={(e) => onChange('code', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ 
              borderColor: theme.silver,
              backgroundColor: theme.white,
              color: theme.gunmetal
            }}
            placeholder="Auto-generated or enter custom"
          />
        </div>
      </div>

      {/* Category and Cuisine Checkboxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: theme.charcoal }}>
            Categories
          </label>
          <div className="space-y-2 max-h-40 overflow-y-auto p-2 border rounded-lg" 
               style={{ borderColor: theme.silver, backgroundColor: theme.seasalt }}>
            {CATEGORY_OPTIONS.map(option => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.categories?.includes(option) || false}
                  onChange={(e) => onCheckboxChange('categories', option)}
                  className="rounded"
                  style={{ accentColor: theme.yellowGreen }}
                />
                <span className="text-sm" style={{ color: theme.gunmetal }}>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: theme.charcoal }}>
            Cuisines
          </label>
          <div className="space-y-2 max-h-40 overflow-y-auto p-2 border rounded-lg" 
               style={{ borderColor: theme.silver, backgroundColor: theme.seasalt }}>
            {CUISINE_OPTIONS.map(option => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.cuisines?.includes(option) || false}
                  onChange={(e) => onCheckboxChange('cuisines', option)}
                  className="rounded"
                  style={{ accentColor: theme.yellowGreen }}
                />
                <span className="text-sm" style={{ color: theme.gunmetal }}>{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Outlet Options and Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: theme.charcoal }}>
            Outlet Options
          </label>
          <div className="space-y-2 max-h-40 overflow-y-auto p-2 border rounded-lg" 
               style={{ borderColor: theme.silver, backgroundColor: theme.seasalt }}>
            {OUTLET_OPTIONS.map(option => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.outlets?.includes(option) || false}
                  onChange={(e) => onCheckboxChange('outlets', option)}
                  className="rounded"
                  style={{ accentColor: theme.yellowGreen }}
                />
                <span className="text-sm" style={{ color: theme.gunmetal }}>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: theme.charcoal }}>
            Status
          </label>
          <select
            value={formData.status || 'Draft'}
            onChange={(e) => onChange('status', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ 
              borderColor: theme.silver,
              backgroundColor: theme.white,
              color: theme.gunmetal
            }}
          >
            {STATUS_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Dietary Options */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: theme.charcoal }}>
          Dietary Options
        </label>
        <div className="flex flex-wrap gap-2">
          {DIETARY_OPTIONS.map(option => (
            <label key={option} className="flex items-center space-x-2 px-3 py-1 border rounded-full cursor-pointer hover:bg-gray-50"
                   style={{ borderColor: theme.silver }}>
              <input
                type="checkbox"
                checked={formData.dietary?.includes(option) || false}
                onChange={(e) => onCheckboxChange('dietary', option)}
                className="rounded"
                style={{ accentColor: theme.yellowGreen }}
              />
              <span className="text-sm" style={{ color: theme.gunmetal }}>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Yield Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: theme.charcoal }}>
            Yield Size <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="number"
            value={formData.yieldSize || ''}
            onChange={(e) => onChange('yieldSize', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ 
              borderColor: errors.yieldSize ? 'red' : theme.silver,
              backgroundColor: theme.white,
              color: theme.gunmetal
            }}
            placeholder="e.g., 4"
            min="0.1"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: theme.charcoal }}>
            Yield Unit
          </label>
          <select
            value={formData.yieldUnit || 'servings'}
            onChange={(e) => onChange('yieldUnit', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ 
              borderColor: theme.silver,
              backgroundColor: theme.white,
              color: theme.gunmetal
            }}
          >
            {YIELD_UNITS.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: theme.charcoal }}>
            Batch Size
          </label>
          <input
            type="number"
            value={formData.batchSize || ''}
            onChange={(e) => onChange('batchSize', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ 
              borderColor: theme.silver,
              backgroundColor: theme.white,
              color: theme.gunmetal
            }}
            placeholder="Optional"
            min="1"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: theme.charcoal }}>
          Description
        </label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style={{ 
            borderColor: theme.silver,
            backgroundColor: theme.white,
            color: theme.gunmetal
          }}
          rows="3"
          placeholder="Brief description of the recipe..."
        />
      </div>

      {/* Source */}
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: theme.charcoal }}>
          Recipe Source
        </label>
        <div className="flex gap-2">
          <select
            value={formData.source || ''}
            onChange={(e) => onSourceChange(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ 
              borderColor: theme.silver,
              backgroundColor: theme.white,
              color: theme.gunmetal
            }}
          >
            <option value="">Select source...</option>
            {SOURCE_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
            {formData.source === 'Custom' && (
              <option value="Custom">Custom</option>
            )}
          </select>
          
          {formData.source === 'Custom' && (
            <>
              <input
                type="text"
                value={customSource}
                onChange={(e) => setCustomSource(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: theme.silver,
                  backgroundColor: theme.white,
                  color: theme.gunmetal
                }}
                placeholder="Enter custom source"
              />
              <button
                type="button"
                onClick={onCustomSourceSave}
                className="px-4 py-2 rounded-lg text-white font-medium hover:opacity-90"
                style={{ backgroundColor: theme.yellowGreen }}
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: theme.charcoal }}>
          Tags
        </label>
        <input
          type="text"
          value={formData.tags?.join(', ') || ''}
          onChange={(e) => onChange('tags', e.target.value.split(',').map(t => t.trim()).filter(t => t))}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style={{ 
            borderColor: theme.silver,
            backgroundColor: theme.white,
            color: theme.gunmetal
          }}
          placeholder="Enter tags separated by commas"
        />
        <p className="mt-1 text-xs" style={{ color: theme.silver }}>
          Separate tags with commas (e.g., seasonal, signature, gluten-free)
        </p>
      </div>
    </div>
  );
};

export default RecipeBasicTab;
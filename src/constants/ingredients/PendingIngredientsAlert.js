// src/components/ingredients/PendingIngredientsAlert.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AlertCircle, Plus, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { THEME } from '../../constants/theme';

const PendingIngredientsAlert = ({ onAddIngredients, onDismiss }) => {
  const [pendingIngredients, setPendingIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState(null);

  // Load pending ingredients on mount
  useEffect(() => {
    checkForPendingIngredients();
  }, []);

  const checkForPendingIngredients = () => {
    const recipes = JSON.parse(localStorage.getItem('toqueworks_recipes') || '[]');
    const masterIngredients = JSON.parse(localStorage.getItem('toqueworks_ingredients') || '[]');
    
    const pending = new Map();
    
    recipes.forEach(recipe => {
      recipe.ingredients?.forEach(ing => {
        // Check if this is a custom ingredient or not in master list
        if (ing.isCustom || !masterIngredients.find(m => m.id === ing.ingredientId)) {
          const key = ing.name.toLowerCase();
          if (!pending.has(key)) {
            pending.set(key, {
              name: ing.name,
              unit: ing.unit || 'each',
              category: 'Uncategorized',
              costPerUnit: ing.cost || 0,
              usedInRecipes: []
            });
          }
          const item = pending.get(key);
          if (!item.usedInRecipes.includes(recipe.name)) {
            item.usedInRecipes.push(recipe.name);
          }
          // Update cost if higher
          if (ing.cost > item.costPerUnit) {
            item.costPerUnit = ing.cost;
          }
        }
      });
    });

    const pendingList = Array.from(pending.values());
    setPendingIngredients(pendingList);
    
    // Auto-select all by default
    if (pendingList.length > 0) {
      setSelectedIngredients(pendingList.map((_, index) => index));
      setIsExpanded(true);
    }
  };

  const handleAddSelected = () => {
    const toAdd = selectedIngredients.map(index => {
      const ing = pendingIngredients[index];
      return {
        id: Date.now() + Math.random(), // Generate unique ID
        name: ing.name,
        category: ing.category,
        unit: ing.unit,
        costPerUnit: ing.costPerUnit,
        supplier: '',
        minStock: 0,
        maxStock: null,
        notes: `Used in: ${ing.usedInRecipes.join(', ')}`
      };
    });

    if (onAddIngredients) {
      onAddIngredients(toAdd);
    }

    // Remove added ingredients from pending
    const remaining = pendingIngredients.filter((_, index) => !selectedIngredients.includes(index));
    setPendingIngredients(remaining);
    setSelectedIngredients([]);
    
    if (remaining.length === 0 && onDismiss) {
      onDismiss();
    }
  };

  const toggleIngredient = (index) => {
    if (selectedIngredients.includes(index)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== index));
    } else {
      setSelectedIngredients([...selectedIngredients, index]);
    }
  };

  const toggleAll = () => {
    if (selectedIngredients.length === pendingIngredients.length) {
      setSelectedIngredients([]);
    } else {
      setSelectedIngredients(pendingIngredients.map((_, index) => index));
    }
  };

  const updateIngredient = (index, field, value) => {
    const updated = [...pendingIngredients];
    updated[index] = {
      ...updated[index],
      [field]: field === 'costPerUnit' ? parseFloat(value) || 0 : value
    };
    setPendingIngredients(updated);
  };

  if (pendingIngredients.length === 0) return null;

  return (
    <div className="mb-6 bg-white rounded-lg shadow-sm border" style={{ borderColor: '#FCD34D' }}>
      {/* Header */}
      <div 
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ backgroundColor: '#FEF3C7' }}
      >
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5" style={{ color: '#D97706' }} />
          <div>
            <h3 className="font-medium" style={{ color: THEME.gunmetal }}>
              {pendingIngredients.length} Custom Ingredient{pendingIngredients.length !== 1 ? 's' : ''} Found
            </h3>
            <p className="text-sm" style={{ color: THEME.gray }}>
              These ingredients are used in recipes but not in your master list
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedIngredients.length > 0 && (
            <span className="text-sm px-2 py-1 bg-white rounded" style={{ color: THEME.gray }}>
              {selectedIngredients.length} selected
            </span>
          )}
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 border-t" style={{ borderColor: '#FDE68A' }}>
          {/* Select All / Actions */}
          <div className="mb-3 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedIngredients.length === pendingIngredients.length}
                onChange={toggleAll}
                className="rounded"
              />
              <span className="text-sm font-medium">Select All</span>
            </label>
            
            <div className="flex gap-2">
              {selectedIngredients.length > 0 && (
                <button
                  onClick={handleAddSelected}
                  className="px-3 py-1 text-sm text-white rounded flex items-center gap-1"
                  style={{ backgroundColor: THEME.primary }}
                >
                  <Plus className="w-4 h-4" />
                  Add {selectedIngredients.length} to Master List
                </button>
              )}
              <button
                onClick={onDismiss}
                className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
                style={{ borderColor: THEME.silver }}
              >
                Dismiss
              </button>
            </div>
          </div>

          {/* Ingredients List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {pendingIngredients.map((ingredient, index) => (
              <div 
                key={index}
                className="p-3 border rounded-lg flex items-start gap-3"
                style={{ 
                  borderColor: selectedIngredients.includes(index) ? THEME.primary : THEME.silver,
                  backgroundColor: selectedIngredients.includes(index) ? '#F0FDF4' : 'white'
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedIngredients.includes(index)}
                  onChange={() => toggleIngredient(index)}
                  className="mt-1"
                />
                
                {editingIngredient === index ? (
                  <div className="flex-1 grid grid-cols-4 gap-2">
                    <input
                      type="text"
                      value={ingredient.name}
                      onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                      className="px-2 py-1 border rounded text-sm"
                      style={{ borderColor: THEME.silver }}
                      placeholder="Name"
                    />
                    <select
                      value={ingredient.category}
                      onChange={(e) => updateIngredient(index, 'category', e.target.value)}
                      className="px-2 py-1 border rounded text-sm"
                      style={{ borderColor: THEME.silver }}
                    >
                      <option value="Uncategorized">Uncategorized</option>
                      <option value="Produce">Produce</option>
                      <option value="Meat">Meat</option>
                      <option value="Seafood">Seafood</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Dry Goods">Dry Goods</option>
                      <option value="Spices">Spices</option>
                    </select>
                    <select
                      value={ingredient.unit}
                      onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                      className="px-2 py-1 border rounded text-sm"
                      style={{ borderColor: THEME.silver }}
                    >
                      <option value="each">each</option>
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="lb">lb</option>
                      <option value="oz">oz</option>
                      <option value="L">L</option>
                      <option value="ml">ml</option>
                    </select>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">$</span>
                      <input
                        type="number"
                        value={ingredient.costPerUnit}
                        onChange={(e) => updateIngredient(index, 'costPerUnit', e.target.value)}
                        className="w-full pl-6 pr-2 py-1 border rounded text-sm"
                        style={{ borderColor: THEME.silver }}
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{ingredient.name}</span>
                      <span className="text-sm px-2 py-0.5 bg-gray-100 rounded">
                        {ingredient.category}
                      </span>
                      <span className="text-sm" style={{ color: THEME.gray }}>
                        {ingredient.unit}
                      </span>
                      <span className="text-sm font-medium">
                        ${ingredient.costPerUnit.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm mt-1" style={{ color: THEME.gray }}>
                      Used in: {ingredient.usedInRecipes.join(', ')}
                    </div>
                  </div>
                )}
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingIngredient(editingIngredient === index ? null : index);
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  {editingIngredient === index ? 
                    <Check className="w-4 h-4" style={{ color: THEME.green }} /> : 
                    <ChevronDown className="w-4 h-4" style={{ color: THEME.gray }} />
                  }
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

PendingIngredientsAlert.propTypes = {
  onAddIngredients: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default PendingIngredientsAlert;
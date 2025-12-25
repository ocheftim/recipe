// src/components/recipes/RecipeIngredientsTab.js
import React, { useState } from 'react';
import { GripVertical, Trash2, ChevronDown, Plus } from 'lucide-react';
import { 
  calculateEpCost, 
  calculateLineCost, 
  calculateRecipeTotals 
} from '../../utils/costingUtils';
import { formatCurrency } from '../../utils/formatters';

const RecipeIngredientsTab = ({ 
  recipeForm,
  availableIngredientsFiltered,
  onShowIngredientPicker,
  onUpdateIngredientLine,
  onRemoveIngredientLine,
  onReorderIngredients
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [activePreparationSearch, setActivePreparationSearch] = useState(null);
  const [activeUnitDropdown, setActiveUnitDropdown] = useState(null);
  const [preparationSearchTerms, setPreparationSearchTerms] = useState({});

  // Sample preparation options
  const preparationOptions = [
    'diced', 'chopped', 'minced', 'sliced', 'julienned', 'brunoise',
    'chiffonade', 'rough chop', 'fine dice', 'medium dice', 'large dice',
    'grated', 'shredded', 'pureed', 'blanched', 'roasted', 'sautéed'
  ];

  // Unit compatibility mapping
  const unitCompatibility = {
    'lb': ['oz', 'g', 'kg'],
    'oz': ['lb', 'g', 'kg'],
    'kg': ['lb', 'oz', 'g'],
    'g': ['lb', 'oz', 'kg'],
    'gal': ['qt', 'pt', 'cup', 'floz', 'ml', 'l'],
    'qt': ['gal', 'pt', 'cup', 'floz', 'ml', 'l'],
    'pt': ['gal', 'qt', 'cup', 'floz', 'ml', 'l'],
    'cup': ['gal', 'qt', 'pt', 'floz', 'ml', 'l'],
    'each': ['piece', 'whole'],
    'tbsp': ['tsp', 'cup', 'floz'],
    'tsp': ['tbsp', 'cup', 'floz']
  };

  // Handle drag operations
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newIngredients = [...recipeForm.ingredients];
    const draggedItem = newIngredients[draggedIndex];
    
    newIngredients.splice(draggedIndex, 1);
    const insertIndex = draggedIndex < dropIndex ? dropIndex - 1 : dropIndex;
    newIngredients.splice(insertIndex, 0, draggedItem);
    
    onReorderIngredients(newIngredients);
    setDraggedIndex(null);
  };

  // Handle preparation search
  const handlePreparationSearch = (ingredientId, searchTerm) => {
    setPreparationSearchTerms({ ...preparationSearchTerms, [ingredientId]: searchTerm });
  };

  const getFilteredPreparations = (ingredientId) => {
    const searchTerm = preparationSearchTerms[ingredientId] || '';
    
    if (!searchTerm) return preparationOptions;
    
    const filtered = preparationOptions.filter(prep => 
      prep.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (searchTerm && !filtered.some(prep => prep.toLowerCase() === searchTerm.toLowerCase())) {
      filtered.unshift(`Create new preparation: ${searchTerm}`);
    }
    
    return filtered;
  };

  // Get unit options
  const getUnitOptions = (baseUnit) => {
    const compatible = unitCompatibility[baseUnit] || [];
    const allUnits = ['lb', 'oz', 'g', 'kg', 'gal', 'qt', 'pt', 'cup', 'floz', 'ml', 'l', 'each', 'piece', 'tbsp', 'tsp'];
    const incompatible = allUnits.filter(unit => unit !== baseUnit && !compatible.includes(unit));
    
    return { baseUnit, compatible, incompatible };
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Ingredients & Food Costing</h3>
          <p className="text-sm text-gray-500 mt-1">Professional AP to EP cost calculations with yield factors</p>
        </div>
        <button
          onClick={onShowIngredientPicker}
          disabled={availableIngredientsFiltered.length === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          Add Ingredient
        </button>
      </div>

      {recipeForm.ingredients.length > 0 ? (
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
          {/* Enhanced Header */}
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="grid gap-3 text-xs font-semibold text-gray-600 uppercase tracking-wide" 
                 style={{gridTemplateColumns: "40px 2.5fr 120px 80px 80px 70px 70px 70px 80px 100px"}}>
              <div></div>
              <div>Ingredient & Preparation</div>
              <div className="text-center">Usage</div>
              <div className="text-center">AP Cost</div>
              <div className="text-center">Trim %</div>
              <div className="text-center">Cook %</div>
              <div className="text-center">Yield %</div>
              <div className="text-center">EP Cost</div>
              <div className="text-right">Line Total</div>
              <div></div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {recipeForm.ingredients.map((ingredient, index) => {
              const yieldPercentage = 100 - ingredient.trimLoss - ingredient.cookingLoss;
              const epCost = calculateEpCost(ingredient.apCost, ingredient.trimLoss, ingredient.cookingLoss);
              const lineTotal = calculateLineCost(ingredient.quantity, ingredient.apCost, ingredient.trimLoss, ingredient.cookingLoss);
              const unitOptions = getUnitOptions(ingredient.apUnit);
              
              return (
                <div 
                  key={ingredient.ingredientId}
                  className={`px-4 py-4 hover:bg-gray-50 transition-colors ${
                    draggedIndex === index ? 'opacity-50' : ''
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <div className="grid gap-3 items-center" 
                       style={{gridTemplateColumns: "40px 2.5fr 120px 80px 80px 70px 70px 70px 80px 100px"}}>
                    
                    {/* Drag Handle */}
                    <div className="flex justify-center">
                      <GripVertical className="w-4 h-4 text-gray-400 cursor-grab hover:text-gray-600" />
                    </div>

                    {/* Ingredient Name & Preparation */}
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate mb-1">{ingredient.name}</div>
                      <div className="text-xs text-gray-500 mb-2">
                        {ingredient.code} • {ingredient.vendor}
                      </div>
                      
                      {/* Preparation Field */}
                      <div className="relative">
                        <input
                          type="text"
                          value={ingredient.preparation || ''}
                          onChange={(e) => {
                            onUpdateIngredientLine(ingredient.ingredientId, 'preparation', e.target.value);
                            handlePreparationSearch(ingredient.ingredientId, e.target.value);
                          }}
                          onFocus={() => setActivePreparationSearch(ingredient.ingredientId)}
                          onBlur={() => setTimeout(() => setActivePreparationSearch(null), 150)}
                          placeholder="Add preparation..."
                          className="w-full text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                        
                        {/* Preparation Dropdown */}
                        {activePreparationSearch === ingredient.ingredientId && (
                          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-32 overflow-y-auto mt-1">
                            {getFilteredPreparations(ingredient.ingredientId).map((prep, prepIndex) => (
                              <div
                                key={prepIndex}
                                className="px-2 py-1 text-xs hover:bg-gray-50 cursor-pointer"
                                onClick={() => {
                                  const value = prep.startsWith('Create new preparation:') 
                                    ? prep.replace('Create new preparation: ', '')
                                    : prep;
                                  onUpdateIngredientLine(ingredient.ingredientId, 'preparation', value);
                                  setActivePreparationSearch(null);
                                }}
                              >
                                {prep}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Usage with Smart Unit Selection */}
                    <div className="space-y-1">
                      <input
                        type="number"
                        step="0.01"
                        value={ingredient.quantity}
                        onChange={(e) => onUpdateIngredientLine(ingredient.ingredientId, 'quantity', e.target.value)}
                        className="w-full px-2 py-1 text-center border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 text-sm"
                      />
                      
                      {/* Enhanced Unit Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => setActiveUnitDropdown(activeUnitDropdown === ingredient.ingredientId ? null : ingredient.ingredientId)}
                          className="w-full flex items-center justify-center gap-1 text-xs text-blue-600 hover:text-blue-800 py-1"
                        >
                          {ingredient.apUnit}
                          <ChevronDown className="w-3 h-3" />
                        </button>
                        
                        {activeUnitDropdown === ingredient.ingredientId && (
                          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-20 mt-1">
                            <div className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-50 border-b">
                              Compatible units
                            </div>
                            <div
                              className="px-2 py-1 text-xs hover:bg-blue-50 cursor-pointer font-medium"
                              onClick={() => {
                                onUpdateIngredientLine(ingredient.ingredientId, 'apUnit', unitOptions.baseUnit);
                                setActiveUnitDropdown(null);
                              }}
                            >
                              {unitOptions.baseUnit}
                            </div>
                            {unitOptions.compatible.map(unit => (
                              <div
                                key={unit}
                                className="px-2 py-1 text-xs hover:bg-blue-50 cursor-pointer"
                                onClick={() => {
                                  onUpdateIngredientLine(ingredient.ingredientId, 'apUnit', unit);
                                  setActiveUnitDropdown(null);
                                }}
                              >
                                {unit}
                              </div>
                            ))}
                            
                            {unitOptions.incompatible.length > 0 && (
                              <>
                                <div className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-50 border-b border-t">
                                  Other units
                                </div>
                                {unitOptions.incompatible.map(unit => (
                                  <div
                                    key={unit}
                                    className="px-2 py-1 text-xs hover:bg-gray-50 cursor-pointer text-gray-500"
                                    onClick={() => {
                                      onUpdateIngredientLine(ingredient.ingredientId, 'apUnit', unit);
                                      setActiveUnitDropdown(null);
                                    }}
                                  >
                                    {unit}
                                  </div>
                                ))}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* AP Cost */}
                    <div className="text-center">
                      <div className="text-sm font-medium">{formatCurrency(ingredient.apCost)}</div>
                      <div className="text-xs text-gray-500">per {ingredient.apUnit}</div>
                    </div>
                    
                    {/* Trim % */}
                    <div className="text-center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="50"
                        value={ingredient.trimLoss}
                        onChange={(e) => onUpdateIngredientLine(ingredient.ingredientId, 'trimLoss', e.target.value)}
                        className="w-full px-1 py-1 text-center border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    
                    {/* Cook % */}
                    <div className="text-center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="50"
                        value={ingredient.cookingLoss}
                        onChange={(e) => onUpdateIngredientLine(ingredient.ingredientId, 'cookingLoss', e.target.value)}
                        className="w-full px-1 py-1 text-center border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    
                    {/* Yield % */}
                    <div className="text-center">
                      <span className={`text-sm font-medium ${
                        yieldPercentage >= 80 ? 'text-green-600' : 
                        yieldPercentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {yieldPercentage.toFixed(1)}%
                      </span>
                    </div>
                    
                    {/* EP Cost */}
                    <div className="text-center">
                      <div className="text-sm font-medium">{formatCurrency(epCost)}</div>
                      <div className="text-xs text-gray-500">per {ingredient.apUnit}</div>
                    </div>
                    
                    {/* Line Total & Delete */}
                    <div className="text-right flex items-center justify-between">
                      <span className="text-sm font-semibold">{formatCurrency(lineTotal)}</span>
                      
                      {/* Hover-only Delete Button */}
                      {hoveredRow === index && (
                        <button
                          onClick={() => onRemoveIngredientLine(ingredient.ingredientId)}
                          className="ml-2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="Remove ingredient"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">🍳</span>
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No ingredients added yet</h4>
          <p className="text-gray-500 mb-4">Start building your recipe by adding ingredients with professional costing</p>
          <button
            onClick={onShowIngredientPicker}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add First Ingredient
          </button>
        </div>
      )}

      {/* Enhanced Recipe Totals */}
      {recipeForm.ingredients.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-600 mb-1">Total Food Cost</div>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(calculateRecipeTotals(recipeForm.ingredients, recipeForm.yield).totalCost)}
              </div>
              <div className="text-xs text-gray-500">
                Recipe yield: {recipeForm.yield} {recipeForm.yieldUnit}
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-600 mb-1">Cost per {recipeForm.yieldUnit.slice(0, -1)}</div>
              <div className="text-2xl font-semibold text-blue-600">
                {formatCurrency(calculateRecipeTotals(recipeForm.ingredients, recipeForm.yield).costPerServing)}
              </div>
              <div className="text-xs text-gray-500">
                EP cost with yield factors
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-600 mb-1">Average Yield</div>
              <div className="text-2xl font-semibold text-green-600">
                {recipeForm.ingredients.length > 0 ? 
                  (recipeForm.ingredients.reduce((avg, ing) => 
                    avg + (100 - ing.trimLoss - ing.cookingLoss), 0
                  ) / recipeForm.ingredients.length).toFixed(1) : '0'
                }%
              </div>
              <div className="text-xs text-gray-500">
                Combined trim & cook losses
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeIngredientsTab;
// src/components/recipes/tabs/RecipeIngredientsTab.js
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

// EP Unit conversions (how many EP units per AP unit)
const EP_CONVERSIONS = {
  // Weight conversions
  'oz': { from: 'lb', factor: 16, name: 'oz' },
  'lb': { from: 'lb', factor: 1, name: 'lb' },
  'g': { from: 'lb', factor: 453.592, name: 'g' },
  'kg': { from: 'lb', factor: 0.453592, name: 'kg' },
  
  // Volume conversions
  'tsp': { from: 'cup', factor: 48, name: 'tsp' },
  'tbsp': { from: 'cup', factor: 16, name: 'tbsp' },
  'fl oz': { from: 'cup', factor: 8, name: 'fl oz' },
  'cup': { from: 'cup', factor: 1, name: 'cup' },
  'pt': { from: 'cup', factor: 0.5, name: 'pt' },
  'qt': { from: 'cup', factor: 0.25, name: 'qt' },
  'gal': { from: 'cup', factor: 0.0625, name: 'gal' },
  'ml': { from: 'cup', factor: 236.588, name: 'ml' },
  'L': { from: 'cup', factor: 0.236588, name: 'L' },
  
  // Count
  'each': { from: 'each', factor: 1, name: 'each' },
  'dozen': { from: 'each', factor: 0.0833, name: 'dozen' }
};

const RecipeIngredientsTab = ({ 
  ingredients = [],
  availableIngredients = [],
  searchTerms,
  showDropdown,
  onIngredientSearch,
  onIngredientSelect,
  onIngredientUpdate,
  onIngredientAdd,
  onIngredientRemove,
  setSearchTerms,
  setShowDropdown,
  theme 
}) => {
  const calculateEPCost = (ingredient, epUnit) => {
    if (!ingredient.apCost || !epUnit || !EP_CONVERSIONS[epUnit]) return 0;
    
    const conversion = EP_CONVERSIONS[epUnit];
    const epCost = ingredient.apCost / conversion.factor;
    
    return epCost;
  };

  const formatCurrency = (value) => {
    const num = parseFloat(value) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  const getFilteredIngredients = (index) => {
    const searchTerm = searchTerms[index] || '';
    if (!searchTerm) return [];
    
    return availableIngredients.filter(ing => 
      ing.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const calculateTotalCost = () => {
    return ingredients.reduce((sum, ing) => {
      const cost = (ing.epQuantity || 0) * (ing.epCost || 0);
      return sum + cost;
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium" style={{ color: theme.charcoal }}>
            Recipe Ingredients
          </h3>
          <p className="text-sm mt-1" style={{ color: theme.silver }}>
            Total Cost: {formatCurrency(calculateTotalCost())}
          </p>
        </div>
        <button
          type="button"
          onClick={onIngredientAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium hover:opacity-90"
          style={{ backgroundColor: theme.yellowGreen }}
        >
          <Plus size={16} />
          Add Ingredient
        </button>
      </div>

      {/* Ingredients Table */}
      {ingredients.length === 0 ? (
        <div className="text-center py-12 rounded-lg" style={{ backgroundColor: theme.seasalt }}>
          <p style={{ color: theme.silver }}>No ingredients added yet</p>
          <button
            type="button"
            onClick={onIngredientAdd}
            className="mt-4 px-4 py-2 rounded-lg text-white font-medium hover:opacity-90"
            style={{ backgroundColor: theme.yellowGreen }}
          >
            Add First Ingredient
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: theme.seasalt }}>
                <th className="px-4 py-2 text-left text-sm font-medium" style={{ color: theme.charcoal }}>
                  Ingredient
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium" style={{ color: theme.charcoal }}>
                  AP Qty
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium" style={{ color: theme.charcoal }}>
                  AP Unit
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium" style={{ color: theme.charcoal }}>
                  AP Cost
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium" style={{ color: theme.charcoal }}>
                  EP Yield %
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium" style={{ color: theme.charcoal }}>
                  EP Qty
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium" style={{ color: theme.charcoal }}>
                  EP Unit
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium" style={{ color: theme.charcoal }}>
                  EP Cost
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium" style={{ color: theme.charcoal }}>
                  Total Cost
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium" style={{ color: theme.charcoal }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="border-b" style={{ borderColor: theme.silver }}>
                  {/* Ingredient Search/Select */}
                  <td className="px-4 py-2 relative">
                    <input
                      type="text"
                      value={searchTerms[index] || ingredient.name || ''}
                      onChange={(e) => onIngredientSearch(index, e.target.value)}
                      onFocus={() => setShowDropdown({ ...showDropdown, [index]: true })}
                      className="w-full px-2 py-1 border rounded"
                      style={{ 
                        borderColor: theme.silver,
                        backgroundColor: theme.white,
                        color: theme.gunmetal
                      }}
                      placeholder="Search ingredient..."
                    />
                    
                    {/* Dropdown */}
                    {showDropdown[index] && getFilteredIngredients(index).length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto"
                           style={{ borderColor: theme.silver }}>
                        {getFilteredIngredients(index).map((ing, i) => (
                          <div
                            key={i}
                            onClick={() => onIngredientSelect(index, ing)}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-50"
                            style={{ color: theme.gunmetal }}
                          >
                            <div className="font-medium">{ing.name}</div>
                            <div className="text-xs" style={{ color: theme.silver }}>
                              {ing.category} - {formatCurrency(ing.unitCost)}/{ing.unit}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>

                  {/* AP Quantity */}
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={ingredient.apQuantity || ''}
                      onChange={(e) => onIngredientUpdate(index, 'apQuantity', parseFloat(e.target.value))}
                      className="w-20 px-2 py-1 border rounded"
                      style={{ 
                        borderColor: theme.silver,
                        backgroundColor: theme.white,
                        color: theme.gunmetal
                      }}
                      step="0.01"
                      min="0"
                    />
                  </td>

                  {/* AP Unit */}
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={ingredient.apUnit || ''}
                      onChange={(e) => onIngredientUpdate(index, 'apUnit', e.target.value)}
                      className="w-20 px-2 py-1 border rounded"
                      style={{ 
                        borderColor: theme.silver,
                        backgroundColor: theme.white,
                        color: theme.gunmetal
                      }}
                      placeholder="lb, kg, etc"
                    />
                  </td>

                  {/* AP Cost */}
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={ingredient.apCost || ''}
                      onChange={(e) => onIngredientUpdate(index, 'apCost', parseFloat(e.target.value))}
                      className="w-24 px-2 py-1 border rounded"
                      style={{ 
                        borderColor: theme.silver,
                        backgroundColor: theme.white,
                        color: theme.gunmetal
                      }}
                      step="0.01"
                      min="0"
                    />
                  </td>

                  {/* EP Yield % */}
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={ingredient.epYield || 100}
                      onChange={(e) => onIngredientUpdate(index, 'epYield', parseFloat(e.target.value))}
                      className="w-20 px-2 py-1 border rounded"
                      style={{ 
                        borderColor: theme.silver,
                        backgroundColor: theme.white,
                        color: theme.gunmetal
                      }}
                      step="1"
                      min="0"
                      max="100"
                    />
                  </td>

                  {/* EP Quantity */}
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={ingredient.epQuantity || ''}
                      onChange={(e) => onIngredientUpdate(index, 'epQuantity', parseFloat(e.target.value))}
                      className="w-20 px-2 py-1 border rounded"
                      style={{ 
                        borderColor: theme.silver,
                        backgroundColor: theme.white,
                        color: theme.gunmetal
                      }}
                      step="0.01"
                      min="0"
                    />
                  </td>

                  {/* EP Unit */}
                  <td className="px-4 py-2">
                    <select
                      value={ingredient.epUnit || ''}
                      onChange={(e) => {
                        const epUnit = e.target.value;
                        const epCost = calculateEPCost(ingredient, epUnit);
                        onIngredientUpdate(index, 'epUnit', epUnit);
                        onIngredientUpdate(index, 'epCost', epCost);
                      }}
                      className="w-24 px-2 py-1 border rounded"
                      style={{ 
                        borderColor: theme.silver,
                        backgroundColor: theme.white,
                        color: theme.gunmetal
                      }}
                    >
                      <option value="">Select...</option>
                      {Object.keys(EP_CONVERSIONS).map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </td>

                  {/* EP Cost */}
                  <td className="px-4 py-2">
                    <span style={{ color: theme.gunmetal }}>
                      {formatCurrency(ingredient.epCost || 0)}
                    </span>
                  </td>

                  {/* Total Cost */}
                  <td className="px-4 py-2">
                    <span className="font-medium" style={{ color: theme.yellowGreen }}>
                      {formatCurrency((ingredient.epQuantity || 0) * (ingredient.epCost || 0))}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-2">
                    <button
                      type="button"
                      onClick={() => onIngredientRemove(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary */}
      {ingredients.length > 0 && (
        <div className="p-4 rounded-lg" style={{ backgroundColor: theme.seasalt }}>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <span className="text-sm" style={{ color: theme.silver }}>Total Ingredients:</span>
              <span className="ml-2 font-medium" style={{ color: theme.gunmetal }}>
                {ingredients.length}
              </span>
            </div>
            <div>
              <span className="text-sm" style={{ color: theme.silver }}>Total Cost:</span>
              <span className="ml-2 font-medium" style={{ color: theme.gunmetal }}>
                {formatCurrency(calculateTotalCost())}
              </span>
            </div>
            <div>
              <span className="text-sm" style={{ color: theme.silver }}>Cost per Serving:</span>
              <span className="ml-2 font-medium" style={{ color: theme.gunmetal }}>
                {/* This would need yieldSize from formData */}
                {formatCurrency(calculateTotalCost() / 1)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeIngredientsTab;
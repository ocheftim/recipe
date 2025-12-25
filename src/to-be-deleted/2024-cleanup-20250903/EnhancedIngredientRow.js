import React, { useState } from 'react';
import { ChevronDown, Plus, Trash2, GripVertical } from 'lucide-react';

const EnhancedIngredientRow = () => {
  const [ingredients, setIngredients] = useState([
    {
      id: 1,
      name: 'Carrots',
      apQty: 10,
      apUnit: 'lbs',
      apCost: 20.00,
      yieldPercent: 80,
      epQty: 8,
      epUnit: 'lbs',
      epCost: 25.00,
      recipeQty: 2,
      recipeUnit: 'lbs',
      totalCost: 6.25
    },
    {
      id: 2,
      name: 'Onions',
      apQty: 5,
      apUnit: 'lbs',
      apCost: 7.50,
      yieldPercent: 85,
      epQty: 4.25,
      epUnit: 'lbs',
      epCost: 8.82,
      recipeQty: 1,
      recipeUnit: 'lbs',
      totalCost: 2.08
    }
  ]);

  const updateIngredient = (id, field, value) => {
    setIngredients(prev => prev.map(ing => {
      if (ing.id !== id) return ing;
      
      const updated = { ...ing, [field]: value };
      
      // Auto-calculate EP values when AP values or yield change
      if (['apQty', 'yieldPercent'].includes(field)) {
        const apQty = field === 'apQty' ? parseFloat(value) || 0 : parseFloat(updated.apQty) || 0;
        const yieldPct = field === 'yieldPercent' ? parseFloat(value) || 100 : parseFloat(updated.yieldPercent) || 100;
        
        updated.epQty = (apQty * (yieldPct / 100)).toFixed(2);
        
        // Recalculate EP cost per unit
        if (updated.apCost && yieldPct > 0) {
          const apCostPerUnit = updated.apCost / apQty;
          const epCostPerUnit = apCostPerUnit / (yieldPct / 100);
          updated.epCost = (epCostPerUnit * updated.epQty).toFixed(2);
        }
      }
      
      // Recalculate total cost based on recipe quantity
      if (['recipeQty', 'epCost', 'epQty'].includes(field) || ['apQty', 'yieldPercent', 'apCost'].includes(field)) {
        const epCostPerUnit = updated.epQty > 0 ? updated.epCost / updated.epQty : 0;
        updated.totalCost = (epCostPerUnit * (updated.recipeQty || 0)).toFixed(2);
      }
      
      return updated;
    }));
  };

  const addIngredient = () => {
    const newId = Math.max(...ingredients.map(i => i.id), 0) + 1;
    setIngredients([...ingredients, {
      id: newId,
      name: '',
      apQty: 0,
      apUnit: 'lbs',
      apCost: 0,
      yieldPercent: 100,
      epQty: 0,
      epUnit: 'lbs',
      epCost: 0,
      recipeQty: 0,
      recipeUnit: 'lbs',
      totalCost: 0
    }]);
  };

  const removeIngredient = (id) => {
    setIngredients(prev => prev.filter(ing => ing.id !== id));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value || 0);
  };

  const totalRecipeCost = ingredients.reduce((sum, ing) => sum + parseFloat(ing.totalCost || 0), 0);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recipe Ingredients - AP/EP Costing</h2>
          <p className="text-sm text-gray-500 mt-1">Track as-purchased (AP) quantities and costs, apply yield percentages, and calculate edible portion (EP) values</p>
        </div>

        {/* Table Header */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-8 px-3 py-3"></th>
                <th className="text-left px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Ingredient</th>
                <th className="text-center px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider" colSpan="3">
                  <div className="bg-blue-50 rounded px-2 py-1">As Purchased (AP)</div>
                </th>
                <th className="text-center px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Yield %</th>
                <th className="text-center px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider" colSpan="3">
                  <div className="bg-green-50 rounded px-2 py-1">Edible Portion (EP)</div>
                </th>
                <th className="text-center px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider" colSpan="2">
                  <div className="bg-orange-50 rounded px-2 py-1">Recipe Usage</div>
                </th>
                <th className="text-center px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="w-12 px-3 py-3"></th>
              </tr>
              <tr className="text-xs text-gray-500">
                <th></th>
                <th></th>
                <th className="text-center px-2 py-2 font-normal">Qty</th>
                <th className="text-center px-2 py-2 font-normal">Unit</th>
                <th className="text-center px-2 py-2 font-normal">Cost</th>
                <th></th>
                <th className="text-center px-2 py-2 font-normal">Qty</th>
                <th className="text-center px-2 py-2 font-normal">Unit</th>
                <th className="text-center px-2 py-2 font-normal">Cost</th>
                <th className="text-center px-2 py-2 font-normal">Qty</th>
                <th className="text-center px-2 py-2 font-normal">Unit</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ingredients.map((ingredient, index) => (
                <tr key={ingredient.id} className="hover:bg-gray-50">
                  <td className="px-3 py-3">
                    <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="text"
                      value={ingredient.name}
                      onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ingredient name"
                    />
                  </td>
                  
                  {/* AP Section */}
                  <td className="px-2 py-3 bg-blue-50/30">
                    <input
                      type="number"
                      step="0.01"
                      value={ingredient.apQty}
                      onChange={(e) => updateIngredient(ingredient.id, 'apQty', e.target.value)}
                      className="w-20 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-2 py-3 bg-blue-50/30">
                    <select
                      value={ingredient.apUnit}
                      onChange={(e) => updateIngredient(ingredient.id, 'apUnit', e.target.value)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="lbs">lbs</option>
                      <option value="kg">kg</option>
                      <option value="oz">oz</option>
                      <option value="g">g</option>
                      <option value="each">each</option>
                      <option value="case">case</option>
                      <option value="gal">gal</option>
                      <option value="qt">qt</option>
                      <option value="L">L</option>
                    </select>
                  </td>
                  <td className="px-2 py-3 bg-blue-50/30">
                    <input
                      type="number"
                      step="0.01"
                      value={ingredient.apCost}
                      onChange={(e) => updateIngredient(ingredient.id, 'apCost', e.target.value)}
                      className="w-24 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </td>
                  
                  {/* Yield */}
                  <td className="px-2 py-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="number"
                        step="1"
                        min="0"
                        max="100"
                        value={ingredient.yieldPercent}
                        onChange={(e) => updateIngredient(ingredient.id, 'yieldPercent', e.target.value)}
                        className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500"
                      />
                      <span className="ml-1 text-gray-500">%</span>
                    </div>
                  </td>
                  
                  {/* EP Section */}
                  <td className="px-2 py-3 bg-green-50/30">
                    <input
                      type="number"
                      step="0.01"
                      value={ingredient.epQty}
                      onChange={(e) => updateIngredient(ingredient.id, 'epQty', e.target.value)}
                      className="w-20 px-2 py-1 text-center border border-gray-300 rounded bg-gray-50"
                      readOnly
                    />
                  </td>
                  <td className="px-2 py-3 bg-green-50/30">
                    <select
                      value={ingredient.epUnit}
                      onChange={(e) => updateIngredient(ingredient.id, 'epUnit', e.target.value)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                    >
                      <option value="lbs">lbs</option>
                      <option value="kg">kg</option>
                      <option value="oz">oz</option>
                      <option value="g">g</option>
                      <option value="each">each</option>
                      <option value="cups">cups</option>
                      <option value="tbsp">tbsp</option>
                      <option value="tsp">tsp</option>
                      <option value="L">L</option>
                      <option value="ml">ml</option>
                    </select>
                  </td>
                  <td className="px-2 py-3 bg-green-50/30">
                    <div className="text-center font-medium text-gray-700">
                      {formatCurrency(ingredient.epCost)}
                    </div>
                  </td>
                  
                  {/* Recipe Usage */}
                  <td className="px-2 py-3 bg-orange-50/30">
                    <input
                      type="number"
                      step="0.01"
                      value={ingredient.recipeQty}
                      onChange={(e) => updateIngredient(ingredient.id, 'recipeQty', e.target.value)}
                      className="w-20 px-2 py-1 text-center border border-orange-300 rounded focus:ring-2 focus:ring-orange-500"
                    />
                  </td>
                  <td className="px-2 py-3 bg-orange-50/30">
                    <select
                      value={ingredient.recipeUnit}
                      onChange={(e) => updateIngredient(ingredient.id, 'recipeUnit', e.target.value)}
                      className="w-20 px-2 py-1 border border-orange-300 rounded focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="lbs">lbs</option>
                      <option value="kg">kg</option>
                      <option value="oz">oz</option>
                      <option value="g">g</option>
                      <option value="each">each</option>
                      <option value="cups">cups</option>
                      <option value="tbsp">tbsp</option>
                      <option value="tsp">tsp</option>
                      <option value="L">L</option>
                      <option value="ml">ml</option>
                    </select>
                  </td>
                  
                  {/* Total Cost */}
                  <td className="px-2 py-3">
                    <div className="text-center font-semibold text-gray-900">
                      {formatCurrency(ingredient.totalCost)}
                    </div>
                  </td>
                  
                  <td className="px-2 py-3">
                    <button
                      onClick={() => removeIngredient(ingredient.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={addIngredient}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Ingredient
          </button>
          
          <div className="flex items-center space-x-6">
            <div className="text-sm text-gray-500">
              <span>Total Ingredients: {ingredients.length}</span>
            </div>
            <div className="text-lg font-semibold text-gray-900">
              Total Recipe Cost: {formatCurrency(totalRecipeCost)}
            </div>
          </div>
        </div>
      </div>

      {/* Calculation Examples */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">How AP/EP Calculations Work:</h3>
        <div className="text-sm text-blue-800 space-y-1">
          <p>• <strong>EP Qty</strong> = AP Qty × (Yield % ÷ 100)</p>
          <p>• <strong>EP Cost per Unit</strong> = (AP Cost ÷ AP Qty) ÷ (Yield % ÷ 100)</p>
          <p>• <strong>Total Cost</strong> = EP Cost per Unit × Recipe Qty</p>
          <p className="mt-2 text-xs">Example: 10 lbs carrots at $20 with 80% yield = 8 lbs EP at $25 total EP cost ($3.125/lb)</p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedIngredientRow;
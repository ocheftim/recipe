// src/components/recipes/RecipeScalingTab.js
import React from 'react';
import { formatCurrency } from '../../utils/formatters';

const RecipeScalingTab = ({ 
  recipeForm,
  scalingYield,
  setScalingYield,
  onScaleRecipe,
  calculateFullCostAnalysis
}) => {
  return (
    <div className="p-6 space-y-4">
      <div className="bg-orange-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Recipe Scaling</h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">New Yield:</label>
            <input
              type="number"
              value={scalingYield}
              onChange={(e) => setScalingYield(parseInt(e.target.value) || 1)}
              min="1"
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
            />
            <span className="text-sm text-gray-600">{recipeForm.yieldUnit}</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Scaling Factor:</label>
            <div className="px-3 py-1 bg-white border rounded font-mono text-sm">
              {(scalingYield / recipeForm.yield).toFixed(2)}x
            </div>
          </div>
          <button
            onClick={onScaleRecipe}
            disabled={scalingYield === recipeForm.yield}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50 text-sm"
          >
            Scale Recipe
          </button>
        </div>
        {scalingYield !== recipeForm.yield && (
          <div className="mt-3 p-3 bg-orange-100 rounded text-sm">
            <strong>Preview:</strong> This will {scalingYield > recipeForm.yield ? 'increase' : 'decrease'} all ingredient quantities by {Math.abs(((scalingYield / recipeForm.yield - 1) * 100)).toFixed(0)}%
          </div>
        )}
      </div>
      
      {/* Current Recipe Overview */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Current Recipe Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="font-medium text-gray-600">Yield</div>
            <div className="text-lg font-semibold">{recipeForm.yield} {recipeForm.yieldUnit}</div>
          </div>
          <div>
            <div className="font-medium text-gray-600">Ingredients</div>
            <div className="text-lg font-semibold">{recipeForm.ingredients.length}</div>
          </div>
          <div>
            <div className="font-medium text-gray-600">Instructions</div>
            <div className="text-lg font-semibold">{recipeForm.instructions.filter(inst => inst.trim()).length}</div>
          </div>
          <div>
            <div className="font-medium text-gray-600">Total Cost</div>
            <div className="text-lg font-semibold">{formatCurrency(calculateFullCostAnalysis.totalCost)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeScalingTab;
// src/components/recipes/IndividualRecipeCostAnalysis.js
// Updated to match RecipeModal style (no black header)

import React from 'react';
import { X } from 'lucide-react';
import { THEME } from '../../constants/theme';
import { formatCurrency, formatFoodCostPercent } from '../../utils/recipeUtils';

const IndividualRecipeCostAnalysis = ({ recipe, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Calculate per-unit costs
  const totalIngredientCost = recipe.ingredients?.reduce((sum, ing) => 
    sum + (ing.quantity * ing.unitCost || 0), 0) || recipe.totalCost || 0;
  const laborCostPerUnit = (recipe.laborCost || 0) / (recipe.yield || 1);
  const overheadCostPerUnit = (recipe.overheadCost || 0) / (recipe.yield || 1);
  const ingredientCostPerUnit = totalIngredientCost / (recipe.yield || 1);
  const totalCostPerUnit = ingredientCostPerUnit + laborCostPerUnit + overheadCostPerUnit;
  const sellingPricePerUnit = recipe.menuPrice || recipe.sellingPrice || 0;
  const profitPerUnit = sellingPricePerUnit - totalCostPerUnit;
  const profitMargin = sellingPricePerUnit > 0 ? (profitPerUnit / sellingPricePerUnit * 100) : 0;
  const foodCostPercent = sellingPricePerUnit > 0 ? (ingredientCostPerUnit / sellingPricePerUnit * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full">
          {/* Header - matching RecipeModal style */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Cost Analysis - {recipe.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Food Cost/Unit</div>
                <div className="text-xl font-bold" style={{ color: THEME.gunmetal }}>
                  {formatCurrency(ingredientCostPerUnit)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  per {recipe.yieldUnit?.slice(0, -1) || 'serving'}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Selling Price/Unit</div>
                <div className="text-xl font-bold" style={{ color: THEME.gunmetal }}>
                  {formatCurrency(sellingPricePerUnit)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  per {recipe.yieldUnit?.slice(0, -1) || 'serving'}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Food Cost %</div>
                <div className="text-xl font-bold" 
                  style={{ color: foodCostPercent <= 30 ? THEME.yellowGreen : 
                           foodCostPercent <= 35 ? '#FFA500' : '#FF0000' }}>
                  {formatFoodCostPercent(foodCostPercent)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  target: &lt;30%
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Profit Margin</div>
                <div className="text-xl font-bold" style={{ color: THEME.gunmetal }}>
                  {profitMargin.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {formatCurrency(profitPerUnit)}/unit
                </div>
              </div>
            </div>

            {/* Recipe Info */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3" style={{ color: THEME.gunmetal }}>
                Recipe Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Category:</span>
                  <span className="ml-2 font-medium">{recipe.category}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Cuisine:</span>
                  <span className="ml-2 font-medium">{recipe.cuisine}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Recipe Yield:</span>
                  <span className="ml-2 font-medium">
                    {recipe.yield} {recipe.yieldUnit || 'servings'}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Cost per {recipe.yieldUnit?.slice(0, -1) || 'Serving'}:</span>
                  <span className="ml-2 font-medium">
                    {formatCurrency(ingredientCostPerUnit)}
                  </span>
                </div>
              </div>
            </div>

            {/* Ingredients Breakdown */}
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3" style={{ color: THEME.gunmetal }}>
                  Ingredients Cost Breakdown
                </h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                          Ingredient
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 uppercase">
                          Quantity
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 uppercase">
                          Unit Cost
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 uppercase">
                          Total Cost
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recipe.ingredients.map((ing, index) => {
                        const itemTotal = (ing.quantity * ing.unitCost) || 0;
                        const itemPerUnit = itemTotal / (recipe.yield || 1);
                        return (
                          <tr key={index}>
                            <td className="px-4 py-2 text-sm">{ing.name}</td>
                            <td className="px-4 py-2 text-sm text-right">
                              {ing.quantity} {ing.unit}
                            </td>
                            <td className="px-4 py-2 text-sm text-right">
                              {formatCurrency(ing.unitCost || 0)}
                            </td>
                            <td className="px-4 py-2 text-sm text-right font-medium">
                              {formatCurrency(itemTotal)}
                              <div className="text-xs text-gray-500">
                                ({formatCurrency(itemPerUnit)}/unit)
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan="3" className="px-4 py-2 text-sm font-semibold text-right">
                          Total Ingredients Cost:
                        </td>
                        <td className="px-4 py-2 text-sm font-bold text-right">
                          {formatCurrency(totalIngredientCost)}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="px-4 py-2 text-sm font-semibold text-right">
                          Cost per {recipe.yieldUnit?.slice(0, -1) || 'Serving'}:
                        </td>
                        <td className="px-4 py-2 text-sm font-bold text-right text-blue-600">
                          {formatCurrency(ingredientCostPerUnit)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {/* Cost Summary */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3" style={{ color: THEME.gunmetal }}>
                Complete Cost Analysis
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Per Unit Costs */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3 text-sm text-gray-700">Per Unit Costs</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Ingredients:</span>
                      <span className="font-medium">{formatCurrency(ingredientCostPerUnit)}</span>
                    </div>
                    {laborCostPerUnit > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Labor:</span>
                        <span className="font-medium">{formatCurrency(laborCostPerUnit)}</span>
                      </div>
                    )}
                    {overheadCostPerUnit > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Overhead:</span>
                        <span className="font-medium">{formatCurrency(overheadCostPerUnit)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-semibold">Total Cost/Unit:</span>
                      <span className="font-bold">{formatCurrency(totalCostPerUnit)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Selling Price:</span>
                      <span className="font-bold">{formatCurrency(sellingPricePerUnit)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-semibold" style={{ color: profitPerUnit >= 0 ? 'green' : 'red' }}>
                        Profit/Unit:
                      </span>
                      <span className="font-bold" style={{ color: profitPerUnit >= 0 ? 'green' : 'red' }}>
                        {formatCurrency(profitPerUnit)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Total Recipe Costs */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3 text-sm text-gray-700">
                    Total Recipe Costs ({recipe.yield} {recipe.yieldUnit || 'servings'})
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Ingredients:</span>
                      <span className="font-medium">{formatCurrency(totalIngredientCost)}</span>
                    </div>
                    {recipe.laborCost > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Labor:</span>
                        <span className="font-medium">{formatCurrency(recipe.laborCost)}</span>
                      </div>
                    )}
                    {recipe.overheadCost > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Overhead:</span>
                        <span className="font-medium">{formatCurrency(recipe.overheadCost)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-semibold">Total Recipe Cost:</span>
                      <span className="font-bold">
                        {formatCurrency(totalIngredientCost + (recipe.laborCost || 0) + (recipe.overheadCost || 0))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Total Revenue:</span>
                      <span className="font-bold">
                        {formatCurrency(sellingPricePerUnit * recipe.yield)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-semibold" style={{ color: profitPerUnit >= 0 ? 'green' : 'red' }}>
                        Total Profit:
                      </span>
                      <span className="font-bold" style={{ color: profitPerUnit >= 0 ? 'green' : 'red' }}>
                        {formatCurrency(profitPerUnit * recipe.yield)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualRecipeCostAnalysis;
import React from 'react';
import { formatCurrency } from '../../utils/formatters';
import { COST_SETTINGS } from '../../constants/recipeConstants';

const RecipeMenuPricingTab = ({ 
  calculateFullCostAnalysis 
}) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Food Cost Breakdown */}
      <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          Food Cost Analysis
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Food Cost:</span>
              <span className="font-mono text-lg">{formatCurrency(calculateFullCostAnalysis.ingredientCost)}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-lg font-bold text-blue-600 border-t pt-3">
              <span>Cost Per Serving ({calculateFullCostAnalysis.yield} servings):</span>
              <span className="font-mono">{formatCurrency(calculateFullCostAnalysis.costPerServing)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Pricing */}
      <div className="bg-green-50 rounded-lg p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          Menu Pricing Recommendations
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Target Food Cost %:</span>
              <span className="font-mono">{(COST_SETTINGS.targetFoodCostPercentage * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-green-600">
              <span>Suggested Menu Price:</span>
              <span className="font-mono">{formatCurrency(calculateFullCostAnalysis.suggestedMenuPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Food Cost %:</span>
              <span className="font-mono">{calculateFullCostAnalysis.foodCostPercent.toFixed(1)}%</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Markup:</span>
              <span className="font-mono">{calculateFullCostAnalysis.markup.toFixed(1)}x</span>
            </div>
            <div className="flex justify-between">
              <span>Profit per Serving:</span>
              <span className="font-mono text-green-600">{formatCurrency(calculateFullCostAnalysis.profitPerServing)}</span>
            </div>
            <div className="flex justify-between">
              <span>Profit Margin:</span>
              <span className="font-mono text-green-600">{calculateFullCostAnalysis.profitMargin.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Pricing Options */}
      <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          Alternative Pricing
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          {[3, 4, 5].map(multiplier => {
            const price = calculateFullCostAnalysis.costPerServing * multiplier;
            const profit = price - calculateFullCostAnalysis.costPerServing;
            const margin = (profit / price) * 100;
            const foodCostPercentage = (calculateFullCostAnalysis.costPerServing / price) * 100;

            return (
              <div key={multiplier} className="text-center p-4 border rounded-lg bg-white">
                <div className="font-bold text-xl mb-2">{multiplier}x</div>
                <div className="font-mono text-xl mb-2">{formatCurrency(price)}</div>
                <div className="text-sm text-gray-600">{foodCostPercentage.toFixed(0)}% food cost</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecipeMenuPricingTab;
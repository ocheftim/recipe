// src/components/recipes/tabs/RecipePricingTab.js
import React from 'react';

const RecipePricingTab = ({ 
  formData,
  onChange,
  ingredients = [],
  theme 
}) => {
  const formatCurrency = (value) => {
    const num = parseFloat(value) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  const formatPercent = (value) => {
    const num = parseFloat(value) || 0;
    return `${num.toFixed(1)}%`;
  };

  // Calculate costs
  const calculateCosts = () => {
    // Ingredient cost from ingredients tab
    const ingredientCost = ingredients.reduce((sum, ing) => {
      return sum + ((ing.epQuantity || 0) * (ing.epCost || 0));
    }, 0);

    // Labor and overhead
    const laborCost = parseFloat(formData.laborCost) || 0;
    const overheadCost = parseFloat(formData.overheadCost) || 0;
    
    // Total cost
    const totalCost = ingredientCost + laborCost + overheadCost;
    
    // Per serving calculations
    const yieldSize = parseFloat(formData.yieldSize) || 1;
    const costPerServing = totalCost / yieldSize;
    
    // Pricing calculations
    const sellingPrice = parseFloat(formData.sellingPrice) || 0;
    const foodCostPercent = sellingPrice > 0 ? (costPerServing / sellingPrice) * 100 : 0;
    const profitMargin = sellingPrice - costPerServing;
    const profitMarginPercent = sellingPrice > 0 ? (profitMargin / sellingPrice) * 100 : 0;

    return {
      ingredientCost,
      laborCost,
      overheadCost,
      totalCost,
      costPerServing,
      foodCostPercent,
      profitMargin,
      profitMarginPercent
    };
  };

  const costs = calculateCosts();

  // Generate pricing scenarios
  const generatePricingScenarios = () => {
    const scenarios = [];
    const targetPercentages = [20, 25, 30, 35, 40];
    
    targetPercentages.forEach(percent => {
      const suggestedPrice = (costs.costPerServing / percent) * 100;
      const margin = suggestedPrice - costs.costPerServing;
      const marginPercent = (margin / suggestedPrice) * 100;
      
      scenarios.push({
        targetPercent: percent,
        suggestedPrice: suggestedPrice,
        margin: margin,
        marginPercent: marginPercent
      });
    });
    
    return scenarios;
  };

  const scenarios = generatePricingScenarios();

  return (
    <div className="space-y-6">
      {/* Cost Breakdown */}
      <div>
        <h3 className="text-lg font-medium mb-4" style={{ color: theme.charcoal }}>
          Cost Breakdown
        </h3>
        <div className="rounded-lg border p-4" style={{ borderColor: theme.silver, backgroundColor: theme.white }}>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span style={{ color: theme.gunmetal }}>Ingredient Cost</span>
              <div className="flex items-center gap-2">
                <span className="font-medium" style={{ color: theme.gunmetal }}>
                  {formatCurrency(costs.ingredientCost)}
                </span>
                <span className="text-sm" style={{ color: theme.silver }}>
                  ({formatPercent(costs.totalCost > 0 ? (costs.ingredientCost / costs.totalCost) * 100 : 0)})
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span style={{ color: theme.gunmetal }}>Labor Cost</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={formData.laborCost || ''}
                  onChange={(e) => onChange('laborCost', parseFloat(e.target.value))}
                  className="w-24 px-2 py-1 border rounded text-right"
                  style={{ 
                    borderColor: theme.silver,
                    backgroundColor: theme.white,
                    color: theme.gunmetal
                  }}
                  step="0.01"
                  min="0"
                />
                <span className="text-sm" style={{ color: theme.silver }}>
                  ({formatPercent(costs.totalCost > 0 ? (costs.laborCost / costs.totalCost) * 100 : 0)})
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span style={{ color: theme.gunmetal }}>Overhead Cost</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={formData.overheadCost || ''}
                  onChange={(e) => onChange('overheadCost', parseFloat(e.target.value))}
                  className="w-24 px-2 py-1 border rounded text-right"
                  style={{ 
                    borderColor: theme.silver,
                    backgroundColor: theme.white,
                    color: theme.gunmetal
                  }}
                  step="0.01"
                  min="0"
                />
                <span className="text-sm" style={{ color: theme.silver }}>
                  ({formatPercent(costs.totalCost > 0 ? (costs.overheadCost / costs.totalCost) * 100 : 0)})
                </span>
              </div>
            </div>

            <div className="pt-3 border-t flex justify-between items-center" style={{ borderColor: theme.silver }}>
              <span className="font-medium" style={{ color: theme.charcoal }}>Total Recipe Cost</span>
              <span className="text-lg font-bold" style={{ color: theme.yellowGreen }}>
                {formatCurrency(costs.totalCost)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Per Serving Analysis */}
      <div>
        <h3 className="text-lg font-medium mb-4" style={{ color: theme.charcoal }}>
          Per Serving Analysis
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-4" style={{ borderColor: theme.silver, backgroundColor: theme.seasalt }}>
            <div className="text-sm" style={{ color: theme.silver }}>Cost per Serving</div>
            <div className="text-2xl font-bold mt-1" style={{ color: theme.gunmetal }}>
              {formatCurrency(costs.costPerServing)}
            </div>
            <div className="text-xs mt-1" style={{ color: theme.silver }}>
              Based on {formData.yieldSize || 1} {formData.yieldUnit || 'servings'}
            </div>
          </div>

          <div className="rounded-lg border p-4" style={{ borderColor: theme.silver, backgroundColor: theme.white }}>
            <div className="text-sm" style={{ color: theme.silver }}>Selling Price</div>
            <input
              type="number"
              value={formData.sellingPrice || ''}
              onChange={(e) => onChange('sellingPrice', parseFloat(e.target.value))}
              className="text-2xl font-bold mt-1 w-full border-0 bg-transparent focus:outline-none"
              style={{ color: theme.gunmetal }}
              placeholder="$0.00"
              step="0.01"
              min="0"
            />
            <div className="text-xs mt-1" style={{ color: theme.silver }}>Menu price per serving</div>
          </div>

          <div className="rounded-lg border p-4" 
               style={{ 
                 borderColor: theme.silver, 
                 backgroundColor: costs.foodCostPercent <= 30 ? '#F0FDF4' : costs.foodCostPercent <= 35 ? '#FEF3C7' : '#FEE2E2'
               }}>
            <div className="text-sm" style={{ color: theme.silver }}>Food Cost %</div>
            <div className="text-2xl font-bold mt-1" 
                 style={{ 
                   color: costs.foodCostPercent <= 30 ? '#16A34A' : costs.foodCostPercent <= 35 ? '#D97706' : '#DC2626'
                 }}>
              {formatPercent(costs.foodCostPercent)}
            </div>
            <div className="text-xs mt-1" 
                 style={{ 
                   color: costs.foodCostPercent <= 30 ? '#16A34A' : costs.foodCostPercent <= 35 ? '#D97706' : '#DC2626'
                 }}>
              {costs.foodCostPercent <= 25 ? 'Excellent' : 
               costs.foodCostPercent <= 30 ? 'Good' : 
               costs.foodCostPercent <= 35 ? 'Acceptable' : 'High'}
            </div>
          </div>

          <div className="rounded-lg border p-4" style={{ borderColor: theme.silver, backgroundColor: theme.seasalt }}>
            <div className="text-sm" style={{ color: theme.silver }}>Profit Margin</div>
            <div className="text-2xl font-bold mt-1" style={{ color: theme.yellowGreen }}>
              {formatCurrency(costs.profitMargin)}
            </div>
            <div className="text-xs mt-1" style={{ color: theme.silver }}>
              {formatPercent(costs.profitMarginPercent)} margin
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Scenarios */}
      <div>
        <h3 className="text-lg font-medium mb-4" style={{ color: theme.charcoal }}>
          Pricing Scenarios
        </h3>
        <div className="rounded-lg border overflow-hidden" style={{ borderColor: theme.silver }}>
          <table className="w-full">
            <thead style={{ backgroundColor: theme.seasalt }}>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium" style={{ color: theme.charcoal }}>
                  Target Food Cost %
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium" style={{ color: theme.charcoal }}>
                  Suggested Price
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium" style={{ color: theme.charcoal }}>
                  Profit Margin
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium" style={{ color: theme.charcoal }}>
                  Margin %
                </th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((scenario, index) => (
                <tr key={index} className="border-t" style={{ borderColor: theme.silver }}>
                  <td className="px-4 py-2">
                    <span className={scenario.targetPercent === 30 ? 'font-medium' : ''} 
                          style={{ color: theme.gunmetal }}>
                      {scenario.targetPercent}%
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span style={{ color: theme.gunmetal }}>
                      {formatCurrency(scenario.suggestedPrice)}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span style={{ color: theme.gunmetal }}>
                      {formatCurrency(scenario.margin)}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span style={{ color: theme.gunmetal }}>
                      {formatPercent(scenario.marginPercent)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Pricing Options */}
      <div>
        <h3 className="text-lg font-medium mb-4" style={{ color: theme.charcoal }}>
          Additional Pricing Options
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: theme.charcoal }}>
              Catering Price (per person)
            </label>
            <input
              type="number"
              value={formData.cateringPrice || ''}
              onChange={(e) => onChange('cateringPrice', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ 
                borderColor: theme.silver,
                backgroundColor: theme.white,
                color: theme.gunmetal
              }}
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: theme.charcoal }}>
              Bulk Price (per batch)
            </label>
            <input
              type="number"
              value={formData.bulkPrice || ''}
              onChange={(e) => onChange('bulkPrice', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ 
                borderColor: theme.silver,
                backgroundColor: theme.white,
                color: theme.gunmetal
              }}
              step="0.01"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Pricing Notes */}
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: theme.charcoal }}>
          Pricing Notes
        </label>
        <textarea
          value={formData.pricingNotes || ''}
          onChange={(e) => onChange('pricingNotes', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style={{ 
            borderColor: theme.silver,
            backgroundColor: theme.white,
            color: theme.gunmetal
          }}
          rows="3"
          placeholder="Any special pricing considerations or notes..."
        />
      </div>
    </div>
  );
};

export default RecipePricingTab;
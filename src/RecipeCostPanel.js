import React from 'react';

export default function RecipeCostPanel({ ingredients, totalYield, totalCost }) {
  const portionSize = 1;
  const sellPrice = 11.99;
  const costPerPortion = totalYield ? (totalCost / totalYield).toFixed(2) : '0.00';
  const foodCostPct = sellPrice ? ((costPerPortion / sellPrice) * 100).toFixed(2) : '0.00';
  const profit = (sellPrice - costPerPortion).toFixed(2);

  return (
    <div className="mt-8 border rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Recipe Cost</h2>

      {/* Ingredient Table */}
      <div className="mb-4">
        <div className="flex font-semibold text-sm border-b pb-1">
          <div className="flex-1">Ingredient / Recipe</div>
          <div className="w-24 text-right">Yield %</div>
          <div className="w-24 text-right">Cost</div>
        </div>
        {ingredients.map((item, index) => (
          <div key={index} className="flex text-sm py-1 border-b">
            <div className="flex-1">{item.name}</div>
            <div className="w-24 text-right">100.00%</div>
            <div className="w-24 text-right">${item.cost.toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>Total Yield:</div>
        <div className="text-right">{totalYield} portion</div>
        <div>Total Cost:</div>
        <div className="text-right">${totalCost.toFixed(2)}</div>
        <div>Cost Per Portion:</div>
        <div className="text-right">${costPerPortion}</div>
      </div>

      {/* Cost Calculator */}
      <div className="border-t pt-4 mt-4">
        <h3 className="text-sm font-semibold mb-2">Food Cost Calculator</h3>
        <div className="grid grid-cols-5 text-sm text-center font-semibold border-b pb-1">
          <div>Portion Size</div>
          <div>Cost</div>
          <div>Sell Price</div>
          <div>Food Cost %</div>
          <div>Profit $</div>
        </div>
        <div className="grid grid-cols-5 text-sm text-center py-1">
          <div>{portionSize}</div>
          <div>${costPerPortion}</div>
          <div>${sellPrice}</div>
          <div>{foodCostPct}%</div>
          <div>${profit}</div>
        </div>
      </div>
    </div>
  );
}

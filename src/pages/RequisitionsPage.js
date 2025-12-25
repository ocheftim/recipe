import React, { useState } from 'react';
import { quickBreadsRecipes } from '../data/quickBreadsRecipes';
import { shamrockMapping } from '../data/shamrockMapping';

const RequisitionsPage = () => {
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [scalingFactors, setScalingFactors] = useState({});
  const [expandedRecipes, setExpandedRecipes] = useState({});

  // Toggle recipe selection
  const toggleRecipeSelection = (recipeId) => {
    setSelectedRecipes(prev => {
      if (prev.includes(recipeId)) {
        // Remove recipe and its scaling factor
        const newScaling = { ...scalingFactors };
        delete newScaling[recipeId];
        setScalingFactors(newScaling);
        return prev.filter(id => id !== recipeId);
      } else {
        // Add recipe with default scaling of 1
        setScalingFactors(prev => ({ ...prev, [recipeId]: 1 }));
        return [...prev, recipeId];
      }
    });
  };

  // Update scaling factor for a recipe
  const updateScaling = (recipeId, factor) => {
    const numFactor = parseFloat(factor);
    if (numFactor > 0 && numFactor <= 10) {
      setScalingFactors(prev => ({ ...prev, [recipeId]: numFactor }));
    }
  };

  // Toggle recipe details expansion
  const toggleRecipeExpansion = (recipeId) => {
    setExpandedRecipes(prev => ({
      ...prev,
      [recipeId]: !prev[recipeId]
    }));
  };

  // Generate requisition with scaling
  const generateRequisition = () => {
    const requisition = [];
    const itemMap = new Map();

    selectedRecipes.forEach(recipeId => {
      const recipe = quickBreadsRecipes.find(r => r.id === recipeId);
      const scaleFactor = scalingFactors[recipeId] || 1;

      recipe.ingredients.forEach(ingredient => {
        const shamrockItem = shamrockMapping[ingredient.name];
        if (shamrockItem) {
          const scaledQuantity = ingredient.quantity * scaleFactor;
          const key = shamrockItem.itemCode;

          if (itemMap.has(key)) {
            const existing = itemMap.get(key);
            existing.quantity += scaledQuantity;
            existing.recipes.add(recipe.name);
          } else {
            itemMap.set(key, {
              ...shamrockItem,
              quantity: scaledQuantity,
              unit: ingredient.unit,
              recipes: new Set([recipe.name])
            });
          }
        }
      });
    });

    return Array.from(itemMap.values()).map(item => ({
      ...item,
      recipes: Array.from(item.recipes),
      totalCost: (item.quantity * item.pricePerUnit).toFixed(2)
    }));
  };

  const requisitionItems = generateRequisition();
  const totalCost = requisitionItems.reduce((sum, item) => sum + parseFloat(item.totalCost), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with proper spacing from left menu */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="pl-8 pr-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Lab Requisitions</h1>
          <p className="text-gray-600 mt-2">
            CUL 140 Week 3: Quick Breads - Select recipes and generate Shamrock Foods requisitions
          </p>
        </div>
      </div>

      <div className="pl-8 pr-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recipe Selection Panel */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Select Recipes ({selectedRecipes.length} selected)
            </h2>

            {quickBreadsRecipes.map(recipe => {
              const isSelected = selectedRecipes.includes(recipe.id);
              const isExpanded = expandedRecipes[recipe.id];
              const scaleFactor = scalingFactors[recipe.id] || 1;

              return (
                <div
                  key={recipe.id}
                  className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
                    isSelected ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  {/* Recipe Header */}
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRecipeSelection(recipe.id)}
                          className="mt-1 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{recipe.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Yields: {recipe.yield} • Prep: {recipe.prepTime} • Bake: {recipe.bakeTime}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleRecipeExpansion(recipe.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium ml-2"
                      >
                        {isExpanded ? 'Hide' : 'Show'} Recipe
                      </button>
                    </div>

                    {/* Scaling Controls (only when selected) */}
                    {isSelected && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Scale Recipe (multiply by):
                        </label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="range"
                            min="0.5"
                            max="5"
                            step="0.5"
                            value={scaleFactor}
                            onChange={(e) => updateScaling(recipe.id, e.target.value)}
                            className="flex-1"
                          />
                          <input
                            type="number"
                            min="0.5"
                            max="10"
                            step="0.5"
                            value={scaleFactor}
                            onChange={(e) => updateScaling(recipe.id, e.target.value)}
                            className="w-20 px-3 py-1 border border-gray-300 rounded-md text-center"
                          />
                          <span className="text-sm text-gray-600">
                            = {(recipe.yieldAmount * scaleFactor).toFixed(1)} {recipe.yieldUnit}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Expanded Recipe Details */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-4">
                      {/* Ingredients */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Ingredients:</h4>
                        <ul className="space-y-1">
                          {recipe.ingredients.map((ing, idx) => {
                            const displayQty = isSelected 
                              ? (ing.quantity * scaleFactor).toFixed(2)
                              : ing.quantity;
                            return (
                              <li key={idx} className="text-sm text-gray-700">
                                <span className="font-medium">{displayQty} {ing.unit}</span> {ing.name}
                                {ing.notes && <span className="text-gray-500"> ({ing.notes})</span>}
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Instructions */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Instructions:</h4>
                        <ol className="space-y-2">
                          {recipe.instructions.map((step, idx) => (
                            <li key={idx} className="text-sm text-gray-700">
                              <span className="font-medium text-blue-600">{idx + 1}.</span> {step}
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Notes */}
                      {recipe.notes && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                          <h4 className="font-semibold text-gray-900 mb-1">Chef's Notes:</h4>
                          <p className="text-sm text-gray-700">{recipe.notes}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Requisition Preview Panel */}
          <div className="lg:sticky lg:top-6 h-fit">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Shamrock Foods Requisition
              </h2>

              {selectedRecipes.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p>Select recipes to generate requisition</p>
                </div>
              ) : (
                <div>
                  {/* Requisition Items */}
                  <div className="space-y-3 mb-6">
                    {requisitionItems.map((item, idx) => (
                      <div key={idx} className="border-b border-gray-200 pb-3">
                        <div className="flex justify-between items-start mb-1">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.productName}</h4>
                            <p className="text-xs text-gray-500">
                              Item: {item.itemCode} • Pack: {item.packSize}
                            </p>
                          </div>
                          <span className="font-semibold text-gray-900 ml-2">
                            ${item.totalCost}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>
                            {item.quantity.toFixed(2)} {item.unit} × ${item.pricePerUnit.toFixed(2)}/{item.unit}
                          </span>
                          <span className="text-xs text-gray-500">
                            Used in: {item.recipes.join(', ')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t-2 border-gray-300 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-gray-900">Total Cost:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        ${totalCost.toFixed(2)}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                        Export to Shamrock Foods
                      </button>
                      <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
                        Print Requisition
                      </button>
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedRecipes.length}
                      </div>
                      <div className="text-xs text-gray-600">Recipes</div>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-2xl font-bold text-blue-600">
                        {requisitionItems.length}
                      </div>
                      <div className="text-xs text-gray-600">Items</div>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-2xl font-bold text-blue-600">
                        {Object.values(scalingFactors).reduce((sum, factor) => sum + factor, 0).toFixed(1)}x
                      </div>
                      <div className="text-xs text-gray-600">Total Scale</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequisitionsPage;
import React, { useState } from 'react';
import { quickBreadsRecipes } from '../data/quickBreadsRecipes';

const RecipeScalingPage = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(quickBreadsRecipes[0]?.id || null);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [targetYield, setTargetYield] = useState(null);

  const recipe = quickBreadsRecipes.find(r => r.id === selectedRecipe);

  // Update scale factor when target yield changes
  const handleTargetYieldChange = (value) => {
    const numValue = parseFloat(value);
    if (!recipe || !numValue || numValue <= 0) {
      setTargetYield(null);
      return;
    }
    setTargetYield(numValue);
    setScaleFactor(numValue / recipe.yieldAmount);
  };

  // Update target yield when scale factor changes
  const handleScaleFactorChange = (value) => {
    const numValue = parseFloat(value);
    if (!numValue || numValue <= 0) return;
    setScaleFactor(numValue);
    if (recipe) {
      setTargetYield(recipe.yieldAmount * numValue);
    }
  };

  // Common scaling presets
  const presets = [
    { label: 'Half Batch', factor: 0.5 },
    { label: 'Single Batch', factor: 1 },
    { label: 'Double Batch', factor: 2 },
    { label: 'Triple Batch', factor: 3 },
    { label: 'Quad Batch', factor: 4 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="pl-8 pr-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Recipe Scaling</h1>
          <p className="text-gray-600 mt-2">
            Scale recipes to any size with automatic ingredient adjustments
          </p>
        </div>
      </div>

      <div className="pl-8 pr-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {/* Recipe Selector */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Recipe
              </label>
              <select
                value={selectedRecipe}
                onChange={(e) => {
                  setSelectedRecipe(e.target.value);
                  const newRecipe = quickBreadsRecipes.find(r => r.id === e.target.value);
                  if (newRecipe) {
                    setTargetYield(newRecipe.yieldAmount * scaleFactor);
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {quickBreadsRecipes.map(recipe => (
                  <option key={recipe.id} value={recipe.id}>
                    {recipe.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Quick Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {presets.map(preset => (
                  <button
                    key={preset.label}
                    onClick={() => handleScaleFactorChange(preset.factor)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      Math.abs(scaleFactor - preset.factor) < 0.01
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scale Factor Control */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scale Factor (Multiplier)
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="0.25"
                  max="10"
                  step="0.25"
                  value={scaleFactor}
                  onChange={(e) => handleScaleFactorChange(e.target.value)}
                  className="flex-1"
                />
                <input
                  type="number"
                  min="0.1"
                  max="20"
                  step="0.1"
                  value={scaleFactor.toFixed(2)}
                  onChange={(e) => handleScaleFactorChange(e.target.value)}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center"
                />
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {scaleFactor > 1 ? (
                  <span className="text-green-600">Scaling up {scaleFactor.toFixed(1)}x</span>
                ) : scaleFactor < 1 ? (
                  <span className="text-orange-600">Scaling down {scaleFactor.toFixed(1)}x</span>
                ) : (
                  <span className="text-blue-600">Original recipe (1x)</span>
                )}
              </div>
            </div>

            {/* Target Yield Control */}
            {recipe && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Yield
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    min="1"
                    value={targetYield || recipe.yieldAmount * scaleFactor}
                    onChange={(e) => handleTargetYieldChange(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    {recipe.yieldUnit}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Original: {recipe.yieldAmount} {recipe.yieldUnit}
                </div>
              </div>
            )}

            {/* Yield Summary Card */}
            {recipe && (
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-sm p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">Yield Summary</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm opacity-90">Original Recipe</div>
                    <div className="text-2xl font-bold">
                      {recipe.yieldAmount} {recipe.yieldUnit}
                    </div>
                  </div>
                  <div className="border-t border-green-400 pt-3">
                    <div className="text-sm opacity-90">Scaled Recipe</div>
                    <div className="text-3xl font-bold">
                      {(recipe.yieldAmount * scaleFactor).toFixed(1)} {recipe.yieldUnit}
                    </div>
                  </div>
                  <div className="border-t border-green-400 pt-3">
                    <div className="text-sm opacity-90">Scale Factor</div>
                    <div className="text-xl font-semibold">{scaleFactor.toFixed(2)}x</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Recipe Display */}
          <div className="lg:col-span-2 space-y-6">
            {recipe && (
              <>
                {/* Recipe Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{recipe.name}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>Prep: {recipe.prepTime}</span>
                    <span>•</span>
                    <span>Bake: {recipe.bakeTime}</span>
                    <span>•</span>
                    <span>Temp: {recipe.temperature}</span>
                  </div>
                  {scaleFactor !== 1 && (
                    <div className="mt-3 inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      Scaled to {(recipe.yieldAmount * scaleFactor).toFixed(1)} {recipe.yieldUnit}
                    </div>
                  )}
                </div>

                {/* Scaled Ingredients */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Ingredients
                  </h3>
                  <div className="space-y-2">
                    {recipe.ingredients.map((ing, idx) => {
                      const scaledQty = (ing.quantity * scaleFactor).toFixed(2);
                      const originalQty = ing.quantity;
                      
                      return (
                        <div
                          key={idx}
                          className="flex items-start py-2 border-b border-gray-100 last:border-0"
                        >
                          <span className="text-blue-600 font-bold mr-3 mt-1">•</span>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">
                              <span className="text-blue-600">{scaledQty} {ing.unit}</span> {ing.name}
                              {ing.notes && (
                                <span className="text-gray-500 italic text-sm"> ({ing.notes})</span>
                              )}
                            </div>
                            {scaleFactor !== 1 && (
                              <div className="text-xs text-gray-500 mt-1">
                                Original: {originalQty} {ing.unit}
                                {scaleFactor > 1 && (
                                  <span className="text-green-600 ml-2">
                                    (+{(scaledQty - originalQty).toFixed(2)} {ing.unit})
                                  </span>
                                )}
                                {scaleFactor < 1 && (
                                  <span className="text-orange-600 ml-2">
                                    ({(scaledQty - originalQty).toFixed(2)} {ing.unit})
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Instructions
                  </h3>
                  <ol className="space-y-3">
                    {recipe.instructions.map((step, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="font-bold text-green-600 mr-3 min-w-[2rem]">
                          {idx + 1}.
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Chef's Notes */}
                {recipe.notes && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Chef's Notes
                    </h4>
                    <p className="text-sm text-yellow-900">{recipe.notes}</p>
                  </div>
                )}

                {/* Scaling Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Scaling Tips</h4>
                  <ul className="text-sm text-blue-900 space-y-1">
                    <li>• Baking times may need adjustment for larger/smaller batches</li>
                    <li>• Pan sizes may need to change with different yields</li>
                    <li>• Temperature usually stays the same regardless of scale</li>
                    <li>• Very small scales (below 0.5x) may affect texture and rise</li>
                    <li>• Very large scales (above 5x) work best when split into multiple batches</li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Print Scaled Recipe
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition">
                    Export to Requisition
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeScalingPage;
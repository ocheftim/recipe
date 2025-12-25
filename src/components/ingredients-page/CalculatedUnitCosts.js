// src/components/ingredients-page/CalculatedUnitCosts.js
// Enhanced with simple volume conversions

import React, { useState, useEffect } from 'react';
import { calculateUnitCosts, calculateRecipeImpact } from '../../utils/costCalculator';
import { formatCurrency } from '../../utils/formatters';
import { calculateVolumeCosts } from '../../utils/ingredientConversions';

const CalculatedUnitCosts = ({ 
  ingredientData, 
  parsedCaseData, 
  casePrice, 
  onCostUpdate,
  recipes = [],
  className = '' 
}) => {
  const [calculations, setCalculations] = useState(null);
  const [dualUnitCalculations, setDualUnitCalculations] = useState(null);
  const [volumeCalculations, setVolumeCalculations] = useState(null);  // ✅ NEW
  const [yieldFactor, setYieldFactor] = useState(1.0);
  const [showRecipeImpact, setShowRecipeImpact] = useState(false);
  const [recipeImpacts, setRecipeImpacts] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIngredientType, setSelectedIngredientType] = useState('flour');  // ✅ NEW
  const [showVolumeConversions, setShowVolumeConversions] = useState(false);    // ✅ NEW: Make it collapsible

  // ✅ FIXED: Simplified calculation logic
  useEffect(() => {
    if (!parsedCaseData || !casePrice || casePrice <= 0) {
      setCalculations(null);
      setDualUnitCalculations(null);
      setIsCalculating(false);
      return;
    }

    setIsCalculating(true);
    setError(null);

    // Use setTimeout to prevent blocking and show loading state
    const timeoutId = setTimeout(() => {
      try {
        console.log('Starting calculations with:', { parsedCaseData, casePrice, yieldFactor });

        // ✅ ENHANCED: Handle dual-unit calculations
        if (parsedCaseData.isDualUnit && parsedCaseData.secondaryQuantity) {
          const dualCalcs = calculateSimpleDualUnit(parsedCaseData, casePrice, yieldFactor);
          setDualUnitCalculations(dualCalcs);
          console.log('Dual-unit calculations completed:', dualCalcs);
        } else {
          setDualUnitCalculations(null);
        }
        
        // Standard calculations
        const newCalculations = calculateUnitCosts(parsedCaseData, casePrice, yieldFactor);
        setCalculations(newCalculations);
        console.log('Standard calculations completed:', newCalculations);
        
        // ✅ NEW: Volume calculations for weight-based ingredients  
        if (parsedCaseData.caseUnit === 'lbs' && newCalculations?.costs?.perPound) {
          const volumeCalcs = calculateVolumeCosts(newCalculations.costs.perPound, selectedIngredientType);
          setVolumeCalculations(volumeCalcs);
          console.log('Volume calculations completed:', volumeCalcs);
        } else {
          setVolumeCalculations(null);
        }
        
        // Notify parent component of cost updates
        if (newCalculations && onCostUpdate) {
          onCostUpdate(newCalculations);
        }
        
        setIsCalculating(false);
        
      } catch (error) {
        console.error('Calculation error:', error);
        setError('Error calculating costs: ' + error.message);
        setIsCalculating(false);
      }
    }, 300);

    // Cleanup timeout on unmount or dependency change
    return () => clearTimeout(timeoutId);
  }, [parsedCaseData, casePrice, yieldFactor, selectedIngredientType]); // ✅ UPDATED: Added selectedIngredientType

  // ✅ FIXED: Separate useEffect for recipe impacts to prevent loops
  useEffect(() => {
    if (calculations && recipes.length > 0) {
      try {
        const primaryCost = calculations.costs.perPound || 
                           calculations.costs.perFluidOunce || 
                           calculations.costs.perEach || 0;
        
        const impacts = calculateRecipeImpact(recipes, primaryCost, 'lb');
        setRecipeImpacts(impacts);
      } catch (error) {
        console.error('Recipe impact calculation error:', error);
      }
    }
  }, [calculations, recipes]);

  // ✅ SIMPLIFIED: Local dual-unit calculation function
  const calculateSimpleDualUnit = (caseData, price, yieldValue = 1.0) => {
    try {
      const primaryCost = (price / caseData.caseQuantity) / yieldValue;
      const secondaryCost = (price / caseData.secondaryQuantity) / yieldValue;
      
      return {
        casePrice: price,
        yieldFactor: yieldValue,
        primaryUnit: {
          quantity: caseData.caseQuantity,
          unit: caseData.caseUnit,
          costPerUnit: primaryCost
        },
        secondaryUnit: {
          quantity: caseData.secondaryQuantity,
          unit: caseData.secondaryUnit,
          costPerUnit: secondaryCost
        },
        conversions: {
          weightPerPiece: caseData.secondaryQuantity / caseData.caseQuantity,
          piecesPerPound: caseData.caseQuantity / caseData.secondaryQuantity
        }
      };
    } catch (error) {
      console.error('Dual unit calculation error:', error);
      return null;
    }
  };

  const handleYieldChange = (e) => {
    const newYield = parseFloat(e.target.value) / 100;
    setYieldFactor(newYield);
  };

  const DualUnitCostCard = ({ dualCalcs }) => {
    if (!dualCalcs) return null;

    return (
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200 p-4 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🔄</span>
          <h4 className="font-semibold text-gray-900">Dual-Unit Costing</h4>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
            Multi-Purpose Ingredient
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Count-Based Costing */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🔢</span>
              <h5 className="font-semibold text-gray-800">Count-Based</h5>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                For portioning
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Per {dualCalcs.primaryUnit.unit}:</span>
                <span className="font-medium">{formatCurrency(dualCalcs.primaryUnit.costPerUnit)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Per dozen:</span>
                <span className="font-medium">{formatCurrency(dualCalcs.primaryUnit.costPerUnit * 12)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Per 100 count:</span>
                <span className="font-medium">{formatCurrency(dualCalcs.primaryUnit.costPerUnit * 100)}</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Use for: Baked potatoes, individual portions, exact counts
              </p>
            </div>
          </div>

          {/* Weight-Based Costing */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">⚖️</span>
              <h5 className="font-semibold text-gray-800">Weight-Based</h5>
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                For recipes
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Per {dualCalcs.secondaryUnit.unit}:</span>
                <span className="font-medium">{formatCurrency(dualCalcs.secondaryUnit.costPerUnit)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Per ounce:</span>
                <span className="font-medium">{formatCurrency(dualCalcs.secondaryUnit.costPerUnit / 16)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Per 5 lbs:</span>
                <span className="font-medium">{formatCurrency(dualCalcs.secondaryUnit.costPerUnit * 5)}</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Use for: Mashed potatoes, recipes by weight, prep planning
              </p>
            </div>
          </div>
        </div>

        {/* Cross-Conversions */}
        {dualCalcs.conversions && (
          <div className="mt-4 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
            <h6 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
              🔄 Conversion Factors
            </h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-yellow-700">Average weight per piece:</span>
                <span className="font-medium">{dualCalcs.conversions.weightPerPiece.toFixed(2)} lbs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-700">Pieces per pound:</span>
                <span className="font-medium">{dualCalcs.conversions.piecesPerPound.toFixed(1)} count</span>
              </div>
            </div>
            <p className="text-xs text-yellow-600 mt-2">
              Helpful for converting between recipe requirements and purchasing units
            </p>
          </div>
        )}
      </div>
    );
  };

  const CostDisplayCard = ({ title, costs, icon }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{icon}</span>
        <h4 className="font-semibold text-gray-900">{title}</h4>
      </div>
      <div className="space-y-2">
        {Object.entries(costs).map(([unit, cost]) => (
          <div key={unit} className="flex justify-between text-sm">
            <span className="text-gray-600 capitalize">
              {unit.replace(/([A-Z])/g, ' $1').replace(/^per /, '').trim()}:
            </span>
            <span className="font-medium text-gray-900">
              {formatCurrency(cost)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  if (!parsedCaseData || !casePrice) {
    return (
      <div className={`bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center ${className}`}>
        <div className="text-gray-400 mb-2">📊</div>
        <p className="text-gray-500 text-sm">
          Parse case description and enter price to see calculated unit costs
        </p>
      </div>
    );
  }

  if (isCalculating) {
    return (
      <div className={`bg-blue-50 rounded-lg border border-blue-200 p-6 text-center ${className}`}>
        <div className="animate-spin text-blue-500 mb-2">⚙️</div>
        <p className="text-blue-700 text-sm">Calculating unit costs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 rounded-lg border border-red-200 p-6 text-center ${className}`}>
        <div className="text-red-400 mb-2">⚠️</div>
        <p className="text-red-600 text-sm">{error}</p>
        <button 
          onClick={() => {
            setError(null);
            setIsCalculating(false);
          }}
          className="mt-2 text-xs text-blue-600 hover:text-blue-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!calculations && !dualUnitCalculations) {
    return (
      <div className={`bg-red-50 rounded-lg border border-red-200 p-6 text-center ${className}`}>
        <div className="text-red-400 mb-2">⚠️</div>
        <p className="text-red-600 text-sm">
          Unable to calculate costs. Check case data and price.
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* ✅ ENHANCED: Dual-Unit Display */}
      {dualUnitCalculations && (
        <DualUnitCostCard dualCalcs={dualUnitCalculations} />
      )}

      {/* Header with case summary */}
      <div className="bg-green-50 rounded-lg border border-green-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-green-900 flex items-center gap-2">
            ✅ Cost Calculation Complete
            {parsedCaseData.isDualUnit && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                Dual-Unit Detected
              </span>
            )}
          </h3>
          {yieldFactor < 1.0 && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              {Math.round(yieldFactor * 100)}% Yield Applied
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-green-600">Case Price:</span>
            <div className="font-semibold">{formatCurrency(casePrice)}</div>
          </div>
          <div>
            <span className="text-green-600">Primary Unit:</span>
            <div className="font-semibold">
              {parsedCaseData.caseQuantity} {parsedCaseData.caseUnit}
            </div>
          </div>
          {parsedCaseData.isDualUnit && (
            <>
              <div>
                <span className="text-green-600">Secondary Unit:</span>
                <div className="font-semibold">
                  {parsedCaseData.secondaryQuantity} {parsedCaseData.secondaryUnit}
                </div>
              </div>
              <div>
                <span className="text-green-600">Description:</span>
                <div className="font-semibold text-xs">{parsedCaseData.description || 'Dual-unit item'}</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Yield Factor Control */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Prep Yield Factor (accounts for trimming, waste, etc.)
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="50"
            max="100"
            value={yieldFactor * 100}
            onChange={handleYieldChange}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="50"
              max="100"
              value={Math.round(yieldFactor * 100)}
              onChange={(e) => setYieldFactor(parseFloat(e.target.value) / 100)}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
            />
            <span className="text-sm text-gray-600">%</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {parsedCaseData.isDualUnit ? 
            'Adjust for prep waste (e.g., 85% for potato peeling and trimming)' :
            'Adjust for ingredients that lose weight during prep (e.g., 80% for vegetables after trimming)'
          }
        </p>
      </div>

      {/* Standard Cost Display Cards (if not dual-unit or as supplement) */}
      {calculations && !parsedCaseData.isDualUnit && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.keys(calculations.costs).length > 0 && (
            <CostDisplayCard 
              title="Unit Costs" 
              costs={calculations.costs} 
              icon="💰"
            />
          )}
        </div>
      )}

      {/* ✅ NEW: Simple Volume Conversions - COLLAPSIBLE */}
      {volumeCalculations && parsedCaseData.caseUnit === 'lbs' && (
        <div className="bg-purple-50 rounded-lg border border-purple-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🥄</span>
              <h4 className="font-semibold text-purple-900">Recipe Volume Costs</h4>
            </div>
            <button
              type="button"
              onClick={() => setShowVolumeConversions(!showVolumeConversions)}
              className="text-sm text-purple-600 hover:text-purple-800"
            >
              {showVolumeConversions ? 'Hide' : 'Show'} Volume Costs
            </button>
          </div>

          {/* Quick Preview */}
          {!showVolumeConversions && (
            <div className="text-sm text-purple-700">
              Per cup: <strong>{formatCurrency(volumeCalculations.costPerCup)}</strong> • 
              Per tbsp: <strong>{formatCurrency(volumeCalculations.costPerTbsp)}</strong> • 
              <span className="text-purple-600">Click "Show" for details</span>
            </div>
          )}

          {/* Full Details */}
          {showVolumeConversions && (
            <>
              {/* Ingredient Type Selector */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-purple-700 mb-2">
                  Select ingredient type:
                </label>
                <select
                  value={selectedIngredientType}
                  onChange={(e) => setSelectedIngredientType(e.target.value)}
                  className="px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="flour">All-Purpose Flour</option>
                  <option value="sugar">Granulated Sugar</option>
                  <option value="brown sugar">Brown Sugar (packed)</option>
                  <option value="salt">Table Salt</option>
                  <option value="rice">White Rice</option>
                  <option value="oats">Rolled Oats</option>
                  <option value="cocoa">Cocoa Powder</option>
                </select>
              </div>

              {/* Volume Cost Display */}
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <div className="font-semibold text-purple-900">Per Cup</div>
                    <div className="text-lg font-bold text-purple-700">
                      {formatCurrency(volumeCalculations.costPerCup)}
                    </div>
                  </div>
                  
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <div className="font-semibold text-purple-900">Per Tbsp</div>
                    <div className="text-lg font-bold text-purple-700">
                      {formatCurrency(volumeCalculations.costPerTbsp)}
                    </div>
                  </div>
                  
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <div className="font-semibold text-purple-900">Per Tsp</div>
                    <div className="text-lg font-bold text-purple-700">
                      {formatCurrency(volumeCalculations.costPerTsp)}
                    </div>
                  </div>
                  
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <div className="font-semibold text-purple-900">Cups/Pound</div>
                    <div className="text-lg font-bold text-purple-700">
                      {volumeCalculations.cupsPerPound}
                    </div>
                  </div>
                </div>

                {/* Recipe Examples */}
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <h6 className="font-semibold text-blue-900 mb-2">💡 Recipe Examples:</h6>
                  <div className="space-y-1 text-sm text-blue-800">
                    <div>• "3 cups {selectedIngredientType}" → <strong>{formatCurrency(volumeCalculations.costPerCup * 3)}</strong></div>
                    <div>• "2 tbsp {selectedIngredientType}" → <strong>{formatCurrency(volumeCalculations.costPerTbsp * 2)}</strong></div>
                    <div>• "1 tsp {selectedIngredientType}" → <strong>{formatCurrency(volumeCalculations.costPerTsp * 1)}</strong></div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Recipe Impact Section */}
      {recipes.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              🍽️ Recipe Cost Impact ({recipes.length} recipes)
            </h4>
            <button
              onClick={() => setShowRecipeImpact(!showRecipeImpact)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {showRecipeImpact ? 'Hide' : 'Show'} Details
            </button>
          </div>
          
          {showRecipeImpact && recipeImpacts.length > 0 && (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {recipeImpacts.map((recipe, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-sm font-medium">{recipe.name}</span>
                  <div className="text-right">
                    <div className="text-sm">{formatCurrency(recipe.costPerServing)}/serving</div>
                    {recipe.costChange !== 0 && (
                      <div className={`text-xs ${recipe.costChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {recipe.costChange > 0 ? '+' : ''}{formatCurrency(recipe.costChange)} change
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Enhanced Quick Actions */}
      <div className="flex gap-2 text-sm flex-wrap">
        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
          📋 Copy Costs
        </button>
        <button className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors">
          💾 Save to History
        </button>
        {parsedCaseData.isDualUnit && (
          <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors">
            🔄 Export Conversions
          </button>
        )}
      </div>

      {/* Educational Tip for Dual-Unit */}
      {parsedCaseData.isDualUnit && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <span className="text-blue-500 text-lg">💡</span>
            <div>
              <h5 className="font-semibold text-blue-900 mb-1">Pro Tip: Dual-Unit Costing</h5>
              <p className="text-sm text-blue-800">
                This ingredient can be costed two ways. Use <strong>count-based</strong> costing for portion control 
                (like baked potatoes) and <strong>weight-based</strong> costing for recipes that call for amounts by weight 
                (like mashed potatoes, soups, or stews).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatedUnitCosts;
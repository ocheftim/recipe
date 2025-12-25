// src/components/common/CostCalculatorWidget.js
// Reusable cost calculator using the extracted cost calculations hook
import React, { useState } from 'react';
import useIngredientCostCalculations from '../../hooks/useIngredientCostCalculations';

// ToqueWorks Brand Colors
const THEME = {
  gunmetal: '#1F2D38',
  charcoal: '#2A3E51',
  silver: '#BBBFC2',
  yellowGreen: '#8AC732',
  teaGreen: '#C0E095',
  seasalt: '#F6F8F8',
  white: '#FFFFFF'
};

const CostCalculatorWidget = ({ 
  onCostCalculated,
  className = "",
  title = "Quick Cost Calculator" 
}) => {
  const [formData, setFormData] = useState({
    caseConfiguration: '',
    caseQuantity: '',
    caseUnit: '',
    casePrice: ''
  });

  const {
    parsedCaseData,
    isParsingCase,
    parseSuccess,
    parseError,
    costCalculations,
    handleParseCaseDescription,
    clearParsedData,
    formatCost,
    canCalculateCosts
  } = useIngredientCostCalculations(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCalculateComplete = () => {
    if (costCalculations && onCostCalculated) {
      onCostCalculated(costCalculations);
    }
  };

  return (
    <div
      className={`rounded-lg p-4 border ${className}`}
      style={{
        backgroundColor: THEME.white,
        borderColor: THEME.silver
      }}
    >
      <h3
        className="font-semibold mb-4 flex items-center gap-2"
        style={{ color: THEME.gunmetal }}
      >
        🧮 {title}
      </h3>

      <div className="space-y-4">
        {/* Case Configuration Input */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: THEME.gunmetal }}
          >
            Case Configuration
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="caseConfiguration"
              value={formData.caseConfiguration}
              onChange={handleInputChange}
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              style={{
                borderColor: THEME.silver,
                focusRingColor: THEME.yellowGreen
              }}
              placeholder="e.g., 36/1#, 1/25LB, 120 count"
            />
            <button
              type="button"
              onClick={handleParseCaseDescription}
              disabled={isParsingCase || !formData.caseConfiguration.trim()}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isParsingCase ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
              }`}
              style={{
                backgroundColor: THEME.yellowGreen,
                color: THEME.white
              }}
            >
              {isParsingCase ? '...' : 'Parse'}
            </button>
          </div>

          {parseSuccess && (
            <div
              className="mt-1 p-2 border rounded text-xs"
              style={{
                backgroundColor: THEME.teaGreen,
                borderColor: THEME.yellowGreen,
                color: THEME.gunmetal
              }}
            >
              ✓ Parsed successfully!
            </div>
          )}

          {parseError && (
            <div className="mt-1 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-xs">
              {parseError}
            </div>
          )}
        </div>

        {/* Manual Input Fields */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label
              className="block text-xs font-medium mb-1"
              style={{ color: THEME.gunmetal }}
            >
              Quantity
            </label>
            <input
              type="number"
              step="0.01"
              name="caseQuantity"
              value={formData.caseQuantity}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1"
              style={{
                borderColor: THEME.silver,
                focusRingColor: THEME.yellowGreen
              }}
              placeholder="36"
            />
          </div>
          <div>
            <label
              className="block text-xs font-medium mb-1"
              style={{ color: THEME.gunmetal }}
            >
              Unit
            </label>
            <input
              type="text"
              name="caseUnit"
              value={formData.caseUnit}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1"
              style={{
                borderColor: THEME.silver,
                focusRingColor: THEME.yellowGreen
              }}
              placeholder="lbs"
            />
          </div>
          <div>
            <label
              className="block text-xs font-medium mb-1"
              style={{ color: THEME.gunmetal }}
            >
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              name="casePrice"
              value={formData.casePrice}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1"
              style={{
                borderColor: THEME.silver,
                focusRingColor: THEME.yellowGreen
              }}
              placeholder="48.50"
            />
          </div>
        </div>

        {/* Cost Results */}
        {canCalculateCosts && costCalculations && (
          <div
            className="rounded p-3 border"
            style={{
              backgroundColor: THEME.seasalt,
              borderColor: THEME.silver
            }}
          >
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span
                  className="font-medium"
                  style={{ color: THEME.charcoal }}
                >
                  AP Cost:
                </span>
                <span
                  className="ml-1 font-bold"
                  style={{ color: THEME.yellowGreen }}
                >
                  {formatCost(costCalculations.apCost)} / {costCalculations.apUnit}
                </span>
              </div>
              
              {costCalculations.costPerPound && (
                <div>
                  <span
                    className="font-medium"
                    style={{ color: THEME.charcoal }}
                  >
                    Per lb:
                  </span>
                  <span
                    className="ml-1 font-bold"
                    style={{ color: THEME.yellowGreen }}
                  >
                    {formatCost(costCalculations.costPerPound)}
                  </span>
                </div>
              )}
              
              {costCalculations.costPerOunce && (
                <div>
                  <span
                    className="font-medium"
                    style={{ color: THEME.charcoal }}
                  >
                    Per oz:
                  </span>
                  <span
                    className="ml-1 font-bold"
                    style={{ color: THEME.yellowGreen }}
                  >
                    {formatCost(costCalculations.costPerOunce)}
                  </span>
                </div>
              )}
            </div>

            {onCostCalculated && (
              <button
                type="button"
                onClick={handleCalculateComplete}
                className="mt-2 w-full px-3 py-1 rounded text-sm font-medium transition-colors hover:opacity-90"
                style={{
                  backgroundColor: THEME.yellowGreen,
                  color: THEME.white
                }}
              >
                Use This Calculation
              </button>
            )}
          </div>
        )}

        {parsedCaseData && (
          <button
            type="button"
            onClick={clearParsedData}
            className="text-xs hover:underline"
            style={{ color: THEME.charcoal }}
          >
            Clear & Start Over
          </button>
        )}
      </div>
    </div>
  );
};

export default CostCalculatorWidget;
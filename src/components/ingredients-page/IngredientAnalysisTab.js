// src/components/ingredients-page/IngredientAnalysisTab.js
// Enhanced Cost Analysis tab with ToqueWorks cost calculations
import React from 'react';
import CalculatedUnitCosts from './CalculatedUnitCosts';

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

const IngredientAnalysisTab = ({
  formData,
  parsedCaseData,
  handleCostUpdate,
  filteredRecipes,
  costCalculations,
  formatCost,
  getCostSummary
}) => {
  const costSummary = getCostSummary?.();

  return (
    <div className="space-y-6 max-h-full overflow-y-auto">
      {/* Cost Summary Card */}
      {costSummary && (
        <div
          className="rounded-lg p-4 border"
          style={{
            backgroundColor: THEME.seasalt,
            borderColor: THEME.silver
          }}
        >
          <h3
            className="font-semibold mb-3 flex items-center gap-2"
            style={{ color: THEME.gunmetal }}
          >
            📊 Cost Analysis Summary
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <p
                className="text-sm font-medium"
                style={{ color: THEME.charcoal }}
              >
                Case Information
              </p>
              <p
                className="text-lg font-semibold"
                style={{ color: THEME.gunmetal }}
              >
                {costSummary.caseInfo}
              </p>
            </div>
            
            <div className="text-center">
              <p
                className="text-sm font-medium"
                style={{ color: THEME.charcoal }}
              >
                Case Price
              </p>
              <p
                className="text-lg font-semibold"
                style={{ color: THEME.yellowGreen }}
              >
                {costSummary.casePrice}
              </p>
            </div>
            
            <div className="text-center">
              <p
                className="text-sm font-medium"
                style={{ color: THEME.charcoal }}
              >
                Unit Cost (AP)
              </p>
              <p
                className="text-lg font-semibold"
                style={{ color: THEME.yellowGreen }}
              >
                {costSummary.unitCost} / {costSummary.unitType}
              </p>
            </div>
            
            <div className="text-center">
              <p
                className="text-sm font-medium"
                style={{ color: THEME.charcoal }}
              >
                Packaging
              </p>
              <p
                className="text-sm"
                style={{ color: THEME.gunmetal }}
              >
                {costSummary.efficiency}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Cost Breakdown */}
      {costCalculations && (
        <div
          className="rounded-lg p-4 border"
          style={{
            backgroundColor: THEME.white,
            borderColor: THEME.silver
          }}
        >
          <h3
            className="font-semibold mb-3"
            style={{ color: THEME.gunmetal }}
          >
            💰 Cost Breakdown by Unit
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {costCalculations.costPerPound && (
              <div
                className="p-3 rounded border"
                style={{ backgroundColor: THEME.seasalt, borderColor: THEME.silver }}
              >
                <p
                  className="text-sm font-medium"
                  style={{ color: THEME.charcoal }}
                >
                  Cost per Pound
                </p>
                <p
                  className="text-xl font-bold"
                  style={{ color: THEME.yellowGreen }}
                >
                  {formatCost ? formatCost(costCalculations.costPerPound) : `$${costCalculations.costPerPound.toFixed(4)}`}
                </p>
              </div>
            )}
            
            {costCalculations.costPerOunce && (
              <div
                className="p-3 rounded border"
                style={{ backgroundColor: THEME.seasalt, borderColor: THEME.silver }}
              >
                <p
                  className="text-sm font-medium"
                  style={{ color: THEME.charcoal }}
                >
                  Cost per Ounce
                </p>
                <p
                  className="text-xl font-bold"
                  style={{ color: THEME.yellowGreen }}
                >
                  {formatCost ? formatCost(costCalculations.costPerOunce) : `$${costCalculations.costPerOunce.toFixed(4)}`}
                </p>
              </div>
            )}
            
            {costCalculations.costPerEach && (
              <div
                className="p-3 rounded border"
                style={{ backgroundColor: THEME.seasalt, borderColor: THEME.silver }}
              >
                <p
                  className="text-sm font-medium"
                  style={{ color: THEME.charcoal }}
                >
                  Cost per Each
                </p>
                <p
                  className="text-xl font-bold"
                  style={{ color: THEME.yellowGreen }}
                >
                  {formatCost ? formatCost(costCalculations.costPerEach) : `$${costCalculations.costPerEach.toFixed(4)}`}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recipe Impact Analysis */}
      {filteredRecipes && filteredRecipes.length > 0 && (
        <div
          className="rounded-lg p-4 border"
          style={{
            backgroundColor: THEME.white,
            borderColor: THEME.silver
          }}
        >
          <h3
            className="font-semibold mb-3"
            style={{ color: THEME.gunmetal }}
          >
            🍽️ Recipe Impact ({filteredRecipes.length} recipe{filteredRecipes.length > 1 ? 's' : ''})
          </h3>
          
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {filteredRecipes.slice(0, 5).map((recipe, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 rounded"
                style={{ backgroundColor: THEME.seasalt }}
              >
                <span
                  className="font-medium"
                  style={{ color: THEME.gunmetal }}
                >
                  {recipe.name || `Recipe ${index + 1}`}
                </span>
                <span
                  className="text-sm"
                  style={{ color: THEME.charcoal }}
                >
                  Cost impact analysis available
                </span>
              </div>
            ))}
            {filteredRecipes.length > 5 && (
              <p
                className="text-sm text-center mt-2"
                style={{ color: THEME.charcoal }}
              >
                + {filteredRecipes.length - 5} more recipes
              </p>
            )}
          </div>
        </div>
      )}

      {/* Original CalculatedUnitCosts Component */}
      <div
        className="rounded-lg border"
        style={{ borderColor: THEME.silver }}
      >
        <div
          className="p-4 border-b"
          style={{
            backgroundColor: THEME.seasalt,
            borderColor: THEME.silver
          }}
        >
          <h3
            className="font-semibold"
            style={{ color: THEME.gunmetal }}
          >
            📈 Detailed Cost Calculations
          </h3>
        </div>
        
        <div className="p-4">
          <CalculatedUnitCosts
            ingredientData={formData}
            parsedCaseData={parsedCaseData}
            casePrice={parseFloat(formData.casePrice) || 0}
            onCostUpdate={handleCostUpdate}
            recipes={filteredRecipes}
          />
        </div>
      </div>
    </div>
  );
};

export default IngredientAnalysisTab;
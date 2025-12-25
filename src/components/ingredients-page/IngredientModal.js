// src/components/ingredients-page/IngredientModal.js
// ToqueWorks styled modal with extracted tab components
import React from 'react';
import useIngredientModalState from '../../hooks/useIngredientModalState';

// Tab Components
import IngredientBasicTab from './IngredientBasicTab';
import IngredientPurchasingTab from './IngredientPurchasingTab';
import IngredientInventoryTab from './IngredientInventoryTab';
import IngredientAnalysisTab from './IngredientAnalysisTab';

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

const IngredientModal = ({
  isOpen,
  onClose,
  ingredient = null,
  onSave,
  suppliers = [],
  categories = [],
  recipes = [],
  isLoading = false,
  error = null
}) => {
  // All state management extracted to custom hook
  const {
    formData,
    formErrors,
    touched,
    isDirty,
    parsedCaseData,
    calculatedCosts,
    showCostCalculations,
    isParsingCase,
    parseSuccess,
    parseError,
    activeTab,
    setActiveTab,
    handleInputChange,
    handleBlur,
    handleParseCaseDescription,
    clearParsedData,
    handleCostUpdate,
    handleSubmit,
    handleClose,
    getFieldError,
    isFormValid,
    hasValidationErrors,
    validationErrorCount,
    filteredRecipes,
    costCalculations
  } = useIngredientModalState(ingredient, onSave, onClose, recipes);

  // Import cost calculation utilities
  const formatCost = (cost) => {
    if (typeof cost !== 'number' || isNaN(cost)) return '$0.00';
    return `${cost.toFixed(cost < 1 ? 4 : 2)}`;
  };

  const getCostSummary = () => {
    if (!costCalculations) return null;
    return {
      caseInfo: `${costCalculations.caseQuantity} ${costCalculations.caseUnit} case`,
      casePrice: formatCost(costCalculations.casePrice),
      unitCost: formatCost(costCalculations.apCost),
      unitType: costCalculations.apUnit,
      efficiency: costCalculations.caseQuantity > 1 ? 'Bulk packaging' : 'Individual units'
    };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
      <div
        className="rounded-lg shadow-xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col"
        style={{ backgroundColor: THEME.white }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{
            backgroundColor: THEME.seasalt,
            borderColor: THEME.silver
          }}
        >
          <div>
            <h2
              className="text-xl font-semibold"
              style={{ color: THEME.gunmetal }}
            >
              {ingredient ? 'Edit Ingredient' : 'Add New Ingredient'}
            </h2>
            {ingredient && (
              <p
                className="text-sm mt-1"
                style={{ color: THEME.charcoal }}
              >
                Last updated: {ingredient.lastUpdatedDate || new Date(ingredient.lastUpdated || Date.now()).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {isDirty && (
              <span
                className="text-xs px-2 py-1 rounded text-xs font-medium"
                style={{
                  backgroundColor: THEME.teaGreen,
                  color: THEME.gunmetal
                }}
              >
                Unsaved changes
              </span>
            )}
            <button
              onClick={handleClose}
              className="text-2xl p-1 rounded hover:bg-gray-100 transition-colors"
              style={{ color: THEME.charcoal }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          className="border-b"
          style={{
            backgroundColor: THEME.seasalt,
            borderColor: THEME.silver
          }}
        >
          <nav className="flex space-x-8 px-6">
            <button
              type="button"
              onClick={() => setActiveTab('basic')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'basic'
                  ? 'border-current'
                  : 'border-transparent hover:border-gray-300'
              }`}
              style={{
                color: activeTab === 'basic' ? THEME.yellowGreen : THEME.charcoal
              }}
            >
              Basic Information
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('purchasing')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'purchasing'
                  ? 'border-current'
                  : 'border-transparent hover:border-gray-300'
              }`}
              style={{
                color: activeTab === 'purchasing' ? THEME.yellowGreen : THEME.charcoal
              }}
            >
              Purchasing & Costs
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('inventory')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'inventory'
                  ? 'border-current'
                  : 'border-transparent hover:border-gray-300'
              }`}
              style={{
                color: activeTab === 'inventory' ? THEME.yellowGreen : THEME.charcoal
              }}
            >
              Inventory Management
            </button>
            {showCostCalculations && (
              <button
                type="button"
                onClick={() => setActiveTab('analysis')}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'analysis'
                    ? 'border-current'
                    : 'border-transparent hover:border-gray-300'
                }`}
                style={{
                  color: activeTab === 'analysis' ? THEME.yellowGreen : THEME.charcoal
                }}
              >
                Cost Analysis
              </button>
            )}
          </nav>
        </div>

        {/* Error Display */}
        {error && (
          <div
            className="mx-6 mt-4 p-3 rounded-md border"
            style={{
              backgroundColor: '#fee2e2',
              borderColor: '#fecaca'
            }}
          >
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 max-h-[60vh]">
            {/* Basic Information Tab */}
            {activeTab === 'basic' && (
              <IngredientBasicTab
                formData={formData}
                handleInputChange={handleInputChange}
                handleBlur={handleBlur}
                getFieldError={getFieldError}
                categories={categories}
                suppliers={suppliers}
              />
            )}

            {/* Purchasing & Costs Tab */}
            {activeTab === 'purchasing' && (
              <IngredientPurchasingTab
                formData={formData}
                handleInputChange={handleInputChange}
                handleBlur={handleBlur}
                getFieldError={getFieldError}
                parsedCaseData={parsedCaseData}
                isParsingCase={isParsingCase}
                parseSuccess={parseSuccess}
                parseError={parseError}
                handleParseCaseDescription={handleParseCaseDescription}
                clearParsedData={clearParsedData}
              />
            )}

            {/* Inventory Tab */}
            {activeTab === 'inventory' && (
              <IngredientInventoryTab
                formData={formData}
                handleInputChange={handleInputChange}
                handleBlur={handleBlur}
                getFieldError={getFieldError}
              />
            )}

            {/* Cost Analysis Tab */}
            {activeTab === 'analysis' && showCostCalculations && (
              <IngredientAnalysisTab
                formData={formData}
                parsedCaseData={parsedCaseData}
                handleCostUpdate={handleCostUpdate}
                filteredRecipes={filteredRecipes}
                costCalculations={costCalculations}
                formatCost={formatCost}
                getCostSummary={getCostSummary}
              />
            )}
          </div>

          {/* Action Buttons */}
          <div
            className="flex justify-between items-center pt-6 px-6 pb-6 border-t"
            style={{
              backgroundColor: THEME.seasalt,
              borderColor: THEME.silver
            }}
          >
            <div className="flex items-center text-sm">
              {hasValidationErrors && (
                <span
                  className="flex items-center gap-1"
                  style={{ color: '#dc2626' }}
                >
                  {validationErrorCount} validation error{validationErrorCount > 1 ? 's' : ''}
                </span>
              )}
              {isFormValid && isDirty && (
                <span
                  className="flex items-center gap-1"
                  style={{ color: THEME.yellowGreen }}
                >
                  Ready to save
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="px-4 py-2 rounded-md transition-colors disabled:opacity-50"
                style={{
                  backgroundColor: THEME.silver,
                  color: THEME.gunmetal
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                style={{
                  backgroundColor: THEME.yellowGreen,
                  color: THEME.white
                }}
              >
                {isLoading && <span className="animate-spin">⚙️</span>}
                {ingredient ? 'Update Ingredient' : 'Add Ingredient'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IngredientModal;
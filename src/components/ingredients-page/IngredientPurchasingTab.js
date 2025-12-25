// src/components/ingredients-page/IngredientPurchasingTab.js
// Purchasing & Costs tab content
import React from 'react';

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

const IngredientPurchasingTab = ({
  formData,
  handleInputChange,
  handleBlur,
  getFieldError,
  parsedCaseData,
  isParsingCase,
  parseSuccess,
  parseError,
  handleParseCaseDescription,
  clearParsedData
}) => {
  return (
    <div className="space-y-6">
      {/* Case Configuration */}
      <div
        className="rounded-lg p-4 space-y-4"
        style={{ backgroundColor: THEME.seasalt }}
      >
        <div className="flex items-center justify-between">
          <h3
            className="font-semibold flex items-center gap-2"
            style={{ color: THEME.gunmetal }}
          >
            Case Information & Smart Parser
          </h3>
          {parsedCaseData && (
            <button
              type="button"
              onClick={clearParsedData}
              className="text-sm hover:underline"
              style={{ color: THEME.charcoal }}
            >
              Clear Parsed Data
            </button>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: THEME.gunmetal }}
          >
            Case Configuration (Sysco Format)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="caseConfiguration"
              value={formData.caseConfiguration}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              style={{
                borderColor: THEME.silver,
                focusRingColor: THEME.yellowGreen
              }}
              placeholder="e.g., 36/1#, 1/25LB, 120 count, 50#"
            />
            <button
              type="button"
              onClick={handleParseCaseDescription}
              disabled={isParsingCase || !formData.caseConfiguration.trim()}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isParsingCase
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:opacity-90'
              }`}
              style={{
                backgroundColor: THEME.yellowGreen,
                color: THEME.white
              }}
            >
              {isParsingCase ? 'Parsing...' : 'Parse'}
            </button>
          </div>

          {parseSuccess && (
            <div
              className="mt-2 p-2 border rounded text-sm"
              style={{
                backgroundColor: THEME.teaGreen,
                borderColor: THEME.yellowGreen,
                color: THEME.gunmetal
              }}
            >
              Successfully parsed case configuration!
            </div>
          )}

          {parseError && (
            <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
              {parseError}
            </div>
          )}
        </div>

        {/* Parsed Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: THEME.gunmetal }}
            >
              Case Quantity
            </label>
            <input
              type="number"
              step="0.01"
              name="caseQuantity"
              value={formData.caseQuantity}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                getFieldError('caseQuantity') ? 'border-red-500' : ''
              }`}
              style={{
                borderColor: getFieldError('caseQuantity') ? '#ef4444' : THEME.silver,
                focusRingColor: THEME.yellowGreen
              }}
              placeholder="36"
            />
            {getFieldError('caseQuantity') && (
              <p className="mt-1 text-sm text-red-600">{getFieldError('caseQuantity')}</p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: THEME.gunmetal }}
            >
              Case Unit
            </label>
            <input
              type="text"
              name="caseUnit"
              value={formData.caseUnit}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              style={{
                borderColor: THEME.silver,
                focusRingColor: THEME.yellowGreen
              }}
              placeholder="lbs"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: THEME.gunmetal }}
            >
              Case Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              name="casePrice"
              value={formData.casePrice}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                getFieldError('casePrice') ? 'border-red-500' : ''
              }`}
              style={{
                borderColor: getFieldError('casePrice') ? '#ef4444' : THEME.silver,
                focusRingColor: THEME.yellowGreen
              }}
              placeholder="48.50"
            />
            {getFieldError('casePrice') && (
              <p className="mt-1 text-sm text-red-600">{getFieldError('casePrice')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientPurchasingTab;
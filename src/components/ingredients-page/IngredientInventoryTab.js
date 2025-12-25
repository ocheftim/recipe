// src/components/ingredients-page/IngredientInventoryTab.js
// Inventory Management tab content
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

const IngredientInventoryTab = ({
  formData,
  handleInputChange,
  handleBlur,
  getFieldError
}) => {
  return (
    <div className="space-y-6">
      <div
        className="rounded-lg p-4"
        style={{ backgroundColor: THEME.seasalt }}
      >
        <h3
          className="font-semibold mb-4"
          style={{ color: THEME.gunmetal }}
        >
          Stock Level Management
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: THEME.gunmetal }}
            >
              Minimum Stock Level
            </label>
            <input
              type="number"
              step="0.01"
              name="minimumStock"
              value={formData.minimumStock}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                getFieldError('minimumStock') ? 'border-red-500' : ''
              }`}
              style={{
                borderColor: getFieldError('minimumStock') ? '#ef4444' : THEME.silver,
                focusRingColor: THEME.yellowGreen
              }}
              placeholder="5"
            />
            {getFieldError('minimumStock') && (
              <p className="mt-1 text-sm text-red-600">{getFieldError('minimumStock')}</p>
            )}
            <p
              className="mt-1 text-xs"
              style={{ color: THEME.charcoal }}
            >
              Minimum amount to keep in stock
            </p>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: THEME.gunmetal }}
            >
              Reorder Point
            </label>
            <input
              type="number"
              step="0.01"
              name="reorderPoint"
              value={formData.reorderPoint}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                getFieldError('reorderPoint') ? 'border-red-500' : ''
              }`}
              style={{
                borderColor: getFieldError('reorderPoint') ? '#ef4444' : THEME.silver,
                focusRingColor: THEME.yellowGreen
              }}
              placeholder="10"
            />
            {getFieldError('reorderPoint') && (
              <p className="mt-1 text-sm text-red-600">{getFieldError('reorderPoint')}</p>
            )}
            <p
              className="mt-1 text-xs"
              style={{ color: THEME.charcoal }}
            >
              When to place new orders
            </p>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: THEME.gunmetal }}
            >
              Maximum Stock Level
            </label>
            <input
              type="number"
              step="0.01"
              name="maxStock"
              value={formData.maxStock}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                getFieldError('maxStock') ? 'border-red-500' : ''
              }`}
              style={{
                borderColor: getFieldError('maxStock') ? '#ef4444' : THEME.silver,
                focusRingColor: THEME.yellowGreen
              }}
              placeholder="25"
            />
            {getFieldError('maxStock') && (
              <p className="mt-1 text-sm text-red-600">{getFieldError('maxStock')}</p>
            )}
            <p
              className="mt-1 text-xs"
              style={{ color: THEME.charcoal }}
            >
              Maximum storage capacity
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientInventoryTab;
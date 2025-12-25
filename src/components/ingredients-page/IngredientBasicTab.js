// src/components/ingredients-page/IngredientBasicTab.js
// Basic Information tab content
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

const IngredientBasicTab = ({
  formData,
  handleInputChange,
  handleBlur,
  getFieldError,
  categories = [],
  suppliers = []
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: THEME.gunmetal }}
          >
            Ingredient Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              getFieldError('name') ? 'border-red-500' : ''
            }`}
            style={{
              borderColor: getFieldError('name') ? '#ef4444' : THEME.silver,
              focusRingColor: THEME.yellowGreen
            }}
            placeholder="e.g., Carrots, Baby"
          />
          {getFieldError('name') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: THEME.gunmetal }}
          >
            Vendor Product Name
          </label>
          <input
            type="text"
            name="vendorProductName"
            value={formData.vendorProductName}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            style={{
              borderColor: THEME.silver,
              focusRingColor: THEME.yellowGreen
            }}
            placeholder="e.g., Butter Print Unsalted Western Style"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: THEME.gunmetal }}
          >
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            style={{
              borderColor: THEME.silver,
              focusRingColor: THEME.yellowGreen
            }}
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: THEME.gunmetal }}
          >
            SKU/Product Code
          </label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            style={{
              borderColor: THEME.silver,
              focusRingColor: THEME.yellowGreen
            }}
            placeholder="e.g., 25283"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: THEME.gunmetal }}
          >
            Supplier
          </label>
          <select
            name="supplier"
            value={formData.supplier}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            style={{
              borderColor: THEME.silver,
              focusRingColor: THEME.yellowGreen
            }}
          >
            <option value="">Select Supplier</option>
            {suppliers.map(supplier => (
              <option key={supplier} value={supplier}>{supplier}</option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: THEME.gunmetal }}
          >
            Storage Location
          </label>
          <input
            type="text"
            name="storageLocation"
            value={formData.storageLocation}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            style={{
              borderColor: THEME.silver,
              focusRingColor: THEME.yellowGreen
            }}
            placeholder="e.g., Walk-in Cooler, Dry Storage"
          />
        </div>
      </div>

      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: THEME.gunmetal }}
        >
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          onBlur={handleBlur}
          rows={3}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
          style={{
            borderColor: THEME.silver,
            focusRingColor: THEME.yellowGreen
          }}
          placeholder="Any additional notes about this ingredient..."
        />
      </div>
    </div>
  );
};

export default IngredientBasicTab;
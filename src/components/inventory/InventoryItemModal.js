// src/components/inventory/InventoryItemModal.js
import React, { useState, useEffect } from 'react';
import { X, Save, Package } from 'lucide-react';
import { COLORS, BUTTON_STYLES, INPUT_STYLES, INVENTORY_CATEGORIES, INVENTORY_UNITS, STORAGE_LOCATIONS, INVENTORY_STATUSES } from '../../constants/inventoryConstants';

const InventoryItemModal = ({ 
  isOpen, 
  item, 
  onClose, 
  onSave,
  supplierObjects = []
}) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: '',
    supplier: '',
    currentStock: 0,
    unit: 'lbs',
    minStock: 0,
    maxStock: 0,
    costPerUnit: 0,
    location: '',
    status: 'In Stock',
    expirationDate: ''
  });

  const [errors, setErrors] = useState({});

  // Update form data when item changes
  useEffect(() => {
    if (item) {
      setFormData({
        ...item,
        expirationDate: item.expirationDate || ''
      });
    } else {
      // Reset form for new item
      setFormData({
        name: '',
        code: '',
        category: '',
        supplier: '',
        currentStock: 0,
        unit: 'lbs',
        minStock: 0,
        maxStock: 0,
        costPerUnit: 0,
        location: '',
        status: 'In Stock',
        expirationDate: ''
      });
    }
    setErrors({});
  }, [item]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    }
    
    if (!formData.code.trim()) {
      newErrors.code = 'Item code is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.supplier) {
      newErrors.supplier = 'Supplier is required';
    }
    
    if (formData.costPerUnit <= 0) {
      newErrors.costPerUnit = 'Cost per unit must be greater than 0';
    }
    
    if (formData.minStock < 0) {
      newErrors.minStock = 'Minimum stock cannot be negative';
    }
    
    if (formData.maxStock <= formData.minStock) {
      newErrors.maxStock = 'Maximum stock must be greater than minimum stock';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const savedItem = {
      ...formData,
      currentStock: Number(formData.currentStock),
      minStock: Number(formData.minStock),
      maxStock: Number(formData.maxStock),
      costPerUnit: Number(formData.costPerUnit)
    };

    onSave(savedItem);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Package size={24} style={{ color: COLORS.primary }} />
            <h2 className="text-xl font-bold" style={{ color: COLORS.primary }}>
              {item?.id ? 'Edit Inventory Item' : 'New Inventory Item'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} style={{ color: COLORS.gray500 }} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.primary }}>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                  Item Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter item name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                  Item Code *
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.code ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter item code"
                />
                {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select category</option>
                  {INVENTORY_CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                  Supplier *
                </label>
                <select
                  value={formData.supplier}
                  onChange={(e) => handleInputChange('supplier', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.supplier ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select supplier</option>
                  {supplierObjects.map(supplier => (
                    <option key={supplier.id} value={supplier.name}>{supplier.name}</option>
                  ))}
                </select>
                {errors.supplier && <p className="text-red-500 text-xs mt-1">{errors.supplier}</p>}
              </div>
            </div>
          </div>

          {/* Stock Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.primary }}>
              Stock Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                  Current Stock
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.currentStock}
                  onChange={(e) => handleInputChange('currentStock', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                  Unit
                </label>
                <select
                  value={formData.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {INVENTORY_UNITS.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                  Minimum Stock *
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.minStock}
                  onChange={(e) => handleInputChange('minStock', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.minStock ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.minStock && <p className="text-red-500 text-xs mt-1">{errors.minStock}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                  Maximum Stock *
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.maxStock}
                  onChange={(e) => handleInputChange('maxStock', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.maxStock ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.maxStock && <p className="text-red-500 text-xs mt-1">{errors.maxStock}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                  Cost per Unit *
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.costPerUnit}
                  onChange={(e) => handleInputChange('costPerUnit', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.costPerUnit ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
                {errors.costPerUnit && <p className="text-red-500 text-xs mt-1">{errors.costPerUnit}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {INVENTORY_STATUSES.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Storage Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.primary }}>
              Storage Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                  Storage Location
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select location</option>
                  {STORAGE_LOCATIONS.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                  Expiration Date
                </label>
                <input
                  type="date"
                  value={formData.expirationDate}
                  onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Save size={16} />
              {item?.id ? 'Update Item' : 'Create Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryItemModal;
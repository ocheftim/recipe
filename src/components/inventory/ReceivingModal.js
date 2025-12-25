// src/components/inventory/ReceivingModal.js
import React, { useState, useEffect } from 'react';
import { X, TrendingUp, Package } from 'lucide-react';
import { COLORS } from '../../constants/inventoryConstants';

const ReceivingModal = ({ 
  isOpen, 
  item, 
  onClose, 
  onReceiveStock 
}) => {
  const [formData, setFormData] = useState({
    receivedQuantity: '',
    newCostPerUnit: '',
    expirationDate: '',
    lotNumber: '',
    receivedBy: 'Current User',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  // Reset form when modal opens/closes or item changes
  useEffect(() => {
    if (isOpen && item) {
      setFormData({
        receivedQuantity: '',
        newCostPerUnit: item.costPerUnit?.toString() || '',
        expirationDate: '',
        lotNumber: '',
        receivedBy: 'Current User',
        notes: ''
      });
      setErrors({});
    }
  }, [isOpen, item]);

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
    
    if (!formData.receivedQuantity || Number(formData.receivedQuantity) <= 0) {
      newErrors.receivedQuantity = 'Received quantity must be greater than 0';
    }
    
    if (!formData.newCostPerUnit || Number(formData.newCostPerUnit) <= 0) {
      newErrors.newCostPerUnit = 'Cost per unit must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onReceiveStock(
      item,
      Number(formData.receivedQuantity),
      Number(formData.newCostPerUnit),
      formData.expirationDate || null,
      formData.lotNumber || null
    );
    
    onClose();
  };

  if (!isOpen || !item) return null;

  const newStockLevel = item.currentStock + Number(formData.receivedQuantity || 0);
  const newStockValue = newStockLevel * Number(formData.newCostPerUnit || 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <TrendingUp size={24} style={{ color: COLORS.green600 }} />
            <div>
              <h2 className="text-xl font-bold" style={{ color: COLORS.primary }}>
                Receive Stock
              </h2>
              <p className="text-sm text-gray-600">{item.name} ({item.code})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} style={{ color: COLORS.gray500 }} />
          </button>
        </div>

        {/* Current Stock Info */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">Current Stock</div>
              <div className="text-lg font-semibold" style={{ color: COLORS.primary }}>
                {item.currentStock} {item.unit}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Current Cost/Unit</div>
              <div className="text-lg font-semibold" style={{ color: COLORS.primary }}>
                ${item.costPerUnit?.toFixed(2) || '0.00'}
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Received Quantity */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
              Received Quantity *
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.receivedQuantity}
                onChange={(e) => handleInputChange('receivedQuantity', e.target.value)}
                className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.receivedQuantity ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
              />
              <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600">
                {item.unit}
              </div>
            </div>
            {errors.receivedQuantity && <p className="text-red-500 text-xs mt-1">{errors.receivedQuantity}</p>}
          </div>

          {/* Cost per Unit */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
              New Cost per Unit *
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.newCostPerUnit}
              onChange={(e) => handleInputChange('newCostPerUnit', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.newCostPerUnit ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            {errors.newCostPerUnit && <p className="text-red-500 text-xs mt-1">{errors.newCostPerUnit}</p>}
          </div>

          {/* Expiration Date */}
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

          {/* Lot Number */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
              Lot Number
            </label>
            <input
              type="text"
              value={formData.lotNumber}
              onChange={(e) => handleInputChange('lotNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter lot number"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Additional notes about this receipt..."
            />
          </div>

          {/* Summary */}
          {formData.receivedQuantity && formData.newCostPerUnit && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-sm font-medium text-green-800 mb-2">Receipt Summary</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-green-700">New Stock Level</div>
                  <div className="font-semibold text-green-800">
                    {newStockLevel.toFixed(2)} {item.unit}
                  </div>
                </div>
                <div>
                  <div className="text-green-700">New Stock Value</div>
                  <div className="font-semibold text-green-800">
                    ${newStockValue.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}

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
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Package size={16} />
              Receive Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReceivingModal;
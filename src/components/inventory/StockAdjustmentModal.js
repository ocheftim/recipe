// src/components/inventory/StockAdjustmentModal.js
import React, { useState, useEffect } from 'react';
import { X, TrendingDown, AlertTriangle } from 'lucide-react';
import { COLORS } from '../../constants/inventoryConstants';

const StockAdjustmentModal = ({ 
  isOpen, 
  item, 
  onClose, 
  onStockAdjustment 
}) => {
  const [formData, setFormData] = useState({
    adjustmentType: 'set', // 'set', 'add', 'subtract'
    newQuantity: '',
    adjustmentQuantity: '',
    reason: '',
    notes: '',
    adjustedBy: 'Current User'
  });

  const [errors, setErrors] = useState({});

  // Adjustment reasons
  const ADJUSTMENT_REASONS = [
    'Physical Count Correction',
    'Damaged/Spoiled',
    'Theft/Loss',
    'Waste',
    'Transfer Out',
    'Transfer In',
    'System Error Correction',
    'Other'
  ];

  // Reset form when modal opens/closes or item changes
  useEffect(() => {
    if (isOpen && item) {
      setFormData({
        adjustmentType: 'set',
        newQuantity: item.currentStock?.toString() || '0',
        adjustmentQuantity: '',
        reason: '',
        notes: '',
        adjustedBy: 'Current User'
      });
      setErrors({});
    }
  }, [isOpen, item]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Update calculations when adjustment type or quantity changes
    if (field === 'adjustmentType') {
      if (value === 'set') {
        setFormData(prev => ({
          ...prev,
          newQuantity: item.currentStock?.toString() || '0',
          adjustmentQuantity: ''
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          adjustmentQuantity: '',
          newQuantity: ''
        }));
      }
    }

    if (field === 'adjustmentQuantity' && formData.adjustmentType !== 'set') {
      const adjustment = Number(value) || 0;
      let newQty = item.currentStock;
      
      if (formData.adjustmentType === 'add') {
        newQty = item.currentStock + adjustment;
      } else if (formData.adjustmentType === 'subtract') {
        newQty = Math.max(0, item.currentStock - adjustment);
      }
      
      setFormData(prev => ({
        ...prev,
        newQuantity: newQty.toString()
      }));
    }

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
    
    const newQty = Number(formData.newQuantity);
    
    if (isNaN(newQty) || newQty < 0) {
      newErrors.newQuantity = 'New quantity must be 0 or greater';
    }
    
    if (!formData.reason) {
      newErrors.reason = 'Adjustment reason is required';
    }

    if (formData.adjustmentType !== 'set' && (!formData.adjustmentQuantity || Number(formData.adjustmentQuantity) <= 0)) {
      newErrors.adjustmentQuantity = 'Adjustment quantity must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onStockAdjustment(
      item,
      Number(formData.newQuantity),
      formData.reason,
      formData.notes
    );
    
    onClose();
  };

  if (!isOpen || !item) return null;

  const newQuantity = Number(formData.newQuantity) || 0;
  const currentQuantity = item.currentStock || 0;
  const difference = newQuantity - currentQuantity;
  const isIncrease = difference > 0;
  const isDecrease = difference < 0;
  const valueChange = difference * (item.costPerUnit || 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <TrendingDown size={24} style={{ color: COLORS.orange800 }} />
            <div>
              <h2 className="text-xl font-bold" style={{ color: COLORS.primary }}>
                Stock Adjustment
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
                {currentQuantity} {item.unit}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Current Value</div>
              <div className="text-lg font-semibold" style={{ color: COLORS.primary }}>
                ${(currentQuantity * (item.costPerUnit || 0)).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Adjustment Type */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
              Adjustment Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleInputChange('adjustmentType', 'set')}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  formData.adjustmentType === 'set'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Set To
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('adjustmentType', 'add')}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  formData.adjustmentType === 'add'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('adjustmentType', 'subtract')}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  formData.adjustmentType === 'subtract'
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Subtract
              </button>
            </div>
          </div>

          {/* Adjustment Quantity (for add/subtract) */}
          {formData.adjustmentType !== 'set' && (
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                {formData.adjustmentType === 'add' ? 'Add Quantity' : 'Subtract Quantity'} *
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.adjustmentQuantity}
                  onChange={(e) => handleInputChange('adjustmentQuantity', e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.adjustmentQuantity ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0"
                />
                <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600">
                  {item.unit}
                </div>
              </div>
              {errors.adjustmentQuantity && <p className="text-red-500 text-xs mt-1">{errors.adjustmentQuantity}</p>}
            </div>
          )}

          {/* New Quantity (for set, or calculated for add/subtract) */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
              {formData.adjustmentType === 'set' ? 'Set Quantity To *' : 'New Quantity'}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.newQuantity}
                onChange={(e) => handleInputChange('newQuantity', e.target.value)}
                className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.newQuantity ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
                disabled={formData.adjustmentType !== 'set'}
              />
              <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600">
                {item.unit}
              </div>
            </div>
            {errors.newQuantity && <p className="text-red-500 text-xs mt-1">{errors.newQuantity}</p>}
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
              Reason for Adjustment *
            </label>
            <select
              value={formData.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.reason ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select reason</option>
              {ADJUSTMENT_REASONS.map(reason => (
                <option key={reason} value={reason}>{reason}</option>
              ))}
            </select>
            {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
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
              placeholder="Additional details about this adjustment..."
            />
          </div>

          {/* Adjustment Summary */}
          {difference !== 0 && (
            <div className={`p-4 rounded-lg border ${
              isDecrease ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {isDecrease && <AlertTriangle size={16} className="text-red-600" />}
                <div className={`text-sm font-medium ${
                  isDecrease ? 'text-red-800' : 'text-green-800'
                }`}>
                  Adjustment Summary
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className={isDecrease ? 'text-red-700' : 'text-green-700'}>
                    {isIncrease ? 'Increase' : 'Decrease'}
                  </div>
                  <div className={`font-semibold ${isDecrease ? 'text-red-800' : 'text-green-800'}`}>
                    {isIncrease ? '+' : ''}{difference.toFixed(2)} {item.unit}
                  </div>
                </div>
                <div>
                  <div className={isDecrease ? 'text-red-700' : 'text-green-700'}>
                    Value Change
                  </div>
                  <div className={`font-semibold ${isDecrease ? 'text-red-800' : 'text-green-800'}`}>
                    {isIncrease ? '+' : ''}${valueChange.toFixed(2)}
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
              className={`px-4 py-2 text-white rounded-lg transition-colors flex items-center gap-2 ${
                isDecrease ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'
              }`}
            >
              <TrendingDown size={16} />
              Apply Adjustment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockAdjustmentModal;
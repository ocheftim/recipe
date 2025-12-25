// src/components/inventory/InventoryCard.js
import React from 'react';
import { Edit2, Package, TrendingUp, TrendingDown, Trash2 } from 'lucide-react';
import { STATUS_COLORS, COLORS } from '../../constants/inventoryConstants';

const InventoryCard = ({ item, onEdit, onReceive, onAdjust, onDelete }) => {
  const statusConfig = STATUS_COLORS[item.status] || STATUS_COLORS['In Stock'];
  
  // Calculate stock level percentage
  const stockPercentage = item.maxStock > 0 ? (item.currentStock / item.maxStock) * 100 : 0;
  
  // Determine stock level color
  const getStockLevelColor = () => {
    if (item.status === 'Out of Stock') return 'text-red-600';
    if (item.status === 'Low Stock') return 'text-yellow-600';
    return 'text-green-600';
  };

  // Format expiration date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  // Check if expiring soon (within 3 days)
  const isExpiringSoon = () => {
    if (!item.expirationDate) return false;
    const today = new Date();
    const expDate = new Date(item.expirationDate);
    const daysUntilExpiry = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 3 && daysUntilExpiry >= 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg" style={{ color: COLORS.primary }}>
            {item.name}
          </h3>
          <p className="text-sm text-gray-500">{item.code}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${statusConfig.background} ${statusConfig.text}`}>
          {item.status}
        </span>
      </div>

      {/* Stock Level Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">Stock Level</span>
          <span className={`font-semibold text-sm ${getStockLevelColor()}`}>
            {item.currentStock} {item.unit}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              item.status === 'Out of Stock' ? 'bg-red-500' :
              item.status === 'Low Stock' ? 'bg-yellow-500' :
              'bg-green-500'
            }`}
            style={{ width: `${Math.min(stockPercentage, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Min: {item.minStock}</span>
          <span>Max: {item.maxStock}</span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span style={{ color: COLORS.primary }}>Category:</span>
          <span className="font-medium" style={{ color: COLORS.primary }}>{item.category}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: COLORS.primary }}>Supplier:</span>
          <span className="font-medium" style={{ color: COLORS.primary }}>{item.supplier}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: COLORS.primary }}>Cost/Unit:</span>
          <span className="font-bold text-green-600">${item.costPerUnit?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: COLORS.primary }}>Location:</span>
          <span className="font-medium" style={{ color: COLORS.primary }}>{item.location}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: COLORS.primary }}>Last Received:</span>
          <span className="font-medium" style={{ color: COLORS.primary }}>
            {formatDate(item.lastReceived)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: COLORS.primary }}>Expires:</span>
          <span className={`font-medium ${isExpiringSoon() ? 'text-red-600' : ''}`} 
                style={{ color: isExpiringSoon() ? '#DC2626' : COLORS.primary }}>
            {formatDate(item.expirationDate)}
            {isExpiringSoon() && ' ⚠️'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(item)}
          className="flex-1 px-3 py-2 text-sm bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
          style={{ color: COLORS.secondary }}
        >
          <Edit2 size={14} />
          Edit
        </button>
        <button
          onClick={() => onReceive(item)}
          className="flex-1 px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-1"
        >
          <TrendingUp size={14} />
          Receive
        </button>
        <button
          onClick={() => onAdjust(item)}
          className="flex-1 px-3 py-2 text-sm bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors flex items-center justify-center gap-1"
        >
          <TrendingDown size={14} />
          Adjust
        </button>
        <button
          onClick={() => onDelete(item)}
          className="px-3 py-2 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default InventoryCard;
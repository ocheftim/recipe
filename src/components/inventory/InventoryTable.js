// src/components/inventory/InventoryTable.js - Simplified for Phase 2
import React from 'react';
import { STATUS_COLORS } from '../../constants/inventoryConstants';

const InventoryTable = ({ 
  inventory, 
  onEditItem, 
  onReceiveStock, 
  onAdjustStock, 
  onDeleteItem,
  onSort,
  sortColumn,
  sortDirection 
}) => {
  const handleSort = (column) => {
    onSort?.(column);
  };

  const getSortIndicator = (column) => {
    if (sortColumn !== column) return '';
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="inventory-table w-full">
          <thead>
            <tr>
              <th 
                className="text-left cursor-pointer hover:bg-gray-100" 
                onClick={() => handleSort('name')}
              >
                Item Name{getSortIndicator('name')}
              </th>
              <th 
                className="text-left cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('code')}
              >
                Code{getSortIndicator('code')}
              </th>
              <th 
                className="text-left cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('category')}
              >
                Category{getSortIndicator('category')}
              </th>
              <th 
                className="text-left cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('currentStock')}
              >
                Stock{getSortIndicator('currentStock')}
              </th>
              <th 
                className="text-left cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                Status{getSortIndicator('status')}
              </th>
              <th 
                className="text-left cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('costPerUnit')}
              >
                Cost/Unit{getSortIndicator('costPerUnit')}
              </th>
              <th 
                className="text-left cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('expirationDate')}
              >
                Expires{getSortIndicator('expirationDate')}
              </th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.length > 0 ? (
              inventory.map(item => {
                const statusConfig = STATUS_COLORS[item.status] || STATUS_COLORS['In Stock'];
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td>
                      <button
                        onClick={() => onEditItem(item)}
                        className="text-left font-medium hover:underline"
                        style={{ color: '#3797FC' }}
                      >
                        {item.name}
                      </button>
                    </td>
                    <td className="text-gray-600">{item.code}</td>
                    <td className="text-gray-600">{item.category}</td>
                    <td className={`font-semibold ${
                      item.status === 'Out of Stock' ? 'text-red-600' :
                      item.status === 'Low Stock' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {item.currentStock} {item.unit}
                    </td>
                    <td>
                      <span className={`text-xs px-2 py-1 rounded-full ${statusConfig.background} ${statusConfig.text}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="font-semibold text-green-600">
                      ${item.costPerUnit?.toFixed(2)}
                    </td>
                    <td className="text-gray-600">
                      {formatDate(item.expirationDate)}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onEditItem(item)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onReceiveStock(item)}
                          className="text-green-600 hover:text-green-800 text-sm"
                        >
                          Receive
                        </button>
                        <button
                          onClick={() => onDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-12">
                  <p className="text-lg text-gray-600">No inventory items found</p>
                  <p className="text-sm mt-2 text-gray-500">Try adjusting your search or filters</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
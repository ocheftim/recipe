import React, { useState } from 'react';
import { shamrockMapping, getAllShamrockItems } from '../data/shamrockMapping';

const InventoryPage = () => {
  // Initialize inventory with zero quantities
  const [inventory, setInventory] = useState(() => {
    const initial = {};
    Object.keys(shamrockMapping).forEach(ingredient => {
      initial[ingredient] = {
        quantity: 0,
        unit: 'units',
        lastUpdated: new Date().toISOString()
      };
    });
    return initial;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showLowStock, setShowLowStock] = useState(false);

  const categories = ['All', ...new Set(Object.values(shamrockMapping).map(item => item.category))];
  const allItems = getAllShamrockItems();

  // Update inventory quantity
  const updateQuantity = (ingredient, newQuantity) => {
    setInventory(prev => ({
      ...prev,
      [ingredient]: {
        ...prev[ingredient],
        quantity: parseFloat(newQuantity) || 0,
        lastUpdated: new Date().toISOString()
      }
    }));
  };

  // Filter items
  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.ingredient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStockFilter = !showLowStock || inventory[item.ingredient].quantity < 10;
    return matchesSearch && matchesCategory && matchesStockFilter;
  });

  // Calculate inventory value
  const totalValue = allItems.reduce((sum, item) => {
    const qty = inventory[item.ingredient].quantity;
    return sum + (qty * item.pricePerUnit);
  }, 0);

  const lowStockCount = allItems.filter(item => inventory[item.ingredient].quantity < 10).length;
  const outOfStockCount = allItems.filter(item => inventory[item.ingredient].quantity === 0).length;
  const inStockCount = allItems.filter(item => inventory[item.ingredient].quantity > 0).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="pl-8 pr-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-2">
            Track Shamrock Foods ingredient stock levels
          </p>
        </div>
      </div>

      <div className="pl-8 pr-6 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600 mb-1">Total Value</div>
            <div className="text-2xl font-bold text-green-600">${totalValue.toFixed(2)}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600 mb-1">In Stock</div>
            <div className="text-2xl font-bold text-blue-600">{inStockCount}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600 mb-1">Low Stock</div>
            <div className="text-2xl font-bold text-orange-600">{lowStockCount}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600 mb-1">Out of Stock</div>
            <div className="text-2xl font-bold text-red-600">{outOfStockCount}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Ingredients
              </label>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showLowStock}
                  onChange={(e) => setShowLowStock(e.target.checked)}
                  className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Show only low stock (&lt;10)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ingredient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Stock
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock Value
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item, idx) => {
                  const stock = inventory[item.ingredient];
                  const stockValue = stock.quantity * item.pricePerUnit;
                  const isLowStock = stock.quantity < 10 && stock.quantity > 0;
                  const isOutOfStock = stock.quantity === 0;

                  return (
                    <tr key={idx} className={isOutOfStock ? 'bg-red-50' : isLowStock ? 'bg-orange-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{item.ingredient}</div>
                        <div className="text-xs text-gray-500 font-mono">{item.itemCode}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.productName}</div>
                        <div className="text-xs text-gray-500">{item.brand} • {item.packSize}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={stock.quantity}
                          onChange={(e) => updateQuantity(item.ingredient, e.target.value)}
                          className="w-24 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                        ${item.pricePerUnit.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                        ${stockValue.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {isOutOfStock ? (
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
                            Out of Stock
                          </span>
                        ) : isLowStock ? (
                          <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded">
                            Low Stock
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                            In Stock
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
            <p className="text-gray-500">No items found matching your criteria.</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Export Inventory Report
          </button>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
            Generate Purchase Order
          </button>
          <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">
            Reset All to Zero
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
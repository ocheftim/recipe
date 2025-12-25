import React, { useState } from 'react';
import { shamrockMapping, getAllShamrockItems, getItemsByCategory } from '../data/shamrockMapping';

const IngredientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get all unique categories
  const categories = ['All', ...new Set(Object.values(shamrockMapping).map(item => item.category))];

  // Get all items
  const allItems = getAllShamrockItems();

  // Filter items based on search and category
  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.ingredient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="pl-8 pr-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Ingredients List</h1>
          <p className="text-gray-600 mt-2">
            Shamrock Foods Inventory - {allItems.length} Total Items
          </p>
        </div>
      </div>

      <div className="pl-8 pr-6 py-6">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Ingredients
              </label>
              <input
                type="text"
                placeholder="Search by name, product, or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredItems.length} of {allItems.length} items
          </div>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.ingredient}</h3>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded mt-1">
                    {item.category}
                  </span>
                </div>
                <div className="text-right ml-2">
                  <div className="text-lg font-bold text-blue-600">
                    ${item.pricePerUnit.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500">per unit</div>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-2 border-t border-gray-200 pt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Product:</span>
                  <span className="font-medium text-gray-900">{item.productName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Brand:</span>
                  <span className="font-medium text-gray-900">{item.brand}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pack Size:</span>
                  <span className="font-medium text-gray-900">{item.packSize}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Item Code:</span>
                  <span className="font-mono text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">
                    {item.itemCode}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-gray-500">No ingredients found matching your search.</p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {categories.filter(c => c !== 'All').map(category => {
            const count = allItems.filter(item => item.category === category).length;
            return (
              <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="text-2xl font-bold text-blue-600">{count}</div>
                <div className="text-sm text-gray-600">{category} Items</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IngredientsPage;
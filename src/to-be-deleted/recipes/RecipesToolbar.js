// src/components/recipes/RecipesToolbar.js - Exact Match to Ingredients
import React, { useState } from 'react';
import { Search, Filter, Plus, ChevronDown, User, Download, List } from 'lucide-react';

const RecipesToolbar = ({
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
  visibleColumns,
  setVisibleColumns,
  columnOrder,
  setColumnOrder,
  hoveredButton,
  setHoveredButton,
  onNewRecipe,
  onExport,
  onImport,
  onFilters,
  filteredCount,
  totalCount
}) => {
  const [showViewDropdown, setShowViewDropdown] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  return (
    <div className="bg-white">
      {/* Main Toolbar - Exact match to ingredients */}
      <div className="flex flex-wrap items-center gap-4 px-6 py-4">
        {/* Search Box */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters Button */}
        <button
          onClick={onFilters}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>

        {/* New Recipe Button - Green like ingredients */}
        <button
          onClick={onNewRecipe}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <Plus className="h-4 w-4" />
          New Recipe
        </button>

        {/* List View Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowViewDropdown(!showViewDropdown)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <List className="h-4 w-4" />
            List View
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {showViewDropdown && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowViewDropdown(false)} />
              <div className="absolute left-0 top-full mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-20">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setViewMode('table');
                      setShowViewDropdown(false);
                    }}
                    className={`block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                      viewMode === 'table' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <List className="h-4 w-4" />
                      Table View
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setViewMode('cards');
                      setShowViewDropdown(false);
                    }}
                    className={`block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                      viewMode === 'cards' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border border-current rounded-sm" />
                      Card View
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Suppliers Button */}
        <button
          onClick={() => console.log('Open suppliers')}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <User className="h-4 w-4" />
          Suppliers
        </button>

        {/* Export/Import Dropdown */}
        <div className="relative ml-auto">
          <button
            onClick={() => setShowExportDropdown(!showExportDropdown)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Download className="h-4 w-4" />
            Export/Import
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {showExportDropdown && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowExportDropdown(false)} />
              <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-md shadow-lg border border-gray-200 z-20">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onExport();
                      setShowExportDropdown(false);
                    }}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                  >
                    Export Recipes
                  </button>
                  <button
                    onClick={() => {
                      onImport();
                      setShowExportDropdown(false);
                    }}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                  >
                    Import Recipes
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Results Count - Exact match to ingredients */}
      {(filteredCount !== undefined && totalCount !== undefined) && (
        <div className="px-6 pb-4">
          <div className="text-sm text-gray-500 italic">
            Found {filteredCount} of {totalCount} recipes
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipesToolbar;
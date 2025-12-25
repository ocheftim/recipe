// src/components/menus/MenuToolbar.js
import React from 'react';
import { Search, Plus, Grid, List, Download, Filter } from 'lucide-react';
import { BUTTON_STYLES, INPUT_STYLES } from '../../constants/menuConstants';

const MenuToolbar = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  menuTypes,
  menuStatuses,
  viewMode,
  setViewMode,
  onCreateMenu,
  showAdvancedFilters,
  setShowAdvancedFilters
}) => {
  return (
    <div className="space-y-4">
      {/* ✅ Main toolbar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
          <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
            {statusFilter || 'All Menus'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 ${viewMode === 'cards' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              title="Card View"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              title="Table View"
            >
              <List size={16} />
            </button>
          </div>

          {/* Export Button */}
          <button className={BUTTON_STYLES.secondary}>
            <Download size={16} className="mr-2" />
            Export
          </button>

          {/* Create Menu Button */}
          <button 
            onClick={onCreateMenu}
            className={BUTTON_STYLES.primary}
          >
            <Plus size={20} className="mr-2" />
            Create Menu
          </button>
        </div>
      </div>

      {/* ✅ Search and Filters Bar */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search menus by name, type, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={INPUT_STYLES.search}
            />
          </div>

          {/* Quick Filters */}
          <div className="flex gap-3">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={INPUT_STYLES.base + " w-auto min-w-[140px]"}
            >
              <option value="">All Statuses</option>
              {menuStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className={INPUT_STYLES.base + " w-auto min-w-[160px]"}
            >
              <option value="">All Menu Types</option>
              {menuTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`${BUTTON_STYLES.secondary} ${showAdvancedFilters ? 'bg-blue-100 text-blue-700' : ''}`}
            >
              <Filter size={16} className="mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* ✅ Advanced Filters (Collapsible) */}
        {showAdvancedFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Average Price Range
                </label>
                <select className={INPUT_STYLES.base}>
                  <option value="">Any Price</option>
                  <option value="0-15">Under $15</option>
                  <option value="15-25">$15 - $25</option>
                  <option value="25-35">$25 - $35</option>
                  <option value="35+">$35+</option>
                </select>
              </div>

              {/* Items Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Menu Size
                </label>
                <select className={INPUT_STYLES.base}>
                  <option value="">Any Size</option>
                  <option value="1-5">Small (1-5 items)</option>
                  <option value="6-10">Medium (6-10 items)</option>
                  <option value="11-20">Large (11-20 items)</option>
                  <option value="20+">XL (20+ items)</option>
                </select>
              </div>

              {/* Profitability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Margin Range
                </label>
                <select className={INPUT_STYLES.base}>
                  <option value="">Any Margin</option>
                  <option value="0-50">Low (0-50%)</option>
                  <option value="50-70">Good (50-70%)</option>
                  <option value="70+">High (70%+)</option>
                </select>
              </div>

              {/* Last Updated */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Updated
                </label>
                <select className={INPUT_STYLES.base}>
                  <option value="">Any Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-600">
                Showing {statusFilter || typeFilter ? 'filtered' : 'all'} menus
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setStatusFilter('');
                    setTypeFilter('');
                  }}
                  className={BUTTON_STYLES.ghost}
                >
                  Clear Filters
                </button>
                <button className={BUTTON_STYLES.secondary}>
                  Save Filter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuToolbar;
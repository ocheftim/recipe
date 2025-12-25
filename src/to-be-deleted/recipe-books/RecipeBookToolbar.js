// src/components/recipe-books/RecipeBookToolbar.js
import React from 'react';
import { Search, Plus, Grid, List, Download, Filter, BookOpen } from 'lucide-react';
import { BUTTON_STYLES, INPUT_STYLES } from '../../constants/recipeBooksConstants';

const RecipeBookToolbar = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  typeFilter,
  setTypeFilter,
  difficultyFilter,
  setDifficultyFilter,
  categories,
  statuses,
  types,
  viewMode,
  setViewMode,
  onCreateBook,
  showAdvancedFilters,
  setShowAdvancedFilters
}) => {
  const difficulties = ['Easy', 'Easy-Medium', 'Medium', 'Medium-Hard', 'Hard', 'Easy-Hard'];

  return (
    <div className="space-y-4">
      {/* ✅ Main toolbar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Recipe Books</h1>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
              {statusFilter || 'All Books'}
            </span>
            <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
              📚 Collections
            </span>
          </div>
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
            Export All
          </button>

          {/* Create Book Button */}
          <button 
            onClick={onCreateBook}
            className={BUTTON_STYLES.primary}
          >
            <Plus size={20} className="mr-2" />
            Create Book
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
              placeholder="Search recipe books by title, author, or tags..."
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
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={INPUT_STYLES.base + " w-auto min-w-[160px]"}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className={INPUT_STYLES.base + " w-auto min-w-[160px]"}
            >
              <option value="">All Types</option>
              {types.map(type => (
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
              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty Level
                </label>
                <select 
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className={INPUT_STYLES.base}
                >
                  <option value="">Any Difficulty</option>
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>

              {/* Rating Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating Range
                </label>
                <select className={INPUT_STYLES.base}>
                  <option value="">Any Rating</option>
                  <option value="4.5+">4.5+ Stars</option>
                  <option value="4.0+">4.0+ Stars</option>
                  <option value="3.5+">3.5+ Stars</option>
                  <option value="3.0+">3.0+ Stars</option>
                </select>
              </div>

              {/* Recipe Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipe Count
                </label>
                <select className={INPUT_STYLES.base}>
                  <option value="">Any Size</option>
                  <option value="1-3">Small (1-3 recipes)</option>
                  <option value="4-6">Medium (4-6 recipes)</option>
                  <option value="7-10">Large (7-10 recipes)</option>
                  <option value="10+">XL (10+ recipes)</option>
                </select>
              </div>

              {/* Access Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Access Level
                </label>
                <select className={INPUT_STYLES.base}>
                  <option value="">Any Access</option>
                  <option value="Public">Public</option>
                  <option value="Kitchen Staff">Kitchen Staff</option>
                  <option value="Management Only">Management Only</option>
                  <option value="Chefs Only">Chefs Only</option>
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-600">
                Showing {statusFilter || categoryFilter || typeFilter ? 'filtered' : 'all'} recipe books
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setStatusFilter('');
                    setCategoryFilter('');
                    setTypeFilter('');
                    setDifficultyFilter('');
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

        {/* Quick Filter Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 mr-2">Quick filters:</span>
          <button 
            onClick={() => setTypeFilter('Training Manual')}
            className={`text-xs px-2 py-1 rounded-full transition-colors ${
              typeFilter === 'Training Manual' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Training Materials
          </button>
          <button 
            onClick={() => setCategoryFilter('Signature Dishes')}
            className={`text-xs px-2 py-1 rounded-full transition-colors ${
              categoryFilter === 'Signature Dishes' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Signature Collections
          </button>
          <button 
            onClick={() => setCategoryFilter('Dietary Specific')}
            className={`text-xs px-2 py-1 rounded-full transition-colors ${
              categoryFilter === 'Dietary Specific' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Dietary Guides
          </button>
          <button 
            onClick={() => setStatusFilter('Active')}
            className={`text-xs px-2 py-1 rounded-full transition-colors ${
              statusFilter === 'Active' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Active Only
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeBookToolbar;
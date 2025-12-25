// src/components/menus/RecipeSelectorModal.js
import React, { useState, useMemo } from 'react';
import { X, Plus, Search, Check, ChefHat, DollarSign, Clock } from 'lucide-react';
import { COLORS, BUTTON_STYLES, INPUT_STYLES, MENU_SECTIONS } from '../../constants/menuConstants';

const RecipeSelectorModal = ({ 
  isOpen, 
  menu,
  availableRecipes,
  onClose, 
  onAddRecipes 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [selectedSection, setSelectedSection] = useState('Appetizers');
  const [showPricing, setShowPricing] = useState(false);

  // ✅ Filter available recipes
  const filteredRecipes = useMemo(() => {
    return availableRecipes.filter(recipe => {
      const matchesSearch = searchTerm === '' || 
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === '' || recipe.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [availableRecipes, searchTerm, categoryFilter]);

  // ✅ Get unique categories
  const categories = useMemo(() => 
    [...new Set(availableRecipes.map(recipe => recipe.category))].sort()
  , [availableRecipes]);

  const handleRecipeToggle = (recipe) => {
    setSelectedRecipes(prev => {
      const isSelected = prev.find(r => r.id === recipe.id);
      if (isSelected) {
        return prev.filter(r => r.id !== recipe.id);
      } else {
        return [...prev, { ...recipe, menuPrice: recipe.basePrice }];
      }
    });
  };

  const handlePriceChange = (recipeId, newPrice) => {
    setSelectedRecipes(prev => 
      prev.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, menuPrice: parseFloat(newPrice) || 0 }
          : recipe
      )
    );
  };

  const handleAddToMenu = () => {
    if (selectedRecipes.length > 0) {
      const recipesToAdd = selectedRecipes.map(recipe => ({
        recipeId: recipe.id,
        menuPrice: recipe.menuPrice,
        description: recipe.description
      }));
      
      onAddRecipes(menu.id, selectedSection, recipesToAdd);
      
      // Reset state
      setSelectedRecipes([]);
      setSearchTerm('');
      setCategoryFilter('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* ✅ Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg mr-3">
              <ChefHat className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Add Recipes to "{menu?.name}"
              </h2>
              <p className="text-sm text-gray-600">
                Select recipes from your database to add to this menu
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* ✅ Search and Filters */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={INPUT_STYLES.search}
              />
            </div>

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

            {/* Menu Section */}
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className={INPUT_STYLES.base + " w-auto min-w-[160px]"}
            >
              {MENU_SECTIONS.map(section => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>

            {/* Pricing Toggle */}
            <button
              onClick={() => setShowPricing(!showPricing)}
              className={`${BUTTON_STYLES.secondary} ${showPricing ? 'bg-blue-100 text-blue-700' : ''}`}
            >
              <DollarSign size={16} className="mr-2" />
              Pricing
            </button>
          </div>

          {/* Selected Count */}
          {selectedRecipes.length > 0 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                <strong>{selectedRecipes.length}</strong> recipes selected for <strong>{selectedSection}</strong>
              </p>
              <button
                onClick={() => setSelectedRecipes([])}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Clear Selection
              </button>
            </div>
          )}
        </div>

        {/* ✅ Recipe List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredRecipes.map(recipe => {
              const isSelected = selectedRecipes.find(r => r.id === recipe.id);
              const selectedRecipe = selectedRecipes.find(r => r.id === recipe.id);
              
              return (
                <div 
                  key={recipe.id} 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                  onClick={() => handleRecipeToggle(recipe)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{recipe.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{recipe.description}</p>
                    </div>
                    <div className={`ml-2 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected 
                        ? 'border-green-500 bg-green-500' 
                        : 'border-gray-300'
                    }`}>
                      {isSelected && <Check size={12} className="text-white" />}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded">{recipe.category}</span>
                    <div className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      {recipe.prepTime}m
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-semibold text-gray-900">
                        ${recipe.basePrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">base</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Cost: ${recipe.cost.toFixed(2)}
                    </div>
                  </div>

                  {/* Custom Pricing Input */}
                  {isSelected && showPricing && (
                    <div className="mt-3 pt-3 border-t border-green-200">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Menu Price
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="number"
                          step="0.01"
                          value={selectedRecipe?.menuPrice || recipe.basePrice}
                          onChange={(e) => handlePriceChange(recipe.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredRecipes.length === 0 && (
            <div className="text-center py-8">
              <ChefHat className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No recipes found matching your criteria</p>
            </div>
          )}
        </div>

        {/* ✅ Modal Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {selectedRecipes.length > 0 && (
              <>
                Adding <strong>{selectedRecipes.length}</strong> recipes to{' '}
                <strong>{selectedSection}</strong> section
              </>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className={BUTTON_STYLES.secondary}
            >
              Cancel
            </button>
            <button
              onClick={handleAddToMenu}
              disabled={selectedRecipes.length === 0}
              className={`${BUTTON_STYLES.success} ${
                selectedRecipes.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Plus size={16} className="mr-2" />
              Add {selectedRecipes.length} Recipes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeSelectorModal;
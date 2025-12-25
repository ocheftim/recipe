// src/components/recipe-books/RecipeManagerModal.js
import React, { useState, useMemo } from 'react';
import { X, Plus, Search, Check, ChefHat, Clock, Star, Trash2 } from 'lucide-react';
import { COLORS, BUTTON_STYLES, INPUT_STYLES } from '../../constants/recipeBooksConstants';

const RecipeManagerModal = ({ 
  isOpen, 
  book,
  availableRecipes,
  onClose, 
  onManageRecipes 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState('add'); // 'add' or 'current'

  // ✅ Filter available recipes (excluding already added ones)
  const filteredAvailableRecipes = useMemo(() => {
    if (!book) return [];
    
    return availableRecipes.filter(recipe => {
      // Exclude recipes already in the book
      if (book.recipeIds.includes(recipe.id)) return false;
      
      const matchesSearch = searchTerm === '' || 
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === '' || recipe.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [availableRecipes, book, searchTerm, categoryFilter]);

  // ✅ Get current recipes in the book
  const currentRecipes = useMemo(() => {
    if (!book) return [];
    
    return book.recipeIds.map(recipeId => 
      availableRecipes.find(recipe => recipe.id === recipeId)
    ).filter(Boolean);
  }, [book, availableRecipes]);

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
        return [...prev, recipe];
      }
    });
  };

  const handleAddRecipes = () => {
    if (selectedRecipes.length > 0) {
      const recipeIds = selectedRecipes.map(recipe => recipe.id);
      onManageRecipes(book.id, 'add', recipeIds);
      
      // Reset state
      setSelectedRecipes([]);
      setSearchTerm('');
      setCategoryFilter('');
    }
  };

  const handleRemoveRecipe = (recipeId) => {
    onManageRecipes(book.id, 'remove', [recipeId]);
  };

  if (!isOpen || !book) return null;

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
                Manage Recipes: "{book.title}"
              </h2>
              <p className="text-sm text-gray-600">
                Add or remove recipes from this recipe book
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

        {/* ✅ Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === 'current'
                ? 'border-b-2 border-blue-500 text-blue-600 bg-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Current Recipes ({currentRecipes.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === 'add'
                ? 'border-b-2 border-blue-500 text-blue-600 bg-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Add Recipes ({filteredAvailableRecipes.length} available)
          </button>
        </div>

        {/* ✅ Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Search and Filters (only for Add tab) */}
          {activeTab === 'add' && (
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search available recipes..."
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
              </div>

              {/* Selected Count */}
              {selectedRecipes.length > 0 && (
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    <strong>{selectedRecipes.length}</strong> recipes selected to add
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
          )}

          {/* Recipe List */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Current Recipes Tab */}
            {activeTab === 'current' && (
              <div className="space-y-4">
                {currentRecipes.length === 0 ? (
                  <div className="text-center py-8">
                    <ChefHat className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">No recipes in this book yet</p>
                    <p className="text-gray-400 text-sm mt-1">Switch to "Add Recipes" to get started</p>
                  </div>
                ) : (
                  currentRecipes.map(recipe => (
                    <div 
                      key={recipe.id} 
                      className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="flex items-center flex-1">
                        <div className="p-2 bg-blue-50 rounded-lg mr-3">
                          <ChefHat className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{recipe.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className="bg-gray-100 px-2 py-1 rounded">{recipe.category}</span>
                            <div className="flex items-center">
                              <Clock size={12} className="mr-1" />
                              {recipe.prepTime + recipe.cookTime}m
                            </div>
                            <div className="flex items-center">
                              <Star size={12} className="mr-1 text-yellow-500" />
                              {recipe.rating}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveRecipe(recipe.id)}
                        className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove from book"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Add Recipes Tab */}
            {activeTab === 'add' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredAvailableRecipes.length === 0 ? (
                  <div className="col-span-full text-center py-8">
                    <ChefHat className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">No available recipes found</p>
                    <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  filteredAvailableRecipes.map(recipe => {
                    const isSelected = selectedRecipes.find(r => r.id === recipe.id);
                    
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
                            <h4 className="font-medium text-gray-900 mb-1">{recipe.name}</h4>
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

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-3">
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs">{recipe.category}</span>
                            <div className="flex items-center">
                              <Clock size={12} className="mr-1" />
                              {recipe.prepTime + recipe.cookTime}m
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star size={12} className="mr-1 text-yellow-500" />
                            {recipe.rating}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>

        {/* ✅ Modal Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {activeTab === 'current' && (
              <span>
                <strong>{currentRecipes.length}</strong> recipes currently in "{book.title}"
              </span>
            )}
            {activeTab === 'add' && selectedRecipes.length > 0 && (
              <span>
                Ready to add <strong>{selectedRecipes.length}</strong> recipes to "{book.title}"
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className={BUTTON_STYLES.secondary}
            >
              Close
            </button>
            {activeTab === 'add' && (
              <button
                onClick={handleAddRecipes}
                disabled={selectedRecipes.length === 0}
                className={`${BUTTON_STYLES.success} ${
                  selectedRecipes.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Plus size={16} className="mr-2" />
                Add {selectedRecipes.length} Recipes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeManagerModal;
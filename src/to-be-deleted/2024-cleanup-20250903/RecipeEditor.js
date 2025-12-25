// src/components/recipes/RecipeEditor.js
import React, { useState, useEffect } from 'react';
import { 
  Save, X, Plus, Trash2, GripVertical, ChevronDown, 
  Clock, Users, DollarSign, TrendingUp, Camera,
  ChefHat, Calculator, FileText, Tag
} from 'lucide-react';

const RecipeEditor = ({ recipe, onSave, onCancel }) => {
  // Initialize form with recipe data or defaults
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    category: 'Main',
    cuisine: '',
    description: '',
    servings: 4,
    prepTime: 15,
    cookTime: 30,
    totalTime: 45,
    difficulty: 'Medium',
    status: 'Draft',
    menuPrice: 0,
    targetFoodCost: 28,
    ingredients: [],
    instructions: [],
    notes: '',
    tags: [],
    image: null,
    ...recipe
  });

  // Sample ingredients with AP/EP data (in production, fetch from database)
  const [availableIngredients, setAvailableIngredients] = useState([
    {
      id: 1,
      code: 'ING-001',
      name: 'Carrots, Fresh',
      vendor: 'Fresh Produce Co.',
      category: 'Produce',
      epCostPerUnit: 3.125,
      epUnit: 'lbs',
      apUnit: 'lbs',
      yieldPercent: 80,
      stock: 50
    },
    {
      id: 2,
      code: 'ING-002',
      name: 'Yellow Onions',
      vendor: 'Fresh Produce Co.',
      category: 'Produce',
      epCostPerUnit: 0.97,
      epUnit: 'lbs',
      apUnit: 'lbs',
      yieldPercent: 85,
      stock: 100
    },
    {
      id: 3,
      code: 'ING-003',
      name: 'Chicken Breast, Boneless',
      vendor: 'Prime Meats Inc.',
      category: 'Protein',
      epCostPerUnit: 4.43,
      epUnit: 'lbs',
      apUnit: 'lbs',
      yieldPercent: 95,
      stock: 80
    },
    {
      id: 4,
      code: 'ING-004',
      name: 'Olive Oil, Extra Virgin',
      vendor: 'Mediterranean Imports',
      category: 'Oils',
      epCostPerUnit: 0.45,
      epUnit: 'fl oz',
      apUnit: 'gal',
      yieldPercent: 100,
      stock: 20
    },
    {
      id: 5,
      code: 'ING-005',
      name: 'Garlic, Fresh',
      vendor: 'Fresh Produce Co.',
      category: 'Produce',
      epCostPerUnit: 3.50,
      epUnit: 'lbs',
      apUnit: 'lbs',
      yieldPercent: 88,
      stock: 25
    }
  ]);

  const [showIngredientModal, setShowIngredientModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [ingredientQty, setIngredientQty] = useState(1);
  const [ingredientUnit, setIngredientUnit] = useState('lbs');

  // Categories and other options
  const categories = ['Main', 'Side', 'App', 'Dessert', 'Salad', 'Soup', 'Sauce', 'Base', 'Beverage'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const statuses = ['Draft', 'Active', 'Seasonal', 'Archived'];
  const availableTags = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Spicy', 'Signature', 'Seasonal'];

  // ToqueWorks color scheme
  const colors = {
    primary: '#8AC732',
    secondary: '#1F2D38',
    border: '#BBBFC2',
    background: '#F6F8F8',
    hover: '#C0E095',
    white: '#FFFFFF'
  };

  // Calculate totals
  const calculateTotalCost = () => {
    return formData.ingredients.reduce((sum, ing) => sum + (ing.totalCost || 0), 0);
  };

  const calculateFoodCostPercentage = () => {
    if (!formData.menuPrice) return 0;
    return ((calculateTotalCost() / formData.menuPrice) * 100).toFixed(1);
  };

  const calculateCostPerServing = () => {
    if (!formData.servings) return 0;
    return (calculateTotalCost() / formData.servings).toFixed(2);
  };

  // Add ingredient from modal
  const addIngredient = () => {
    if (!selectedIngredient) return;

    const newIngredient = {
      id: Date.now(),
      ingredientId: selectedIngredient.id,
      code: selectedIngredient.code,
      name: selectedIngredient.name,
      vendor: selectedIngredient.vendor,
      category: selectedIngredient.category,
      quantity: parseFloat(ingredientQty),
      unit: ingredientUnit,
      epCostPerUnit: selectedIngredient.epCostPerUnit,
      epUnit: selectedIngredient.epUnit,
      yieldPercent: selectedIngredient.yieldPercent,
      totalCost: parseFloat(ingredientQty) * selectedIngredient.epCostPerUnit
    };

    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient]
    }));

    setShowIngredientModal(false);
    setSelectedIngredient(null);
    setIngredientQty(1);
    setIngredientUnit('lbs');
  };

  // Update ingredient quantity
  const updateIngredientQty = (id, newQty) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.map(ing => {
        if (ing.id !== id) return ing;
        return {
          ...ing,
          quantity: parseFloat(newQty) || 0,
          totalCost: (parseFloat(newQty) || 0) * ing.epCostPerUnit
        };
      })
    }));
  };

  // Remove ingredient
  const removeIngredient = (id) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(ing => ing.id !== id)
    }));
  };

  // Add instruction
  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, { id: Date.now(), step: prev.instructions.length + 1, text: '' }]
    }));
  };

  // Update instruction
  const updateInstruction = (id, text) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.map(inst => 
        inst.id === id ? { ...inst, text } : inst
      )
    }));
  };

  // Remove instruction
  const removeInstruction = (id) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.filter(inst => inst.id !== id)
        .map((inst, idx) => ({ ...inst, step: idx + 1 }))
    }));
  };

  // Toggle tag
  const toggleTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value || 0);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-6" style={{ border: `1px solid ${colors.border}` }}>
          <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${colors.border}` }}>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: colors.secondary }}>
                {formData.id ? 'Edit Recipe' : 'New Recipe'}
              </h1>
              <p className="text-sm mt-1" style={{ color: colors.border }}>
                Create professional recipes with AP/EP costing
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-white rounded-lg hover:bg-gray-50"
                style={{ border: `1px solid ${colors.border}` }}
              >
                <X className="w-4 h-4 inline mr-2" />
                Cancel
              </button>
              <button
                onClick={() => onSave(formData)}
                className="px-4 py-2 text-white rounded-lg"
                style={{ backgroundColor: colors.primary }}
              >
                <Save className="w-4 h-4 inline mr-2" />
                Save Recipe
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm" style={{ border: `1px solid ${colors.border}` }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.border}` }}>
                <h2 className="text-lg font-semibold" style={{ color: colors.secondary }}>
                  Basic Information
                </h2>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Recipe Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded"
                    style={{ border: `1px solid ${colors.border}` }}
                    placeholder="Enter recipe name"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded"
                      style={{ border: `1px solid ${colors.border}` }}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Cuisine</label>
                    <input
                      type="text"
                      value={formData.cuisine}
                      onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                      className="w-full px-3 py-2 rounded"
                      style={{ border: `1px solid ${colors.border}` }}
                      placeholder="e.g., Italian"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 rounded"
                      style={{ border: `1px solid ${colors.border}` }}
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded"
                    rows="3"
                    style={{ border: `1px solid ${colors.border}` }}
                    placeholder="Brief description of the recipe"
                  />
                </div>
              </div>
            </div>

            {/* Ingredients with AP/EP Costing */}
            <div className="bg-white rounded-lg shadow-sm" style={{ border: `1px solid ${colors.border}` }}>
              <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${colors.border}` }}>
                <h2 className="text-lg font-semibold" style={{ color: colors.secondary }}>
                  Ingredients (AP/EP Costing)
                </h2>
                <button
                  onClick={() => setShowIngredientModal(true)}
                  className="px-3 py-1 text-white rounded"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Plus className="w-4 h-4 inline mr-1" />
                  Add Ingredient
                </button>
              </div>
              <div className="px-6 py-4">
                {formData.ingredients.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No ingredients added yet. Click "Add Ingredient" to get started.
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="grid grid-cols-12 gap-2 px-2 py-2 text-xs font-medium" style={{ color: colors.border }}>
                      <div className="col-span-1">Code</div>
                      <div className="col-span-3">Ingredient</div>
                      <div className="col-span-2">Vendor</div>
                      <div className="col-span-1">Qty</div>
                      <div className="col-span-1">Unit</div>
                      <div className="col-span-1">Yield%</div>
                      <div className="col-span-1">EP $/Unit</div>
                      <div className="col-span-1">Total</div>
                      <div className="col-span-1"></div>
                    </div>
                    {formData.ingredients.map((ingredient, idx) => (
                      <div key={ingredient.id} className="grid grid-cols-12 gap-2 items-center px-2 py-2 rounded hover:bg-gray-50" style={{ border: `1px solid ${colors.border}` }}>
                        <div className="col-span-1 text-xs" style={{ color: colors.border }}>
                          {ingredient.code}
                        </div>
                        <div className="col-span-3">
                          <div className="text-sm font-medium" style={{ color: colors.secondary }}>
                            {ingredient.name}
                          </div>
                          <div className="text-xs" style={{ color: colors.border }}>
                            {ingredient.category}
                          </div>
                        </div>
                        <div className="col-span-2 text-xs" style={{ color: colors.border }}>
                          {ingredient.vendor}
                        </div>
                        <div className="col-span-1">
                          <input
                            type="number"
                            step="0.01"
                            value={ingredient.quantity}
                            onChange={(e) => updateIngredientQty(ingredient.id, e.target.value)}
                            className="w-full px-1 py-1 text-sm text-center rounded"
                            style={{ border: `1px solid ${colors.border}` }}
                          />
                        </div>
                        <div className="col-span-1 text-sm text-center">
                          {ingredient.unit}
                        </div>
                        <div className="col-span-1 text-sm text-center">
                          {ingredient.yieldPercent}%
                        </div>
                        <div className="col-span-1 text-sm text-center">
                          {formatCurrency(ingredient.epCostPerUnit)}
                        </div>
                        <div className="col-span-1 text-sm font-semibold text-center">
                          {formatCurrency(ingredient.totalCost)}
                        </div>
                        <div className="col-span-1 text-center">
                          <button
                            onClick={() => removeIngredient(ingredient.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-lg shadow-sm" style={{ border: `1px solid ${colors.border}` }}>
              <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${colors.border}` }}>
                <h2 className="text-lg font-semibold" style={{ color: colors.secondary }}>
                  Method
                </h2>
                <button
                  onClick={addInstruction}
                  className="px-3 py-1 text-white rounded"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Plus className="w-4 h-4 inline mr-1" />
                  Add Step
                </button>
              </div>
              <div className="px-6 py-4">
                {formData.instructions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No instructions added yet. Click "Add Step" to get started.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {formData.instructions.map((instruction, idx) => (
                      <div key={instruction.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white" style={{ backgroundColor: colors.primary }}>
                          {instruction.step}
                        </div>
                        <div className="flex-1">
                          <textarea
                            value={instruction.text}
                            onChange={(e) => updateInstruction(instruction.id, e.target.value)}
                            className="w-full px-3 py-2 rounded"
                            rows="2"
                            style={{ border: `1px solid ${colors.border}` }}
                            placeholder="Enter instruction step..."
                          />
                        </div>
                        <button
                          onClick={() => removeInstruction(instruction.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Recipe Details */}
            <div className="bg-white rounded-lg shadow-sm" style={{ border: `1px solid ${colors.border}` }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.border}` }}>
                <h2 className="text-lg font-semibold" style={{ color: colors.secondary }}>
                  Recipe Details
                </h2>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    <Users className="w-4 h-4 inline mr-1" />
                    Servings
                  </label>
                  <input
                    type="number"
                    value={formData.servings}
                    onChange={(e) => setFormData({ ...formData, servings: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded"
                    style={{ border: `1px solid ${colors.border}` }}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Prep Time
                    </label>
                    <input
                      type="number"
                      value={formData.prepTime}
                      onChange={(e) => setFormData({ ...formData, prepTime: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded"
                      style={{ border: `1px solid ${colors.border}` }}
                      placeholder="mins"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Cook Time
                    </label>
                    <input
                      type="number"
                      value={formData.cookTime}
                      onChange={(e) => setFormData({ ...formData, cookTime: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded"
                      style={{ border: `1px solid ${colors.border}` }}
                      placeholder="mins"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full px-3 py-2 rounded"
                    style={{ border: `1px solid ${colors.border}` }}
                  >
                    {difficulties.map(diff => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Costing & Pricing */}
            <div className="bg-white rounded-lg shadow-sm" style={{ border: `1px solid ${colors.border}` }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.border}` }}>
                <h2 className="text-lg font-semibold" style={{ color: colors.secondary }}>
                  <Calculator className="w-4 h-4 inline mr-2" />
                  Costing & Pricing
                </h2>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div className="p-3 rounded" style={{ backgroundColor: colors.background }}>
                  <div className="text-xs font-medium mb-2" style={{ color: colors.border }}>
                    INGREDIENT COST
                  </div>
                  <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                    {formatCurrency(calculateTotalCost())}
                  </div>
                  <div className="text-sm mt-1" style={{ color: colors.border }}>
                    Cost per serving: {formatCurrency(calculateCostPerServing())}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Menu Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.menuPrice}
                    onChange={(e) => setFormData({ ...formData, menuPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded"
                    style={{ border: `1px solid ${colors.border}` }}
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Target Food Cost %</label>
                  <input
                    type="number"
                    value={formData.targetFoodCost}
                    onChange={(e) => setFormData({ ...formData, targetFoodCost: parseInt(e.target.value) || 28 })}
                    className="w-full px-3 py-2 rounded"
                    style={{ border: `1px solid ${colors.border}` }}
                    placeholder="28"
                  />
                </div>

                {formData.menuPrice > 0 && (
                  <div className="p-3 rounded" style={{ 
                    backgroundColor: calculateFoodCostPercentage() <= formData.targetFoodCost ? '#e8f5e9' : '#ffebee' 
                  }}>
                    <div className="text-xs font-medium mb-1">ACTUAL FOOD COST</div>
                    <div className="text-xl font-bold" style={{ 
                      color: calculateFoodCostPercentage() <= formData.targetFoodCost ? '#2e7d32' : '#c62828' 
                    }}>
                      {calculateFoodCostPercentage()}%
                    </div>
                    <div className="text-xs mt-1">
                      {calculateFoodCostPercentage() <= formData.targetFoodCost ? '✓ Within target' : '⚠ Above target'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg shadow-sm" style={{ border: `1px solid ${colors.border}` }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.border}` }}>
                <h2 className="text-lg font-semibold" style={{ color: colors.secondary }}>
                  <Tag className="w-4 h-4 inline mr-2" />
                  Tags
                </h2>
              </div>
              <div className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className="px-3 py-1 rounded-full text-sm transition-colors"
                      style={{
                        backgroundColor: formData.tags.includes(tag) ? colors.primary : colors.background,
                        color: formData.tags.includes(tag) ? 'white' : colors.secondary,
                        border: `1px solid ${formData.tags.includes(tag) ? colors.primary : colors.border}`
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-lg shadow-sm" style={{ border: `1px solid ${colors.border}` }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${colors.border}` }}>
                <h2 className="text-lg font-semibold" style={{ color: colors.secondary }}>
                  <FileText className="w-4 h-4 inline mr-2" />
                  Notes
                </h2>
              </div>
              <div className="px-6 py-4">
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded"
                  rows="4"
                  style={{ border: `1px solid ${colors.border}` }}
                  placeholder="Special notes, variations, tips..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ingredient Selection Modal */}
        {showIngredientModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="px-6 py-4 sticky top-0 bg-white" style={{ borderBottom: `1px solid ${colors.border}` }}>
                <h2 className="text-xl font-semibold" style={{ color: colors.secondary }}>
                  Select Ingredient
                </h2>
              </div>
              
              <div className="px-6 py-4">
                <div className="space-y-2">
                  {availableIngredients.map(ing => (
                    <div
                      key={ing.id}
                      onClick={() => {
                        setSelectedIngredient(ing);
                        setIngredientUnit(ing.epUnit);
                      }}
                      className="p-3 rounded cursor-pointer transition-colors"
                      style={{
                        border: `1px solid ${selectedIngredient?.id === ing.id ? colors.primary : colors.border}`,
                        backgroundColor: selectedIngredient?.id === ing.id ? colors.hover : 'white'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium" style={{ color: colors.secondary }}>
                            {ing.name}
                          </div>
                          <div className="text-sm" style={{ color: colors.border }}>
                            {ing.vendor} • {ing.category} • Yield: {ing.yieldPercent}%
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold" style={{ color: colors.primary }}>
                            {formatCurrency(ing.epCostPerUnit)}/{ing.epUnit}
                          </div>
                          <div className="text-xs" style={{ color: colors.border }}>
                            EP Cost
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedIngredient && (
                  <div className="mt-4 p-4 rounded" style={{ backgroundColor: colors.background }}>
                    <h3 className="font-medium mb-3">Quantity for Recipe</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm mb-1">Quantity</label>
                        <input
                          type="number"
                          step="0.01"
                          value={ingredientQty}
                          onChange={(e) => setIngredientQty(e.target.value)}
                          className="w-full px-3 py-2 rounded"
                          style={{ border: `1px solid ${colors.border}` }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Unit</label>
                        <select
                          value={ingredientUnit}
                          onChange={(e) => setIngredientUnit(e.target.value)}
                          className="w-full px-3 py-2 rounded"
                          style={{ border: `1px solid ${colors.border}` }}
                        >
                          <option value={selectedIngredient.epUnit}>{selectedIngredient.epUnit}</option>
                          <option value="oz">oz</option>
                          <option value="g">g</option>
                          <option value="cups">cups</option>
                          <option value="tbsp">tbsp</option>
                          <option value="tsp">tsp</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-3 p-2 rounded bg-white">
                      <div className="text-sm">Estimated Cost:</div>
                      <div className="text-lg font-bold" style={{ color: colors.primary }}>
                        {formatCurrency(parseFloat(ingredientQty) * selectedIngredient.epCostPerUnit)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="px-6 py-4 flex justify-end space-x-3 sticky bottom-0 bg-white" style={{ borderTop: `1px solid ${colors.border}` }}>
                <button
                  onClick={() => {
                    setShowIngredientModal(false);
                    setSelectedIngredient(null);
                  }}
                  className="px-4 py-2 bg-white rounded hover:bg-gray-50"
                  style={{ border: `1px solid ${colors.border}` }}
                >
                  Cancel
                </button>
                <button
                  onClick={addIngredient}
                  disabled={!selectedIngredient}
                  className="px-4 py-2 text-white rounded disabled:opacity-50"
                  style={{ backgroundColor: selectedIngredient ? colors.primary : colors.border }}
                >
                  Add Ingredient
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeEditor;
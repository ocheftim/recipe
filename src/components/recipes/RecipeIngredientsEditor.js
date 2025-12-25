// src/components/recipes/RecipeIngredientsEditor.js
// WORKING VERSION - Simplified and Tested
import React, { useState, useEffect, useMemo } from 'react';

const THEME = {
  primary: '#1F2D38',
  secondary: '#6B7280',
  background: '#FFFFFF',
  lightBackground: '#FAFAFA',
  accent: '#8AC732',
  border: '#E5E7EB',
  subtleBorder: '#F6F8F8',
  statusActive: '#8AC732',
  statusPending: '#F59E0B',
  statusInactive: '#E5E7EB',
  statusError: '#EF4444'
};

// Common units used in recipes
const UNITS = {
  weight: ['lb', 'oz', 'kg', 'g'],
  volume: ['gal', 'qt', 'pt', 'cup', 'fl oz', 'tbsp', 'tsp', 'L', 'mL'],
  count: ['each', 'dozen', 'bunch', 'package', 'can', 'jar', 'bottle']
};

const ALL_UNITS = [...UNITS.weight, ...UNITS.volume, ...UNITS.count];

// Common prep methods for autocomplete
const PREP_METHODS = [
  'diced', 'minced', 'chopped', 'sliced', 'julienned', 'grated', 'shredded',
  'cubed', 'halved', 'quartered', 'crushed', 'ground', 'torn', 'trimmed',
  'peeled', 'zested', 'blanched', 'toasted', 'melted', 'softened', 'chilled',
  'room temperature', 'sifted', 'drained', 'rinsed', 'patted dry'
];

// Initial ingredients database
const INITIAL_INGREDIENTS = [
  { id: 1, name: 'All-Purpose Flour', category: 'Dry Goods', unitCost: 0.50, unit: 'lb', allergens: ['gluten'] },
  { id: 2, name: 'Butter', category: 'Dairy', unitCost: 3.50, unit: 'lb', allergens: ['dairy'] },
  { id: 3, name: 'Eggs', category: 'Dairy', unitCost: 0.30, unit: 'each', allergens: ['eggs'] },
  { id: 4, name: 'Sugar', category: 'Dry Goods', unitCost: 0.75, unit: 'lb', allergens: [] },
  { id: 5, name: 'Salt', category: 'Seasoning', unitCost: 0.25, unit: 'lb', allergens: [] },
  { id: 6, name: 'Chicken Breast', category: 'Protein', unitCost: 4.50, unit: 'lb', allergens: [] },
  { id: 7, name: 'Ground Beef', category: 'Protein', unitCost: 5.00, unit: 'lb', allergens: [] },
  { id: 8, name: 'Salmon', category: 'Protein', unitCost: 12.00, unit: 'lb', allergens: ['fish'] },
  { id: 9, name: 'Olive Oil', category: 'Oil', unitCost: 12.00, unit: 'qt', allergens: [] },
  { id: 10, name: 'Vegetable Oil', category: 'Oil', unitCost: 8.00, unit: 'qt', allergens: [] },
  { id: 11, name: 'Garlic', category: 'Produce', unitCost: 0.15, unit: 'each', allergens: [] },
  { id: 12, name: 'Onion', category: 'Produce', unitCost: 0.50, unit: 'each', allergens: [] },
  { id: 13, name: 'Tomatoes', category: 'Produce', unitCost: 2.50, unit: 'lb', allergens: [] },
  { id: 14, name: 'Romaine Lettuce', category: 'Produce', unitCost: 2.50, unit: 'each', allergens: [] },
  { id: 15, name: 'Basil', category: 'Herbs', unitCost: 0.10, unit: 'bunch', allergens: [] },
  { id: 16, name: 'Fresh Basil', category: 'Herbs', unitCost: 1.50, unit: 'bunch', allergens: [] },
  { id: 17, name: 'Pizza Dough', category: 'Bread', unitCost: 1.50, unit: 'lb', allergens: ['gluten'] },
  { id: 18, name: 'Tomato Sauce', category: 'Sauce', unitCost: 2.00, unit: 'cup', allergens: [] },
  { id: 19, name: 'Fresh Mozzarella', category: 'Dairy', unitCost: 6.00, unit: 'lb', allergens: ['dairy'] },
  { id: 20, name: 'Mozzarella', category: 'Dairy', unitCost: 4.00, unit: 'lb', allergens: ['dairy'] }
];

// Get ingredients from localStorage or use initial
const getIngredientsDatabase = () => {
  const stored = localStorage.getItem('toqueworks_ingredients');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.error('Error loading ingredients:', e);
    }
  }
  localStorage.setItem('toqueworks_ingredients', JSON.stringify(INITIAL_INGREDIENTS));
  return INITIAL_INGREDIENTS;
};

// Save ingredients to localStorage
const saveIngredientsDatabase = (ingredients) => {
  localStorage.setItem('toqueworks_ingredients', JSON.stringify(ingredients));
};

const RecipeIngredientsEditor = ({ 
  ingredients = [], 
  onChange, 
  recipeYield = 1,
  yieldUnit = 'servings',
  scalingFactor = 1,
  readOnly = false 
}) => {
  const [localIngredients, setLocalIngredients] = useState([]);
  const [ingredientsDB, setIngredientsDB] = useState(() => getIngredientsDatabase());
  const [searchTerms, setSearchTerms] = useState({});
  const [showDropdowns, setShowDropdowns] = useState({});

  // Initialize ingredients
  useEffect(() => {
    if (ingredients.length > 0) {
      setLocalIngredients(ingredients.map(ing => ({
        ...ing,
        id: ing.id || Math.random().toString(36).substr(2, 9),
        allergens: ing.allergens || []
      })));
    } else {
      setLocalIngredients([createEmptyIngredient()]);
    }
  }, [ingredients]);

  // Create empty ingredient row
  const createEmptyIngredient = () => ({
    id: Math.random().toString(36).substr(2, 9),
    quantity: '',
    unit: 'each',
    ingredientName: '',
    ingredientId: null,
    prepInstructions: '',
    cost: 0,
    unitCost: 0,
    allergens: []
  });

  // Calculate ingredient cost
  const calculateIngredientCost = (ingredient) => {
    if (!ingredient.ingredientId || !ingredient.quantity) return 0;
    
    const dbIngredient = ingredientsDB.find(i => i.id === ingredient.ingredientId);
    if (!dbIngredient || !dbIngredient.unitCost) return 0;

    const quantity = parseFloat(ingredient.quantity) || 0;
    const unitCost = parseFloat(dbIngredient.unitCost) || 0;
    
    // Simple calculation - would need conversion logic for different units
    return quantity * unitCost * scalingFactor;
  };

  // Calculate totals
  const totals = useMemo(() => {
    const totalCost = localIngredients.reduce((sum, ing) => sum + calculateIngredientCost(ing), 0);
    const costPerServing = recipeYield > 0 ? totalCost / (recipeYield * scalingFactor) : 0;
    const allergenList = [...new Set(localIngredients.flatMap(ing => ing.allergens || []))];
    
    return { totalCost, costPerServing, allergenList };
  }, [localIngredients, recipeYield, scalingFactor, ingredientsDB]);

  // Handle ingredient changes
  const updateIngredient = (id, field, value) => {
    const updated = localIngredients.map(ing => {
      if (ing.id === id) {
        const updatedIng = { ...ing, [field]: value };
        
        if (field === 'ingredientId') {
          const dbIngredient = ingredientsDB.find(i => i.id === value);
          if (dbIngredient) {
            updatedIng.ingredientName = dbIngredient.name;
            updatedIng.allergens = dbIngredient.allergens || [];
            updatedIng.unitCost = dbIngredient.unitCost;
          }
        }
        
        return updatedIng;
      }
      return ing;
    });
    
    setLocalIngredients(updated);
    onChange?.(updated);
  };

  // Add new ingredient row
  const addIngredient = () => {
    const newIngredient = createEmptyIngredient();
    const updated = [...localIngredients, newIngredient];
    setLocalIngredients(updated);
    onChange?.(updated);
  };

  // Remove ingredient
  const removeIngredient = (id) => {
    if (localIngredients.length <= 1) return;
    
    const updated = localIngredients.filter(ing => ing.id !== id);
    setLocalIngredients(updated);
    onChange?.(updated);
  };

  // Filter ingredients based on search
  const getFilteredIngredients = (searchTerm) => {
    if (!searchTerm) return [];
    const term = searchTerm.toLowerCase();
    return ingredientsDB.filter(ing => 
      ing.name.toLowerCase().includes(term)
    ).slice(0, 10);
  };

  // Add new ingredient to database
  const addNewIngredientToDatabase = (name, ingredientRowId) => {
    const newIngredient = {
      id: Date.now(),
      name: name,
      category: 'Uncategorized',
      unitCost: 0,
      unit: 'each',
      allergens: [],
      needsUpdate: true
    };
    
    const updatedDB = [...ingredientsDB, newIngredient];
    setIngredientsDB(updatedDB);
    saveIngredientsDatabase(updatedDB);
    
    // Update the ingredient row
    updateIngredient(ingredientRowId, 'ingredientId', newIngredient.id);
    updateIngredient(ingredientRowId, 'ingredientName', newIngredient.name);
    
    // Clear search
    setSearchTerms(prev => ({ ...prev, [ingredientRowId]: '' }));
    setShowDropdowns(prev => ({ ...prev, [ingredientRowId]: false }));
    
    alert(`Added "${name}" to ingredients. Remember to update its cost information.`);
  };

  // Render ingredient row
  const renderIngredientRow = (ingredient, index) => {
    const dbIngredient = ingredientsDB.find(i => i.id === ingredient.ingredientId);
    const searchTerm = searchTerms[ingredient.id] || '';
    const showDropdown = showDropdowns[ingredient.id] || false;
    const filteredIngredients = getFilteredIngredients(searchTerm);
    
    return (
      <div 
        key={ingredient.id}
        style={{
          display: 'grid',
          gridTemplateColumns: '80px 100px 250px 150px 120px 50px',
          gap: '12px',
          padding: '12px',
          backgroundColor: index % 2 === 0 ? THEME.background : THEME.lightBackground,
          borderBottom: `1px solid ${THEME.subtleBorder}`,
          alignItems: 'center'
        }}
      >
        {/* Quantity */}
        <input
          type="number"
          step="0.01"
          value={ingredient.quantity}
          onChange={(e) => updateIngredient(ingredient.id, 'quantity', e.target.value)}
          disabled={readOnly}
          placeholder="0"
          style={{
            padding: '6px',
            border: `1px solid ${THEME.border}`,
            borderRadius: '4px',
            fontSize: '13px'
          }}
        />
        
        {/* Unit */}
        <select
          value={ingredient.unit}
          onChange={(e) => updateIngredient(ingredient.id, 'unit', e.target.value)}
          disabled={readOnly}
          style={{
            padding: '6px',
            border: `1px solid ${THEME.border}`,
            borderRadius: '4px',
            fontSize: '13px'
          }}
        >
          {ALL_UNITS.map(unit => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
        
        {/* Ingredient Search */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={ingredient.ingredientId ? ingredient.ingredientName : searchTerm}
            onChange={(e) => {
              const value = e.target.value;
              setSearchTerms(prev => ({ ...prev, [ingredient.id]: value }));
              setShowDropdowns(prev => ({ ...prev, [ingredient.id]: true }));
              
              // Clear selection if typing
              if (ingredient.ingredientId) {
                updateIngredient(ingredient.id, 'ingredientId', null);
                updateIngredient(ingredient.id, 'ingredientName', '');
              }
            }}
            onFocus={() => {
              if (!readOnly && !ingredient.ingredientId) {
                setShowDropdowns(prev => ({ ...prev, [ingredient.id]: true }));
              }
            }}
            onBlur={() => {
              setTimeout(() => {
                setShowDropdowns(prev => ({ ...prev, [ingredient.id]: false }));
              }, 200);
            }}
            disabled={readOnly}
            placeholder="Type to search..."
            style={{
              padding: '6px',
              border: `1px solid ${
                ingredient.ingredientId 
                  ? (dbIngredient?.needsUpdate ? THEME.statusPending : THEME.border)
                  : THEME.statusError
              }`,
              borderRadius: '4px',
              fontSize: '13px',
              width: '100%',
              backgroundColor: ingredient.ingredientId 
                ? (dbIngredient?.needsUpdate ? '#FFF9E6' : THEME.background)
                : '#FEF2F2'
            }}
          />
          
          {/* Dropdown */}
          {showDropdown && searchTerm && !ingredient.ingredientId && !readOnly && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: THEME.background,
              border: `1px solid ${THEME.border}`,
              borderRadius: '4px',
              marginTop: '2px',
              zIndex: 100,
              maxHeight: '200px',
              overflowY: 'auto',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {filteredIngredients.length > 0 ? (
                filteredIngredients.map(dbIng => (
                  <div
                    key={dbIng.id}
                    onClick={() => {
                      updateIngredient(ingredient.id, 'ingredientId', dbIng.id);
                      updateIngredient(ingredient.id, 'ingredientName', dbIng.name);
                      setSearchTerms(prev => ({ ...prev, [ingredient.id]: '' }));
                      setShowDropdowns(prev => ({ ...prev, [ingredient.id]: false }));
                    }}
                    style={{
                      padding: '8px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      borderBottom: `1px solid ${THEME.subtleBorder}`
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = THEME.lightBackground}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <div>{dbIng.name}</div>
                    <div style={{ fontSize: '11px', color: THEME.secondary }}>
                      {dbIng.category} • ${dbIng.unitCost}/{dbIng.unit}
                    </div>
                  </div>
                ))
              ) : (
                <div
                  onClick={() => addNewIngredientToDatabase(searchTerm, ingredient.id)}
                  style={{
                    padding: '10px',
                    cursor: 'pointer',
                    backgroundColor: THEME.accent,
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}
                >
                  + Add "{searchTerm}" as new ingredient
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Prep Instructions */}
        <input
          type="text"
          value={ingredient.prepInstructions}
          onChange={(e) => updateIngredient(ingredient.id, 'prepInstructions', e.target.value)}
          disabled={readOnly}
          placeholder="Prep..."
          style={{
            padding: '6px',
            border: `1px solid ${THEME.border}`,
            borderRadius: '4px',
            fontSize: '13px'
          }}
        />
        
        {/* Cost */}
        <div style={{
          padding: '6px',
          textAlign: 'right',
          fontSize: '13px'
        }}>
          <div style={{ fontWeight: '500' }}>
            ${calculateIngredientCost(ingredient).toFixed(2)}
          </div>
          {dbIngredient && (
            <div style={{ fontSize: '11px', color: THEME.secondary }}>
              ${dbIngredient.unitCost}/{dbIngredient.unit}
            </div>
          )}
        </div>
        
        {/* Actions */}
        {!readOnly && (
          <button
            onClick={() => removeIngredient(ingredient.id)}
            disabled={localIngredients.length <= 1}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              border: 'none',
              background: 'transparent',
              color: THEME.statusError,
              cursor: localIngredients.length <= 1 ? 'not-allowed' : 'pointer',
              opacity: localIngredients.length <= 1 ? 0.3 : 1
            }}
          >
            Remove
          </button>
        )}
      </div>
    );
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h3 style={{ 
          fontSize: '13px', 
          fontWeight: '600', 
          color: THEME.primary,
          margin: 0
        }}>
          Ingredients {scalingFactor !== 1 && `(Scaled ×${scalingFactor})`}
        </h3>
        
        {!readOnly && (
          <button
            onClick={addIngredient}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              border: `1px solid ${THEME.accent}`,
              borderRadius: '4px',
              background: THEME.accent,
              color: 'white',
              cursor: 'pointer'
            }}
          >
            + Add Ingredient
          </button>
        )}
      </div>

      {/* Column Headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '80px 100px 250px 150px 120px 50px',
        gap: '12px',
        padding: '8px 12px',
        backgroundColor: THEME.lightBackground,
        borderBottom: `2px solid ${THEME.border}`,
        fontSize: '11px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: THEME.secondary
      }}>
        <div>Qty</div>
        <div>Unit</div>
        <div>Ingredient</div>
        <div>Prep</div>
        <div style={{ textAlign: 'right' }}>Cost</div>
        <div>Actions</div>
      </div>

      {/* Ingredient Rows */}
      <div>
        {localIngredients.map((ingredient, index) => 
          renderIngredientRow(ingredient, index)
        )}
      </div>

      {/* Totals Footer */}
      <div style={{
        marginTop: '16px',
        padding: '16px',
        backgroundColor: THEME.lightBackground,
        borderRadius: '4px',
        border: `1px solid ${THEME.border}`
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', color: THEME.secondary, marginBottom: '4px' }}>
              TOTAL COST
            </div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: THEME.primary }}>
              ${totals.totalCost.toFixed(2)}
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '11px', color: THEME.secondary, marginBottom: '4px' }}>
              COST PER {yieldUnit.toUpperCase()}
            </div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: THEME.primary }}>
              ${totals.costPerServing.toFixed(2)}
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '11px', color: THEME.secondary, marginBottom: '4px' }}>
              ALLERGENS
            </div>
            <div style={{ fontSize: '13px', color: totals.allergenList.length > 0 ? THEME.statusError : THEME.primary }}>
              {totals.allergenList.length > 0 ? totals.allergenList.join(', ') : 'None'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeIngredientsEditor;
// src/components/ingredients/IngredientSelector.js
import React, { useState, useEffect, useMemo } from 'react';

const theme = {
  white: '#FFFFFF',
  seasalt: '#F6F8F8',
  silver: '#BBBFC2',
  charcoal: '#2A3E51',
  gunmetal: '#1F2D38',
  yellowGreen: '#8AC732',
  coral: '#FF6F61',
  orange: '#FF914D'
};

const IngredientSelector = ({ 
  ingredientData = [], 
  selectedIngredients = [],
  onAddIngredient,
  onRemoveIngredient,
  onUpdateIngredient,
  allowQuickAdd = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddName, setQuickAddName] = useState('');
  const [errors, setErrors] = useState({});

  // Common units for the dropdown
  const commonUnits = [
    'lb', 'oz', 'g', 'kg',
    'cup', 'tbsp', 'tsp', 'qt', 'gal', 'L', 'mL',
    'each', 'bunch', 'head', 'clove',
    'can', 'bottle', 'package'
  ];

  // Filter available ingredients (exclude already selected)
  const availableIngredients = useMemo(() => {
    const selectedIds = selectedIngredients.map(i => i.id || i.name);
    return ingredientData.filter(ingredient => 
      !selectedIds.includes(ingredient.id || ingredient.name)
    );
  }, [ingredientData, selectedIngredients]);

  // Search filtered ingredients
  const filteredIngredients = useMemo(() => {
    if (!searchTerm) return [];
    
    const term = searchTerm.toLowerCase();
    return availableIngredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(term) ||
      (ingredient.category && ingredient.category.toLowerCase().includes(term))
    ).slice(0, 8); // Limit dropdown to 8 items
  }, [searchTerm, availableIngredients]);

  // Handle ingredient selection from dropdown
  const handleSelectIngredient = (ingredient) => {
    setSelectedIngredient(ingredient);
    setSearchTerm(ingredient.name);
    setShowDropdown(false);
    
    // Auto-populate unit if ingredient has a default
    if (ingredient.defaultUnit) {
      setUnit(ingredient.defaultUnit);
    } else if (ingredient.unit) {
      setUnit(ingredient.unit);
    }
  };

  // Add ingredient to recipe
  const handleAddIngredient = () => {
    const validationErrors = {};
    
    if (!selectedIngredient && !quickAddName) {
      validationErrors.ingredient = 'Please select or enter an ingredient';
    }
    if (!quantity || quantity <= 0) {
      validationErrors.quantity = 'Please enter a valid quantity';
    }
    if (!unit) {
      validationErrors.unit = 'Please select a unit';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const ingredientToAdd = selectedIngredient || {
      id: `temp_${Date.now()}`,
      name: quickAddName,
      provisional: true,
      apCost: 0,
      category: 'Uncategorized'
    };

    // Calculate cost based on quantity and unit
    const cost = calculateIngredientCost(ingredientToAdd, quantity, unit);

    onAddIngredient({
      ...ingredientToAdd,
      quantity: parseFloat(quantity),
      unit,
      cost,
      addedAt: new Date().toISOString()
    });

    // Reset form
    setSelectedIngredient(null);
    setSearchTerm('');
    setQuantity('');
    setUnit('');
    setQuickAddName('');
    setShowQuickAdd(false);
    setErrors({});
  };

  // Calculate ingredient cost
  const calculateIngredientCost = (ingredient, qty, unit) => {
    if (!ingredient.apCost || ingredient.provisional) return 0;
    
    // Simple cost calculation - you can make this more sophisticated
    const baseQty = parseFloat(qty) || 0;
    const costPerUnit = ingredient.apCostPerUnit || ingredient.apCost || 0;
    
    // Apply unit conversions if needed
    let multiplier = 1;
    if (ingredient.unit && unit !== ingredient.unit) {
      multiplier = getUnitConversionMultiplier(ingredient.unit, unit);
    }
    
    return (baseQty * costPerUnit * multiplier).toFixed(2);
  };

  // Basic unit conversion (expand as needed)
  const getUnitConversionMultiplier = (fromUnit, toUnit) => {
    const conversions = {
      'lb-oz': 16,
      'kg-g': 1000,
      'gal-qt': 4,
      'qt-cup': 4,
      'tbsp-tsp': 3,
      'cup-tbsp': 16
    };
    
    const key = `${fromUnit}-${toUnit}`;
    return conversions[key] || 1;
  };

  // Handle quick add toggle
  const toggleQuickAdd = () => {
    setShowQuickAdd(!showQuickAdd);
    if (showQuickAdd) {
      setQuickAddName('');
    }
  };

  // Format currency
  const formatCurrency = (value) => {
    const num = parseFloat(value) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(num);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      {/* Section Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '15px' 
      }}>
        <h3 style={{ margin: 0, color: theme.gunmetal }}>Ingredients</h3>
        {allowQuickAdd && (
          <button
            onClick={toggleQuickAdd}
            style={{
              padding: '6px 12px',
              backgroundColor: showQuickAdd ? theme.silver : theme.yellowGreen,
              color: theme.white,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              transition: 'all 0.2s'
            }}
          >
            {showQuickAdd ? 'Use Existing' : 'Quick Add New'}
          </button>
        )}
      </div>

      {/* Ingredient Input Section */}
      <div style={{ 
        backgroundColor: theme.seasalt, 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '15px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '10px' }}>
          
          {/* Ingredient Search/Input */}
          <div style={{ position: 'relative' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontSize: '12px',
              color: theme.gunmetal,
              fontWeight: '500'
            }}>
              {showQuickAdd ? 'New Ingredient Name' : 'Select Ingredient'}
            </label>
            
            {showQuickAdd ? (
              <input
                type="text"
                value={quickAddName}
                onChange={(e) => {
                  setQuickAddName(e.target.value);
                  setErrors({ ...errors, ingredient: '' });
                }}
                placeholder="Enter ingredient name"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: `1px solid ${errors.ingredient ? theme.coral : theme.silver}`,
                  borderRadius: '4px',
                  backgroundColor: theme.white
                }}
              />
            ) : (
              <>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(true);
                    setSelectedIngredient(null);
                    setErrors({ ...errors, ingredient: '' });
                  }}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="Search ingredients..."
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: `1px solid ${errors.ingredient ? theme.coral : theme.silver}`,
                    borderRadius: '4px',
                    backgroundColor: selectedIngredient ? '#e8f5e9' : theme.white
                  }}
                />
                
                {/* Dropdown */}
                {showDropdown && filteredIngredients.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: theme.white,
                    border: `1px solid ${theme.silver}`,
                    borderRadius: '4px',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    zIndex: 1000,
                    marginTop: '2px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    {filteredIngredients.map(ingredient => (
                      <div
                        key={ingredient.id || ingredient.name}
                        onClick={() => handleSelectIngredient(ingredient)}
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          borderBottom: `1px solid ${theme.seasalt}`,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = theme.seasalt}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      >
                        <div>
                          <div style={{ fontWeight: '500', color: theme.gunmetal }}>
                            {ingredient.name}
                          </div>
                          <div style={{ fontSize: '11px', color: theme.silver }}>
                            {ingredient.category} • {formatCurrency(ingredient.apCost || 0)}/{ingredient.unit || 'unit'}
                          </div>
                        </div>
                        {ingredient.provisional && (
                          <span style={{
                            fontSize: '10px',
                            padding: '2px 6px',
                            backgroundColor: theme.orange,
                            color: theme.white,
                            borderRadius: '3px'
                          }}>
                            NEEDS VALIDATION
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            
            {errors.ingredient && (
              <div style={{ color: theme.coral, fontSize: '11px', marginTop: '2px' }}>
                {errors.ingredient}
              </div>
            )}
          </div>

          {/* Quantity Input */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontSize: '12px',
              color: theme.gunmetal,
              fontWeight: '500'
            }}>
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                setErrors({ ...errors, quantity: '' });
              }}
              placeholder="0.00"
              step="0.01"
              min="0"
              style={{
                width: '100%',
                padding: '8px',
                border: `1px solid ${errors.quantity ? theme.coral : theme.silver}`,
                borderRadius: '4px',
                backgroundColor: theme.white
              }}
            />
            {errors.quantity && (
              <div style={{ color: theme.coral, fontSize: '11px', marginTop: '2px' }}>
                {errors.quantity}
              </div>
            )}
          </div>

          {/* Unit Select */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontSize: '12px',
              color: theme.gunmetal,
              fontWeight: '500'
            }}>
              Unit
            </label>
            <select
              value={unit}
              onChange={(e) => {
                setUnit(e.target.value);
                setErrors({ ...errors, unit: '' });
              }}
              style={{
                width: '100%',
                padding: '8px',
                border: `1px solid ${errors.unit ? theme.coral : theme.silver}`,
                borderRadius: '4px',
                backgroundColor: theme.white,
                cursor: 'pointer'
              }}
            >
              <option value="">Select unit</option>
              {commonUnits.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
            {errors.unit && (
              <div style={{ color: theme.coral, fontSize: '11px', marginTop: '2px' }}>
                {errors.unit}
              </div>
            )}
          </div>

          {/* Add Button */}
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              onClick={handleAddIngredient}
              style={{
                padding: '8px 20px',
                backgroundColor: theme.yellowGreen,
                color: theme.white,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s',
                height: '38px'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#7AB428'}
              onMouseLeave={(e) => e.target.style.backgroundColor = theme.yellowGreen}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Selected Ingredients List */}
      {selectedIngredients.length > 0 && (
        <div style={{ marginTop: '15px' }}>
          <div style={{ 
            fontSize: '12px', 
            color: theme.silver, 
            marginBottom: '10px',
            fontWeight: '500'
          }}>
            {selectedIngredients.length} ingredient{selectedIngredients.length !== 1 ? 's' : ''} added
          </div>
          
          <div style={{ 
            backgroundColor: theme.white,
            border: `1px solid ${theme.silver}`,
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            {/* Table Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
              padding: '10px 15px',
              backgroundColor: theme.seasalt,
              borderBottom: `1px solid ${theme.silver}`,
              fontSize: '12px',
              fontWeight: '600',
              color: theme.gunmetal
            }}>
              <div>Ingredient</div>
              <div style={{ textAlign: 'right' }}>Quantity</div>
              <div style={{ textAlign: 'center' }}>Unit</div>
              <div style={{ textAlign: 'right' }}>Cost</div>
              <div></div>
            </div>

            {/* Ingredient Rows */}
            {selectedIngredients.map((ingredient, index) => (
              <div 
                key={ingredient.id || `${ingredient.name}-${index}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
                  padding: '10px 15px',
                  borderBottom: index < selectedIngredients.length - 1 ? `1px solid ${theme.seasalt}` : 'none',
                  alignItems: 'center',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.seasalt}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div>
                  <div style={{ fontWeight: '500', color: theme.gunmetal }}>
                    {ingredient.name}
                  </div>
                  {ingredient.provisional && (
                    <div style={{ 
                      fontSize: '10px', 
                      color: theme.orange,
                      marginTop: '2px'
                    }}>
                      ⚠ Needs validation
                    </div>
                  )}
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <input
                    type="number"
                    value={ingredient.quantity}
                    onChange={(e) => onUpdateIngredient(index, { quantity: parseFloat(e.target.value) })}
                    style={{
                      width: '60px',
                      padding: '4px',
                      border: `1px solid ${theme.seasalt}`,
                      borderRadius: '3px',
                      textAlign: 'right'
                    }}
                    step="0.01"
                    min="0"
                  />
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <select
                    value={ingredient.unit}
                    onChange={(e) => onUpdateIngredient(index, { unit: e.target.value })}
                    style={{
                      padding: '4px',
                      border: `1px solid ${theme.seasalt}`,
                      borderRadius: '3px',
                      fontSize: '12px'
                    }}
                  >
                    {commonUnits.map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
                
                <div style={{ 
                  textAlign: 'right',
                  fontWeight: '500',
                  color: ingredient.provisional ? theme.silver : theme.gunmetal
                }}>
                  {formatCurrency(ingredient.cost || 0)}
                </div>
                
                <div>
                  <button
                    onClick={() => onRemoveIngredient(index)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: 'transparent',
                      color: theme.coral,
                      border: `1px solid ${theme.coral}`,
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = theme.coral;
                      e.target.style.color = theme.white;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = theme.coral;
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Total Cost Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
              padding: '10px 15px',
              backgroundColor: theme.seasalt,
              borderTop: `2px solid ${theme.silver}`,
              fontWeight: '600'
            }}>
              <div style={{ color: theme.gunmetal }}>Total Ingredient Cost</div>
              <div></div>
              <div></div>
              <div style={{ textAlign: 'right', color: theme.gunmetal, fontSize: '16px' }}>
                {formatCurrency(selectedIngredients.reduce((sum, ing) => sum + (parseFloat(ing.cost) || 0), 0))}
              </div>
              <div></div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Add Notice */}
      {showQuickAdd && (
        <div style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#856404'
        }}>
          <strong>Note:</strong> Quick-added ingredients will need validation later to add accurate costing information.
        </div>
      )}
    </div>
  );
};

export default IngredientSelector;
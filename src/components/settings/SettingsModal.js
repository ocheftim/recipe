// src/components/recipes/RecipeModal.js
import React, { useState, useEffect } from 'react';
import { formatCurrency, parseCurrency, formatCurrencyInput } from '../../utils/formatters';
import { getRecipeOptions } from '../../services/recipeOptionsService';

const RecipeModal = ({ recipe, onSave, onClose, theme }) => {
  const isEditing = !!recipe;
  
  // Form state - changed to arrays for multi-select fields
  const [formData, setFormData] = useState({
    name: '',
    categories: [], // Changed from category to categories array
    cuisines: [],   // Changed from cuisine to cuisines array
    outlets: [],    // Changed from outlet to outlets array
    menus: [],      // Changed from menu to menus array
    yield: '',
    yieldUnit: 'servings',
    totalCost: '',
    costPerServing: '',
    menuPrice: '',
    foodCostPercent: '',
    dietary: [],
    description: '',
    instructions: '',
    prepTime: '',
    cookTime: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Get configurable options
  const options = getRecipeOptions();

  // Initialize form data when recipe prop changes
  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name || '',
        // Handle both old single values and new array values for backwards compatibility
        categories: Array.isArray(recipe.categories) ? recipe.categories : (recipe.category ? [recipe.category] : []),
        cuisines: Array.isArray(recipe.cuisines) ? recipe.cuisines : (recipe.cuisine ? [recipe.cuisine] : []),
        outlets: Array.isArray(recipe.outlets) ? recipe.outlets : (recipe.outlet ? [recipe.outlet] : []),
        menus: Array.isArray(recipe.menus) ? recipe.menus : (recipe.menu ? [recipe.menu] : []),
        yield: recipe.yield || '',
        yieldUnit: recipe.yieldUnit || 'servings',
        totalCost: recipe.totalCost || '',
        costPerServing: recipe.costPerServing || '',
        menuPrice: recipe.menuPrice || '',
        foodCostPercent: recipe.foodCostPercent || '',
        dietary: recipe.dietary || [],
        description: recipe.description || '',
        instructions: recipe.instructions || '',
        prepTime: recipe.prepTime || '',
        cookTime: recipe.cookTime || ''
      });
    }
  }, [recipe]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Generic checkbox handler for multi-select fields
  const handleCheckboxChange = (field, option) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(option)
        ? prev[field].filter(item => item !== option)
        : [...prev[field], option]
    }));
    
    // Clear error when user makes selection
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle dietary checkbox changes (keeping for backwards compatibility)
  const handleDietaryChange = (option) => {
    handleCheckboxChange('dietary', option);
  };

  // Handle currency input changes
  const handleCurrencyChange = (field, value) => {
    const numValue = parseCurrency(value);
    setFormData(prev => ({ ...prev, [field]: numValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Recipe name is required';
    }

    // Validate financial fields if provided
    if (formData.totalCost && (isNaN(formData.totalCost) || formData.totalCost < 0)) {
      newErrors.totalCost = 'Valid total cost required';
    }

    if (formData.menuPrice && (isNaN(formData.menuPrice) || formData.menuPrice < 0)) {
      newErrors.menuPrice = 'Valid menu price required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Calculate food cost percentage if both costs are provided
      const calculatedData = { ...formData };
      if (formData.totalCost && formData.menuPrice && formData.yield) {
        const costPerServing = parseFloat(formData.totalCost) / parseFloat(formData.yield);
        calculatedData.costPerServing = costPerServing;
        calculatedData.foodCostPercent = (costPerServing / parseFloat(formData.menuPrice)) * 100;
      }

      await onSave({
        ...recipe,
        ...calculatedData,
        lastUpdated: new Date().toISOString()
      });
      
      onClose();
    } catch (error) {
      console.error('Error saving recipe:', error);
      // Handle error (show message, etc.)
    } finally {
      setLoading(false);
    }
  };

  // Currency input component with proper formatting
  const CurrencyInput = ({ label, field, placeholder, required = false }) => {
    const [displayValue, setDisplayValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    // Update display value when form data changes
    useEffect(() => {
      if (!isFocused) {
        setDisplayValue(formData[field] ? formatCurrency(formData[field]) : '');
      }
    }, [formData[field], isFocused]);

    const handleFocus = () => {
      setIsFocused(true);
      // Show raw number when focused for easier editing
      setDisplayValue(formData[field] ? formData[field].toString() : '');
    };

    const handleBlur = () => {
      setIsFocused(false);
      const numValue = parseCurrency(displayValue);
      handleCurrencyChange(field, displayValue);
    };

    const handleChange = (e) => {
      const value = e.target.value;
      setDisplayValue(value);
      
      if (isFocused) {
        // Only allow numbers and decimal point while typing
        const cleanValue = value.replace(/[^0-9.]/g, '');
        const decimalCount = (cleanValue.match(/\./g) || []).length;
        if (decimalCount <= 1) {
          setDisplayValue(cleanValue);
        }
      }
    };

    return (
      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          fontSize: '13px',
          fontWeight: '500',
          color: theme.gunmetal || '#1F2D38',
          marginBottom: '4px'
        }}>
          {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
        </label>
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: `1px solid ${errors[field] ? '#dc2626' : theme.silver || '#BBBFC2'}`,
            borderRadius: '4px',
            fontSize: '14px',
            backgroundColor: theme.white || '#FFFFFF',
            boxSizing: 'border-box'
          }}
        />
        {errors[field] && (
          <span style={{ 
            fontSize: '12px', 
            color: '#dc2626', 
            marginTop: '2px',
            display: 'block'
          }}>
            {errors[field]}
          </span>
        )}
      </div>
    );
  };

  // Input component with consistent styling
  const FormInput = ({ label, field, type = 'text', placeholder, required = false, ...props }) => (
    <div style={{ marginBottom: '16px' }}>
      <label style={{
        display: 'block',
        fontSize: '13px',
        fontWeight: '500',
        color: theme.gunmetal || '#1F2D38',
        marginBottom: '4px'
      }}>
        {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
      </label>
      <input
        type={type}
        value={formData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: `1px solid ${errors[field] ? '#dc2626' : theme.silver || '#BBBFC2'}`,
          borderRadius: '4px',
          fontSize: '14px',
          backgroundColor: theme.white || '#FFFFFF',
          boxSizing: 'border-box'
        }}
        {...props}
      />
      {errors[field] && (
        <span style={{ 
          fontSize: '12px', 
          color: '#dc2626', 
          marginTop: '2px',
          display: 'block'
        }}>
          {errors[field]}
        </span>
      )}
    </div>
  );

  // Select component with consistent styling (keeping for yieldUnit)
  const FormSelect = ({ label, field, options, required = false, placeholder = 'Select...' }) => (
    <div style={{ marginBottom: '16px' }}>
      <label style={{
        display: 'block',
        fontSize: '13px',
        fontWeight: '500',
        color: theme.gunmetal || '#1F2D38',
        marginBottom: '4px'
      }}>
        {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
      </label>
      <select
        value={formData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: `1px solid ${errors[field] ? '#dc2626' : theme.silver || '#BBBFC2'}`,
          borderRadius: '4px',
          fontSize: '14px',
          backgroundColor: theme.white || '#FFFFFF',
          boxSizing: 'border-box'
        }}
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {errors[field] && (
        <span style={{ 
          fontSize: '12px', 
          color: '#dc2626', 
          marginTop: '2px',
          display: 'block'
        }}>
          {errors[field]}
        </span>
      )}
    </div>
  );

  // Checkbox group component for multi-select fields
  const CheckboxGroup = ({ label, field, options, required = false }) => (
    <div style={{ marginBottom: '16px' }}>
      <label style={{
        display: 'block',
        fontSize: '13px',
        fontWeight: '500',
        color: theme.gunmetal || '#1F2D38',
        marginBottom: '8px'
      }}>
        {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
      </label>
      <div style={{
        border: `1px solid ${errors[field] ? '#dc2626' : theme.silver || '#BBBFC2'}`,
        borderRadius: '4px',
        padding: '12px',
        backgroundColor: theme.white || '#FFFFFF',
        maxHeight: '150px',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '8px'
        }}>
          {options.map(option => (
            <label key={option} style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: '14px',
              color: theme.charcoal || '#2A3E51'
            }}>
              <input
                type="checkbox"
                checked={formData[field].includes(option)}
                onChange={() => handleCheckboxChange(field, option)}
                style={{ marginRight: '6px' }}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      {formData[field].length > 0 && (
        <div style={{
          fontSize: '12px',
          color: theme.charcoal || '#2A3E51',
          marginTop: '4px'
        }}>
          Selected: {formData[field].join(', ')}
        </div>
      )}
      {errors[field] && (
        <span style={{ 
          fontSize: '12px', 
          color: '#dc2626', 
          marginTop: '2px',
          display: 'block'
        }}>
          {errors[field]}
        </span>
      )}
    </div>
  );

  // Textarea component with consistent styling
  const FormTextarea = ({ label, field, placeholder, rows = 3 }) => (
    <div style={{ marginBottom: '16px' }}>
      <label style={{
        display: 'block',
        fontSize: '13px',
        fontWeight: '500',
        color: theme.gunmetal || '#1F2D38',
        marginBottom: '4px'
      }}>
        {label}
      </label>
      <textarea
        value={formData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: `1px solid ${theme.silver || '#BBBFC2'}`,
          borderRadius: '4px',
          fontSize: '14px',
          backgroundColor: theme.white || '#FFFFFF',
          resize: 'vertical',
          fontFamily: 'inherit',
          boxSizing: 'border-box'
        }}
      />
    </div>
  );

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50000,
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: theme.white || '#FFFFFF',
        borderRadius: '8px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        width: '100%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px 16px 24px',
          borderBottom: `1px solid ${theme.seasalt || '#F6F8F8'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: theme.gunmetal || '#1F2D38',
            margin: 0
          }}>
            {isEditing ? `Edit Recipe: ${recipe.name}` : 'Create New Recipe'}
          </h2>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              color: theme.silver || '#BBBFC2',
              fontSize: '24px',
              lineHeight: '1'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = theme.seasalt || '#F6F8F8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{
            padding: '20px 24px',
            overflowY: 'auto',
            flex: 1
          }}>
            {/* Basic Information */}
            <div style={{ marginBottom: '24px' }}>
              <FormInput
                label="Recipe Name"
                field="name"
                placeholder="Enter recipe name"
                required
              />
            </div>
            
            {/* Multi-select Categories and Options */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <CheckboxGroup
                label="Categories"
                field="categories"
                options={options.categories}
              />
              
              <CheckboxGroup
                label="Cuisines"
                field="cuisines"
                options={options.cuisines}
              />
              
              <CheckboxGroup
                label="Outlets"
                field="outlets"
                options={options.outlets}
              />
              
              <CheckboxGroup
                label="Menus"
                field="menus"
                options={options.menus}
              />
            </div>

            {/* Yield Information */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <FormInput
                label="Yield"
                field="yield"
                type="number"
                placeholder="4"
                min="1"
                step="1"
              />
              
              <FormSelect
                label="Yield Unit"
                field="yieldUnit"
                options={options.yieldUnits}
              />

              <FormInput
                label="Prep Time (min)"
                field="prepTime"
                type="number"
                placeholder="30"
                min="0"
              />

              <FormInput
                label="Cook Time (min)"
                field="cookTime"
                type="number"
                placeholder="45"
                min="0"
              />
            </div>

            {/* Financial Information */}
            <div style={{
              padding: '16px',
              backgroundColor: theme.seasalt || '#F6F8F8',
              borderRadius: '6px',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: theme.gunmetal || '#1F2D38',
                margin: '0 0 16px 0'
              }}>
                Financial Information
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '16px'
              }}>
                <CurrencyInput
                  label="Total Cost"
                  field="totalCost"
                  placeholder="$24.50"
                />
                
                <CurrencyInput
                  label="Menu Price"
                  field="menuPrice"
                  placeholder="$28.00"
                />

                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: theme.gunmetal || '#1F2D38',
                    marginBottom: '4px'
                  }}>
                    Food Cost % (calculated)
                  </label>
                  <div style={{
                    padding: '8px 12px',
                    border: `1px solid ${theme.silver || '#BBBFC2'}`,
                    borderRadius: '4px',
                    fontSize: '14px',
                    backgroundColor: '#F9FAFB',
                    color: theme.charcoal || '#2A3E51'
                  }}>
                    {formData.totalCost && formData.menuPrice && formData.yield 
                      ? `${(((parseFloat(formData.totalCost) / parseFloat(formData.yield)) / parseFloat(formData.menuPrice)) * 100).toFixed(1)}%`
                      : 'Enter costs to calculate'
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Dietary Information */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: theme.gunmetal || '#1F2D38',
                marginBottom: '8px'
              }}>
                Dietary Restrictions
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '8px'
              }}>
                {options.dietary.map(option => (
                  <label key={option} style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: theme.charcoal || '#2A3E51'
                  }}>
                    <input
                      type="checkbox"
                      checked={formData.dietary.includes(option)}
                      onChange={() => handleDietaryChange(option)}
                      style={{ marginRight: '6px' }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            {/* Description and Instructions */}
            <FormTextarea
              label="Description"
              field="description"
              placeholder="Brief description of the recipe"
              rows={2}
            />

            <FormTextarea
              label="Instructions"
              field="instructions"
              placeholder="Step-by-step cooking instructions"
              rows={4}
            />
          </div>

          {/* Modal Footer */}
          <div style={{
            padding: '16px 24px 20px 24px',
            borderTop: `1px solid ${theme.seasalt || '#F6F8F8'}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                backgroundColor: 'transparent',
                color: theme.charcoal || '#2A3E51',
                border: `1px solid ${theme.silver || '#BBBFC2'}`,
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = theme.seasalt || '#F6F8F8';
                e.target.style.borderColor = theme.charcoal || '#2A3E51';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = theme.silver || '#BBBFC2';
              }}
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 24px',
                backgroundColor: loading ? '#9CA3AF' : theme.yellowGreen || '#8AC732',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#7FB82C';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = theme.yellowGreen || '#8AC732';
                }
              }}
            >
              {loading ? (
                <>
                  <span style={{ 
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    border: '2px solid #ffffff40',
                    borderTop: '2px solid #ffffff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Saving...
                </>
              ) : (
                <>
                  {isEditing ? 'Update Recipe' : 'Create Recipe'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default RecipeModal;
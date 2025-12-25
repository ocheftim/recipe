// src/components/ingredients/ProvisionalIngredientValidator.js
import React, { useState, useEffect } from 'react';
import { validateIngredient, getProvisionalIngredients } from '../../data/Ingredients/ingredientsData';

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

const ProvisionalIngredientValidator = ({ onValidationComplete }) => {
  const [provisionalIngredients, setProvisionalIngredients] = useState([]);
  const [editingIngredient, setEditingIngredient] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isExpanded, setIsExpanded] = useState(true);

  // Common supplier list
  const suppliers = [
    'US Foods', 'Sysco', 'Restaurant Depot', 'Gordon Food Service',
    'Fresh Produce Co', 'Pacific Seafood', 'Local Farms', 'Specialty Imports'
  ];

  // Load provisional ingredients
  useEffect(() => {
    loadProvisionalIngredients();
  }, []);

  const loadProvisionalIngredients = () => {
    const provisional = getProvisionalIngredients();
    setProvisionalIngredients(provisional);
  };

  // Start editing an ingredient
  const handleEdit = (ingredient) => {
    setEditingIngredient(ingredient);
    setFormData({
      category: ingredient.category || '',
      subcategory: ingredient.subcategory || '',
      apCost: ingredient.apCost || '',
      caseDescription: ingredient.caseDescription || '',
      caseQuantity: ingredient.caseQuantity || '',
      caseUnit: ingredient.caseUnit || 'lb',
      supplier: ingredient.supplier || '',
      sku: ingredient.sku || '',
      storageLocation: ingredient.storageLocation || '',
      minimumStock: ingredient.minimumStock || 1,
      reorderPoint: ingredient.reorderPoint || 2,
      allergens: ingredient.allergens || [],
      dietaryFlags: ingredient.dietaryFlags || []
    });
    setErrors({});
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.apCost || formData.apCost <= 0) {
      newErrors.apCost = 'Valid AP cost is required';
    }
    if (!formData.caseQuantity || formData.caseQuantity <= 0) {
      newErrors.caseQuantity = 'Case quantity is required';
    }
    if (!formData.supplier) {
      newErrors.supplier = 'Supplier is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save validated ingredient
  const handleSave = () => {
    if (!validateForm()) return;

    const validatedData = {
      ...formData,
      apCostPerUnit: formData.apCost,
      costPerUnit: formData.apCost / (formData.caseQuantity || 1),
      provisional: false,
      validatedAt: new Date().toISOString()
    };

    // Update the ingredient in the data store
    validateIngredient(editingIngredient.id, validatedData);
    
    // Update local state
    setProvisionalIngredients(prev => 
      prev.filter(ing => ing.id !== editingIngredient.id)
    );
    
    setEditingIngredient(null);
    setFormData({});
    
    // Notify parent if needed
    if (onValidationComplete) {
      onValidationComplete(editingIngredient.id, validatedData);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingIngredient(null);
    setFormData({});
    setErrors({});
  };

  // Quick validate with default values
  const handleQuickValidate = (ingredient) => {
    const quickData = {
      category: 'Uncategorized',
      subcategory: 'General',
      apCost: 10.00,
      caseQuantity: 1,
      caseUnit: 'each',
      caseDescription: 'Individual item',
      costPerUnit: 10.00,
      apCostPerUnit: 10.00,
      supplier: 'Generic Supplier',
      storageLocation: 'Storage',
      minimumStock: 1,
      reorderPoint: 2,
      allergens: [],
      dietaryFlags: [],
      provisional: false,
      validatedAt: new Date().toISOString()
    };

    validateIngredient(ingredient.id, quickData);
    setProvisionalIngredients(prev => 
      prev.filter(ing => ing.id !== ingredient.id)
    );

    if (onValidationComplete) {
      onValidationComplete(ingredient.id, quickData);
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

  if (provisionalIngredients.length === 0) {
    return null;
  }

  return (
    <div style={{
      marginBottom: '20px',
      backgroundColor: theme.white,
      borderRadius: '8px',
      border: `2px solid ${theme.orange}`,
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div 
        style={{
          padding: '15px 20px',
          backgroundColor: '#fff3cd',
          borderBottom: '1px solid #ffc107',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px' }}>⚠️</span>
          <div>
            <h3 style={{ margin: 0, color: '#856404', fontSize: '16px' }}>
              Ingredients Needing Validation
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#856404' }}>
              {provisionalIngredients.length} ingredient{provisionalIngredients.length !== 1 ? 's' : ''} need costing information
            </p>
          </div>
        </div>
        <div style={{ fontSize: '14px', color: '#856404' }}>
          {isExpanded ? '▼' : '▶'}
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div style={{ padding: '20px' }}>
          {editingIngredient ? (
            // Edit Form
            <div>
              <h4 style={{ margin: '0 0 20px 0', color: theme.gunmetal }}>
                Validate: {editingIngredient.name}
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                {/* Category */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '12px',
                    color: theme.gunmetal,
                    fontWeight: '500'
                  }}>
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      setFormData({ ...formData, category: e.target.value });
                      setErrors({ ...errors, category: '' });
                    }}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: `1px solid ${errors.category ? theme.coral : theme.silver}`,
                      borderRadius: '4px',
                      fontSize: '13px'
                    }}
                  >
                    <option value="">Select category</option>
                    <option value="Proteins">Proteins</option>
                    <option value="Produce">Produce</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Dry Goods">Dry Goods</option>
                    <option value="Oils & Vinegars">Oils & Vinegars</option>
                    <option value="Seasonings">Seasonings</option>
                    <option value="Canned Goods">Canned Goods</option>
                    <option value="Herbs">Herbs</option>
                  </select>
                  {errors.category && (
                    <div style={{ color: theme.coral, fontSize: '11px', marginTop: '2px' }}>
                      {errors.category}
                    </div>
                  )}
                </div>

                {/* Supplier */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '12px',
                    color: theme.gunmetal,
                    fontWeight: '500'
                  }}>
                    Supplier *
                  </label>
                  <select
                    value={formData.supplier}
                    onChange={(e) => {
                      setFormData({ ...formData, supplier: e.target.value });
                      setErrors({ ...errors, supplier: '' });
                    }}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: `1px solid ${errors.supplier ? theme.coral : theme.silver}`,
                      borderRadius: '4px',
                      fontSize: '13px'
                    }}
                  >
                    <option value="">Select supplier</option>
                    {suppliers.map(sup => (
                      <option key={sup} value={sup}>{sup}</option>
                    ))}
                  </select>
                  {errors.supplier && (
                    <div style={{ color: theme.coral, fontSize: '11px', marginTop: '2px' }}>
                      {errors.supplier}
                    </div>
                  )}
                </div>

                {/* AP Cost */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '12px',
                    color: theme.gunmetal,
                    fontWeight: '500'
                  }}>
                    Case Cost (AP) *
                  </label>
                  <input
                    type="number"
                    value={formData.apCost}
                    onChange={(e) => {
                      setFormData({ ...formData, apCost: parseFloat(e.target.value) });
                      setErrors({ ...errors, apCost: '' });
                    }}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: `1px solid ${errors.apCost ? theme.coral : theme.silver}`,
                      borderRadius: '4px',
                      fontSize: '13px',
                      backgroundColor: '#fef3c7'
                    }}
                  />
                  {errors.apCost && (
                    <div style={{ color: theme.coral, fontSize: '11px', marginTop: '2px' }}>
                      {errors.apCost}
                    </div>
                  )}
                </div>

                {/* Case Configuration */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '12px',
                    color: theme.gunmetal,
                    fontWeight: '500'
                  }}>
                    Case Configuration *
                  </label>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <input
                      type="number"
                      value={formData.caseQuantity}
                      onChange={(e) => {
                        setFormData({ ...formData, caseQuantity: parseFloat(e.target.value) });
                        setErrors({ ...errors, caseQuantity: '' });
                      }}
                      placeholder="Qty"
                      step="0.01"
                      min="0"
                      style={{
                        flex: 1,
                        padding: '8px',
                        border: `1px solid ${errors.caseQuantity ? theme.coral : theme.silver}`,
                        borderRadius: '4px',
                        fontSize: '13px'
                      }}
                    />
                    <select
                      value={formData.caseUnit}
                      onChange={(e) => setFormData({ ...formData, caseUnit: e.target.value })}
                      style={{
                        padding: '8px',
                        border: `1px solid ${theme.silver}`,
                        borderRadius: '4px',
                        fontSize: '13px'
                      }}
                    >
                      <option value="lb">lb</option>
                      <option value="oz">oz</option>
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="each">each</option>
                      <option value="qt">qt</option>
                      <option value="gal">gal</option>
                      <option value="L">L</option>
                      <option value="can">can</option>
                    </select>
                  </div>
                  {errors.caseQuantity && (
                    <div style={{ color: theme.coral, fontSize: '11px', marginTop: '2px' }}>
                      {errors.caseQuantity}
                    </div>
                  )}
                </div>

                {/* Storage Location */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '12px',
                    color: theme.gunmetal,
                    fontWeight: '500'
                  }}>
                    Storage Location
                  </label>
                  <select
                    value={formData.storageLocation}
                    onChange={(e) => setFormData({ ...formData, storageLocation: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: `1px solid ${theme.silver}`,
                      borderRadius: '4px',
                      fontSize: '13px'
                    }}
                  >
                    <option value="">Select location</option>
                    <option value="Walk-in Cooler">Walk-in Cooler</option>
                    <option value="Reach-in Cooler">Reach-in Cooler</option>
                    <option value="Freezer">Freezer</option>
                    <option value="Dry Storage">Dry Storage</option>
                    <option value="Produce Cooler">Produce Cooler</option>
                  </select>
                </div>

                {/* SKU */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '12px',
                    color: theme.gunmetal,
                    fontWeight: '500'
                  }}>
                    SKU/Product Code
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="Optional"
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: `1px solid ${theme.silver}`,
                      borderRadius: '4px',
                      fontSize: '13px'
                    }}
                  />
                </div>
              </div>

              {/* Calculated Values */}
              {formData.apCost && formData.caseQuantity && (
                <div style={{
                  marginTop: '15px',
                  padding: '12px',
                  backgroundColor: theme.seasalt,
                  borderRadius: '6px'
                }}>
                  <div style={{ fontSize: '12px', color: theme.gunmetal }}>
                    <strong>Calculated Unit Cost:</strong> {formatCurrency(formData.apCost / formData.caseQuantity)} per {formData.caseUnit}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{
                marginTop: '20px',
                display: 'flex',
                gap: '10px',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={handleCancel}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: theme.white,
                    color: theme.gunmetal,
                    border: `1px solid ${theme.silver}`,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  style={{
                    padding: '8px 20px',
                    backgroundColor: theme.yellowGreen,
                    color: theme.white,
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}
                >
                  Validate & Save
                </button>
              </div>
            </div>
          ) : (
            // List View
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr auto',
                gap: '10px',
                marginBottom: '10px',
                padding: '8px 0',
                borderBottom: `1px solid ${theme.silver}`,
                fontSize: '12px',
                fontWeight: '600',
                color: theme.gunmetal
              }}>
                <div>Ingredient Name</div>
                <div>Used In Recipes</div>
                <div>Status</div>
                <div>Actions</div>
              </div>

              {provisionalIngredients.map(ingredient => (
                <div
                  key={ingredient.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr auto',
                    gap: '10px',
                    padding: '10px 0',
                    borderBottom: `1px solid ${theme.seasalt}`,
                    alignItems: 'center'
                  }}
                >
                  <div style={{ fontWeight: '500', color: theme.gunmetal }}>
                    {ingredient.name}
                  </div>
                  <div style={{ fontSize: '12px', color: theme.silver }}>
                    {ingredient.usageCount || 1} recipe{(ingredient.usageCount || 1) !== 1 ? 's' : ''}
                  </div>
                  <div>
                    <span style={{
                      padding: '3px 8px',
                      backgroundColor: '#fef3c7',
                      color: '#92400e',
                      borderRadius: '4px',
                      fontSize: '11px'
                    }}>
                      Needs Validation
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button
                      onClick={() => handleEdit(ingredient)}
                      style={{
                        padding: '4px 10px',
                        backgroundColor: theme.yellowGreen,
                        color: theme.white,
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '11px'
                      }}
                    >
                      Validate
                    </button>
                    <button
                      onClick={() => handleQuickValidate(ingredient)}
                      style={{
                        padding: '4px 10px',
                        backgroundColor: theme.white,
                        color: theme.silver,
                        border: `1px solid ${theme.silver}`,
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '11px'
                      }}
                      title="Quick validate with default values"
                    >
                      Quick
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProvisionalIngredientValidator;
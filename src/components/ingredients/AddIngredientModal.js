// src/components/ingredients/AddIngredientModal.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { X, Plus } from 'lucide-react';
import STYLES from '../../styles/globalStyles';

const { 
  COLORS, 
  TYPOGRAPHY, 
  SPACING, 
  FORMS, 
  BUTTONS, 
  UTILS,
  ANIMATIONS 
} = STYLES;

const AddIngredientModal = ({ isOpen, onClose, onSave, existingIngredient = null }) => {
  const [formData, setFormData] = useState({
    name: existingIngredient?.name || '',
    category: existingIngredient?.category || 'Produce',
    unit: existingIngredient?.unit || 'kg',
    costPerUnit: existingIngredient?.costPerUnit || '',
    supplier: existingIngredient?.supplier || '',
    sku: existingIngredient?.sku || '',
    minStock: existingIngredient?.minStock || '',
    maxStock: existingIngredient?.maxStock || '',
    notes: existingIngredient?.notes || ''
  });

  const [errors, setErrors] = useState({});

  // Component-specific styles
  const localStyles = {
    modalOverlay: {
      ...MODALS.overlay,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: SPACING.lg
    },
    modalContainer: {
      ...MODALS.container,
      maxWidth: '672px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    },
    modalHeader: {
      ...MODALS.header,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: COLORS.lightBackground,
      borderBottom: `1px solid ${COLORS.border}`
    },
    modalTitle: {
      ...TYPOGRAPHY.heading.lg,
      color: COLORS.primary
    },
    closeButton: {
      padding: SPACING.sm,
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: SPACING.sm,
      cursor: 'pointer',
      transition: ANIMATIONS.transition.fast,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    closeButtonHover: {
      backgroundColor: COLORS.subtleBorder
    },
    modalBody: {
      flex: 1,
      overflowY: 'auto',
      padding: SPACING.xl
    },
    formSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: SPACING.lg
    },
    gridRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: SPACING.lg
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      ...FORMS.label,
      marginBottom: SPACING.xs
    },
    input: {
      ...FORMS.input.base,
      width: '100%'
    },
    inputError: {
      ...FORMS.input.error,
      borderColor: COLORS.error
    },
    select: {
      ...FORMS.select.base,
      width: '100%'
    },
    textarea: {
      ...FORMS.input.base,
      width: '100%',
      resize: 'none',
      minHeight: '80px'
    },
    currencyInputWrapper: {
      position: 'relative'
    },
    currencySymbol: {
      position: 'absolute',
      left: SPACING.md,
      top: '50%',
      transform: 'translateY(-50%)',
      color: COLORS.tertiary,
      fontSize: TYPOGRAPHY.fontSize.sm
    },
    currencyInput: {
      ...FORMS.input.base,
      width: '100%',
      paddingLeft: SPACING.xxl
    },
    errorMessage: {
      ...FORMS.errorText,
      marginTop: SPACING.xs
    },
    modalFooter: {
      ...MODALS.footer,
      display: 'flex',
      justifyContent: 'flex-end',
      gap: SPACING.md,
      borderTop: `1px solid ${COLORS.border}`,
      marginTop: SPACING.xl,
      paddingTop: SPACING.lg
    },
    cancelButton: {
      ...BUTTONS.secondary,
      transition: ANIMATIONS.transition.fast
    },
    submitButton: {
      ...BUTTONS.primary,
      transition: ANIMATIONS.transition.fast
    }
  };

  if (!isOpen) return null;

  const categories = [
    'Produce',
    'Meat',
    'Seafood',
    'Dairy',
    'Dry Goods',
    'Spices',
    'Beverages',
    'Supplies',
    'Other'
  ];

  const units = [
    'kg', 'g', 'lb', 'oz',
    'L', 'ml', 'gal', 'fl oz',
    'each', 'dozen', 'case',
    'cup', 'tbsp', 'tsp'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Ingredient name is required';
    }
    
    if (!formData.costPerUnit || parseFloat(formData.costPerUnit) <= 0) {
      newErrors.costPerUnit = 'Valid cost per unit is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const ingredientData = {
      ...formData,
      id: existingIngredient?.id || Date.now(),
      costPerUnit: parseFloat(formData.costPerUnit),
      minStock: formData.minStock ? parseFloat(formData.minStock) : null,
      maxStock: formData.maxStock ? parseFloat(formData.maxStock) : null,
      updatedAt: new Date().toISOString()
    };

    onSave(ingredientData);
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  return (
    <div style={localStyles.modalOverlay}>
      <div style={localStyles.modalContainer}>
        {/* Header */}
        <div style={localStyles.modalHeader}>
          <h2 style={localStyles.modalTitle}>
            {existingIngredient ? 'Edit Ingredient' : 'Add New Ingredient'}
          </h2>
          <button
            onClick={onClose}
            style={localStyles.closeButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.subtleBorder;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X style={{ width: '20px', height: '20px', color: COLORS.secondary }} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={localStyles.modalBody}>
          <div style={localStyles.formSection}>
            {/* Name and Category */}
            <div style={localStyles.gridRow}>
              <div style={localStyles.formGroup}>
                <label style={localStyles.label}>
                  Ingredient Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  style={errors.name ? { ...localStyles.input, ...localStyles.inputError } : localStyles.input}
                  placeholder="e.g., Tomatoes, Chicken Breast"
                />
                {errors.name && (
                  <p style={localStyles.errorMessage}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div style={localStyles.formGroup}>
                <label style={localStyles.label}>
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  style={localStyles.select}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Unit and Cost */}
            <div style={localStyles.gridRow}>
              <div style={localStyles.formGroup}>
                <label style={localStyles.label}>
                  Unit of Measure
                </label>
                <select
                  value={formData.unit}
                  onChange={(e) => handleChange('unit', e.target.value)}
                  style={localStyles.select}
                >
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>

              <div style={localStyles.formGroup}>
                <label style={localStyles.label}>
                  Cost per Unit *
                </label>
                <div style={localStyles.currencyInputWrapper}>
                  <span style={localStyles.currencySymbol}>$</span>
                  <input
                    type="number"
                    value={formData.costPerUnit}
                    onChange={(e) => handleChange('costPerUnit', e.target.value)}
                    style={errors.costPerUnit ? { ...localStyles.currencyInput, ...localStyles.inputError } : localStyles.currencyInput}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
                {errors.costPerUnit && (
                  <p style={localStyles.errorMessage}>
                    {errors.costPerUnit}
                  </p>
                )}
              </div>
            </div>

            {/* Supplier and SKU */}
            <div style={localStyles.gridRow}>
              <div style={localStyles.formGroup}>
                <label style={localStyles.label}>
                  Supplier
                </label>
                <input
                  type="text"
                  value={formData.supplier}
                  onChange={(e) => handleChange('supplier', e.target.value)}
                  style={localStyles.input}
                  placeholder="e.g., Fresh Foods Co."
                />
              </div>

              <div style={localStyles.formGroup}>
                <label style={localStyles.label}>
                  SKU / Product Code
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => handleChange('sku', e.target.value)}
                  style={localStyles.input}
                  placeholder="e.g., PRD-001"
                />
              </div>
            </div>

            {/* Stock Levels */}
            <div style={localStyles.gridRow}>
              <div style={localStyles.formGroup}>
                <label style={localStyles.label}>
                  Minimum Stock Level
                </label>
                <input
                  type="number"
                  value={formData.minStock}
                  onChange={(e) => handleChange('minStock', e.target.value)}
                  style={localStyles.input}
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>

              <div style={localStyles.formGroup}>
                <label style={localStyles.label}>
                  Maximum Stock Level
                </label>
                <input
                  type="number"
                  value={formData.maxStock}
                  onChange={(e) => handleChange('maxStock', e.target.value)}
                  style={localStyles.input}
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Notes */}
            <div style={localStyles.formGroup}>
              <label style={localStyles.label}>
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                style={localStyles.textarea}
                rows="3"
                placeholder="Additional notes about this ingredient..."
              />
            </div>
          </div>

          {/* Footer */}
          <div style={localStyles.modalFooter}>
            <button
              type="button"
              onClick={onClose}
              style={localStyles.cancelButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.lightBackground;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.background;
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={localStyles.submitButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              {existingIngredient ? 'Update' : 'Add'} Ingredient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddIngredientModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  existingIngredient: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    category: PropTypes.string,
    unit: PropTypes.string,
    costPerUnit: PropTypes.number,
    supplier: PropTypes.string,
    sku: PropTypes.string,
    minStock: PropTypes.number,
    maxStock: PropTypes.number,
    notes: PropTypes.string
  })
};

export default AddIngredientModal;
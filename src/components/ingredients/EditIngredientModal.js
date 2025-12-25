// src/components/ingredients/EditIngredientModal.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, Save, AlertCircle } from 'lucide-react';

// Safe import with fallback
let STYLES;
try {
  STYLES = require('../../styles/globalStyles').default;
} catch (e) {
  console.warn('globalStyles not found, using fallback styles');
  STYLES = {
    COLORS: {
      primary: '#1F2D38',
      secondary: '#6B7280',
      tertiary: '#9CA3AF',
      accent: '#8AC732',
      background: '#FFFFFF',
      lightBackground: '#FAFAFA',
      border: '#E5E7EB',
      subtleBorder: '#F6F8F8',
      error: '#EF4444',
      warning: '#F59E0B'
    },
    TYPOGRAPHY: {
      fontSize: { xs: '12px', sm: '14px', base: '16px', lg: '18px', xl: '20px', xxl: '24px' },
      fontWeight: { normal: 400, medium: 500, semibold: 600, bold: 700 }
    },
    SPACING: { xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '24px', xxl: '32px', xxxl: '48px' },
    ANIMATIONS: { transition: { fast: 'all 0.15s ease', normal: 'all 0.2s ease' } }
  };
}

const { COLORS, TYPOGRAPHY, SPACING, ANIMATIONS } = STYLES;
const FORMS = STYLES.FORMS || {
  label: { fontSize: '11px', fontWeight: 500, color: COLORS.secondary, textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: { base: { padding: `${SPACING.sm} ${SPACING.md}`, border: `1px solid ${COLORS.border}`, borderRadius: SPACING.sm, fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.primary, backgroundColor: COLORS.background, outline: 'none' }, error: { borderColor: COLORS.error } },
  select: { base: { padding: `${SPACING.sm} ${SPACING.md}`, border: `1px solid ${COLORS.border}`, borderRadius: SPACING.sm, fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.primary, backgroundColor: COLORS.background, outline: 'none', cursor: 'pointer' } },
  errorText: { fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.error }
};
const BUTTONS = STYLES.BUTTONS || {
  primary: { backgroundColor: COLORS.primary, color: COLORS.background, padding: `${SPACING.sm} ${SPACING.lg}`, borderRadius: SPACING.sm, border: 'none', fontSize: TYPOGRAPHY.fontSize.sm, fontWeight: TYPOGRAPHY.fontWeight?.medium || 500, cursor: 'pointer' },
  secondary: { backgroundColor: COLORS.background, color: COLORS.primary, padding: `${SPACING.sm} ${SPACING.lg}`, borderRadius: SPACING.sm, border: `1px solid ${COLORS.border}`, fontSize: TYPOGRAPHY.fontSize.sm, cursor: 'pointer' }
};

const EditIngredientModal = ({ isOpen, onClose, onSave, ingredient }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Produce',
    unit: 'kg',
    costPerUnit: '',
    supplier: '',
    sku: '',
    minStock: '',
    maxStock: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  // Component-specific styles - NO MODALS REFERENCES
  const localStyles = {
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: SPACING.lg
    },
    modalContainer: {
      backgroundColor: COLORS.background,
      borderRadius: SPACING.sm,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: `1px solid ${COLORS.border}`,
      maxWidth: '672px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    },
    modalHeader: {
      padding: `${SPACING.lg} ${SPACING.xl}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: COLORS.lightBackground,
      borderBottom: `1px solid ${COLORS.border}`
    },
    headerContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: SPACING.xs
    },
    modalTitle: {
      fontSize: TYPOGRAPHY.fontSize.xl,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      color: COLORS.primary
    },
    usageText: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.secondary,
      marginTop: SPACING.xs
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
    modalBody: {
      flex: 1,
      overflowY: 'auto',
      padding: SPACING.xl
    },
    warningBanner: {
      backgroundColor: '#FEF3C7',
      padding: SPACING.md,
      borderRadius: SPACING.sm,
      display: 'flex',
      alignItems: 'flex-start',
      gap: SPACING.sm,
      marginBottom: SPACING.lg
    },
    warningIcon: {
      width: '20px',
      height: '20px',
      flexShrink: 0,
      marginTop: '2px',
      color: '#D97706'
    },
    warningContent: {
      fontSize: TYPOGRAPHY.fontSize.sm
    },
    warningTitle: {
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: '#92400E',
      marginBottom: SPACING.xs
    },
    warningText: {
      color: '#92400E'
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
    lastUpdated: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.tertiary,
      marginTop: SPACING.sm
    },
    modalFooter: {
      padding: `${SPACING.lg} ${SPACING.xl}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: `1px solid ${COLORS.border}`,
      backgroundColor: COLORS.background
    },
    footerLeft: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.secondary,
      fontStyle: 'italic'
    },
    footerButtons: {
      display: 'flex',
      gap: SPACING.md
    },
    cancelButton: {
      ...BUTTONS.secondary,
      transition: ANIMATIONS.transition.fast
    },
    submitButton: {
      ...BUTTONS.primary,
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.sm,
      transition: ANIMATIONS.transition.fast
    },
    saveIcon: {
      width: '16px',
      height: '16px'
    }
  };

  // Initialize form with ingredient data
  useEffect(() => {
    if (ingredient && isOpen) {
      setFormData({
        name: ingredient.name || '',
        category: ingredient.category || 'Produce',
        unit: ingredient.unit || 'kg',
        costPerUnit: ingredient.costPerUnit || '',
        supplier: ingredient.supplier || '',
        sku: ingredient.sku || '',
        minStock: ingredient.minStock || '',
        maxStock: ingredient.maxStock || '',
        notes: ingredient.notes || ''
      });
      setHasChanges(false);
    }
  }, [ingredient, isOpen]);

  if (!isOpen || !ingredient) return null;

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

    if (formData.minStock && formData.maxStock) {
      if (parseFloat(formData.minStock) > parseFloat(formData.maxStock)) {
        newErrors.minStock = 'Minimum stock cannot exceed maximum stock';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const updatedIngredient = {
      ...ingredient,
      ...formData,
      costPerUnit: parseFloat(formData.costPerUnit),
      minStock: formData.minStock ? parseFloat(formData.minStock) : null,
      maxStock: formData.maxStock ? parseFloat(formData.maxStock) : null,
      updatedAt: new Date().toISOString()
    };

    onSave(updatedIngredient);
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  // Calculate if this ingredient is used in any recipes
  const getUsageInfo = () => {
    const recipes = JSON.parse(localStorage.getItem('toqueworks_recipes') || '[]');
    const usedInRecipes = recipes.filter(recipe => 
      recipe.ingredients?.some(ing => ing.ingredientId === ingredient.id)
    );
    return {
      count: usedInRecipes.length,
      recipes: usedInRecipes.slice(0, 3).map(r => r.name)
    };
  };

  const usageInfo = getUsageInfo();

  return (
    <div style={localStyles.modalOverlay}>
      <div style={localStyles.modalContainer}>
        {/* Header */}
        <div style={localStyles.modalHeader}>
          <div style={localStyles.headerContent}>
            <h2 style={localStyles.modalTitle}>
              Edit Ingredient
            </h2>
            {usageInfo.count > 0 && (
              <p style={localStyles.usageText}>
                Used in {usageInfo.count} recipe{usageInfo.count !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <button
            onClick={handleCancel}
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
          {/* Usage Warning */}
          {usageInfo.count > 0 && (
            <div style={localStyles.warningBanner}>
              <AlertCircle style={localStyles.warningIcon} />
              <div style={localStyles.warningContent}>
                <p style={localStyles.warningTitle}>
                  This ingredient is currently being used
                </p>
                <p style={localStyles.warningText}>
                  Changes will affect: {usageInfo.recipes.join(', ')}
                  {usageInfo.count > 3 && ` and ${usageInfo.count - 3} more`}
                </p>
              </div>
            </div>
          )}

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
                  style={errors.minStock ? { ...localStyles.input, ...localStyles.inputError } : localStyles.input}
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
                {errors.minStock && (
                  <p style={localStyles.errorMessage}>
                    {errors.minStock}
                  </p>
                )}
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

            {/* Last Updated Info */}
            {ingredient.updatedAt && (
              <div style={localStyles.lastUpdated}>
                Last updated: {new Date(ingredient.updatedAt).toLocaleDateString()} at{' '}
                {new Date(ingredient.updatedAt).toLocaleTimeString()}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={localStyles.modalFooter}>
            <div style={localStyles.footerLeft}>
              {hasChanges && '* You have unsaved changes'}
            </div>
            <div style={localStyles.footerButtons}>
              <button
                type="button"
                onClick={handleCancel}
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
                <Save style={localStyles.saveIcon} />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

EditIngredientModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  ingredient: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    category: PropTypes.string,
    unit: PropTypes.string,
    costPerUnit: PropTypes.number,
    supplier: PropTypes.string,
    sku: PropTypes.string,
    minStock: PropTypes.number,
    maxStock: PropTypes.number,
    notes: PropTypes.string,
    updatedAt: PropTypes.string
  })
};

export default EditIngredientModal;
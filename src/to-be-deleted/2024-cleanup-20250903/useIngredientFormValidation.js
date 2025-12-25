// src/hooks/useIngredientFormValidation.js
// ToqueWorks ingredient form validation logic
import { useState, useCallback, useEffect } from 'react';

const useIngredientFormValidation = (formData) => {
  // Validation state
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Individual field validation rules
  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Ingredient name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return null;
      
      case 'casePrice':
        if (value && (isNaN(value) || parseFloat(value) <= 0)) {
          return 'Price must be a positive number';
        }
        return null;
      
      case 'caseQuantity':
        if (value && (isNaN(value) || parseFloat(value) <= 0)) {
          return 'Quantity must be a positive number';
        }
        return null;
      
      case 'minimumStock':
      case 'reorderPoint':
      case 'maxStock':
        if (value && (isNaN(value) || parseFloat(value) < 0)) {
          return 'Stock levels must be non-negative numbers';
        }
        return null;
      
      default:
        return null;
    }
  }, []);

  // Validate entire form including cross-field validation
  const validateForm = useCallback(() => {
    const errors = {};
    
    // Validate each field
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    });

    // Cross-field validation for stock levels
    if (formData.minimumStock && formData.reorderPoint && formData.maxStock) {
      const min = parseFloat(formData.minimumStock);
      const reorder = parseFloat(formData.reorderPoint);
      const max = parseFloat(formData.maxStock);

      if (reorder <= min) {
        errors.reorderPoint = 'Reorder point must be greater than minimum stock';
      }
      if (max <= reorder) {
        errors.maxStock = 'Maximum stock must be greater than reorder point';
      }
    }

    return errors;
  }, [formData, validateField]);

  // Update validation errors when form data changes
  useEffect(() => {
    const errors = validateForm();
    setFormErrors(errors);
  }, [formData, validateForm]);

  // Mark field as touched
  const setFieldTouched = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  // Mark multiple fields as touched (useful for form submission)
  const setAllFieldsTouched = () => {
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
  };

  // Get error for specific field (only if touched)
  const getFieldError = (fieldName) => {
    return touched[fieldName] && formErrors[fieldName] ? formErrors[fieldName] : null;
  };

  // Check if form is valid
  const isFormValid = Object.keys(formErrors).length === 0 && formData.name?.trim();

  // Check if any field has validation errors
  const hasValidationErrors = Object.keys(formErrors).length > 0;

  // Get count of validation errors
  const validationErrorCount = Object.keys(formErrors).length;

  // Focus first error field (useful for form submission)
  const focusFirstErrorField = () => {
    if (hasValidationErrors) {
      const firstErrorField = Object.keys(formErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) element.focus();
    }
  };

  // Reset validation state (useful when form is reset)
  const resetValidation = useCallback(() => {
    setFormErrors({});
    setTouched({});
  }, []);

  // Validate specific field and update errors
  const validateAndSetFieldError = (fieldName, value) => {
    const error = validateField(fieldName, value);
    setFormErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
    return error;
  };

  return {
    // State
    formErrors,
    touched,
    
    // Computed values
    isFormValid,
    hasValidationErrors,
    validationErrorCount,
    
    // Functions
    validateField,
    validateForm,
    getFieldError,
    setFieldTouched,
    setAllFieldsTouched,
    focusFirstErrorField,
    resetValidation,
    validateAndSetFieldError,
    
    // Utilities for form submission
    prepareFormSubmission: () => {
      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        setAllFieldsTouched();
        focusFirstErrorField();
        return { isValid: false, errors };
      }
      return { isValid: true, errors: {} };
    }
  };
};

export default useIngredientFormValidation;
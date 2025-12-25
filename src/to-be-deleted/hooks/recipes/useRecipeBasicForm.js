// src/hooks/recipes/useRecipeBasicForm.js
import { useState } from 'react';
import {
  RECIPE_CATEGORIES,
  RECIPE_CUISINES,
  RECIPE_OUTLETS,
  RECIPE_STATUSES,
  YIELD_UNITS,
} from '../../constants/recipeConstants';

export const useRecipeBasicForm = (recipeForm, onRecipeFormChange, onSetIsDirty) => {
  const [customOptions, setCustomOptions] = useState({
    category: [...RECIPE_CATEGORIES],
    cuisine: [...RECIPE_CUISINES],
    outlet: [...RECIPE_OUTLETS],
    status: [...RECIPE_STATUSES],
    yieldUnit: [...YIELD_UNITS],
  });

  const handleFieldChange = (field, value) => {
    onRecipeFormChange({ ...recipeForm, [field]: value });
    onSetIsDirty(true);
  };

  const handleDietaryChange = (dietaryOption) => {
    const currentDietary = recipeForm.dietary || [];
    const updatedDietary = currentDietary.includes(dietaryOption)
      ? currentDietary.filter(option => option !== dietaryOption)
      : [...currentDietary, dietaryOption];
    
    handleFieldChange('dietary', updatedDietary);
  };

  const handleCheckboxChange = (field, option) => {
    const currentValues = Array.isArray(recipeForm[field]) ? recipeForm[field] : [recipeForm[field]].filter(Boolean);
    const updatedValues = currentValues.includes(option)
      ? currentValues.filter(value => value !== option)
      : [...currentValues, option];
    
    handleFieldChange(field, updatedValues);
  };

  const updateCustomOptions = (type, newItems) => {
    setCustomOptions(prev => ({
      ...prev,
      [type]: newItems
    }));
  };

  return {
    customOptions,
    handleFieldChange,
    handleDietaryChange,
    handleCheckboxChange,
    updateCustomOptions,
  };
};

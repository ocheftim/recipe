// src/hooks/useIngredientModalState.js
// Fixed version with working cost calculations
import { useState, useEffect } from 'react';
import { parseCaseDescription } from '../utils/caseDescriptionParser';
import useIngredientFormValidation from './useIngredientFormValidation';

const useIngredientModalState = (ingredient, onSave, onClose, recipes = []) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    supplier: '',
    caseConfiguration: '',
    caseQuantity: '',
    caseUnit: '',
    casePrice: '',
    storageLocation: '',
    notes: '',
    minimumStock: '',
    reorderPoint: '',
    maxStock: '',
    sku: '',
    vendorProductName: ''
  });

  // UI state
  const [activeTab, setActiveTab] = useState('basic');
  const [isDirty, setIsDirty] = useState(false);

  // Cost calculation state
  const [parsedCaseData, setParsedCaseData] = useState(null);
  const [calculatedCosts, setCalculatedCosts] = useState(null);
  const [showCostCalculations, setShowCostCalculations] = useState(false);
  const [hasEverParsed, setHasEverParsed] = useState(false); // NEW: Track if user has ever parsed
  const [isParsingCase, setIsParsingCase] = useState(false);
  const [parseSuccess, setParseSuccess] = useState(false);
  const [parseError, setParseError] = useState(null);

  // Use extracted validation hook
  const {
    formErrors,
    touched,
    isFormValid,
    hasValidationErrors,
    validationErrorCount,
    getFieldError,
    setFieldTouched,
    resetValidation,
    prepareFormSubmission
  } = useIngredientFormValidation(formData);

  // Calculate costs when we have the required data
  const costCalculations = (() => {
    if (!formData.caseQuantity || !formData.caseUnit || !formData.casePrice) {
      return null;
    }

    const casePrice = parseFloat(formData.casePrice);
    const caseQuantity = parseFloat(formData.caseQuantity);
    const caseUnit = formData.caseUnit;

    if (casePrice <= 0 || caseQuantity <= 0) {
      return null;
    }

    // Calculate apCost (as purchased cost per unit)
    const apCost = casePrice / caseQuantity;
    const apUnit = caseUnit;

    // Additional cost calculations
    const calculations = {
      apCost: apCost,
      apUnit: apUnit,
      casePrice: casePrice,
      caseQuantity: caseQuantity,
      caseUnit: caseUnit,
      
      // Cost per common units
      costPerPound: caseUnit.toLowerCase().includes('lb') ? apCost : null,
      costPerOunce: caseUnit.toLowerCase().includes('lb') ? apCost / 16 : 
                   caseUnit.toLowerCase().includes('oz') ? apCost : null,
      costPerEach: caseUnit.toLowerCase().includes('ea') || 
                   caseUnit.toLowerCase().includes('count') ? apCost : null,
    };

    return calculations;
  })();

  // Auto-show calculations when we have the required data OR user has ever parsed
  useEffect(() => {
    const hasRequiredData = costCalculations || (formData.caseQuantity && formData.caseUnit && formData.casePrice);
    
    if (hasRequiredData || hasEverParsed) {
      console.log('🔍 Showing cost calculations - hasRequiredData:', hasRequiredData, 'hasEverParsed:', hasEverParsed);
      setShowCostCalculations(true);
    }
  }, [costCalculations, formData.caseQuantity, formData.caseUnit, formData.casePrice, hasEverParsed]);

  // Initialize form data when ingredient changes
  useEffect(() => {
    if (ingredient) {
      const initialData = {
        name: ingredient.name || ingredient.internalName || '',
        category: ingredient.category || '',
        supplier: ingredient.supplier || '',
        caseConfiguration: ingredient.caseConfiguration || '',
        caseQuantity: ingredient.caseQuantity || '',
        caseUnit: ingredient.caseUnit || '',
        casePrice: ingredient.casePrice || '',
        storageLocation: ingredient.storageLocation || '',
        notes: ingredient.notes || '',
        minimumStock: ingredient.minimumStock || '',
        reorderPoint: ingredient.reorderPoint || '',
        maxStock: ingredient.maxStock || '',
        sku: ingredient.sku || '',
        vendorProductName: ingredient.vendorProductName || ''
      };

      setFormData(initialData);
      setIsDirty(false);
      setTimeout(() => resetValidation(), 10);

      // If editing existing ingredient with case data, set parsed data
      if (ingredient.caseQuantity && ingredient.caseUnit && ingredient.casePrice) {
        setParsedCaseData({
          caseQuantity: parseFloat(ingredient.caseQuantity),
          caseUnit: ingredient.caseUnit
        });
        setHasEverParsed(true); // Mark as having parsed data
        setShowCostCalculations(true); // Show tab immediately for existing ingredients
      }
    } else {
      // Reset form for new ingredient
      const emptyData = {
        name: '', category: '', supplier: '', caseConfiguration: '', caseQuantity: '',
        caseUnit: '', casePrice: '', storageLocation: '', notes: '', minimumStock: '',
        reorderPoint: '', maxStock: '', sku: '', vendorProductName: ''
      };

      setFormData(emptyData);
      setIsDirty(false);
      setTimeout(() => resetValidation(), 10);
      setParsedCaseData(null);
      setCalculatedCosts(null);
      setShowCostCalculations(false);
      setHasEverParsed(false); // Reset for new ingredient
      setParseError(null);
      setParseSuccess(false);
    }
  }, [ingredient]);

  // Event handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFieldTouched(name);
    setIsDirty(true);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setFieldTouched(name);
  };

  // Parse case description from Sysco format
  const handleParseCaseDescription = () => {
    if (!formData.caseConfiguration?.trim()) {
      setParseError('Please enter a case configuration to parse');
      return;
    }

    setIsParsingCase(true);
    setParseSuccess(false);
    setParseError(null);

    // Simulate parsing delay for better UX
    setTimeout(() => {
      try {
        console.log('🔍 Parsing case description:', formData.caseConfiguration);
        const parsed = parseCaseDescription(formData.caseConfiguration);
        
        console.log('🔍 Parse result:', parsed);
        
        if (parsed.success) {
          // Update form data with parsed values
          setFormData(prev => ({
            ...prev,
            caseQuantity: parsed.caseQuantity.toString(),
            caseUnit: parsed.caseUnit
          }));
          
          setParsedCaseData({
            caseQuantity: parsed.caseQuantity,
            caseUnit: parsed.caseUnit
          });
          
          setParseSuccess(true);
          setHasEverParsed(true); // Mark that user has parsed - tab will stay visible
          setIsDirty(true);
          
          console.log('🔍 Successfully parsed and updated form data - Analysis tab will stay visible');
          
          // Auto-hide success message after 3 seconds
          setTimeout(() => setParseSuccess(false), 3000);
        } else {
          setParseError(parsed.error || 'Unable to parse case configuration');
          console.log('🔍 Parse failed:', parsed.error);
        }
      } catch (error) {
        setParseError('An error occurred while parsing. Please check the format.');
        console.error('🔍 Parse error:', error);
      }
      setIsParsingCase(false);
    }, 500);
  };

  // Clear all parsed data and calculations
  const clearParsedData = () => {
    setParsedCaseData(null);
    setCalculatedCosts(null);
    setShowCostCalculations(false);
    setParseSuccess(false);
    setParseError(null);
    setFormData(prev => ({
      ...prev,
      caseQuantity: '',
      caseUnit: ''
    }));
  };

  // Update calculated costs (called by CalculatedUnitCosts component)
  const handleCostUpdate = (calculations) => {
    setCalculatedCosts(calculations);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Use the validation hook's submission preparation
    const { isValid } = prepareFormSubmission();
    
    if (!isValid) {
      return;
    }

    const dataToSave = {
      ...formData,
      calculatedCosts: calculatedCosts || costCalculations,
      parsedCaseData,
      costCalculations,
      showCostCalculations,
      lastUpdated: new Date().toISOString(), // Full ISO timestamp for proper sorting
      lastUpdatedDate: new Date().toLocaleDateString(), // Just date for display
      id: ingredient?.id || Date.now().toString()
    };

    onSave(dataToSave);
    setIsDirty(false);
  };

  const handleClose = () => {
    if (isDirty) {
      const confirmClose = window.confirm(
        'You have unsaved changes. Are you sure you want to close without saving?'
      );
      if (!confirmClose) return;
    }
    onClose();
  };

  // Utility functions
  const formatCost = (cost) => {
    if (typeof cost !== 'number' || isNaN(cost)) return '$0.00';
    return `$${cost.toFixed(cost < 1 ? 4 : 2)}`;
  };

  const getCostSummary = () => {
    if (!costCalculations) return null;
    return {
      caseInfo: `${costCalculations.caseQuantity} ${costCalculations.caseUnit} case`,
      casePrice: formatCost(costCalculations.casePrice),
      unitCost: formatCost(costCalculations.apCost),
      unitType: costCalculations.apUnit,
      efficiency: costCalculations.caseQuantity > 1 ? 'Bulk packaging' : 'Individual units'
    };
  };

  // Computed values
  const filteredRecipes = recipes.filter(recipe =>
    recipe.ingredients?.some(ing => ing.name === formData.name)
  );

  // Return all state and handlers
  return {
    // Form state
    formData,
    formErrors,
    touched,
    isDirty,

    // UI state
    activeTab,
    setActiveTab,

    // Cost calculations
    parsedCaseData,
    calculatedCosts,
    showCostCalculations,
    isParsingCase,
    parseSuccess,
    parseError,
    costCalculations,

    // Event handlers
    handleInputChange,
    handleBlur,
    handleSubmit,
    handleClose,

    // Cost-related handlers
    handleParseCaseDescription,
    clearParsedData,
    handleCostUpdate,

    // Validation functions
    getFieldError,
    isFormValid,
    hasValidationErrors,
    validationErrorCount,

    // Utility functions
    formatCost,
    getCostSummary,

    // Computed values
    filteredRecipes
  };
};

export default useIngredientModalState;
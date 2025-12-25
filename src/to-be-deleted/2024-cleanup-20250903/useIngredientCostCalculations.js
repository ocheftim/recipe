// src/hooks/useIngredientCostCalculations.js
// ToqueWorks cost calculation and case parsing logic
import { useState, useEffect, useCallback, useMemo } from 'react';
import { parseCaseDescription } from '../utils/caseDescriptionParser';

const useIngredientCostCalculations = (formData, ingredient = null, setFormData = null) => {
  // Cost calculation state
  const [calculatedCosts, setCalculatedCosts] = useState(null);
  const [showCostCalculations, setShowCostCalculations] = useState(false);
  
  // Case parsing state
  const [parsedCaseData, setParsedCaseData] = useState(null);
  const [isParsingCase, setIsParsingCase] = useState(false);
  const [parseSuccess, setParseSuccess] = useState(false);
  const [parseError, setParseError] = useState(null);

  // Initialize cost calculations when ingredient changes
  useEffect(() => {
    if (ingredient) {
      // If editing existing ingredient with case data, show calculations
      if (ingredient.caseQuantity && ingredient.caseUnit && ingredient.casePrice) {
        setParsedCaseData({
          caseQuantity: parseFloat(ingredient.caseQuantity),
          caseUnit: ingredient.caseUnit
        });
        setShowCostCalculations(true);
      }
    } else {
      // Reset for new ingredient
      setParsedCaseData(null);
      setCalculatedCosts(null);
      setShowCostCalculations(false);
      setParseError(null);
      setParseSuccess(false);
    }
  }, [ingredient]);

  // Auto-show calculations when we have the required data
  useEffect(() => {
    if (formData.caseQuantity && formData.caseUnit && formData.casePrice && 
        parseFloat(formData.casePrice) > 0) {
      console.log('🔍 Auto-showing calculations - we have all required data');
      setShowCostCalculations(true);
    }
  }, [formData.caseQuantity, formData.caseUnit, formData.casePrice]);

  // Calculate apCost and apUnit values
  const costCalculations = useMemo(() => {
    if (!parsedCaseData || !formData.casePrice) {
      return null;
    }

    const casePrice = parseFloat(formData.casePrice);
    const caseQuantity = parsedCaseData.caseQuantity;
    const caseUnit = parsedCaseData.caseUnit;

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
      
      // Percentage calculations for recipe costing
      calculateRecipeCost: (recipeQuantity, recipeUnit) => {
        // Convert recipe quantity to case units for accurate costing
        let costMultiplier = recipeQuantity;
        
        // Unit conversion logic (extend as needed)
        if (caseUnit.toLowerCase().includes('lb') && recipeUnit.toLowerCase().includes('oz')) {
          costMultiplier = recipeQuantity / 16; // Convert oz to lbs
        } else if (caseUnit.toLowerCase().includes('oz') && recipeUnit.toLowerCase().includes('lb')) {
          costMultiplier = recipeQuantity * 16; // Convert lbs to oz
        }
        
        return costMultiplier * apCost;
      }
    };

    return calculations;
  }, [parsedCaseData, formData.casePrice]);

  // Parse case description from Sysco format
  const handleParseCaseDescription = useCallback(() => {
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
        const parsed = parseCaseDescription(formData.caseConfiguration);
        
        if (parsed.success) {
          setParsedCaseData({
            caseQuantity: parsed.caseQuantity,
            caseUnit: parsed.caseUnit
          });
          setParseSuccess(true);
          setShowCostCalculations(true);
          
          // Auto-hide success message after 3 seconds
          setTimeout(() => setParseSuccess(false), 3000);
        } else {
          setParseError(parsed.error || 'Unable to parse case configuration');
        }
      } catch (error) {
        setParseError('An error occurred while parsing. Please check the format.');
        console.error('Parse error:', error);
      }
      setIsParsingCase(false);
    }, 500);
  }, [formData.caseConfiguration]);

  // Clear all parsed data and calculations
  const clearParsedData = useCallback(() => {
    setParsedCaseData(null);
    setCalculatedCosts(null);
    setShowCostCalculations(false);
    setParseSuccess(false);
    setParseError(null);
  }, []);

  // Update calculated costs (called by CalculatedUnitCosts component)
  const handleCostUpdate = useCallback((calculations) => {
    setCalculatedCosts(calculations);
  }, []);

  // Manually show/hide cost calculations
  const toggleCostCalculations = useCallback(() => {
    setShowCostCalculations(prev => !prev);
  }, []);

  // Get cost data for saving
  const getCostDataForSave = useCallback(() => {
    return {
      parsedCaseData,
      calculatedCosts: calculatedCosts || costCalculations,
      costCalculations,
      showCostCalculations
    };
  }, [parsedCaseData, calculatedCosts, costCalculations, showCostCalculations]);

  // Check if we have enough data for cost calculations
  const canCalculateCosts = Boolean(
    parsedCaseData && 
    formData.casePrice && 
    parseFloat(formData.casePrice) > 0
  );

  // Format cost for display
  const formatCost = useCallback((cost) => {
    if (typeof cost !== 'number' || isNaN(cost)) return '$0.00';
    return `$${cost.toFixed(cost < 1 ? 4 : 2)}`;
  }, []);

  // Get cost analysis summary
  const getCostSummary = useCallback(() => {
    if (!costCalculations) return null;

    return {
      caseInfo: `${costCalculations.caseQuantity} ${costCalculations.caseUnit} case`,
      casePrice: formatCost(costCalculations.casePrice),
      unitCost: formatCost(costCalculations.apCost),
      unitType: costCalculations.apUnit,
      efficiency: costCalculations.caseQuantity > 1 ? 'Bulk packaging' : 'Individual units'
    };
  }, [costCalculations, formatCost]);

  return {
    // State
    parsedCaseData,
    calculatedCosts,
    showCostCalculations,
    isParsingCase,
    parseSuccess,
    parseError,

    // Computed values
    costCalculations,
    canCalculateCosts,

    // Functions
    handleParseCaseDescription,
    clearParsedData,
    handleCostUpdate,
    toggleCostCalculations,
    getCostDataForSave,
    formatCost,
    getCostSummary,

    // Enhanced cost calculation methods
    calculateRecipeCost: costCalculations?.calculateRecipeCost,
    
    // Quick access to key cost values
    apCost: costCalculations?.apCost,
    apUnit: costCalculations?.apUnit,
    costPerPound: costCalculations?.costPerPound,
    costPerOunce: costCalculations?.costPerOunce,
    costPerEach: costCalculations?.costPerEach
  };
};

export default useIngredientCostCalculations;
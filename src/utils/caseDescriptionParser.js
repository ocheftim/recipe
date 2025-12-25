// src/utils/caseDescriptionParser.js
// FIXED: Dual-unit parsing with proper return structure

/**
 * Parse Sysco-style case descriptions into structured data
 * Enhanced to handle dual-unit cases like "120 count, 50#"
 */
export function parseCaseDescription(description) {
  if (!description || typeof description !== 'string') {
    return {
      success: false,
      error: 'Invalid description provided'
    };
  }

  const trimmed = description.trim().toLowerCase();
  console.log('Parsing case description:', trimmed);

  try {
    // ✅ FIXED: Pattern for dual-unit cases (count + weight)
    // Examples: "120 count, 50#", "80 pieces, 25 lbs", "24 heads, 15#"
    const dualUnitPattern = /(\d+(?:\.\d+)?)\s*(count|pieces?|heads?|each|ea|items?)\s*[,\s]+\s*(\d+(?:\.\d+)?)\s*([#]|lbs?|pounds?)/;
    const dualMatch = trimmed.match(dualUnitPattern);
    
    if (dualMatch) {
      const count = parseFloat(dualMatch[1]);
      const countUnit = dualMatch[2] === 'ea' ? 'each' : 
                       dualMatch[2] === 'pieces' ? 'each' :
                       dualMatch[2] === 'items' ? 'each' : dualMatch[2];
      const weight = parseFloat(dualMatch[3]);
      const weightUnit = dualMatch[4] === '#' ? 'lbs' : 'lbs';
      
      console.log('✅ Matched dual-unit pattern:', dualMatch);
      
      // ✅ FIXED: Return complete dual-unit structure
      const result = {
        success: true,
        isDualUnit: true,
        // Primary unit (for display)
        caseQuantity: count,
        caseUnit: countUnit,
        // Secondary unit (for additional costing)
        secondaryQuantity: weight,
        secondaryUnit: weightUnit,
        rawMatch: dualMatch[0],
        pattern: 'dual-unit',
        description: `${count} ${countUnit}, ${weight} ${weightUnit}`
      };
      
      console.log('🔄 Returning dual-unit data:', result);
      return result;
    }

    // ✅ Pattern 1 - Handle X/Y# format (like "36/1#")
    const slashPoundPattern = /(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)\s*#/;
    const slashPoundMatch = trimmed.match(slashPoundPattern);
    
    if (slashPoundMatch) {
      const caseQuantity = parseFloat(slashPoundMatch[1]);
      console.log('✅ Matched slash-pound pattern:', slashPoundMatch);
      return {
        success: true,
        caseQuantity: caseQuantity,
        caseUnit: 'lbs',
        rawMatch: slashPoundMatch[0],
        pattern: 'slash-pound'
      };
    }

    // ✅ Pattern 2 - Handle X/YLB format (like "36/1LB" or "1/25LB")
    const slashLbPattern = /(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)\s*(lb|lbs|pound|pounds)/;
    const slashLbMatch = trimmed.match(slashLbPattern);
    
    if (slashLbMatch) {
      const firstNum = parseFloat(slashLbMatch[1]);
      const secondNum = parseFloat(slashLbMatch[2]);
      const caseQuantity = firstNum > secondNum ? firstNum : secondNum;
      
      console.log('✅ Matched slash-lb pattern:', slashLbMatch);
      return {
        success: true,
        caseQuantity: caseQuantity,
        caseUnit: 'lbs',
        rawMatch: slashLbMatch[0],
        pattern: 'slash-lb'
      };
    }

    // ✅ Pattern 3 - Simple number with # (like "25#")
    const simplePoundPattern = /(\d+(?:\.\d+)?)\s*#/;
    const simplePoundMatch = trimmed.match(simplePoundPattern);
    
    if (simplePoundMatch) {
      console.log('✅ Matched simple pound pattern:', simplePoundMatch);
      return {
        success: true,
        caseQuantity: parseFloat(simplePoundMatch[1]),
        caseUnit: 'lbs',
        rawMatch: simplePoundMatch[0],
        pattern: 'simple-pound'
      };
    }

    // ✅ Pattern 4 - Count with descriptive unit (like "24 heads", "120 count")
    const countPattern = /(\d+(?:\.\d+)?)\s+(count|heads?|bunches?|pieces?|each|ea|items?)/;
    const countMatch = trimmed.match(countPattern);
    
    if (countMatch) {
      let unit = countMatch[2];
      if (unit === 'ea' || unit === 'pieces' || unit === 'items') unit = 'each';
      
      console.log('✅ Matched count pattern:', countMatch);
      return {
        success: true,
        caseQuantity: parseFloat(countMatch[1]),
        caseUnit: unit,
        rawMatch: countMatch[0],
        pattern: 'count-unit'
      };
    }

    // ✅ Pattern 5 - X x Y format (like "6 x 102 oz", "12 x 1 lb")
    const multiplyPattern = /(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)\s*(oz|lb|lbs|kg|g|ml|l)/;
    const multiplyMatch = trimmed.match(multiplyPattern);
    
    if (multiplyMatch) {
      console.log('✅ Matched multiply pattern:', multiplyMatch);
      return {
        success: true,
        caseQuantity: parseFloat(multiplyMatch[1]),
        caseUnit: multiplyMatch[3] === 'oz' ? 'oz' : 
                  multiplyMatch[3].includes('lb') ? 'lbs' : 
                  multiplyMatch[3],
        rawMatch: multiplyMatch[0],
        pattern: 'multiply'
      };
    }

    // ✅ Pattern 6 - Simple number with weight unit (like "25 lbs", "10 kg")
    const weightPattern = /(\d+(?:\.\d+)?)\s*(lbs?|pounds?|kg|kilograms?|oz|ounces?|g|grams?)/;
    const weightMatch = trimmed.match(weightPattern);
    
    if (weightMatch) {
      let unit = weightMatch[2];
      if (unit.startsWith('lb') || unit.startsWith('pound')) unit = 'lbs';
      else if (unit.startsWith('oz') || unit.startsWith('ounce')) unit = 'oz';
      else if (unit.startsWith('kg') || unit.startsWith('kilogram')) unit = 'kg';
      else if (unit.startsWith('g') || unit.startsWith('gram')) unit = 'g';
      
      console.log('✅ Matched weight pattern:', weightMatch);
      return {
        success: true,
        caseQuantity: parseFloat(weightMatch[1]),
        caseUnit: unit,
        rawMatch: weightMatch[0],
        pattern: 'weight'
      };
    }

    // ✅ Pattern 7 - Volume units (like "1 gallon", "4 quarts")
    const volumePattern = /(\d+(?:\.\d+)?)\s*(gallons?|gal|quarts?|qt|pints?|pt|cups?|fl\s*oz|fluid\s*ounces?|liters?|l|ml)/;
    const volumeMatch = trimmed.match(volumePattern);
    
    if (volumeMatch) {
      let unit = volumeMatch[2];
      if (unit.startsWith('gal')) unit = 'gal';
      else if (unit.startsWith('qt') || unit.startsWith('quart')) unit = 'qt';
      else if (unit.startsWith('pt') || unit.startsWith('pint')) unit = 'pt';
      else if (unit.startsWith('cup')) unit = 'cups';
      else if (unit.includes('fl') || unit.includes('fluid')) unit = 'fl oz';
      else if (unit.startsWith('l') || unit.startsWith('liter')) unit = 'l';
      
      console.log('✅ Matched volume pattern:', volumeMatch);
      return {
        success: true,
        caseQuantity: parseFloat(volumeMatch[1]),
        caseUnit: unit,
        rawMatch: volumeMatch[0],
        pattern: 'volume'
      };
    }

    // ✅ Pattern 8 - Just a number (fallback)
    const numberPattern = /(\d+(?:\.\d+)?)/;
    const numberMatch = trimmed.match(numberPattern);
    
    if (numberMatch) {
      console.log('⚠️ Matched number only (fallback):', numberMatch);
      return {
        success: true,
        caseQuantity: parseFloat(numberMatch[1]),
        caseUnit: 'each',
        rawMatch: numberMatch[0],
        pattern: 'number-fallback',
        warning: 'Unit not specified, defaulted to "each"'
      };
    }

    // No patterns matched
    console.log('❌ No patterns matched for:', trimmed);
    return {
      success: false,
      error: `Unable to parse "${description}". Try formats like: 120 count, 50#; 36/1#; 24 heads; 6 x 102 oz`
    };

  } catch (error) {
    console.error('Parser error:', error);
    return {
      success: false,
      error: 'An error occurred while parsing the description'
    };
  }
}

/**
 * Get suggested formats including dual-unit examples
 */
export function getSuggestedFormats() {
  return [
    '120 count, 50# (dual-unit: count and weight)',
    '80 pieces, 25 lbs (dual-unit format)',
    '24 heads, 15# (lettuce/cabbage style)',
    '36/1# (36 units of 1 pound each)',
    '1/25LB (1 case of 25 pounds)',
    '6 x 102 oz (6 containers of 102 oz)',
    '25# (25 pounds total)',
    '120 count (count only)',
    '50 lbs (weight only)'
  ];
}

/**
 * Test the enhanced parser
 */
export function testDualUnitParser() {
  const testCases = [
    '120 count, 50#',        // Potatoes
    '80 pieces, 25 lbs',     // Chicken pieces
    '24 heads, 15#',         // Lettuce
    '36/1#',                 // Standard format
    '1/25LB',                // Large pack
    '120 count',             // Count only
    '50#'                    // Weight only
  ];

  console.log('🧪 Testing dual-unit parser:');
  
  testCases.forEach(testCase => {
    const result = parseCaseDescription(testCase);
    console.log(`"${testCase}" →`, result);
  });
}

export default parseCaseDescription;
// src/components/recipes/ImageRecipeParser.js - Complete Working Version
import React, { useState, useCallback } from 'react';

const ImageRecipeParser = ({ onRecipeCreated }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [ocrText, setOcrText] = useState('');
  const [ocrProgress, setOcrProgress] = useState(0);
  const [parsedRecipe, setParsedRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Handle file selection
  const handleFileSelect = useCallback((event) => {
    const file = event.target.files[0];
    setError(null);
    setOcrText('');
    setParsedRecipe(null);
    setIsEditing(false);
    
    if (!file) {
      setSelectedFile(null);
      setImagePreview(null);
      return;
    }

    // File validation
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPG, PNG, or WebP)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Image file too large. Please use an image under 10MB.');
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  // Handle drag and drop
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const event = { target: { files: [files[0]] } };
      handleFileSelect(event);
    }
  }, [handleFileSelect]);

  // Remove image and reset
  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setError(null);
    setOcrText('');
    setParsedRecipe(null);
    setProcessing(false);
    setOcrProgress(0);
    setIsEditing(false);
    
    const fileInput = document.getElementById('recipe-image-input');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Perform OCR using Tesseract.js
  const performOCR = async () => {
    if (!selectedFile) return;
    
    setProcessing(true);
    setError(null);
    setOcrProgress(0);
    
    try {
      const Tesseract = await import('tesseract.js');
      
      const { data: { text } } = await Tesseract.recognize(
        selectedFile,
        'eng',
        {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              setOcrProgress(Math.round(m.progress * 100));
            }
          }
        }
      );
      
      setOcrText(text);
      setOcrProgress(100);
      
      // Automatically parse the text
      if (text && text.trim().length > 10) {
        parseRecipeFromText(text);
      }
      
    } catch (error) {
      console.error('OCR Error:', error);
      setError('Failed to extract text from image. Please try again with a clearer image.');
    } finally {
      setProcessing(false);
    }
  };

  // Parse recipe from extracted text
  const parseRecipeFromText = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    
    // Extract title (usually first line or prominent text)
    const title = extractTitle(lines);
    
    // Extract ingredients
    const ingredients = extractIngredients(text);
    
    // Extract instructions
    const instructions = extractInstructions(text);
    
    // Extract metadata
    const metadata = extractMetadata(text);
    
    const recipe = {
      name: title,
      category: metadata.category || 'Main Dish',
      servings: metadata.servings || 4,
      prepTime: metadata.prepTime || 30,
      cookTime: metadata.cookTime || 30,
      difficulty: metadata.difficulty || 'Medium',
      ingredients: ingredients,
      instructions: instructions,
      notes: `Imported from image using OCR.\n${metadata.notes || ''}`,
      source: 'Image Import',
    };
    
    setParsedRecipe(recipe);
    setIsEditing(false);
  };

  // Extract title from text
  const extractTitle = (lines) => {
    // Look for the first substantial line that's not an ingredient or instruction header
    for (let line of lines) {
      const trimmed = line.trim();
      if (trimmed.length > 3 && 
          !trimmed.toLowerCase().includes('ingredient') &&
          !trimmed.toLowerCase().includes('instruction') &&
          !trimmed.toLowerCase().includes('direction') &&
          !trimmed.match(/^\d/)) {
        return trimmed;
      }
    }
    return `Recipe from ${selectedFile?.name?.replace(/\.[^/.]+$/, "") || 'image'}`;
  };

  // Extract ingredients from text
  const extractIngredients = (text) => {
    const ingredients = [];
    const lines = text.split('\n');
    let inIngredientsSection = false;
    let id = 1;
    
    for (let line of lines) {
      const trimmed = line.trim();
      
      // Check if entering ingredients section
      if (trimmed.toLowerCase().includes('ingredient')) {
        inIngredientsSection = true;
        continue;
      }
      
      // Check if leaving ingredients section
      if (inIngredientsSection && 
          (trimmed.toLowerCase().includes('instruction') || 
           trimmed.toLowerCase().includes('direction') ||
           trimmed.toLowerCase().includes('method'))) {
        break;
      }
      
      // Parse ingredient line
      if (inIngredientsSection && trimmed.length > 2) {
        const ingredient = parseIngredientLine(trimmed, id++);
        if (ingredient) {
          ingredients.push(ingredient);
        }
      }
      
      // Also check for common ingredient patterns outside sections
      if (!inIngredientsSection && trimmed.match(/^\d|^½|^¼|^¾|^⅓|^⅔|^⅛|^one|^two|^three/i)) {
        const ingredient = parseIngredientLine(trimmed, id++);
        if (ingredient && ingredient.name) {
          ingredients.push(ingredient);
        }
      }
    }
    
    // If no ingredients found, add placeholder
    if (ingredients.length === 0) {
      ingredients.push({
        id: 1,
        quantity: 1,
        unit: 'recipe',
        name: 'Review image and add ingredients',
        cost: 0,
        notes: 'Placeholder - update with actual ingredients'
      });
    }
    
    return ingredients;
  };

  // Parse individual ingredient line
  const parseIngredientLine = (line, id) => {
    // Remove bullet points, dashes, numbers at start
    let cleaned = line.replace(/^[\d\.\-\*\•\s]+/, '').trim();
    
    // Common measurement patterns
    const measurementPattern = /^([\d½¼¾⅓⅔⅛⅜⅝⅞\/\s]+)\s*(cups?|cup|tbsp|tablespoons?|tsp|teaspoons?|oz|ounces?|lbs?|pounds?|g|grams?|kg|kilograms?|ml|milliliters?|l|liters?|cloves?|pieces?|slices?|pinch|dash|handful|bunch|sprigs?|cans?|packages?)?\s*(.+)/i;
    
    const match = line.match(measurementPattern);
    
    if (match) {
      // Convert fractions to decimals
      let quantity = match[1].trim();
      quantity = quantity.replace('½', '0.5').replace('¼', '0.25').replace('¾', '0.75')
                        .replace('⅓', '0.33').replace('⅔', '0.67').replace('⅛', '0.125');
      
      // Try to parse as number
      const numQuantity = parseFloat(quantity);
      
      return {
        id: id,
        quantity: isNaN(numQuantity) ? 1 : numQuantity,
        unit: match[2] || 'unit',
        name: match[3] || cleaned,
        cost: 0,
        notes: ''
      };
    }
    
    // If no pattern matches, return whole line as ingredient
    if (cleaned.length > 2) {
      return {
        id: id,
        quantity: 1,
        unit: 'unit',
        name: cleaned,
        cost: 0,
        notes: ''
      };
    }
    
    return null;
  };

  // Extract instructions from text
  const extractInstructions = (text) => {
    const instructions = [];
    const lines = text.split('\n');
    let inInstructionsSection = false;
    
    for (let line of lines) {
      const trimmed = line.trim();
      
      // Check if entering instructions section
      if (trimmed.toLowerCase().includes('instruction') || 
          trimmed.toLowerCase().includes('direction') ||
          trimmed.toLowerCase().includes('method')) {
        inInstructionsSection = true;
        continue;
      }
      
      // Parse instruction line
      if (inInstructionsSection && trimmed.length > 5) {
        // Remove step numbers if present
        const cleaned = trimmed.replace(/^step\s*\d+[\.\:\s]*/i, '')
                              .replace(/^\d+[\.\)]\s*/, '');
        if (cleaned.length > 5) {
          instructions.push(cleaned);
        }
      }
    }
    
    // If no instructions found, look for action words
    if (instructions.length === 0) {
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
      for (let sentence of sentences) {
        if (sentence.match(/\b(mix|stir|bake|cook|heat|boil|simmer|add|combine|pour|blend|chop|dice|slice|preheat|season|serve)\b/i)) {
          instructions.push(sentence.trim());
        }
      }
    }
    
    // If still no instructions, add placeholder
    if (instructions.length === 0) {
      instructions.push('Review image and add cooking instructions');
    }
    
    return instructions;
  };

  // Extract metadata from text
  const extractMetadata = (text) => {
    const metadata = {};
    
    // Extract servings
    const servingsMatch = text.match(/(?:serves?|servings?|yield|makes?)[\s:]*(\d+)/i);
    if (servingsMatch) {
      metadata.servings = parseInt(servingsMatch[1]);
    }
    
    // Extract prep time
    const prepMatch = text.match(/prep(?:aration)?(?:\s+time)?[\s:]*(\d+)\s*(hours?|hrs?|minutes?|mins?)/i);
    if (prepMatch) {
      const time = parseInt(prepMatch[1]);
      metadata.prepTime = prepMatch[2].toLowerCase().includes('hour') ? time * 60 : time;
    }
    
    // Extract cook time
    const cookMatch = text.match(/cook(?:ing)?(?:\s+time)?[\s:]*(\d+)\s*(hours?|hrs?|minutes?|mins?)/i);
    if (cookMatch) {
      const time = parseInt(cookMatch[1]);
      metadata.cookTime = cookMatch[2].toLowerCase().includes('hour') ? time * 60 : time;
    }
    
    // Extract difficulty
    if (text.match(/\b(easy|simple|beginner|quick)\b/i)) {
      metadata.difficulty = 'Easy';
    } else if (text.match(/\b(hard|difficult|advanced|complex|challenging)\b/i)) {
      metadata.difficulty = 'Hard';
    } else {
      metadata.difficulty = 'Medium';
    }
    
    // Extract category based on keywords
    if (text.match(/\b(soup|stew|chowder|bisque)\b/i)) {
      metadata.category = 'Soups';
    } else if (text.match(/\b(salad|slaw|greens)\b/i)) {
      metadata.category = 'Salads';
    } else if (text.match(/\b(dessert|cake|cookie|pie|sweet|pastry)\b/i)) {
      metadata.category = 'Desserts';
    } else if (text.match(/\b(appetizer|starter|snack|dip)\b/i)) {
      metadata.category = 'Appetizers';
    } else if (text.match(/\b(breakfast|brunch|pancake|waffle|egg|omelet)\b/i)) {
      metadata.category = 'Breakfast';
    } else if (text.match(/\b(drink|beverage|cocktail|smoothie|juice)\b/i)) {
      metadata.category = 'Beverages';
    } else {
      metadata.category = 'Main Dish';
    }
    
    return metadata;
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Update parsed recipe field
  const updateRecipeField = (field, value) => {
    setParsedRecipe(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Update ingredient
  const updateIngredient = (index, field, value) => {
    setParsedRecipe(prev => {
      const newIngredients = [...prev.ingredients];
      newIngredients[index] = {
        ...newIngredients[index],
        [field]: value
      };
      return { ...prev, ingredients: newIngredients };
    });
  };

  // Add ingredient
  const addIngredient = () => {
    setParsedRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, {
        id: prev.ingredients.length + 1,
        quantity: 1,
        unit: 'unit',
        name: '',
        cost: 0,
        notes: ''
      }]
    }));
  };

  // Remove ingredient
  const removeIngredient = (index) => {
    setParsedRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  // Update instruction
  const updateInstruction = (index, value) => {
    setParsedRecipe(prev => {
      const newInstructions = [...prev.instructions];
      newInstructions[index] = value;
      return { ...prev, instructions: newInstructions };
    });
  };

  // Add instruction
  const addInstruction = () => {
    setParsedRecipe(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  // Remove instruction
  const removeInstruction = (index) => {
    setParsedRecipe(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  // Create recipe (basic without OCR)
  const handleCreateBasicRecipe = () => {
    const basicRecipe = {
      id: `img_${Date.now()}`,
      name: `Recipe from ${selectedFile.name.replace(/\.[^/.]+$/, "")}`,
      description: "Recipe imported from image",
      category: "Main Dish",
      cuisine: "Various",
      outlet: "Main Kitchen",
      servings: 4,
      prepTime: 30,
      cookTime: 30,
      difficulty: "Medium",
      status: "draft",
      ingredients: [{
        id: 1,
        name: "Review image and add ingredients",
        quantity: 1,
        unit: "recipe",
        cost: 0,
        notes: "Update with actual ingredients from image"
      }],
      instructions: ["Review image and add cooking instructions"],
      notes: "Imported from image. Please review and update all details.",
      tags: ["Image Import", "Draft"],
      nutritionalInfo: {},
      costPerServing: 0,
      totalCost: 0,
      margin: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "Image Import",
      lastModifiedBy: "Image Import",
      originalImage: imagePreview,
      importSource: "image_basic"
    };

    if (onRecipeCreated) {
      onRecipeCreated(basicRecipe);
      handleRemoveImage();
    }
  };

  // Create recipe with parsed data
  const handleCreateRecipe = () => {
    const recipeData = parsedRecipe || {
      name: ocrText ? `Recipe from ${selectedFile.name.replace(/\.[^/.]+$/, "")}` : "New Recipe",
      category: "Main Dish",
      servings: 4,
      prepTime: 30,
      cookTime: 30,
      difficulty: "Medium",
      ingredients: [{
        id: 1,
        name: ocrText ? "See notes for extracted text" : "Add ingredients",
        quantity: 1,
        unit: "recipe",
        cost: 0,
        notes: "Review and update"
      }],
      instructions: ocrText ? ocrText.split('\n').filter(l => l.trim()) : ["Add instructions"],
      notes: ocrText ? `OCR Text:\n${ocrText}` : "Imported from image"
    };

    const newRecipe = {
      id: `img_${Date.now()}`,
      description: "Recipe imported from image with OCR",
      cuisine: "Various",
      outlet: "Main Kitchen",
      status: "draft",
      tags: ["Image Import", ocrText ? "OCR" : "Manual", "Draft"],
      nutritionalInfo: {},
      costPerServing: 0,
      totalCost: 0,
      margin: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "Image Import",
      lastModifiedBy: "Image Import",
      originalImage: imagePreview,
      importSource: ocrText ? "image_ocr" : "image_manual",
      ocrConfidence: ocrText ? "medium" : "none",
      ...recipeData
    };

    if (onRecipeCreated) {
      onRecipeCreated(newRecipe);
      handleRemoveImage();
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
         style={{ borderLeft: '4px solid #8AC732' }}>
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          📸 Recipe Image Parser
        </h2>
        <p className="text-gray-600">
          Upload a recipe image and extract text using OCR technology
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-red-800 text-sm">{error}</div>
          </div>
        </div>
      )}

      {/* Upload Area */}
      {!imagePreview ? (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Upload Recipe Image
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Drag and drop your image here, or click to browse
              </p>
            </div>

            <label htmlFor="recipe-image-input" 
                   className="cursor-pointer inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white transition-colors hover:opacity-90"
                   style={{ backgroundColor: '#8AC732' }}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Choose Image
            </label>

            <input
              id="recipe-image-input"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />

            <p className="text-xs text-gray-400">
              Supports JPG, PNG, WebP • Max 10MB • Works best with clear, printed text
            </p>
          </div>
        </div>
      ) : (
        /* Image Preview Section */
        <div className="space-y-6">
          
          {/* Image Preview */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-800">Image Preview</h3>
              <button
                onClick={handleRemoveImage}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Remove Image
              </button>
            </div>

            <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
              <img 
                src={imagePreview} 
                alt="Recipe preview" 
                className="max-w-full h-auto max-h-96 mx-auto object-contain"
              />
            </div>
          </div>

          {/* File Info */}
          {selectedFile && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <span><strong>File:</strong> {selectedFile.name}</span>
                  <span><strong>Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                  <span><strong>Type:</strong> {selectedFile.type.split('/')[1].toUpperCase()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons - No OCR yet */}
          {!ocrText && !processing && !parsedRecipe && (
            <div className="flex justify-center gap-4">
              <button
                onClick={performOCR}
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: '#8AC732' }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Extract Text with OCR
              </button>
              
              <button
                onClick={handleCreateBasicRecipe}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Basic Recipe
              </button>
            </div>
          )}

          {/* OCR Processing */}
          {processing && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <svg className="w-5 h-5 text-blue-600 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-sm font-medium text-blue-800">
                  Extracting text from image... {ocrProgress}%
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${ocrProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Parsed Recipe Display */}
          {parsedRecipe && !isEditing && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h4 className="text-sm font-medium text-green-800">Recipe Parsed Successfully!</h4>
                </div>
              </div>

              {/* Recipe Preview */}
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{parsedRecipe.name}</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <span className="text-sm text-gray-600">Category:</span>
                    <p className="font-medium">{parsedRecipe.category}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Servings:</span>
                    <p className="font-medium">{parsedRecipe.servings}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Prep Time:</span>
                    <p className="font-medium">{parsedRecipe.prepTime} min</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Cook Time:</span>
                    <p className="font-medium">{parsedRecipe.cookTime} min</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Ingredients:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {parsedRecipe.ingredients.map((ing, idx) => (
                        <li key={idx} className="text-sm">
                          {ing.quantity} {ing.unit} {ing.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Instructions:</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      {parsedRecipe.instructions.map((inst, idx) => (
                        <li key={idx} className="text-sm">{inst}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={toggleEdit}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Recipe
                </button>

                <button
                  onClick={handleCreateRecipe}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#8AC732' }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Create Recipe
                </button>
              </div>
            </div>
          )}

          {/* Edit Mode */}
          {parsedRecipe && isEditing && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800">Edit Recipe Details</h4>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Name</label>
                  <input
                    type="text"
                    value={parsedRecipe.name}
                    onChange={(e) => updateRecipeField('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={parsedRecipe.category}
                      onChange={(e) => updateRecipeField('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option>Appetizers</option>
                      <option>Soups</option>
                      <option>Salads</option>
                      <option>Main Dish</option>
                      <option>Desserts</option>
                      <option>Breakfast</option>
                      <option>Beverages</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
                    <input
                      type="number"
                      value={parsedRecipe.servings}
                      onChange={(e) => updateRecipeField('servings', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time (min)</label>
                    <input
                      type="number"
                      value={parsedRecipe.prepTime}
                      onChange={(e) => updateRecipeField('prepTime', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cook Time (min)</label>
                    <input
                      type="number"
                      value={parsedRecipe.cookTime}
                      onChange={(e) => updateRecipeField('cookTime', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Ingredients Edit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
                  {parsedRecipe.ingredients.map((ing, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input
                        type="number"
                        value={ing.quantity}
                        onChange={(e) => updateIngredient(idx, 'quantity', parseFloat(e.target.value))}
                        className="w-20 px-2 py-1 border rounded"
                        placeholder="Qty"
                      />
                      <input
                        type="text"
                        value={ing.unit}
                        onChange={(e) => updateIngredient(idx, 'unit', e.target.value)}
                        className="w-24 px-2 py-1 border rounded"
                        placeholder="Unit"
                      />
                      <input
                        type="text"
                        value={ing.name}
                        onChange={(e) => updateIngredient(idx, 'name', e.target.value)}
                        className="flex-1 px-2 py-1 border rounded"
                        placeholder="Ingredient"
                      />
                      <button
                        onClick={() => removeIngredient(idx)}
                        className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addIngredient}
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    + Add Ingredient
                  </button>
                </div>

                {/* Instructions Edit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                  {parsedRecipe.instructions.map((inst, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <span className="text-sm font-semibold text-gray-500 pt-2">{idx + 1}.</span>
                      <textarea
                        value={inst}
                        onChange={(e) => updateInstruction(idx, e.target.value)}
                        className="flex-1 px-2 py-1 border rounded"
                        rows="2"
                      />
                      <button
                        onClick={() => removeInstruction(idx)}
                        className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addInstruction}
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    + Add Step
                  </button>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={toggleEdit}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateRecipe}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#8AC732' }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Recipe
                </button>
              </div>
            </div>
          )}

          {/* OCR Results (Text Only) */}
          {ocrText && !parsedRecipe && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h4 className="text-sm font-medium text-green-800">Text Extracted Successfully!</h4>
                </div>
                <p className="text-sm text-green-700">
                  Found {ocrText.split('\n').filter(line => line.trim()).length} lines of text
                </p>
              </div>

              <div className="border border-gray-300 rounded-lg">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-300">
                  <h4 className="text-sm font-medium text-gray-800">Extracted Text:</h4>
                </div>
                <div className="p-4">
                  <textarea
                    value={ocrText}
                    onChange={(e) => setOcrText(e.target.value)}
                    className="w-full h-40 text-sm text-gray-700 font-mono resize-y border-0 focus:ring-0 focus:outline-none"
                    placeholder="Extracted text will appear here..."
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleCreateRecipe}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#8AC732' }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Recipe with OCR Text
                </button>
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-yellow-800 mb-1">Tips for Best Results:</h4>
                <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                  <li>Use clear, well-lit images of printed text</li>
                  <li>Avoid shadows and glare on the recipe</li>
                  <li>Keep text straight and centered in frame</li>
                  <li>OCR works best with dark text on light background</li>
                  <li>You can edit extracted text before creating the recipe</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageRecipeParser;
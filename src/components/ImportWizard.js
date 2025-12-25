// src/components/ImportWizard.js
// COMPLETE FILE - REPLACE YOUR ENTIRE FILE WITH THIS

import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, FileText, Image, AlertCircle, Check } from 'lucide-react';
import Tesseract from 'tesseract.js';

const ImportWizard = ({ isOpen, onClose, onComplete, type = 'ingredients' }) => {
  const [importMethod, setImportMethod] = useState('');
  const [csvData, setCsvData] = useState([]);
  const [parsedData, setParsedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pasteContent, setPasteContent] = useState('');
  const [newIngredients, setNewIngredients] = useState([]);
  const [verificationNeeded, setVerificationNeeded] = useState(false);
  const fileInputRef = useRef(null);

  // Check for new ingredients in a recipe
  const findNewIngredients = (recipe) => {
    if (!recipe || !recipe.ingredients) return [];
    
    // Get existing ingredients from localStorage - FRESH CHECK EVERY TIME
    const storedIngredients = localStorage.getItem('ingredients');
    const existingIngredients = storedIngredients ? JSON.parse(storedIngredients) : [];
    
    console.log('Checking against existing ingredients:', existingIngredients.length);
    
    // Create a Set of existing ingredient names (case-insensitive)
    const existingNames = new Set(
      existingIngredients.map(ing => ing.name.toLowerCase().trim())
    );
    
    // Find ingredients in the recipe that don't exist in the database
    const newIngs = [];
    const checkedNames = new Set(); // Track what we've already checked
    
    recipe.ingredients.forEach(ingredientLine => {
      // Extract just the ingredient name from the line
      let cleanName = ingredientLine
        .replace(/^\d+[\d\s\/\.]*/, '') // Remove leading numbers
        .replace(/\b(cups?|tbsp|tsp|oz|lb|kg|g|ml|l|pound|ounce|gram|liter|tablespoon|teaspoon|pinch|dash)\b/gi, '') // Remove units
        .replace(/[\(\)].*/, '') // Remove parenthetical notes
        .replace(/,.*/, '') // Remove everything after comma
        .replace(/\s+/g, ' ') // Normalize spaces
        .trim();
      
      // Skip if empty or too short
      if (cleanName.length < 2) return;
      
      const cleanNameLower = cleanName.toLowerCase();
      
      // Skip if we've already checked this name
      if (checkedNames.has(cleanNameLower)) return;
      checkedNames.add(cleanNameLower);
      
      // Check if this ingredient exists in the database
      if (!existingNames.has(cleanNameLower)) {
        newIngs.push(cleanName);
        console.log('New ingredient found:', cleanName);
      } else {
        console.log('Ingredient exists:', cleanName);
      }
    });
    
    return newIngs;
  };

  // Parse text content for recipes
  const parseTextContent = (text) => {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    if (type === 'recipes') {
      const recipe = {
        name: '',
        category: 'Main',
        cuisine: '',
        prepTime: 15,
        cookTime: 30,
        servings: 4,
        ingredients: [],
        method: [],
        notes: '',
        menuPrice: 0,
        targetFoodCost: 28
      };

      // Find recipe name (usually first line or after "Recipe:")
      const nameLine = lines.find(line => 
        line.toLowerCase().includes('recipe:') || 
        lines.indexOf(line) === 0
      );
      recipe.name = nameLine ? 
        nameLine.replace(/recipe:\s*/i, '').replace(/\*\*/g, '').trim() : 
        'Imported Recipe';

      // Find ingredients section
      const ingredientsStart = lines.findIndex(line => 
        line.toLowerCase().includes('ingredients')
      );
      
      const methodStart = lines.findIndex(line => 
        line.toLowerCase().includes('method') || 
        line.toLowerCase().includes('instructions') || 
        line.toLowerCase().includes('directions')
      );

      // Extract ingredients
      if (ingredientsStart > -1) {
        const endIndex = methodStart > -1 ? methodStart : lines.length;
        recipe.ingredients = lines
          .slice(ingredientsStart + 1, endIndex)
          .filter(line => 
            line.length > 2 && 
            !line.toLowerCase().includes('method') &&
            !line.toLowerCase().includes('instructions') &&
            !line.toLowerCase().includes('directions') &&
            (line.match(/\d/) || 
             line.includes('cup') || 
             line.includes('tsp') || 
             line.includes('tbsp') ||
             line.includes('oz') ||
             line.includes('ml') ||
             line.includes('kg') ||
             line.includes('g '))
          )
          .map(line => line.replace(/^[\*\-•]\s*/, '').replace(/^\d+\.?\s*/, '').trim())
          .filter(line => line.length > 0);
      }

      // Extract method
      if (methodStart > -1) {
        recipe.method = lines
          .slice(methodStart + 1)
          .filter(line => line.length > 5 && !line.toLowerCase().includes('ingredients'))
          .map(line => line.replace(/^\d+\.\s*/, '').replace(/^[\*\-•]\s*/, '').trim())
          .filter(line => line.length > 0);
      }

      // Check for new ingredients
      const foundNewIngredients = findNewIngredients(recipe);
      setNewIngredients(foundNewIngredients);
      setVerificationNeeded(foundNewIngredients.length > 0);
      setParsedData(recipe);
      
      console.log('Recipe parsed:', recipe);
      console.log('New ingredients:', foundNewIngredients);
      
    } else {
      // Parse ingredients CSV
      const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
      const data = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        return {
          name: values[headers.indexOf('name')] || values[0] || '',
          category: values[headers.indexOf('category')] || values[1] || 'other',
          unit: values[headers.indexOf('unit')] || values[2] || 'kg',
          cost: parseFloat(values[headers.indexOf('cost')] || values[3]) || 0,
          supplier: values[headers.indexOf('supplier')] || values[4] || '',
          notes: values[headers.indexOf('notes')] || values[5] || ''
        };
      }).filter(item => item.name);
      
      setCsvData(data);
    }
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    
    if (file.type.includes('image')) {
      // OCR processing
      try {
        const result = await Tesseract.recognize(file, 'eng', {
          logger: m => console.log(m)
        });
        parseTextContent(result.data.text);
      } catch (error) {
        console.error('OCR Error:', error);
        alert('Error processing image. Please try paste method instead.');
      }
    } else {
      // CSV processing
      const reader = new FileReader();
      reader.onload = (e) => {
        parseTextContent(e.target.result);
      };
      reader.readAsText(file);
    }
    
    setLoading(false);
  };

  // Handle paste content
  const handlePasteProcess = () => {
    if (pasteContent.trim()) {
      parseTextContent(pasteContent);
    }
  };

  // Handle import completion
  const handleImport = () => {
    try {
      if (type === 'recipes' && parsedData) {
        // Add verification flags to the recipe
        const recipeWithVerification = {
          ...parsedData,
          newIngredientsToVerify: newIngredients,
          ingredientsNeedVerification: verificationNeeded
        };
        onComplete([recipeWithVerification]);
      } else if (type === 'ingredients' && csvData.length > 0) {
        onComplete(csvData);
      } else if (importMethod === 'image' && parsedData) {
        const recipeWithVerification = {
          ...parsedData,
          newIngredientsToVerify: newIngredients,
          ingredientsNeedVerification: verificationNeeded
        };
        onComplete([recipeWithVerification]);
      }
      onClose();
    } catch (error) {
      console.error('Import error:', error);
      alert('Error during import: ' + error.message);
    }
  };

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      // Clear all state when dialog closes
      setImportMethod('');
      setCsvData([]);
      setParsedData(null);
      setPasteContent('');
      setNewIngredients([]);
      setVerificationNeeded(false);
    } else {
      // Force refresh ingredient check when dialog opens
      if (parsedData && type === 'recipes') {
        const foundNewIngredients = findNewIngredients(parsedData);
        setNewIngredients(foundNewIngredients);
        setVerificationNeeded(foundNewIngredients.length > 0);
      }
    }
  }, [isOpen]);

  // Re-check for new ingredients whenever parsedData changes
  useEffect(() => {
    if (parsedData && type === 'recipes') {
      const foundNewIngredients = findNewIngredients(parsedData);
      setNewIngredients(foundNewIngredients);
      setVerificationNeeded(foundNewIngredients.length > 0);
    }
  }, [parsedData, type]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Import {type === 'recipes' ? 'Recipes' : 'Ingredients'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!importMethod && (
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setImportMethod('csv')}
              className="p-6 border-2 border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
            >
              <FileText className="w-12 h-12 mx-auto mb-2 text-gray-600" />
              <p className="font-semibold">CSV File</p>
              <p className="text-sm text-gray-500">Upload a CSV file</p>
            </button>
            
            <button
              onClick={() => setImportMethod('paste')}
              className="p-6 border-2 border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
            >
              <FileText className="w-12 h-12 mx-auto mb-2 text-gray-600" />
              <p className="font-semibold">Paste Text</p>
              <p className="text-sm text-gray-500">Paste formatted text</p>
            </button>
            
            <button
              onClick={() => setImportMethod('image')}
              className="p-6 border-2 border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
            >
              <Image className="w-12 h-12 mx-auto mb-2 text-gray-600" />
              <p className="font-semibold">Image (OCR)</p>
              <p className="text-sm text-gray-500">Upload recipe photo</p>
            </button>
          </div>
        )}

        {importMethod === 'csv' && (
          <div>
            <p className="mb-3 text-sm text-gray-600">
              Upload a CSV file with columns: name, category, unit, cost, supplier
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="mb-4 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {csvData.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Preview: {csvData.length} items</h4>
                <ul className="text-sm space-y-1">
                  {csvData.slice(0, 5).map((item, i) => (
                    <li key={i} className="flex justify-between">
                      <span>{item.name}</span>
                      <span className="text-gray-500">{item.category} - ${item.cost}/{item.unit}</span>
                    </li>
                  ))}
                  {csvData.length > 5 && (
                    <li className="text-gray-500 italic">...and {csvData.length - 5} more</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        {importMethod === 'paste' && (
          <div>
            <p className="mb-3 text-sm text-gray-600">
              {type === 'recipes' 
                ? "Paste a recipe with ingredients and method sections"
                : "Paste CSV data with headers: name, category, unit, cost, supplier"}
            </p>
            <textarea
              value={pasteContent}
              onChange={(e) => setPasteContent(e.target.value)}
              placeholder={type === 'recipes' ? 
                "Paste your recipe here...\n\nExample:\nChicken Parmesan\n\nIngredients:\n2 chicken breasts\n1 cup breadcrumbs\n...\n\nMethod:\n1. Pound chicken flat\n2. Coat in breadcrumbs\n..." : 
                "Paste CSV data here...\n\nname,category,unit,cost,supplier\nTomatoes,Produce,kg,3.50,FreshCo\nBasil,Herbs,bunch,2.00,FreshCo"}
              className="w-full h-48 p-3 border border-gray-300 rounded-lg font-mono text-sm"
            />
            <button
              onClick={handlePasteProcess}
              disabled={!pasteContent.trim()}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            >
              Process Text
            </button>
          </div>
        )}

        {importMethod === 'image' && (
          <div>
            <p className="mb-3 text-sm text-gray-600">
              Upload a photo of a recipe (JPG, PNG). The OCR will extract text automatically.
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="mb-4 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {loading && (
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Processing image with OCR...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                </div>
              </div>
            )}
          </div>
        )}

        {parsedData && type === 'recipes' && (
          <div className="mt-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-3">Recipe Preview</h4>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Name:</span> {parsedData.name}</div>
                <div><span className="font-medium">Category:</span> {parsedData.category}</div>
                <div><span className="font-medium">Servings:</span> {parsedData.servings}</div>
                <div><span className="font-medium">Ingredients:</span> {parsedData.ingredients.length} items</div>
                <div><span className="font-medium">Method Steps:</span> {parsedData.method.length}</div>
              </div>
            </div>
            
            {verificationNeeded && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-yellow-800">New Ingredients Detected</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      The following ingredients are not in your database and will need to be added:
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {newIngredients.map((ing, idx) => (
                        <div key={idx} className="flex items-center text-sm text-yellow-700">
                          <span className="mr-2">•</span>
                          <span>{ing}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-yellow-600 mt-3">
                      After importing, add these ingredients to enable cost calculations.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!verificationNeeded && parsedData.ingredients.length > 0 && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-2" />
                  <p className="text-sm text-green-800">
                    All ingredients are already in your database. Cost calculations will be available.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {(parsedData || csvData.length > 0) && (
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleImport}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-medium"
            >
              {verificationNeeded && <AlertCircle className="w-5 h-5 mr-2" />}
              Import {type === 'recipes' ? 'Recipe' : `${csvData.length} Items`}
              {verificationNeeded && ' (Verification Needed)'}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportWizard;
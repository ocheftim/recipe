// src/utils/recipesExportImport.js
// Updated to remove browser alerts and return proper data

export const exportRecipesToCSV = (recipes, filename = null) => {
  console.log('🚀 Starting export of', recipes.length, 'recipes');
  
  if (!recipes || recipes.length === 0) {
    throw new Error('No recipes to export');
  }

  // Create CSV data with clear headers
  const headers = [
    'Recipe Name',
    'Category',
    'Cuisine',
    'Status',
    'Prep Time (min)',
    'Cook Time (min)',
    'Total Time (min)',
    'Servings',
    'Yield',
    'Description',
    'Instructions',
    'Ingredients',
    'Food Cost',
    'Labor Cost',
    'Total Cost',
    'Menu Price',
    'Profit Margin (%)',
    'Created Date',
    'Last Updated',
    'ID'
  ];

  // Transform recipes to CSV rows
  const csvRows = recipes.map(recipe => [
    recipe.name || '',
    recipe.category || '',
    recipe.cuisine || '',
    recipe.status || '',
    recipe.prepTime || '',
    recipe.cookTime || '',
    recipe.totalTime || '',
    recipe.servings || '',
    recipe.yield || '',
    recipe.description || '',
    // Instructions - join array with semicolons
    Array.isArray(recipe.instructions) ? recipe.instructions.join('; ') : (recipe.instructions || ''),
    // Ingredients - format as "qty unit ingredient; qty unit ingredient"
    Array.isArray(recipe.ingredients) ? 
      recipe.ingredients.map(ing => `${ing.quantity || ''} ${ing.unit || ''} ${ing.ingredient || ''}`).join('; ') :
      (recipe.ingredients || ''),
    recipe.foodCost || '',
    recipe.laborCost || '',
    recipe.totalCost || '',
    recipe.menuPrice || '',
    recipe.profitMargin || '',
    recipe.createdDate || '',
    recipe.lastUpdated || '',
    recipe.id || ''
  ]);

  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...csvRows.map(row => row.map(field => `"${(field + '').replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().slice(0, 16).replace('T', '_').replace(/:/g, '-');
  const exportFilename = filename || `recipes_export_${timestamp}.csv`;

  // Download the file
  downloadFile(csvContent, exportFilename, 'text/csv');
  
  // Return success data instead of showing alert
  return { 
    success: true, 
    filename: exportFilename, 
    count: recipes.length 
  };
};

export const importRecipesFromCSV = (file) => {
  return new Promise((resolve, reject) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      reject(new Error('Please select a CSV file'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target.result;
        const lines = csv.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          reject(new Error('CSV file is empty or has no data rows'));
          return;
        }

        const headers = parseCSVLine(lines[0]);
        const dataLines = lines.slice(1);
        
        const recipes = [];
        const errors = [];

        dataLines.forEach((line, index) => {
          try {
            const values = parseCSVLine(line);
            
            if (values.length < headers.length) {
              errors.push(`Row ${index + 2}: Not enough columns`);
              return;
            }

            const recipe = {};
            headers.forEach((header, i) => {
              const value = values[i] || '';
              
              switch (header.toLowerCase().trim()) {
                case 'recipe name':
                case 'name':
                  recipe.name = value;
                  break;
                case 'category':
                  recipe.category = value;
                  break;
                case 'cuisine':
                  recipe.cuisine = value;
                  break;
                case 'status':
                  recipe.status = value || 'Draft';
                  break;
                case 'prep time (min)':
                case 'prep time':
                  recipe.prepTime = value ? parseInt(value) : 0;
                  break;
                case 'cook time (min)':
                case 'cook time':
                  recipe.cookTime = value ? parseInt(value) : 0;
                  break;
                case 'total time (min)':
                case 'total time':
                  recipe.totalTime = value ? parseInt(value) : 0;
                  break;
                case 'servings':
                  recipe.servings = value ? parseInt(value) : 1;
                  break;
                case 'yield':
                  recipe.yield = value;
                  break;
                case 'description':
                  recipe.description = value;
                  break;
                case 'instructions':
                  // Split by semicolon and clean up
                  recipe.instructions = value ? value.split(';').map(inst => inst.trim()).filter(inst => inst) : [];
                  break;
                case 'ingredients':
                  // Parse "qty unit ingredient; qty unit ingredient" format
                  recipe.ingredients = value ? parseIngredientsList(value) : [];
                  break;
                case 'food cost':
                  recipe.foodCost = value ? parseFloat(value) : 0;
                  break;
                case 'labor cost':
                  recipe.laborCost = value ? parseFloat(value) : 0;
                  break;
                case 'total cost':
                  recipe.totalCost = value ? parseFloat(value) : 0;
                  break;
                case 'menu price':
                  recipe.menuPrice = value ? parseFloat(value) : 0;
                  break;
                case 'profit margin (%)':
                case 'profit margin':
                  recipe.profitMargin = value ? parseFloat(value) : 0;
                  break;
                case 'created date':
                  recipe.createdDate = value || new Date().toISOString().slice(0, 10);
                  break;
                case 'last updated':
                  recipe.lastUpdated = value || new Date().toISOString().slice(0, 10);
                  break;
                case 'id':
                  recipe.id = value || `import_${Date.now()}_${index}`;
                  break;
              }
            });

            if (!recipe.name) {
              errors.push(`Row ${index + 2}: Missing recipe name`);
              return;
            }

            // Set defaults
            recipe.id = recipe.id || `import_${Date.now()}_${index}`;
            recipe.category = recipe.category || 'Uncategorized';
            recipe.status = recipe.status || 'Draft';
            recipe.servings = recipe.servings || 1;
            recipe.createdDate = recipe.createdDate || new Date().toISOString().slice(0, 10);
            recipe.lastUpdated = recipe.lastUpdated || new Date().toISOString().slice(0, 10);
            
            recipes.push(recipe);
          } catch (error) {
            errors.push(`Row ${index + 2}: ${error.message}`);
          }
        });

        resolve({
          recipes,
          errors,
          totalRows: dataLines.length,
          validRows: recipes.length,
          errorRows: errors.length
        });
      } catch (error) {
        reject(new Error(`Failed to parse CSV: ${error.message}`));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

// Helper function to parse CSV line (handles quoted fields)
const parseCSVLine = (line) => {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
};

// Helper function to parse ingredients list
const parseIngredientsList = (ingredientsString) => {
  if (!ingredientsString) return [];
  
  return ingredientsString.split(';').map(ingredientLine => {
    const parts = ingredientLine.trim().split(' ');
    if (parts.length < 2) return null;
    
    const quantity = parts[0];
    const unit = parts[1];
    const ingredient = parts.slice(2).join(' ');
    
    return {
      quantity: quantity,
      unit: unit,
      ingredient: ingredient,
      id: `ing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }).filter(ing => ing && ing.ingredient);
};

// Utility function to download files
const downloadFile = (content, filename, contentType) => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// File picker utility
export const createFileInput = (onFileSelect, accept = '.csv') => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = accept;
  input.style.display = 'none';
  
  input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  });
  
  document.body.appendChild(input);
  input.click();
  document.body.removeChild(input);
};
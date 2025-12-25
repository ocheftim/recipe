// src/utils/ingredientsExportImport.js
// Professional utility functions for ingredients export/import without browser alerts

export const exportIngredientsToCSV = (ingredients, filename = null) => {
  console.log('🚀 Starting export of', ingredients.length, 'ingredients');
  
  if (!ingredients || ingredients.length === 0) {
    throw new Error('No ingredients to export');
  }

  // Create CSV data with clear headers
  const headers = [
    'Ingredient Name',
    'Vendor Name',
    'Category',
    'Subcategory',
    'Unit',
    'AP Cost Per Case',
    'Cost Per Unit',
    'Case Description',
    'Case Quantity',
    'Case Unit',
    'Case Price',
    'Supplier',
    'Storage Location',
    'Minimum Stock',
    'Reorder Point',
    'Max Stock',
    'Stock Level',
    'SKU',
    'Allergens',
    'Dietary Flags',
    'Notes',
    'Last Updated',
    'ID'
  ];

  // Transform ingredients to CSV rows
  const csvRows = ingredients.map(ingredient => [
    ingredient.name || '',
    ingredient.vendorProductName || '',
    ingredient.category || '',
    ingredient.subcategory || '',
    ingredient.unit || '',
    ingredient.apCost || ingredient.apCostPerUnit || '',
    ingredient.costPerUnit || '',
    ingredient.caseDescription || '',
    ingredient.caseQuantity || '',
    ingredient.caseUnit || '',
    ingredient.casePrice || '',
    ingredient.supplier || '',
    ingredient.storageLocation || '',
    ingredient.minimumStock || '',
    ingredient.reorderPoint || '',
    ingredient.maxStock || '',
    ingredient.stock || ingredient.stockLevel || '',
    ingredient.sku || '',
    // Allergens - join array with semicolons
    Array.isArray(ingredient.allergens) ? ingredient.allergens.join('; ') : (ingredient.allergens || ''),
    // Dietary Flags - join array with semicolons
    Array.isArray(ingredient.dietaryFlags) ? ingredient.dietaryFlags.join('; ') : (ingredient.dietaryFlags || ''),
    ingredient.notes || '',
    ingredient.lastUpdated || ingredient.updatedAt || '',
    ingredient.id || ''
  ]);

  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...csvRows.map(row => row.map(field => `"${(field + '').replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().slice(0, 16).replace('T', '_').replace(/:/g, '-');
  const exportFilename = filename || `ingredients_export_${timestamp}.csv`;

  // Download the file
  downloadFile(csvContent, exportFilename, 'text/csv');
  
  // Return success data for professional notifications
  return { 
    success: true, 
    filename: exportFilename, 
    count: ingredients.length 
  };
};

export const importIngredientsFromCSV = (file) => {
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
        
        const ingredients = [];
        const errors = [];

        dataLines.forEach((line, index) => {
          try {
            const values = parseCSVLine(line);
            
            if (values.length < headers.length) {
              errors.push(`Row ${index + 2}: Not enough columns`);
              return;
            }

            const ingredient = {};
            headers.forEach((header, i) => {
              const value = values[i] || '';
              
              switch (header.toLowerCase().trim()) {
                case 'ingredient name':
                case 'name':
                  ingredient.name = value;
                  break;
                case 'vendor name':
                  ingredient.vendorProductName = value;
                  break;
                case 'category':
                  ingredient.category = value;
                  break;
                case 'subcategory':
                  ingredient.subcategory = value;
                  break;
                case 'unit':
                  ingredient.unit = value;
                  break;
                case 'ap cost per case':
                case 'ap cost':
                  ingredient.apCost = value ? parseFloat(value) : 0;
                  ingredient.apCostPerUnit = value ? parseFloat(value) : 0;
                  break;
                case 'cost per unit':
                  ingredient.costPerUnit = value ? parseFloat(value) : 0;
                  break;
                case 'case description':
                  ingredient.caseDescription = value;
                  break;
                case 'case quantity':
                  ingredient.caseQuantity = value;
                  break;
                case 'case unit':
                  ingredient.caseUnit = value;
                  break;
                case 'case price':
                  ingredient.casePrice = value ? parseFloat(value) : 0;
                  break;
                case 'supplier':
                  ingredient.supplier = value;
                  break;
                case 'storage location':
                  ingredient.storageLocation = value;
                  break;
                case 'minimum stock':
                  ingredient.minimumStock = value;
                  break;
                case 'reorder point':
                  ingredient.reorderPoint = value;
                  break;
                case 'max stock':
                  ingredient.maxStock = value;
                  break;
                case 'stock level':
                case 'stock':
                  ingredient.stock = value ? parseInt(value) : 0;
                  ingredient.stockLevel = value ? parseInt(value) : 0;
                  break;
                case 'sku':
                  ingredient.sku = value;
                  break;
                case 'allergens':
                  // Split by semicolon and clean up
                  ingredient.allergens = value ? value.split(';').map(allergen => allergen.trim()).filter(allergen => allergen) : [];
                  break;
                case 'dietary flags':
                  // Split by semicolon and clean up
                  ingredient.dietaryFlags = value ? value.split(';').map(flag => flag.trim()).filter(flag => flag) : [];
                  break;
                case 'notes':
                  ingredient.notes = value;
                  break;
                case 'last updated':
                  ingredient.lastUpdated = value || new Date().toISOString();
                  ingredient.updatedAt = value || new Date().toISOString();
                  break;
                case 'id':
                  ingredient.id = value || `import_${Date.now()}_${index}`;
                  break;
              }
            });

            if (!ingredient.name) {
              errors.push(`Row ${index + 2}: Missing ingredient name`);
              return;
            }

            // Set defaults
            ingredient.id = ingredient.id || `import_${Date.now()}_${index}`;
            ingredient.category = ingredient.category || 'Uncategorized';
            ingredient.subcategory = ingredient.subcategory || 'General';
            ingredient.unit = ingredient.unit || 'each';
            ingredient.lastUpdated = ingredient.lastUpdated || new Date().toISOString();
            ingredient.updatedAt = ingredient.updatedAt || new Date().toISOString();
            
            ingredients.push(ingredient);
          } catch (error) {
            errors.push(`Row ${index + 2}: ${error.message}`);
          }
        });

        resolve({
          ingredients,
          errors,
          totalRows: dataLines.length,
          validRows: ingredients.length,
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
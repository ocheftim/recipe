// src/utils/ingredients/exportImport.js

export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    // Headers row
    headers.join(','),
    // Data rows
    ...data.map(row => 
      headers.map(header => {
        const value = row[header] ?? '';
        // Escape quotes and wrap in quotes if contains comma or quotes
        const stringValue = String(value).replace(/"/g, '""');
        return stringValue.includes(',') || stringValue.includes('"') 
          ? `"${stringValue}"` 
          : stringValue;
      }).join(',')
    )
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const importFromCSV = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const csv = e.target.result;
        const lines = csv.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          reject(new Error('CSV file is empty or has no data'));
          return;
        }

        // Parse headers
        const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
        
        // Parse data rows
        const data = lines.slice(1).map(line => {
          const values = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || [];
          const row = {};
          
          headers.forEach((header, index) => {
            let value = values[index] || '';
            // Remove surrounding quotes and unescape inner quotes
            value = value.trim().replace(/^"|"$/g, '').replace(/""/g, '"');
            row[header] = value;
          });
          
          return row;
        });

        resolve(data);
      } catch (error) {
        reject(new Error(`Failed to parse CSV: ${error.message}`));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
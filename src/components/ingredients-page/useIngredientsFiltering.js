import { useMemo } from 'react';

const useIngredientsFiltering = (ingredients, filters) => {
  return useMemo(() => {
    const { searchTerm, selectedCategory, selectedSupplier, excludedAllergens, sortConfig } = filters;
    
    let filtered = ingredients.filter(ingredient => {
      const matchesSearch = !searchTerm ||
        ingredient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // ENHANCED: Search now includes vendor names since they're shown under ingredient name
        ingredient.vendorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ingredient.vendor?.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesCategory = !selectedCategory || ingredient.category === selectedCategory;
      const matchesSupplier = !selectedSupplier || ingredient.supplierId === parseInt(selectedSupplier);
      const matchesExcludedAllergens = excludedAllergens.length === 0 ||
        excludedAllergens.every(allergen => !ingredient.allergens?.includes(allergen));
        
      return matchesSearch && matchesCategory && matchesSupplier && matchesExcludedAllergens;
    });

    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        const direction = sortConfig.direction === 'asc' ? 1 : -1;

        // Special handling for updatedAtFormatted field (MM/DD/YY dates)
        if (sortConfig.key === 'updatedAtFormatted') {
          // Convert MM/DD/YY format to comparable date for sorting
          const parseDate = (dateStr) => {
            if (!dateStr || dateStr === '-') return new Date(0); // Fallback for missing dates
            
            // Handle MM/DD/YY format
            const parts = dateStr.split('/');
            if (parts.length === 3) {
              const month = parseInt(parts[0]) - 1; // Month is 0-indexed
              const day = parseInt(parts[1]);
              let year = parseInt(parts[2]);
              
              // Convert YY to YYYY (assume 20xx for years 00-99)
              if (year < 100) {
                year += 2000;
              }
              
              return new Date(year, month, day);
            }
            return new Date(0);
          };

          const aDate = parseDate(aVal);
          const bDate = parseDate(bVal);
          return (aDate.getTime() - bDate.getTime()) * direction;
        }
        
        // Special handling for currency/cost fields
        if (sortConfig.key === 'apCost' || sortConfig.key === 'costPerUnit') {
          // Remove currency symbols and convert to numbers
          const cleanVal = (val) => {
            if (typeof val === 'string') {
              return parseFloat(val.replace(/[$,]/g, '')) || 0;
            }
            return parseFloat(val) || 0;
          };
          
          aVal = cleanVal(aVal);
          bVal = cleanVal(bVal);
          return (aVal - bVal) * direction;
        }

        // Handle string sorting with null safety
        if (typeof aVal === 'string' || typeof bVal === 'string') {
          aVal = (aVal || '').toString().toLowerCase();
          bVal = (bVal || '').toString().toLowerCase();
          return aVal.localeCompare(bVal) * direction;
        }

        // Handle numeric sorting with null safety
        aVal = aVal || 0;
        bVal = bVal || 0;
        return (aVal - bVal) * direction;
      });
    }
    
    return filtered;
  }, [ingredients, filters]);
};

export default useIngredientsFiltering;
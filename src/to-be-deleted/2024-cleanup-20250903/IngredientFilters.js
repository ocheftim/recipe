import React from 'react';
import { Search, Filter } from 'lucide-react';
import { CATEGORIES } from '../../constants/ingredients/units';
import { TOQUEWORKS_THEME } from '../../constants/theme';

const IngredientFilters = ({ searchTerm, onSearchChange, selectedCategory, onCategoryChange }) => {
  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <Search size={20} style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search ingredients or suppliers..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={styles.searchInput}
        />
      </div>
      
      <div style={styles.filterContainer}>
        <Filter size={18} style={styles.filterIcon} />
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          style={styles.categorySelect}
        >
          {CATEGORIES.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  searchContainer: {
    flex: 1,
    position: 'relative'
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6C757D'
  },
  searchInput: {
    width: '100%',
    padding: '10px 10px 10px 40px',
    border: '1px solid #DEE2E6',
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'border-color 0.2s',
    '&:focus': {
      outline: 'none',
      borderColor: TOQUEWORKS_THEME.colors.primary
    }
  },
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  filterIcon: {
    color: '#6C757D'
  },
  categorySelect: {
    padding: '10px 16px',
    border: '1px solid #DEE2E6',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: 'white',
    cursor: 'pointer',
    minWidth: '150px',
    transition: 'border-color 0.2s',
    '&:focus': {
      outline: 'none',
      borderColor: TOQUEWORKS_THEME.colors.primary
    }
  }
};

export default IngredientFilters;
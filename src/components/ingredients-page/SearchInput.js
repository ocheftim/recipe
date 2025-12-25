import React from 'react';
import { Search } from 'lucide-react';
import styles from '../ingredients/ingredients.module.css';

const SearchInput = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search ingredients...",
  theme = {}
}) => {
  return (
    <div style={{ position: 'relative', minWidth: '300px', flex: 1, maxWidth: '400px' }}>
      <Search
        size={16}
        style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#9CA3AF',
          zIndex: 1
        }}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.unifiedControl}
        style={{
          width: '100%',
          paddingLeft: '40px',
          justifyContent: 'flex-start'
        }}
      />
    </div>
  );
};

export default SearchInput;
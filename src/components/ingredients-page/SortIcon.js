import React from 'react';
import styles from '../ingredients/ingredients.module.css';

const SortIcon = ({ field, sortConfig }) => {
  // No active sort - show both carets on hover only
  if (sortConfig.key !== field) {
    return (
      <span className={`${styles.sortIcon} ${styles.sortIconHidden}`}>
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 3l4 4H4z"/>
        </svg>
        <svg className="w-3 h-3 -mt-1" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 13L4 9h8z"/>
        </svg>
      </span>
    );
  }

  // Active sort - show single caret based on direction
  const iconClass = `w-4 h-4 ${styles.sortIcon} ${styles.sortIconActive}`;
  
  if (sortConfig.direction === 'asc') {
    return (
      <svg className={iconClass} fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 3l4 4H4z"/>
      </svg>
    );
  } else {
    return (
      <svg className={iconClass} fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 13L4 9h8z"/>
      </svg>
    );
  }
};

export default SortIcon;

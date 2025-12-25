// src/components/recipes/forms/CheckboxGroup.js
import React from 'react';

const CheckboxGroup = ({ 
  label, 
  options = [], 
  selectedValues = [], 
  onChange, 
  required = false, 
  error,
  theme,
  maxHeight = '120px',
  ...props 
}) => {
  const handleCheckboxChange = (option) => {
    const newValues = selectedValues.includes(option)
      ? selectedValues.filter(item => item !== option)
      : [...selectedValues, option];
    onChange(newValues);
  };

  return (
    <div style={{ marginBottom: '12px' }}>
      <label style={{
        display: 'block',
        fontSize: '13px',
        fontWeight: '500',
        color: theme?.gunmetal || '#1F2D38',
        marginBottom: '6px'
      }}>
        {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
      </label>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '6px',
        padding: '8px',
        border: `1px solid ${error ? '#EF4444' : (theme?.silver || '#BBBFC2')}`,
        borderRadius: '4px',
        backgroundColor: theme?.seasalt || '#F6F8F8',
        maxHeight: maxHeight,
        overflowY: 'auto'
      }}>
        {options.map(option => (
          <label key={option} style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '13px',
            color: theme?.charcoal || '#2A3E51',
            padding: '2px 4px'
          }}>
            <input
              type="checkbox"
              checked={selectedValues.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              style={{ marginRight: '6px', flexShrink: 0 }}
            />
            <span style={{ lineHeight: '1.2' }}>{option}</span>
          </label>
        ))}
      </div>
      {error && (
        <span style={{ 
          color: '#EF4444', 
          fontSize: '12px', 
          marginTop: '2px', 
          display: 'block' 
        }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default CheckboxGroup;
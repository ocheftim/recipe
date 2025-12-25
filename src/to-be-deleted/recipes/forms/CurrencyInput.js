// src/components/recipes/forms/CurrencyInput.js
import React from 'react';
import { formatCurrencyInput } from '../../../utils/formatters';

const CurrencyInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  error,
  theme,
  ...props 
}) => {
  const handleChange = (e) => {
    const formattedValue = formatCurrencyInput(e.target.value);
    onChange(formattedValue);
  };

  return (
    <div style={{ marginBottom: '12px' }}>
      <label style={{
        display: 'block',
        fontSize: '13px',
        fontWeight: '500',
        color: theme?.gunmetal || '#1F2D38',
        marginBottom: '4px'
      }}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '6px 10px',
          border: `1px solid ${error ? '#EF4444' : (theme?.silver || '#BBBFC2')}`,
          borderRadius: '4px',
          fontSize: '14px',
          backgroundColor: theme?.white || '#FFFFFF'
        }}
        {...props}
      />
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

export default CurrencyInput;
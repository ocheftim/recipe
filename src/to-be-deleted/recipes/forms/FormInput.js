// src/components/recipes/forms/FormInput.js
import React from 'react';

const FormInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = 'text', 
  required = false, 
  error,
  theme,
  ...props 
}) => {
  return (
    <div style={{ marginBottom: '12px' }}>
      <label style={{
        display: 'block',
        fontSize: '13px',
        fontWeight: '500',
        color: theme?.gunmetal || '#1F2D38',
        marginBottom: '4px'
      }}>
        {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
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

export default FormInput;
// src/components/common/Dropdown.js
import React from 'react';
import { THEME } from '../../constants/theme';

export const Dropdown = ({ trigger, isOpen, onToggle, children }) => {
  return (
    <div className="relative">
      <div onClick={onToggle}>
        {trigger}
      </div>
      
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={onToggle}
          />
          <div 
            className="absolute right-0 mt-1 bg-white border rounded-md shadow-lg z-20"
            style={{ borderColor: THEME.silver }}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
};
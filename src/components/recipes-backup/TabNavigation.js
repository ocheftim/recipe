// src/components/recipes/TabNavigation.js

import React from 'react';
import PropTypes from 'prop-types';

const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6">
        <nav className="flex space-x-8">
          {/* Recipe List Tab */}
          <button
            onClick={() => onTabChange('list')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'list'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            style={{ 
              borderColor: activeTab === 'list' ? '#8AC732' : 'transparent',
              color: activeTab === 'list' ? '#8AC732' : undefined
            }}
          >
            Recipe List
          </button>
          
          {/* Image Import Tab */}
          <button
            onClick={() => onTabChange('image-import')}
            data-action="import-image"
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'image-import'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            style={{ 
              borderColor: activeTab === 'image-import' ? '#8AC732' : 'transparent',
              color: activeTab === 'image-import' ? '#8AC732' : undefined
            }}
          >
            <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
            Import from Image
          </button>
        </nav>
      </div>
    </div>
  );
};

// PropTypes validation
TabNavigation.propTypes = {
  activeTab: PropTypes.oneOf(['list', 'image-import']).isRequired,
  onTabChange: PropTypes.func.isRequired
};

export default TabNavigation;
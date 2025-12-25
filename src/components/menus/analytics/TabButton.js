// src/components/menus/analytics/TabButton.js
import React from 'react';

const TabButton = ({ tabId, label, icon: Icon, activeTab, onTabClick }) => (
  <button
    onClick={() => onTabClick(tabId)}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
      activeTab === tabId
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </button>
);

export default TabButton;

// src/components/menus/MenuDesignerModal.js - REFACTORED
import React, { useState } from 'react';
import { X, Save, Eye, Layout, Type, Palette, Image } from 'lucide-react';
import { useMenuDesign } from '../../hooks/menus/useMenuDesign';
import LayoutTab from './designer/LayoutTab';
import TypographyTab from './designer/TypographyTab';
import ColorsTab from './designer/ColorsTab';
import ImagesTab from './designer/ImagesTab';

const MenuDesignerModal = ({ isOpen, menu, onClose, onSave, getRecipeById }) => {
  const [activeTab, setActiveTab] = useState('layout');
  const { designConfig, updateDesignConfig, resetDesignConfig } = useMenuDesign(menu);

  if (!isOpen) return null;

  const tabs = [
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'images', label: 'Images', icon: Image },
  ];

  const handleSave = () => {
    const updatedMenu = {
      ...menu,
      designConfig
    };
    onSave(updatedMenu);
    onClose();
  };

  const handlePreview = () => {
    // Open preview in new window/tab
    console.log('Preview menu with design:', designConfig);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'layout':
        return <LayoutTab designConfig={designConfig} updateDesignConfig={updateDesignConfig} />;
      case 'typography':
        return <TypographyTab designConfig={designConfig} updateDesignConfig={updateDesignConfig} />;
      case 'colors':
        return <ColorsTab designConfig={designConfig} updateDesignConfig={updateDesignConfig} />;
      case 'images':
        return <ImagesTab designConfig={designConfig} updateDesignConfig={updateDesignConfig} />;
      default:
        return <LayoutTab designConfig={designConfig} updateDesignConfig={updateDesignConfig} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Menu Designer</h2>
            <p className="text-gray-600">{menu?.name || 'Customize Menu Design'}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePreview}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
            >
              <Eye size={16} />
              <span>Preview</span>
            </button>
            <button
              onClick={resetDesignConfig}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Save size={16} />
              <span>Save Design</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default MenuDesignerModal;

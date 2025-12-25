// src/components/menus/MenuPrintModal.js
import React, { useState } from 'react';
import { X, Printer, Download, FileText, Image, Globe, Share2, Settings } from 'lucide-react';
import { BUTTON_STYLES, INPUT_STYLES } from '../../constants/menuConstants';

const MenuPrintModal = ({ 
  isOpen, 
  menu,
  onClose,
  getRecipeById 
}) => {
  const [exportFormat, setExportFormat] = useState('pdf'); // pdf, image, html, txt
  const [printOptions, setPrintOptions] = useState({
    paperSize: 'letter', // letter, a4, tabloid, legal
    orientation: 'portrait', // portrait, landscape
    margins: 'normal', // normal, narrow, wide
    includeImages: false,
    includePrices: true,
    includeDescriptions: true,
    includeDietaryInfo: true,
    includeNutrition: false,
    colorMode: 'color', // color, grayscale, blackwhite
    copies: 1,
    quality: 'high' // draft, normal, high
  });

  const [deliveryMethod, setDeliveryMethod] = useState('download'); // download, email, print, share

  const updatePrintOption = (key, value) => {
    setPrintOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // ✅ Format options
  const formatOptions = [
    { 
      id: 'pdf', 
      name: 'PDF Document', 
      icon: FileText, 
      description: 'High-quality printable format',
      recommended: true 
    },
    { 
      id: 'image', 
      name: 'Image (PNG)', 
      icon: Image, 
      description: 'For social media or web display' 
    },
    { 
      id: 'html', 
      name: 'Web Page', 
      icon: Globe, 
      description: 'Interactive web format' 
    },
    { 
      id: 'txt', 
      name: 'Plain Text', 
      icon: FileText, 
      description: 'Simple text format' 
    }
  ];

  // ✅ Paper size options
  const paperSizes = [
    { id: 'letter', name: 'Letter (8.5" × 11")', common: true },
    { id: 'a4', name: 'A4 (210 × 297 mm)', common: true },
    { id: 'tabloid', name: 'Tabloid (11" × 17")' },
    { id: 'legal', name: 'Legal (8.5" × 14")' },
    { id: 'a3', name: 'A3 (297 × 420 mm)' }
  ];

  // ✅ Preview component
  const MenuPreview = () => {
    if (!menu) return null;

    const getMenuWithRecipes = () => {
      return {
        ...menu,
        sections: menu.sections.map(section => ({
          ...section,
          items: section.items.map(item => ({
            ...item,
            recipe: getRecipeById(item.recipeId)
          }))
        }))
      };
    };

    const menuWithRecipes = getMenuWithRecipes();

    return (
      <div className={`bg-white p-8 shadow-lg ${
        printOptions.orientation === 'landscape' ? 'landscape' : 'portrait'
      } ${printOptions.colorMode === 'grayscale' ? 'grayscale' : ''}`}>
        {/* Header */}
        <div className="text-center mb-8 border-b-2 border-gray-800 pb-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Restaurant</h1>
          <p className="text-lg text-gray-600 italic">Fine Dining Experience</p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">{menu.name}</h2>
        </div>

        {/* Menu Sections */}
        <div className={`grid gap-8 ${printOptions.orientation === 'landscape' ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {menuWithRecipes.sections.map(section => (
            <div key={section.name} className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 border-b border-gray-400 pb-2 mb-4">
                {section.name}
              </h3>
              <div className="space-y-4">
                {section.items.map(item => (
                  <div key={item.recipeId} className="border-b border-gray-200 pb-3">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {item.recipe?.name}
                      </h4>
                      {printOptions.includePrices && (
                        <span className="font-bold text-gray-900 text-lg">
                          ${item.menuPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    {printOptions.includeDescriptions && (
                      <p className="text-gray-700 text-sm leading-relaxed mb-2">
                        {item.description}
                      </p>
                    )}
                    
                    <div className="flex justify-between items-center text-xs">
                      {printOptions.includeDietaryInfo && item.recipe?.dietary?.length > 0 && (
                        <div className="flex gap-2">
                          {item.recipe.dietary.map(diet => (
                            <span key={diet} className="bg-gray-200 text-gray-800 px-2 py-1 rounded">
                              {diet}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {printOptions.includeNutrition && (
                        <span className="text-gray-600">
                          {item.recipe?.calories || 'N/A'} cal | Prep: {item.recipe?.prepTime || 'N/A'}min
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-300 text-center text-sm text-gray-600">
          <p>123 Restaurant Street • (555) 123-4567 • www.yourrestaurant.com</p>
          <p className="mt-1">Menu prices subject to change • Please inform us of any allergies</p>
        </div>
      </div>
    );
  };

  const handleExport = () => {
    console.log('Exporting menu:', {
      menu: menu.name,
      format: exportFormat,
      options: printOptions,
      delivery: deliveryMethod
    });

    // Simulate export process
    if (deliveryMethod === 'download') {
      console.log('Starting download...');
    } else if (deliveryMethod === 'print') {
      console.log('Sending to printer...');
      window.print?.();
    } else if (deliveryMethod === 'email') {
      console.log('Sending via email...');
    } else if (deliveryMethod === 'share') {
      console.log('Generating share link...');
    }

    onClose();
  };

  if (!isOpen || !menu) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex">
        {/* ✅ Left Panel - Export Options */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-lg mr-3">
                <Printer className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Export Menu</h2>
                <p className="text-sm text-gray-600">Print or share "{menu.name}"</p>
              </div>
            </div>
          </div>

          {/* Export Format */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Format</h3>
            <div className="space-y-3">
              {formatOptions.map(format => {
                const IconComponent = format.icon;
                return (
                  <label key={format.id} className="flex items-start cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value={format.id}
                      checked={exportFormat === format.id}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="mt-1 mr-3"
                    />
                    <div className="flex items-start">
                      <IconComponent size={20} className="text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">{format.name}</span>
                          {format.recommended && (
                            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{format.description}</p>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Print Options */}
          <div className="flex-1 overflow-y-auto p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Options</h3>
            
            <div className="space-y-6">
              {/* Paper Settings */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Paper Settings</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Paper Size</label>
                    <select
                      value={printOptions.paperSize}
                      onChange={(e) => updatePrintOption('paperSize', e.target.value)}
                      className={INPUT_STYLES.base}
                    >
                      {paperSizes.map(size => (
                        <option key={size.id} value={size.id}>
                          {size.name} {size.common ? '(Common)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Orientation</label>
                    <select
                      value={printOptions.orientation}
                      onChange={(e) => updatePrintOption('orientation', e.target.value)}
                      className={INPUT_STYLES.base}
                    >
                      <option value="portrait">Portrait</option>
                      <option value="landscape">Landscape</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Margins</label>
                    <select
                      value={printOptions.margins}
                      onChange={(e) => updatePrintOption('margins', e.target.value)}
                      className={INPUT_STYLES.base}
                    >
                      <option value="narrow">Narrow (0.5")</option>
                      <option value="normal">Normal (1")</option>
                      <option value="wide">Wide (1.5")</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Content Options */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Content</h4>
                <div className="space-y-2">
                  {[
                    { key: 'includePrices', label: 'Include Prices' },
                    { key: 'includeDescriptions', label: 'Include Descriptions' },
                    { key: 'includeDietaryInfo', label: 'Include Dietary Information' },
                    { key: 'includeNutrition', label: 'Include Nutrition Info' },
                    { key: 'includeImages', label: 'Include Images (if available)' }
                  ].map(option => (
                    <label key={option.key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={printOptions[option.key]}
                        onChange={(e) => updatePrintOption(option.key, e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Quality Settings */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Quality</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Color Mode</label>
                    <select
                      value={printOptions.colorMode}
                      onChange={(e) => updatePrintOption('colorMode', e.target.value)}
                      className={INPUT_STYLES.base}
                    >
                      <option value="color">Full Color</option>
                      <option value="grayscale">Grayscale</option>
                      <option value="blackwhite">Black & White</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Print Quality</label>
                    <select
                      value={printOptions.quality}
                      onChange={(e) => updatePrintOption('quality', e.target.value)}
                      className={INPUT_STYLES.base}
                    >
                      <option value="draft">Draft (Fast)</option>
                      <option value="normal">Normal</option>
                      <option value="high">High Quality</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Number of Copies</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={printOptions.copies}
                      onChange={(e) => updatePrintOption('copies', parseInt(e.target.value))}
                      className={INPUT_STYLES.base}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Method */}
          <div className="p-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Method</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { id: 'download', label: 'Download', icon: Download },
                { id: 'print', label: 'Print Now', icon: Printer },
                { id: 'email', label: 'Email', icon: FileText },
                { id: 'share', label: 'Share Link', icon: Share2 }
              ].map(method => {
                const IconComponent = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setDeliveryMethod(method.id)}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      deliveryMethod === method.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent size={20} className="mx-auto mb-1" />
                    <div className="text-xs font-medium">{method.label}</div>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <button
                onClick={onClose}
                className={BUTTON_STYLES.secondary + " flex-1"}
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                className={BUTTON_STYLES.primary + " flex-1"}
              >
                {deliveryMethod === 'download' ? 'Download' :
                 deliveryMethod === 'print' ? 'Print' :
                 deliveryMethod === 'email' ? 'Email' : 'Share'}
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Right Panel - Preview */}
        <div className="flex-1 flex flex-col">
          {/* Preview Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Print Preview</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {exportFormat.toUpperCase()} • {printOptions.paperSize.toUpperCase()} • {printOptions.orientation}
            </p>
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-auto p-6 bg-gray-100">
            <div className={`mx-auto shadow-lg ${
              printOptions.paperSize === 'letter' ? 'max-w-2xl' :
              printOptions.paperSize === 'a4' ? 'max-w-2xl' :
              printOptions.paperSize === 'tabloid' ? 'max-w-4xl' : 'max-w-2xl'
            }`}>
              <MenuPreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPrintModal;
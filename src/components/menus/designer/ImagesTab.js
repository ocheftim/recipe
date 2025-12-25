// src/components/menus/designer/ImagesTab.js
import React from 'react';
import { Image, Camera, Eye, EyeOff } from 'lucide-react';

const ImagesTab = ({ designConfig, updateDesignConfig }) => {
  const { images } = designConfig;

  const imageSizes = [
    { id: 'small', name: 'Small', description: '64x64px' },
    { id: 'medium', name: 'Medium', description: '128x128px' },
    { id: 'large', name: 'Large', description: '200x200px' }
  ];

  const imagePositions = [
    { id: 'left', name: 'Left', description: 'Image on the left side' },
    { id: 'right', name: 'Right', description: 'Image on the right side' },
    { id: 'top', name: 'Top', description: 'Image above text' },
    { id: 'background', name: 'Background', description: 'Image as background' }
  ];

  const handleImageChange = (field, value) => {
    updateDesignConfig('images', { [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Show Images Toggle */}
      <div>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={images.showImages}
            onChange={(e) => handleImageChange('showImages', e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <div className="flex items-center space-x-2">
            {images.showImages ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            <span className="font-medium">Show Recipe Images</span>
          </div>
        </label>
        <p className="text-sm text-gray-600 mt-1 ml-8">
          Display images alongside menu items
        </p>
      </div>

      {images.showImages && (
        <>
          {/* Image Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Camera className="inline w-4 h-4 mr-2" />
              Image Size
            </label>
            <div className="grid grid-cols-1 gap-3">
              {imageSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => handleImageChange('imageSize', size.id)}
                  className={`p-3 border-2 rounded-lg text-left transition-colors ${
                    images.imageSize === size.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{size.name}</div>
                      <div className="text-sm text-gray-600">{size.description}</div>
                    </div>
                    <div
                      className={`border-2 border-gray-300 bg-gray-100 ${
                        size.id === 'small' ? 'w-8 h-8' :
                        size.id === 'medium' ? 'w-12 h-12' : 'w-16 h-16'
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Image Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Image Position
            </label>
            <div className="grid grid-cols-1 gap-3">
              {imagePositions.map((position) => (
                <button
                  key={position.id}
                  onClick={() => handleImageChange('imagePosition', position.id)}
                  className={`p-3 border-2 rounded-lg text-left transition-colors ${
                    images.imagePosition === position.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{position.name}</div>
                  <div className="text-sm text-gray-600">{position.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Placeholder Images */}
          <div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={images.placeholder}
                onChange={(e) => handleImageChange('placeholder', e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <span className="font-medium">Use Placeholder Images</span>
                <p className="text-sm text-gray-600">
                  Show placeholder images for items without photos
                </p>
              </div>
            </label>
          </div>

          {/* Image Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Preview
            </label>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className={`flex items-center space-x-4 ${
                images.imagePosition === 'top' ? 'flex-col items-start space-x-0 space-y-2' :
                images.imagePosition === 'right' ? 'flex-row-reverse' : ''
              }`}>
                <div
                  className={`bg-gray-300 border border-gray-400 flex items-center justify-center ${
                    images.imageSize === 'small' ? 'w-16 h-16' :
                    images.imageSize === 'medium' ? 'w-24 h-24' : 'w-32 h-32'
                  }`}
                >
                  <Image className="text-gray-500" size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Sample Menu Item</h4>
                  <p className="text-sm text-gray-600">
                    This is how images will appear with your selected settings.
                  </p>
                  <p className="text-sm font-medium text-green-600 mt-1">$12.99</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImagesTab;

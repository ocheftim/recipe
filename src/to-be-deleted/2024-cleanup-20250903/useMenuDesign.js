// src/hooks/menus/useMenuDesign.js
import { useState } from 'react';

export const useMenuDesign = (initialMenu) => {
  const [designConfig, setDesignConfig] = useState({
    layout: {
      template: 'classic',
      columns: 2,
      spacing: 'normal',
      showPrices: true,
      showDescriptions: true,
      showDietary: true
    },
    typography: {
      headerFont: 'serif',
      bodyFont: 'sans-serif',
      headerSize: 'large',
      bodySize: 'medium',
      headerColor: '#1f2937',
      bodyColor: '#4b5563'
    },
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937'
    },
    images: {
      showImages: true,
      imageSize: 'medium',
      imagePosition: 'left',
      placeholder: true
    }
  });

  const updateDesignConfig = (section, updates) => {
    setDesignConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...updates
      }
    }));
  };

  const resetDesignConfig = () => {
    setDesignConfig({
      layout: {
        template: 'classic',
        columns: 2,
        spacing: 'normal',
        showPrices: true,
        showDescriptions: true,
        showDietary: true
      },
      typography: {
        headerFont: 'serif',
        bodyFont: 'sans-serif',
        headerSize: 'large',
        bodySize: 'medium',
        headerColor: '#1f2937',
        bodyColor: '#4b5563'
      },
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#f59e0b',
        background: '#ffffff',
        text: '#1f2937'
      },
      images: {
        showImages: true,
        imageSize: 'medium',
        imagePosition: 'left',
        placeholder: true
      }
    });
  };

  return {
    designConfig,
    updateDesignConfig,
    resetDesignConfig,
  };
};

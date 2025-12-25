// src/hooks/recipes/useCustomizeModal.js
import { useState } from 'react';

export const useCustomizeModal = (customOptions, updateCustomOptions) => {
  const [customizeModal, setCustomizeModal] = useState({
    isOpen: false,
    type: '',
    title: '',
    items: [],
    originalItems: []
  });

  const handleCustomize = (type) => {
    const typeMapping = {
      category: { title: 'Categories', items: customOptions.category },
      cuisine: { title: 'Cuisines', items: customOptions.cuisine },
      outlet: { title: 'Outlets', items: customOptions.outlet },
      status: { title: 'Statuses', items: customOptions.status },
      yieldUnit: { title: 'Yield Units', items: customOptions.yieldUnit },
    };

    const config = typeMapping[type];
    if (!config) {
      console.error(`Unknown customize type: ${type}`);
      return;
    }

    setCustomizeModal({
      isOpen: true,
      type,
      title: config.title,
      items: [...config.items],
      originalItems: [...config.items]
    });
  };

  const handleCustomizeSave = (newItems) => {
    updateCustomOptions(customizeModal.type, newItems);
    setCustomizeModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleCustomizeCancel = () => {
    setCustomizeModal(prev => ({ ...prev, isOpen: false }));
  };

  return {
    customizeModal,
    handleCustomize,
    handleCustomizeSave,
    handleCustomizeCancel,
  };
};

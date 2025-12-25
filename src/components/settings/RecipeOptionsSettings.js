import React, { useState, useEffect } from 'react';
import { Plus, RotateCcw, GripVertical, Eye, EyeOff, Save, X, Trash2 } from 'lucide-react';
import { getRecipeOptions, saveRecipeOptions, resetToDefaults, getDefaultOptions } from '../../services/recipeOptionsService';

const RecipeOptionsSettings = ({ theme }) => {
  const [options, setOptions] = useState({});
  const [originalOptions, setOriginalOptions] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [addingTo, setAddingTo] = useState(null);
  const [addValue, setAddValue] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  const convertFromServiceFormat = (serviceOptions) => {
    const componentOptions = {};
    Object.entries(serviceOptions).forEach(([category, items]) => {
      if (!Array.isArray(items)) {
        componentOptions[category] = [];
        return;
      }
      
      componentOptions[category] = items.map((item, index) => {
        let itemName = '';
        
        if (typeof item === 'string') {
          itemName = item;
        } else if (typeof item === 'object' && item !== null) {
          itemName = item.name || item.label || item.value || item.id || JSON.stringify(item);
        } else {
          itemName = String(item);
        }
        
        return {
          id: `${category}-${index}-${Date.now()}-${Math.random()}`,
          name: itemName,
          visible: true,
          order: index
        };
      });
    });
    return componentOptions;
  };

  const convertToServiceFormat = (componentOptions) => {
    const serviceOptions = {};
    Object.entries(componentOptions).forEach(([category, items]) => {
      serviceOptions[category] = items
        .filter(item => item.visible)
        .sort((a, b) => a.order - b.order)
        .map(item => item.name);
    });
    return serviceOptions;
  };

  useEffect(() => {
    const serviceOptions = getRecipeOptions();
    const componentOptions = convertFromServiceFormat(serviceOptions);
    setOptions(componentOptions);
    setOriginalOptions(JSON.parse(JSON.stringify(componentOptions)));
  }, []);

  useEffect(() => {
    const currentServiceFormat = convertToServiceFormat(options);
    const originalServiceFormat = convertToServiceFormat(originalOptions);
    const hasChangesNow = JSON.stringify(currentServiceFormat) !== JSON.stringify(originalServiceFormat);
    setHasChanges(hasChangesNow);
  }, [options, originalOptions]);

  const handleSave = async () => {
    setSaveStatus('saving');
    
    try {
      const serviceFormat = convertToServiceFormat(options);
      const success = saveRecipeOptions(serviceFormat);
      
      if (success) {
        setOriginalOptions(JSON.parse(JSON.stringify(options)));
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus(''), 2000);
      } else {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus(''), 3000);
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all recipe options to defaults? This will remove any custom additions.')) {
      try {
        resetToDefaults();
        const defaultServiceOptions = getDefaultOptions();
        const defaultComponentOptions = convertFromServiceFormat(defaultServiceOptions);
        
        setOptions(defaultComponentOptions);
        setOriginalOptions(JSON.parse(JSON.stringify(defaultComponentOptions)));
        setHasChanges(false);
        
        setTimeout(() => {
          setSaveStatus('saved');
          setTimeout(() => setSaveStatus(''), 2000);
        }, 100);
      } catch (error) {
        console.error('Reset error:', error);
        setSaveStatus('error');
        setTimeout(() => setSaveStatus(''), 3000);
      }
    }
  };

  const handleAddItem = (category) => {
    if (!addValue.trim()) return;
    
    const newItem = {
      id: `${category}-${Date.now()}`,
      name: addValue.trim(),
      visible: true,
      order: options[category]?.length || 0
    };
    
    setOptions(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), newItem]
    }));
    
    setAddValue('');
    setAddingTo(null);
  };

  const handleRemoveItem = (category, itemId) => {
    setOptions(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== itemId)
    }));
  };

  const handleToggleVisibility = (category, itemId) => {
    setOptions(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        item.id === itemId 
          ? { ...item, visible: !item.visible }
          : item
      )
    }));
  };

  const handleEditItem = (category, itemId, newName) => {
    if (!newName.trim()) return;
    
    setOptions(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        item.id === itemId 
          ? { ...item, name: newName.trim() }
          : item
      )
    }));
  };

  const handleDragStart = (e, category, item) => {
    setDraggedItem({ category, item });
  };

  const handleDragOver = (e, category, item) => {
    e.preventDefault();
    setDragOverItem({ category, item });
  };

  const handleDrop = (e, targetCategory, targetItem) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.category !== targetCategory) return;
    
    const items = [...options[targetCategory]];
    const draggedIndex = items.findIndex(item => item.id === draggedItem.item.id);
    const targetIndex = items.findIndex(item => item.id === targetItem.id);
    
    if (draggedIndex === targetIndex) return;
    
    const [removed] = items.splice(draggedIndex, 1);
    items.splice(targetIndex, 0, removed);
    
    items.forEach((item, index) => {
      item.order = index;
    });
    
    setOptions(prev => ({
      ...prev,
      [targetCategory]: items
    }));
    
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const getSaveButtonStyle = () => {
    const baseStyle = {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s'
    };

    switch (saveStatus) {
      case 'saving':
        return { ...baseStyle, backgroundColor: '#9CA3AF', color: '#FFFFFF' };
      case 'saved':
        return { ...baseStyle, backgroundColor: theme?.green || '#10B981', color: '#FFFFFF' };
      case 'error':
        return { ...baseStyle, backgroundColor: theme?.cardinal || '#EF4444', color: '#FFFFFF' };
      default:
        return { 
          ...baseStyle, 
          backgroundColor: hasChanges ? (theme?.yellowGreen || '#8AC732') : '#E5E7EB',
          color: hasChanges ? '#FFFFFF' : '#9CA3AF'
        };
    }
  };

  const renderCategory = (categoryKey, categoryLabel) => {
    const items = options[categoryKey] || [];
    
    return (
      <div key={categoryKey} style={{
        marginBottom: '24px',
        border: `1px solid ${theme?.silver || '#BBBFC2'}`,
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <div style={{
          backgroundColor: theme?.seasalt || '#F6F8F8',
          padding: '16px 20px',
          borderBottom: `1px solid ${theme?.silver || '#BBBFC2'}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: '600',
            color: theme?.gunmetal || '#1F2D38'
          }}>
            {categoryLabel} ({items.filter(item => item.visible).length} visible)
          </h3>
          
          <button
            onClick={() => setAddingTo(categoryKey)}
            style={{
              padding: '6px 12px',
              backgroundColor: theme?.yellowGreen || '#8AC732',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Plus size={14} />
            Add {categoryLabel.slice(0, -1)}
          </button>
        </div>

        {addingTo === categoryKey && (
          <div style={{
            padding: '16px 20px',
            backgroundColor: '#f8f9fa',
            borderBottom: `1px solid ${theme?.silver || '#BBBFC2'}`,
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}>
            <input
              type="text"
              value={addValue}
              onChange={(e) => setAddValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem(categoryKey)}
              placeholder={`Enter new ${categoryLabel.slice(0, -1).toLowerCase()}`}
              autoFocus
              style={{
                flex: 1,
                padding: '6px 10px',
                border: `1px solid ${theme?.silver || '#BBBFC2'}`,
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
            <button
              onClick={() => handleAddItem(categoryKey)}
              disabled={!addValue.trim()}
              style={{
                padding: '6px 12px',
                backgroundColor: theme?.yellowGreen || '#8AC732',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                fontSize: '13px',
                cursor: addValue.trim() ? 'pointer' : 'not-allowed',
                opacity: addValue.trim() ? 1 : 0.5
              }}
            >
              Add
            </button>
            <button
              onClick={() => {
                setAddingTo(null);
                setAddValue('');
              }}
              style={{
                padding: '6px',
                backgroundColor: 'transparent',
                color: theme?.charcoal || '#2A3E51',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              <X size={14} />
            </button>
          </div>
        )}

        <div style={{ padding: '12px' }}>
          {items.length === 0 ? (
            <div style={{
              textAlign: 'center',
              color: theme?.dimGray || '#6B7280',
              padding: '20px',
              fontStyle: 'italic'
            }}>
              No {categoryLabel.toLowerCase()} defined
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '8px'
            }}>
              {items
                .sort((a, b) => a.order - b.order)
                .map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, categoryKey, item)}
                  onDragOver={(e) => handleDragOver(e, categoryKey, item)}
                  onDrop={(e) => handleDrop(e, categoryKey, item)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 8px',
                    backgroundColor: item.visible ? '#FFFFFF' : '#F3F4F6',
                    border: `1px solid ${item.visible ? (theme?.silver || '#BBBFC2') : '#D1D5DB'}`,
                    borderRadius: '6px',
                    cursor: 'grab',
                    opacity: item.visible ? 1 : 0.7,
                    minHeight: '40px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '16px',
                    height: '16px',
                    flexShrink: 0
                  }}>
                    <GripVertical size={14} style={{ color: theme?.dimGray || '#6B7280' }} />
                  </div>
                  
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleEditItem(categoryKey, item.id, e.target.value)}
                    style={{
                      flex: 1,
                      border: 'none',
                      backgroundColor: 'transparent',
                      fontSize: '13px',
                      color: theme?.charcoal || '#2A3E51',
                      outline: 'none',
                      minWidth: 0
                    }}
                  />
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    flexShrink: 0
                  }}>
                    <button
                      onClick={() => handleToggleVisibility(categoryKey, item.id)}
                      style={{
                        padding: '4px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: item.visible ? (theme?.green || '#10B981') : (theme?.dimGray || '#6B7280'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px',
                        borderRadius: '3px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#f3f4f6';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      {item.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                    
                    <button
                      onClick={() => handleRemoveItem(categoryKey, item.id)}
                      style={{
                        padding: '4px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: theme?.cardinal || '#EF4444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px',
                        borderRadius: '3px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#fee2e2';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: `2px solid ${theme?.seasalt || '#F6F8F8'}`
      }}>
        <div>
          <h2 style={{
            margin: '0 0 4px 0',
            fontSize: '20px',
            fontWeight: '600',
            color: theme?.gunmetal || '#1F2D38'
          }}>
            Recipe Options
          </h2>
          <p style={{
            margin: 0,
            color: theme?.charcoal || '#2A3E51',
            fontSize: '14px'
          }}>
            Configure categories, cuisines, outlets, and other recipe options
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleResetToDefaults}
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: theme?.charcoal || '#2A3E51',
              border: `1px solid ${theme?.silver || '#BBBFC2'}`,
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <RotateCcw size={16} />
            Reset to Defaults
          </button>

          <button
            onClick={handleSave}
            disabled={!hasChanges || saveStatus === 'saving'}
            style={getSaveButtonStyle()}
          >
            <Save size={16} />
            {saveStatus === 'saving' && 'Saving...'}
            {saveStatus === 'saved' && 'Saved!'}
            {saveStatus === 'error' && 'Save Failed'}
            {!saveStatus && (hasChanges ? 'Save Changes' : 'No Changes')}
          </button>
        </div>
      </div>

      {renderCategory('categories', 'Categories')}
      {renderCategory('cuisines', 'Cuisines')}
      {renderCategory('outlets', 'Outlets')}
      {renderCategory('menus', 'Menus')}
      {renderCategory('yieldUnits', 'Yield Units')}
      {renderCategory('dietary', 'Dietary Options')}

      {hasChanges && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '12px 16px',
          backgroundColor: theme?.yellowGreen || '#8AC732',
          color: '#FFFFFF',
          borderRadius: '6px',
          fontSize: '14px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000
        }}>
          You have unsaved changes
        </div>
      )}
    </div>
  );
};

export default RecipeOptionsSettings;
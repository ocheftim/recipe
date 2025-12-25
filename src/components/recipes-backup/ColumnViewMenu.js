import React from 'react';
import { COLUMN_CONFIG } from '../../config/recipesConfig';

// Enhanced ColumnViewMenu Component with Smart Positioning
const ColumnViewMenuComponent = ({
  visibleColumns,
  setVisibleColumns,
  hoveredButton,
  setHoveredButton,
  columnOrder,
  setColumnOrder,
  theme
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownPosition, setDropdownPosition] = React.useState('above');
  const dropdownRef = React.useRef(null);
  const buttonRef = React.useRef(null);

  // Calculate optimal dropdown position
  React.useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = 400; // max height of dropdown
      
      // Check if there's enough space above
      const spaceAbove = buttonRect.top;
      const spaceBelow = viewportHeight - buttonRect.bottom;
      
      // Use 'below' if there's more space below or not enough space above
      if (spaceBelow > spaceAbove || spaceAbove < dropdownHeight + 10) {
        setDropdownPosition('below');
      } else {
        setDropdownPosition('above');
      }
    }
  }, [isOpen]);

  // Reset scroll position when dropdown opens
  React.useEffect(() => {
    if (isOpen && dropdownRef.current) {
      dropdownRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  // Get columns in current order
  const getOrderedColumns = () => {
    const configColumns = Object.keys(COLUMN_CONFIG);
    let finalColumnOrder = configColumns;
    
    if (columnOrder && Array.isArray(columnOrder) && columnOrder.length > 0) {
      const uniqueProvided = [...new Set(columnOrder)];
      const missingColumns = configColumns.filter(col => !uniqueProvided.includes(col));
      finalColumnOrder = [...uniqueProvided, ...missingColumns];
      finalColumnOrder = finalColumnOrder.filter(col => COLUMN_CONFIG[col]);
    }
    
    const columns = finalColumnOrder.map(key => ({
      key,
      label: COLUMN_CONFIG[key]?.label || key,
      required: key === 'name'
    }));
    
    return columns;
  };

  const moveColumn = (columnKey, direction) => {
    const configColumns = Object.keys(COLUMN_CONFIG);
    let currentOrder = configColumns;
    
    if (columnOrder && Array.isArray(columnOrder) && columnOrder.length > 0) {
      const uniqueProvided = [...new Set(columnOrder)];
      const missingColumns = configColumns.filter(col => !uniqueProvided.includes(col));
      currentOrder = [...uniqueProvided, ...missingColumns].filter(col => COLUMN_CONFIG[col]);
    }
    
    const currentIndex = currentOrder.indexOf(columnKey);
    if (currentIndex === -1) return;

    const newOrder = [...currentOrder];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex >= 0 && targetIndex < newOrder.length) {
      [newOrder[currentIndex], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[currentIndex]];
      setColumnOrder(newOrder);
    }
  };

  if (!isOpen) {
    return (
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
        style={{
          padding: '4px 8px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#FFFFFF',
          fontSize: '13px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
      >
        <span style={{ fontSize: '16px' }}>☷</span>
        Columns
      </button>
    );
  }

  const orderedColumns = getOrderedColumns();

  // Determine dropdown style based on position
  const dropdownStyle = {
    position: 'absolute',
    right: 0,
    backgroundColor: theme.white || '#FFFFFF',
    border: `1px solid ${theme.silver || '#BBBFC2'}`,
    borderRadius: '4px',
    padding: '8px',
    minWidth: '250px',
    maxHeight: '400px',
    overflowY: 'auto',
    zIndex: 9999,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    ...(dropdownPosition === 'above' 
      ? { bottom: '100%', marginBottom: '4px' }
      : { top: '100%', marginTop: '4px' }
    )
  };

  return (
    <div style={{
      position: 'relative',
      display: 'inline-block'
    }}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(false)}
        style={{
          padding: '4px 8px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#FFFFFF',
          fontSize: '13px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
      >
        <span style={{ fontSize: '16px' }}>☷</span>
        View Columns
      </button>
      
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9998
        }}
        onClick={() => setIsOpen(false)}
      />
      
      <div 
        ref={dropdownRef}
        style={dropdownStyle}
      >
        <div style={{ 
          fontSize: '13px', 
          fontWeight: '600', 
          marginBottom: '8px', 
          color: theme.gunmetal || '#1F2D38',
          position: 'sticky',
          top: 0,
          backgroundColor: theme.white || '#FFFFFF',
          paddingBottom: '4px',
          borderBottom: `1px solid ${theme.seasalt || '#F6F8F8'}`
        }}>
          Column Organization ({orderedColumns.length} columns)
        </div>
        
        <div style={{ paddingTop: '4px' }}>
          {orderedColumns.map((column, index) => (
            <div key={column.key} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '4px 0',
              fontSize: '13px',
              backgroundColor: index % 2 === 0 ? 'transparent' : theme.seasalt || '#F6F8F8',
              borderRadius: '2px',
              paddingLeft: '4px',
              paddingRight: '4px'
            }}>
              <input
                type="checkbox"
                checked={visibleColumns?.[column.key] !== false}
                onChange={(e) => setVisibleColumns && setVisibleColumns(prev => ({
                  ...prev,
                  [column.key]: e.target.checked
                }))}
                disabled={column.required}
                style={{ marginRight: '8px' }}
              />
              
              <span style={{
                color: theme.charcoal || '#2A3E51',
                fontStyle: column.required ? 'italic' : 'normal',
                flex: 1
              }}>
                {column.label}
              </span>
              
              <div style={{ display: 'flex', gap: '4px', marginLeft: '8px' }}>
                <button
                  onClick={() => moveColumn(column.key, 'up')}
                  disabled={index === 0}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: index === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: index === 0 ? theme.silver || '#BBBFC2' : theme.charcoal || '#2A3E51',
                    padding: '2px 4px'
                  }}
                  title="Move Left"
                >
                  ˂
                </button>
                <button
                  onClick={() => moveColumn(column.key, 'down')}
                  disabled={index === orderedColumns.length - 1}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: index === orderedColumns.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: index === orderedColumns.length - 1 ? theme.silver || '#BBBFC2' : theme.charcoal || '#2A3E51',
                    padding: '2px 4px'
                  }}
                  title="Move Right"
                >
                  ˃
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ 
          marginTop: '8px', 
          paddingTop: '8px', 
          borderTop: `1px solid ${theme.seasalt || '#F6F8F8'}`,
          position: 'sticky',
          bottom: 0,
          backgroundColor: theme.white || '#FFFFFF'
        }}>
          <button
            onClick={() => {
              const defaultOrder = Object.keys(COLUMN_CONFIG);
              setColumnOrder(defaultOrder);
            }}
            style={{
              width: '100%',
              padding: '4px 8px',
              backgroundColor: theme.yellowGreen || '#8AC732',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Reset Column Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnViewMenuComponent;
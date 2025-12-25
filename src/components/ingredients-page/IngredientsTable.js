import React from 'react';
import ColumnViewMenu from '../recipes/ColumnViewMenu';
import { COLUMN_CONFIG, FIELD_WIDTHS } from '../../config/ingredientsConfig';

// ActionsDropdown Component
const ActionsDropdown = ({ ingredient, setEditingIngredient, onDelete, onCopy, theme }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleEdit = () => {
    setEditingIngredient && setEditingIngredient(ingredient);
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete && onDelete(ingredient.id);
    setIsOpen(false);
  };

  const handleCopy = () => {
    onCopy && onCopy(ingredient);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '6px 10px',
          backgroundColor: 'transparent',
          color: theme.charcoal || '#2A3E51',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: '500'
        }}
      >
        ⋯
      </button>
      {isOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999
            }}
            onClick={() => setIsOpen(false)}
          />
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            backgroundColor: theme.white || '#FFFFFF',
            border: `1px solid ${theme.silver || '#BBBFC2'}`,
            borderRadius: '4px',
            minWidth: '120px',
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}>
            <button
              onClick={handleEdit}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 12px',
                backgroundColor: 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '13px',
                color: theme.charcoal || '#2A3E51',
                borderBottom: `1px solid ${theme.seasalt || '#F6F8F8'}`
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = theme.seasalt || '#F6F8F8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Edit
            </button>
            <button
              onClick={handleCopy}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 12px',
                backgroundColor: 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '13px',
                color: theme.charcoal || '#2A3E51',
                borderBottom: `1px solid ${theme.seasalt || '#F6F8F8'}`
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = theme.seasalt || '#F6F8F8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Copy
            </button>
            <button
              onClick={handleDelete}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 12px',
                backgroundColor: 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#dc2626'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = theme.seasalt || '#F6F8F8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Replace your existing ColumnViewMenuComponent with this:

// Compact Modal-Style ColumnViewMenu Component with Drag & Drop for IngredientsTable
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
  const [draggedItem, setDraggedItem] = React.useState(null);
  const [dragOverItem, setDragOverItem] = React.useState(null);

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

  // Drag and drop handlers
  const handleDragStart = (e, columnKey) => {
    setDraggedItem(columnKey);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, columnKey) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItem(columnKey);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e, targetColumnKey) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetColumnKey) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const configColumns = Object.keys(COLUMN_CONFIG);
    let currentOrder = configColumns;

    if (columnOrder && Array.isArray(columnOrder) && columnOrder.length > 0) {
      const uniqueProvided = [...new Set(columnOrder)];
      const missingColumns = configColumns.filter(col => !uniqueProvided.includes(col));
      currentOrder = [...uniqueProvided, ...missingColumns].filter(col => COLUMN_CONFIG[col]);
    }

    const draggedIndex = currentOrder.indexOf(draggedItem);
    const targetIndex = currentOrder.indexOf(targetColumnKey);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newOrder = [...currentOrder];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedItem);

    setColumnOrder(newOrder);
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const orderedColumns = getOrderedColumns();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '4px 8px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#6b7280', // CHANGED from '#FFFFFF' to gray text
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

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50000,
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            width: '100%',
            maxWidth: '400px',
            maxHeight: '70vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '16px 20px 12px 20px',
              borderBottom: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h2 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1F2937',
                margin: 0
              }}>
                Column Organization
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px',
                  color: '#6B7280',
                  fontSize: '18px',
                  lineHeight: '1'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div style={{
              padding: '12px 20px',
              overflowY: 'auto',
              flex: 1
            }}>
              <p style={{
                fontSize: '13px',
                color: '#6B7280',
                margin: '0 0 12px 0'
              }}>
                Drag to reorder columns, check to show/hide. Changes apply immediately.
              </p>

              <div>
                {orderedColumns.map((column, index) => (
                  <div
                    key={column.key}
                    draggable={!column.required}
                    onDragStart={(e) => handleDragStart(e, column.key)}
                    onDragOver={(e) => handleDragOver(e, column.key)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, column.key)}
                    onDragEnd={handleDragEnd}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 12px',
                      backgroundColor: dragOverItem === column.key ? '#EBF8FF' : 
                                     draggedItem === column.key ? '#F3F4F6' :
                                     index % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                      borderRadius: '4px',
                      marginBottom: '2px',
                      border: dragOverItem === column.key ? '2px dashed #3B82F6' : '1px solid #F3F4F6',
                      cursor: column.required ? 'default' : 'grab',
                      opacity: draggedItem === column.key ? 0.5 : 1,
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!draggedItem && dragOverItem !== column.key) {
                        e.target.style.backgroundColor = '#F3F4F6';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!draggedItem && dragOverItem !== column.key) {
                        e.target.style.backgroundColor = index % 2 === 0 ? '#FFFFFF' : '#F9FAFB';
                      }
                    }}
                  >
                    {/* Drag Handle */}
                    <div style={{
                      marginRight: '10px',
                      color: column.required ? '#D1D5DB' : '#9CA3AF',
                      fontSize: '14px',
                      cursor: column.required ? 'not-allowed' : 'grab',
                      userSelect: 'none',
                      width: '16px',
                      textAlign: 'center'
                    }}>
                      {column.required ? '○' : '⋮⋮'}
                    </div>

                    <input
                      type="checkbox"
                      checked={visibleColumns?.[column.key] !== false}
                      onChange={(e) => setVisibleColumns && setVisibleColumns(prev => ({
                        ...prev,
                        [column.key]: e.target.checked
                      }))}
                      disabled={column.required}
                      style={{
                        marginRight: '10px',
                        cursor: column.required ? 'not-allowed' : 'pointer'
                      }}
                    />

                    <span style={{
                      fontSize: '14px',
                      color: column.required ? '#9CA3AF' : '#374151',
                      fontStyle: column.required ? 'italic' : 'normal',
                      flex: 1,
                      fontWeight: column.required ? '400' : '500',
                      userSelect: 'none'
                    }}>
                      {column.label}
                      {column.required && (
                        <span style={{
                          fontSize: '12px',
                          color: '#9CA3AF',
                          marginLeft: '6px'
                        }}>
                          (Required)
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '12px 20px 16px 20px',
              borderTop: '1px solid #E5E7EB',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px'
            }}>
              <button
                onClick={() => {
                  const defaultOrder = Object.keys(COLUMN_CONFIG);
                  setColumnOrder(defaultOrder);
                }}
                style={{
                  padding: '6px 14px',
                  backgroundColor: '#F3F4F6',
                  color: '#374151',
                  border: '1px solid #D1D5DB',
                  borderRadius: '5px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#E5E7EB';
                  e.target.style.borderColor = '#9CA3AF';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#F3F4F6';
                  e.target.style.borderColor = '#D1D5DB';
                }}
              >
                Reset to Default
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '6px 20px',
                  backgroundColor: '#10B981',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#10B981'}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const IngredientsTable = ({
  ingredients = [],
  suppliers = [],
  setEditingIngredient,
  onDelete,
  onCopy,
  onShowCostHistory,
  sortConfig,
  onSort,
  visibleColumns,
  columnOrder,
  setVisibleColumns,
  setColumnOrder,
  hoveredButton,
  setHoveredButton,
  theme = {}
}) => {
  // ✅ ADDED: State for tracking hovered column header
  const [hoveredColumn, setHoveredColumn] = React.useState(null);

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  // ✅ ENHANCED: 3-way sort function
  const handle3WaySort = (columnKey) => {
    const config = COLUMN_CONFIG[columnKey];
    if (!config?.sortable || !onSort) return;

    let newDirection = null;
    if (sortConfig?.key === columnKey) {
      // Cycle through: asc → desc → none
      if (sortConfig.direction === 'asc') {
        newDirection = 'desc';
      } else if (sortConfig.direction === 'desc') {
        newDirection = null; // Clear sorting
      } else {
        newDirection = 'asc';
      }
    } else {
      // New column, start with asc
      newDirection = 'asc';
    }

    onSort(columnKey, newDirection);
  };

  // ✅ ENHANCED: Get sort caret with hover state (spaced chevrons, consistent positioning)
  const getSortCaret = (columnKey, isHovered = false) => {
    const config = COLUMN_CONFIG[columnKey];
    if (!config?.sortable) return null;

    const containerStyle = {
      marginLeft: '6px',
      display: 'inline-block',
      width: '14px',
      textAlign: 'center',
      verticalAlign: 'middle'
    };

    const chevronStyle = {
      fontSize: '14px',
      fontWeight: 'bold',
      lineHeight: '12px',
      display: 'block'
    };

    // Show both carets on hover (stacked vertically with space)
    if (isHovered && sortConfig?.key !== columnKey) {
      return (
        <span style={{...containerStyle, opacity: 0.6}}>
          <div style={chevronStyle}>∧</div>
          <div style={{...chevronStyle, marginTop: '2px'}}>∨</div>
        </span>
      );
    }

    // Show current sort state in same position as when stacked
    if (sortConfig?.key === columnKey) {
      if (sortConfig.direction === 'asc') {
        return (
          <span style={containerStyle}>
            <div style={chevronStyle}>∧</div>
            <div style={{...chevronStyle, opacity: 0, marginTop: '2px'}}>∨</div>
          </span>
        );
      }
      if (sortConfig.direction === 'desc') {
        return (
          <span style={containerStyle}>
            <div style={{...chevronStyle, opacity: 0}}>∧</div>
            <div style={{...chevronStyle, marginTop: '2px'}}>∨</div>
          </span>
        );
      }
    }

    return null;
  };

  // Function to render column value based on key
  const renderColumnValue = (ingredient, columnKey) => {
    switch (columnKey) {
      case 'name':
        return (
          <div>
            <div
              style={{
                fontWeight: '500',
                color: theme.gunmetal || '#1F2D38',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
              onClick={() => setEditingIngredient(ingredient)}
            >
              {ingredient.name || 'Unnamed Ingredient'}
            </div>
            {ingredient.sku && (
              <div style={{ fontSize: '12px', color: '#2A3E51', marginTop: '2px' }}>
                SKU: {ingredient.sku}
              </div>
            )}
          </div>
        );
      case 'supplier':
        return ingredient.supplier || ingredient.vendor || ingredient.vendorName || '-';
      case 'category':
        return ingredient.category || '-';
      case 'apCost':
        return formatCurrency(ingredient.apCost || ingredient.casePrice || ingredient.ap?.casePrice);
      case 'costPerUnit':
        // Format as $0.30/each including the unit
        const cost = ingredient.costPerUnit || ingredient.apUnitCost || ingredient.cost || ingredient.unitCost;
        const unit = ingredient.caseUnit || ingredient.primaryRecipeUnit || ingredient.unit || 'each';
        return cost ? `${formatCurrency(cost)}/${unit}` : '-';
      case 'allergens':
        return ingredient.allergens?.length > 0 ?
          ingredient.allergens.slice(0, 2).map(allergen => allergen.charAt(0).toUpperCase()).join(', ') +
          (ingredient.allergens.length > 2 ? '...' : '') :
          'None';
      case 'updatedAtFormatted':
        return ingredient.updatedAtFormatted || '-';
      case 'stock':
        return ingredient.cases !== undefined ?
          `${ingredient.cases} ${ingredient.cases === 1 ? 'case' : 'cases'}` :
          ingredient.stock || '-';
      default:
        return ingredient[columnKey] || '-';
    }
  };

  // Function to get column alignment
  const getColumnAlignment = (columnKey) => {
    const config = COLUMN_CONFIG[columnKey];
    if (!config) return 'left';
    if (config.align === 'right') return 'flex-end';
    if (config.align === 'center') return 'center';
    return 'flex-start';
  };

  // Function to get text alignment
  const getTextAlignment = (columnKey) => {
    const config = COLUMN_CONFIG[columnKey];
    return config?.align || 'left';
  };

  // ✅ ENHANCED: Use columnOrder for rendering
  const getVisibleColumns = () => {
    return columnOrder.filter(columnKey =>
      COLUMN_CONFIG[columnKey] && visibleColumns?.[columnKey] !== false
    );
  };

  const visibleColumnKeys = getVisibleColumns();
  
  // Calculate total table width based on visible columns
  const totalTableWidth = visibleColumnKeys.reduce((total, columnKey) => {
    return total + parseInt(FIELD_WIDTHS[columnKey] || '100px');
  }, parseInt(FIELD_WIDTHS.actions)); // Add actions column width

  return (
    <div style={{
      backgroundColor: theme.white || '#FFFFFF',
      overflow: 'hidden',
      width: '100%',
      minWidth: `${totalTableWidth}px`
    }}>
      {/* Header - CHANGED TO LIGHT GRAY LIKE RCA */}
      <div style={{
        display: 'flex',
        backgroundColor: '#f3f4f6', // CHANGED from '#2A3E51' to light gray
        color: '#6b7280', // CHANGED from white to gray text
        fontWeight: '600',
        fontSize: '15px',
        alignItems: 'center',
        minWidth: `${totalTableWidth}px`
      }}>
        {/* ✅ ENHANCED: Render columns in order with 3-way sorting and hover */}
        {visibleColumnKeys.map(columnKey => {
          const config = COLUMN_CONFIG[columnKey];
          const isHovered = hoveredColumn === columnKey;
          return (
            <div
              key={columnKey}
              style={{
                width: FIELD_WIDTHS[columnKey],
                minWidth: FIELD_WIDTHS[columnKey],
                padding: columnKey === 'costPerUnit' ? '8px 20px 8px 16px' : '8px 16px',
                textAlign: config.align === 'right' ? 'right' : config.align === 'center' ? 'center' : 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: getColumnAlignment(columnKey),
                height: '40px',
                cursor: config.sortable ? 'pointer' : 'default',
                userSelect: 'none',
                transition: 'background-color 0.2s'
              }}
              onClick={() => handle3WaySort(columnKey)}
              onMouseEnter={() => config.sortable && setHoveredColumn(columnKey)}
              onMouseLeave={() => setHoveredColumn(null)}
              title={config.sortable ? 'Click to sort (3-way)' : ''}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                {config.label}
                {getSortCaret(columnKey, isHovered)}
              </span>
            </div>
          );
        })}
        {/* Actions - Centered */}
        <div style={{
          width: FIELD_WIDTHS.actions,
          minWidth: FIELD_WIDTHS.actions,
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '40px'
        }}>
          <span>Actions</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ 
        maxHeight: '400px', 
        overflow: 'auto',
        minWidth: `${totalTableWidth}px`
      }}>
        {ingredients.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: theme.silver || '#BBBFC2'
          }}>
            <p style={{ fontSize: '18px', margin: 0 }}>No ingredients found</p>
            <p style={{ fontSize: '15px', margin: '8px 0 0 0' }}>
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          ingredients.map((ingredient, index) => (
            <div
              key={ingredient.id || index}
              style={{
                display: 'flex',
                backgroundColor: index % 2 === 0 ? theme.white || '#FFFFFF' : theme.seasalt || '#F6F8F8',
                cursor: 'pointer',
                alignItems: 'center',
                fontSize: '14px',
                height: '40px',
                minWidth: `${totalTableWidth}px`
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.teaGreen || '#C0E095'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? theme.white || '#FFFFFF' : theme.seasalt || '#F6F8F8'}
            >
              {/* ✅ ENHANCED: Render columns in order */}
              {visibleColumnKeys.map(columnKey => {
                const config = COLUMN_CONFIG[columnKey];
                const value = renderColumnValue(ingredient, columnKey);
                const isUpdatedColumn = columnKey === 'updatedAtFormatted';
                return (
                  <div
                    key={columnKey}
                    style={{
                      width: FIELD_WIDTHS[columnKey],
                      minWidth: FIELD_WIDTHS[columnKey],
                      padding: columnKey === 'costPerUnit' ? '8px 20px 8px 16px' : '8px 16px',
                      color: theme.charcoal || '#2A3E51',
                      textAlign: getTextAlignment(columnKey),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: getColumnAlignment(columnKey),
                      height: '40px',
                      fontWeight: 'normal'
                    }}
                  >
                    {value}
                  </div>
                );
              })}
              {/* Actions - CENTERED */}
              <div style={{
                width: FIELD_WIDTHS.actions,
                minWidth: FIELD_WIDTHS.actions,
                padding: '8px 16px',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '40px'
              }}>
                <ActionsDropdown
                  ingredient={ingredient}
                  setEditingIngredient={setEditingIngredient}
                  onDelete={onDelete}
                  onCopy={onCopy}
                  theme={theme}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Table Footer - CHANGED TO LIGHT GRAY LIKE RCA */}
      <div style={{
        backgroundColor: '#f3f4f6', // CHANGED from '#2A3E51' to light gray
        padding: '8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '13px',
        color: '#6b7280', // CHANGED from '#FFFFFF' to gray text
        height: '40px',
        minWidth: `${totalTableWidth}px`
      }}>
        {/* Left: Allergen Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontWeight: '600' }}>Allergen Key:</span>
          <span>D=Dairy</span>
          <span>E=Eggs</span>
          <span>F=Fish</span>
          <span>G=Gluten</span>
          <span>N=Nuts</span>
          <span>S=Soy</span>
          <span>Sh=Shellfish</span>
        </div>
        {/* Right: Column View Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ColumnViewMenuComponent
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            hoveredButton={hoveredButton}
            setHoveredButton={setHoveredButton}
            columnOrder={columnOrder}
            setColumnOrder={setColumnOrder}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};

export default IngredientsTable;
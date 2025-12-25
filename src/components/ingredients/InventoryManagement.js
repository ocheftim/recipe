// src/components/ingredients/InventoryManagement.js - Styled to Match MenusPage Design
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TOQUEWORKS_THEME = {
  gunmetal: '#1F2D38',
  charcoal: '#2A3E51',
  silver: '#BBBFC2',
  yellowGreen: '#8AC732',
  teaGreen: '#C0E095',
  seasalt: '#F6F8F8',
  white: '#FFFFFF',
  green: '#10B981',
  red: '#EF4444',
  orange: '#F59E0B',
  lightGray: '#E5E7EB',
  dimGray: '#6B7280'
};

const InventoryManagement = ({ ingredients = [], onUpdateInventory }) => {
  const [inventoryData, setInventoryData] = useState({});
  const [filter, setFilter] = useState('all'); // all, low-stock, over-stock, out-of-stock
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

  // Load inventory data on mount
  useEffect(() => {
    const stored = localStorage.getItem('toqueworks_inventory');
    if (stored) {
      setInventoryData(JSON.parse(stored));
    } else {
      // Initialize with zero stock for all ingredients
      const initialInventory = {};
      ingredients.forEach(ing => {
        initialInventory[ing.id] = {
          currentStock: 0,
          lastUpdated: null,
          notes: ''
        };
      });
      setInventoryData(initialInventory);
    }
  }, [ingredients]);

  // Save inventory data
  const saveInventory = (data) => {
    localStorage.setItem('toqueworks_inventory', JSON.stringify(data));
    setInventoryData(data);
    if (onUpdateInventory) {
      onUpdateInventory(data);
    }
  };

  // Update stock level
  const updateStock = (ingredientId, newStock) => {
    const updated = {
      ...inventoryData,
      [ingredientId]: {
        ...inventoryData[ingredientId],
        currentStock: parseFloat(newStock) || 0,
        lastUpdated: new Date().toISOString()
      }
    };
    saveInventory(updated);
  };

  // Quick stock adjustment
  const adjustStock = (ingredientId, adjustment) => {
    const current = inventoryData[ingredientId]?.currentStock || 0;
    const newStock = Math.max(0, current + adjustment);
    updateStock(ingredientId, newStock);
  };

  // Get stock status
  const getStockStatus = (ingredient) => {
    const stock = inventoryData[ingredient.id]?.currentStock || 0;
    const min = ingredient.minStock || 0;
    const max = ingredient.maxStock || Infinity;

    if (stock === 0) return 'out-of-stock';
    if (stock < min) return 'low-stock';
    if (max !== Infinity && stock > max) return 'over-stock';
    return 'in-stock';
  };

  // Filter ingredients
  const filteredIngredients = ingredients.filter(ing => {
    const matchesSearch = ing.name.toLowerCase().includes(searchTerm.toLowerCase());
    const status = getStockStatus(ing);
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'low-stock') return matchesSearch && status === 'low-stock';
    if (filter === 'over-stock') return matchesSearch && status === 'over-stock';
    if (filter === 'out-of-stock') return matchesSearch && status === 'out-of-stock';
    return matchesSearch;
  });

  // Sort ingredients
  const sortedIngredients = [...filteredIngredients].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'stock') {
      const stockA = inventoryData[a.id]?.currentStock || 0;
      const stockB = inventoryData[b.id]?.currentStock || 0;
      return stockB - stockA;
    }
    if (sortBy === 'status') {
      return getStockStatus(a).localeCompare(getStockStatus(b));
    }
    return 0;
  });

  // Calculate stats
  const stats = {
    total: ingredients.length,
    inStock: ingredients.filter(ing => getStockStatus(ing) === 'in-stock').length,
    lowStock: ingredients.filter(ing => getStockStatus(ing) === 'low-stock').length,
    outOfStock: ingredients.filter(ing => getStockStatus(ing) === 'out-of-stock').length,
    overStock: ingredients.filter(ing => getStockStatus(ing) === 'over-stock').length,
    totalValue: ingredients.reduce((sum, ing) => {
      const stock = inventoryData[ing.id]?.currentStock || 0;
      return sum + (stock * (ing.costPerUnit || 0));
    }, 0)
  };

  // Export inventory data
  const exportInventory = () => {
    const exportData = ingredients.map(ing => ({
      name: ing.name,
      category: ing.category,
      currentStock: inventoryData[ing.id]?.currentStock || 0,
      unit: ing.unit,
      minStock: ing.minStock || '',
      maxStock: ing.maxStock || '',
      costPerUnit: ing.costPerUnit,
      totalValue: (inventoryData[ing.id]?.currentStock || 0) * (ing.costPerUnit || 0),
      status: getStockStatus(ing),
      lastUpdated: inventoryData[ing.id]?.lastUpdated || ''
    }));

    const csv = [
      Object.keys(exportData[0]).join(','),
      ...exportData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div style={{
      padding: '24px',
      backgroundColor: TOQUEWORKS_THEME.seasalt,
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          color: TOQUEWORKS_THEME.gunmetal,
          margin: '0 0 4px 0'
        }}>
          Inventory Management
        </h1>
        <p style={{
          fontSize: '14px',
          color: TOQUEWORKS_THEME.charcoal,
          margin: 0
        }}>
          Monitor stock levels, par values, and reorder points
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          backgroundColor: TOQUEWORKS_THEME.white,
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '13px', color: TOQUEWORKS_THEME.dimGray, marginBottom: '4px' }}>
                Total Items
              </p>
              <p style={{ fontSize: '24px', fontWeight: '700', color: TOQUEWORKS_THEME.gunmetal }}>
                {stats.total}
              </p>
            </div>
            <span style={{ fontSize: '28px', color: TOQUEWORKS_THEME.yellowGreen }}>📦</span>
          </div>
        </div>

        <div style={{
          backgroundColor: TOQUEWORKS_THEME.white,
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '13px', color: TOQUEWORKS_THEME.dimGray, marginBottom: '4px' }}>
                In Stock
              </p>
              <p style={{ fontSize: '24px', fontWeight: '700', color: TOQUEWORKS_THEME.gunmetal }}>
                {stats.inStock}
              </p>
            </div>
            <span style={{ fontSize: '28px', color: TOQUEWORKS_THEME.green }}>✓</span>
          </div>
        </div>

        <div style={{
          backgroundColor: TOQUEWORKS_THEME.white,
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '13px', color: TOQUEWORKS_THEME.dimGray, marginBottom: '4px' }}>
                Low Stock
              </p>
              <p style={{ fontSize: '24px', fontWeight: '700', color: TOQUEWORKS_THEME.gunmetal }}>
                {stats.lowStock}
              </p>
            </div>
            <span style={{ fontSize: '28px', color: TOQUEWORKS_THEME.orange }}>⚠️</span>
          </div>
        </div>

        <div style={{
          backgroundColor: TOQUEWORKS_THEME.white,
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '13px', color: TOQUEWORKS_THEME.dimGray, marginBottom: '4px' }}>
                Out of Stock
              </p>
              <p style={{ fontSize: '24px', fontWeight: '700', color: TOQUEWORKS_THEME.gunmetal }}>
                {stats.outOfStock}
              </p>
            </div>
            <span style={{ fontSize: '28px', color: TOQUEWORKS_THEME.red }}>⚫</span>
          </div>
        </div>

        <div style={{
          backgroundColor: TOQUEWORKS_THEME.white,
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '13px', color: TOQUEWORKS_THEME.dimGray, marginBottom: '4px' }}>
                Total Value
              </p>
              <p style={{ fontSize: '24px', fontWeight: '700', color: TOQUEWORKS_THEME.yellowGreen }}>
                ${stats.totalValue.toFixed(2)}
              </p>
            </div>
            <span style={{ fontSize: '28px' }}>💰</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        backgroundColor: TOQUEWORKS_THEME.white,
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: '1 1 300px',
              padding: '10px 12px',
              border: `1px solid ${TOQUEWORKS_THEME.lightGray}`,
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '10px 12px',
              border: `1px solid ${TOQUEWORKS_THEME.lightGray}`,
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: TOQUEWORKS_THEME.white
            }}
          >
            <option value="all">All Items</option>
            <option value="low-stock">Low Stock</option>
            <option value="over-stock">Over Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '10px 12px',
              border: `1px solid ${TOQUEWORKS_THEME.lightGray}`,
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: TOQUEWORKS_THEME.white
            }}
          >
            <option value="name">Sort by Name</option>
            <option value="stock">Sort by Stock</option>
            <option value="status">Sort by Status</option>
          </select>

          <button
            onClick={exportInventory}
            style={{
              padding: '10px 16px',
              backgroundColor: TOQUEWORKS_THEME.white,
              color: TOQUEWORKS_THEME.charcoal,
              border: `1px solid ${TOQUEWORKS_THEME.lightGray}`,
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = TOQUEWORKS_THEME.seasalt}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = TOQUEWORKS_THEME.white}
          >
            <span>📥</span>
            Export CSV
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div style={{
        backgroundColor: TOQUEWORKS_THEME.white,
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: TOQUEWORKS_THEME.seasalt }}>
              <th style={{
                padding: '12px 16px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: TOQUEWORKS_THEME.gunmetal,
                borderBottom: `1px solid ${TOQUEWORKS_THEME.lightGray}`
              }}>
                Ingredient
              </th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: TOQUEWORKS_THEME.gunmetal,
                borderBottom: `1px solid ${TOQUEWORKS_THEME.lightGray}`
              }}>
                Current Stock
              </th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: TOQUEWORKS_THEME.gunmetal,
                borderBottom: `1px solid ${TOQUEWORKS_THEME.lightGray}`
              }}>
                Min/Max
              </th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: TOQUEWORKS_THEME.gunmetal,
                borderBottom: `1px solid ${TOQUEWORKS_THEME.lightGray}`
              }}>
                Status
              </th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'right',
                fontSize: '14px',
                fontWeight: '600',
                color: TOQUEWORKS_THEME.gunmetal,
                borderBottom: `1px solid ${TOQUEWORKS_THEME.lightGray}`
              }}>
                Value
              </th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: TOQUEWORKS_THEME.gunmetal,
                borderBottom: `1px solid ${TOQUEWORKS_THEME.lightGray}`
              }}>
                Quick Adjust
              </th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: TOQUEWORKS_THEME.gunmetal,
                borderBottom: `1px solid ${TOQUEWORKS_THEME.lightGray}`
              }}>
                Last Updated
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedIngredients.map((ingredient, index) => {
              const stock = inventoryData[ingredient.id]?.currentStock || 0;
              const status = getStockStatus(ingredient);
              const value = stock * (ingredient.costPerUnit || 0);
              const lastUpdated = inventoryData[ingredient.id]?.lastUpdated;

              return (
                <tr key={ingredient.id} 
                    style={{
                      backgroundColor: index % 2 === 0 ? TOQUEWORKS_THEME.white : TOQUEWORKS_THEME.seasalt,
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = TOQUEWORKS_THEME.teaGreen + '10'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? TOQUEWORKS_THEME.white : TOQUEWORKS_THEME.seasalt}
                >
                  <td style={{
                    padding: '12px 16px',
                    borderBottom: `1px solid ${TOQUEWORKS_THEME.lightGray}`
                  }}>
                    <div>
                      <div style={{
                        fontWeight: '500',
                        color: TOQUEWORKS_THEME.gunmetal,
                        fontSize: '14px'
                      }}>
                        {ingredient.name}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: TOQUEWORKS_THEME.dimGray,
                        marginTop: '2px'
                      }}>
                        {ingredient.category} • {ingredient.unit}
                      </div>
                    </div>
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    textAlign: 'center',
                    borderBottom: `1px solid ${TOQUEWORKS_THEME.lightGray}`
                  }}>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => updateStock(ingredient.id, e.target.value)}
                      style={{
                        width: '80px',
                        padding: '6px 8px',
                        border: `1px solid ${TOQUEWORKS_THEME.lightGray}`,
                        borderRadius: '6px',
                        textAlign: 'center',
                        fontSize: '14px'
                      }}
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    textAlign: 'center',
                    fontSize: '13px',
                    color: TOQUEWORKS_THEME.dimGray,
                    borderBottom: `1px solid ${TOQUEWORKS_THEME.lightGray}`
                  }}>
                    {ingredient.minStock || 0} / {ingredient.maxStock || '∞'}
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    textAlign: 'center',
                    borderBottom: `1px solid ${TOQUEWORKS_THEME.lightGray}`
                  }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: 
                        status === 'out-of-stock' ? `${TOQUEWORKS_THEME.red}20` :
                        status === 'low-stock' ? `${TOQUEWORKS_THEME.orange}20` :
                        status === 'over-stock' ? '#E0F2FE' : `${TOQUEWORKS_THEME.green}20`,
                      color:
                        status === 'out-of-stock' ? TOQUEWORKS_THEME.red :
                        status === 'low-stock' ? TOQUEWORKS_THEME.orange :
                        status === 'over-stock' ? '#0369A1' : TOQUEWORKS_THEME.green
                    }}>
                      {status.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    textAlign: 'right',
                    fontWeight: '500',
                    fontSize: '14px',
                    color: TOQUEWORKS_THEME.gunmetal,
                    borderBottom: `1px solid ${TOQUEWORKS_THEME.lightGray}`
                  }}>
                    ${value.toFixed(2)}
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    borderBottom: `1px solid ${TOQUEWORKS_THEME.lightGray}`
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '4px'
                    }}>
                      <button
                        onClick={() => adjustStock(ingredient.id, -1)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: TOQUEWORKS_THEME.seasalt,
                          border: `1px solid ${TOQUEWORKS_THEME.lightGray}`,
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = TOQUEWORKS_THEME.lightGray}
                        onMouseOut={(e) => e.target.style.backgroundColor = TOQUEWORKS_THEME.seasalt}
                      >
                        -1
                      </button>
                      <button
                        onClick={() => adjustStock(ingredient.id, -10)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: TOQUEWORKS_THEME.seasalt,
                          border: `1px solid ${TOQUEWORKS_THEME.lightGray}`,
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = TOQUEWORKS_THEME.lightGray}
                        onMouseOut={(e) => e.target.style.backgroundColor = TOQUEWORKS_THEME.seasalt}
                      >
                        -10
                      </button>
                      <button
                        onClick={() => adjustStock(ingredient.id, 10)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: TOQUEWORKS_THEME.seasalt,
                          border: `1px solid ${TOQUEWORKS_THEME.lightGray}`,
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = TOQUEWORKS_THEME.lightGray}
                        onMouseOut={(e) => e.target.style.backgroundColor = TOQUEWORKS_THEME.seasalt}
                      >
                        +10
                      </button>
                      <button
                        onClick={() => adjustStock(ingredient.id, 1)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: TOQUEWORKS_THEME.seasalt,
                          border: `1px solid ${TOQUEWORKS_THEME.lightGray}`,
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = TOQUEWORKS_THEME.lightGray}
                        onMouseOut={(e) => e.target.style.backgroundColor = TOQUEWORKS_THEME.seasalt}
                      >
                        +1
                      </button>
                    </div>
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    textAlign: 'center',
                    fontSize: '13px',
                    color: TOQUEWORKS_THEME.dimGray,
                    borderBottom: `1px solid ${TOQUEWORKS_THEME.lightGray}`
                  }}>
                    {lastUpdated ? new Date(lastUpdated).toLocaleDateString() : 'Never'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {sortedIngredients.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px',
            color: TOQUEWORKS_THEME.dimGray,
            fontSize: '14px'
          }}>
            No ingredients found matching your filters
          </div>
        )}
      </div>
    </div>
  );
};

InventoryManagement.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    unit: PropTypes.string,
    costPerUnit: PropTypes.number,
    minStock: PropTypes.number,
    maxStock: PropTypes.number
  })),
  onUpdateInventory: PropTypes.func
};

export default InventoryManagement;
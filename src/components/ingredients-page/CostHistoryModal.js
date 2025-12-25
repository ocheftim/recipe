import React, { useState, useMemo } from 'react';

const CostHistoryModal = ({ 
  ingredient, 
  isOpen, 
  onClose, 
  theme = {},
  costHistory = null 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [filterSupplier, setFilterSupplier] = useState('all');
  const [dateRange, setDateRange] = useState('3months');

  // Sample cost history data - replace with Firebase data
  const generateSampleCostHistory = (ingredientName) => [
    { date: '2025-08-15', supplier: 'Fresh Valley Foods', apCost: 24.50, unitCost: 0.98, source: 'Manual Entry', notes: 'Summer price increase' },
    { date: '2025-08-01', supplier: 'Fresh Valley Foods', apCost: 23.75, unitCost: 0.95, source: 'Invoice Import', notes: '' },
    { date: '2025-07-15', supplier: 'Mountain Produce', apCost: 25.20, unitCost: 1.01, source: 'Price Update', notes: 'Trial supplier' },
    { date: '2025-07-01', supplier: 'Fresh Valley Foods', apCost: 23.25, unitCost: 0.93, source: 'Manual Entry', notes: 'Negotiated rate' },
    { date: '2025-06-15', supplier: 'Fresh Valley Foods', apCost: 24.00, unitCost: 0.96, source: 'Invoice Import', notes: '' },
    { date: '2025-06-01', supplier: 'Fresh Valley Foods', apCost: 23.50, unitCost: 0.94, source: 'Manual Entry', notes: 'Regular delivery' },
    { date: '2025-05-15', supplier: 'Garden Fresh Co', apCost: 26.75, unitCost: 1.07, source: 'Price Update', notes: 'Previous supplier' },
    { date: '2025-05-01', supplier: 'Garden Fresh Co', apCost: 25.50, unitCost: 1.02, source: 'Invoice Import', notes: '' },
    { date: '2025-04-15', supplier: 'Garden Fresh Co', apCost: 24.80, unitCost: 0.99, source: 'Manual Entry', notes: 'Spring pricing' },
    { date: '2025-04-01', supplier: 'Garden Fresh Co', apCost: 25.20, unitCost: 1.01, source: 'Invoice Import', notes: '' }
  ];

  // Use provided data or generate sample data
  const rawData = costHistory || generateSampleCostHistory(ingredient?.name);
  
  // Get unique suppliers for filter
  const suppliers = useMemo(() => {
    const uniqueSuppliers = [...new Set(rawData.map(entry => entry.supplier))];
    return uniqueSuppliers;
  }, [rawData]);

  // Filter and sort data
  const processedData = useMemo(() => {
    let filtered = rawData;

    // Filter by supplier
    if (filterSupplier !== 'all') {
      filtered = filtered.filter(entry => entry.supplier === filterSupplier);
    }

    // Filter by date range
    const now = new Date();
    const cutoffDate = new Date();
    switch(dateRange) {
      case '1month':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case '3months':
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case '6months':
        cutoffDate.setMonth(now.getMonth() - 6);
        break;
      case '1year':
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        cutoffDate.setFullYear(2000); // Show all
    }
    
    filtered = filtered.filter(entry => new Date(entry.date) >= cutoffDate);

    // Sort data
    filtered.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      
      if (sortConfig.key === 'date') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [rawData, filterSupplier, dateRange, sortConfig]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (processedData.length === 0) return null;
    
    const prices = processedData.map(entry => entry.unitCost);
    const current = prices[0]; // Most recent (assuming desc sort)
    const avg = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const variance = ((current - avg) / avg * 100);
    
    return { current, avg, min, max, variance };
  }, [processedData]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: theme.white || '#FFFFFF',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '1000px',
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
      }}>
        {/* Modal Header */}
        <div style={{
          backgroundColor: theme.gunmetal || '#1F2D38',
          color: theme.white || '#FFFFFF',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
              Cost History - {ingredient?.name || 'Unknown Ingredient'}
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: theme.silver || '#BBBFC2' }}>
              Price tracking and variance analysis
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: theme.white || '#FFFFFF',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '4px',
              lineHeight: 1
            }}
          >
            ×
          </button>
        </div>

        {/* Statistics Panel */}
        {stats && (
          <div style={{
            backgroundColor: theme.seasalt || '#F6F8F8',
            padding: '16px 24px',
            borderBottom: `1px solid ${theme.silver || '#BBBFC2'}`
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '16px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: theme.charcoal || '#2A3E51', marginBottom: '4px' }}>
                  Current Price
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: theme.gunmetal || '#1F2D38' }}>
                  {formatCurrency(stats.current)}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: theme.charcoal || '#2A3E51', marginBottom: '4px' }}>
                  Average Price
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: theme.gunmetal || '#1F2D38' }}>
                  {formatCurrency(stats.avg)}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: theme.charcoal || '#2A3E51', marginBottom: '4px' }}>
                  Price Range
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: theme.gunmetal || '#1F2D38' }}>
                  {formatCurrency(stats.min)} - {formatCurrency(stats.max)}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: theme.charcoal || '#2A3E51', marginBottom: '4px' }}>
                  Variance from Avg
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: stats.variance > 0 ? '#dc2626' : stats.variance < -5 ? theme.yellowGreen || '#8AC732' : theme.gunmetal || '#1F2D38'
                }}>
                  {stats.variance > 0 ? '+' : ''}{stats.variance.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div style={{
          padding: '16px 24px',
          backgroundColor: theme.white || '#FFFFFF',
          borderBottom: `1px solid ${theme.silver || '#BBBFC2'}`,
          display: 'flex',
          gap: '16px',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '12px', color: theme.charcoal || '#2A3E51', fontWeight: '500' }}>
              Time Period:
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{
                padding: '4px 8px',
                border: `1px solid ${theme.silver || '#BBBFC2'}`,
                borderRadius: '4px',
                fontSize: '12px',
                backgroundColor: theme.white || '#FFFFFF'
              }}
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '12px', color: theme.charcoal || '#2A3E51', fontWeight: '500' }}>
              Supplier:
            </label>
            <select
              value={filterSupplier}
              onChange={(e) => setFilterSupplier(e.target.value)}
              style={{
                padding: '4px 8px',
                border: `1px solid ${theme.silver || '#BBBFC2'}`,
                borderRadius: '4px',
                fontSize: '12px',
                backgroundColor: theme.white || '#FFFFFF'
              }}
            >
              <option value="all">All Suppliers</option>
              {suppliers.map(supplier => (
                <option key={supplier} value={supplier}>{supplier}</option>
              ))}
            </select>
          </div>
          
          <div style={{ marginLeft: 'auto', fontSize: '12px', color: theme.silver || '#BBBFC2' }}>
            {processedData.length} entries
          </div>
        </div>

        {/* Table Header */}
        <div style={{
          display: 'flex',
          backgroundColor: '#2A3E51',
          color: theme.white || '#FFFFFF',
          fontWeight: '600',
          fontSize: '14px',
          alignItems: 'center',
          height: '40px'
        }}>
          <div 
            style={{
              flex: '1',
              padding: '8px 16px',
              textAlign: 'center',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => handleSort('date')}
          >
            Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </div>
          <div 
            style={{
              flex: '1.5',
              padding: '8px 16px',
              textAlign: 'center',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => handleSort('supplier')}
          >
            Supplier {sortConfig.key === 'supplier' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </div>
          <div 
            style={{
              flex: '1',
              padding: '8px 16px',
              textAlign: 'center',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => handleSort('apCost')}
          >
            AP Cost {sortConfig.key === 'apCost' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </div>
          <div 
            style={{
              flex: '1',
              padding: '8px 16px',
              textAlign: 'center',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}
            onClick={() => handleSort('unitCost')}
          >
            Unit Cost {sortConfig.key === 'unitCost' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </div>
          <div style={{
            flex: '1',
            padding: '8px 16px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            Source
          </div>
          <div style={{
            flex: '1.5',
            padding: '8px 16px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            Notes
          </div>
        </div>

        {/* Table Body */}
        <div style={{ maxHeight: '400px', overflow: 'auto' }}>
          {processedData.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: theme.silver || '#BBBFC2'
            }}>
              <p style={{ fontSize: '16px', margin: 0 }}>No cost history found</p>
              <p style={{ fontSize: '14px', margin: '8px 0 0 0' }}>
                Try adjusting your filters or date range
              </p>
            </div>
          ) : (
            processedData.map((entry, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  backgroundColor: index % 2 === 0 ? theme.white || '#FFFFFF' : theme.seasalt || '#F6F8F8',
                  alignItems: 'center',
                  fontSize: '12px',
                  height: '40px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.teaGreen || '#C0E095'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? theme.white || '#FFFFFF' : theme.seasalt || '#F6F8F8'}
              >
                <div style={{
                  flex: '1',
                  padding: '8px 16px',
                  textAlign: 'center',
                  color: theme.charcoal || '#2A3E51',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {formatDate(entry.date)}
                </div>
                <div style={{
                  flex: '1.5',
                  padding: '8px 16px',
                  textAlign: 'center',
                  color: theme.charcoal || '#2A3E51',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {entry.supplier}
                </div>
                <div style={{
                  flex: '1',
                  padding: '8px 16px',
                  textAlign: 'right',
                  color: theme.charcoal || '#2A3E51',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}>
                  {formatCurrency(entry.apCost)}
                </div>
                <div style={{
                  flex: '1',
                  padding: '8px 16px',
                  textAlign: 'right',
                  color: theme.yellowGreen || '#8AC732',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}>
                  {formatCurrency(entry.unitCost)}
                </div>
                <div style={{
                  flex: '1',
                  padding: '8px 16px',
                  textAlign: 'center',
                  color: theme.charcoal || '#2A3E51',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {entry.source}
                </div>
                <div style={{
                  flex: '1.5',
                  padding: '8px 16px',
                  textAlign: 'left',
                  color: theme.silver || '#BBBFC2',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {entry.notes || '-'}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          backgroundColor: '#2A3E51',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '12px', color: theme.white || '#FFFFFF' }}>
            Cost tracking helps identify price trends and supplier performance
          </div>
          <button
            onClick={onClose}
            style={{
              backgroundColor: theme.yellowGreen || '#8AC732',
              color: theme.white || '#FFFFFF',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CostHistoryModal;
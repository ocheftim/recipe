// src/components/menus/MenuToolbar.js
import React from 'react';

const MenuToolbar = ({ 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus, 
  onAdd, 
  onExport, 
  onImport, 
  theme 
}) => {
  return (
    <div style={{
      backgroundColor: theme.seasalt,
      padding: '20px 32px',
      borderBottom: `1px solid ${theme.lightGray}`
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: theme.gunmetal,
          margin: 0
        }}>
          Menu Management
        </h1>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onExport}
            style={{
              padding: '8px 16px',
              backgroundColor: theme.white,
              border: `1px solid ${theme.lightGray}`,
              borderRadius: '6px',
              color: theme.gunmetal,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>↓</span> Export
          </button>
          
          <label style={{
            padding: '8px 16px',
            backgroundColor: theme.white,
            border: `1px solid ${theme.lightGray}`,
            borderRadius: '6px',
            color: theme.gunmetal,
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>↑</span> Import
            <input
              type="file"
              accept=".json"
              onChange={onImport}
              style={{ display: 'none' }}
            />
          </label>
          
          <button
            onClick={onAdd}
            style={{
              padding: '8px 16px',
              backgroundColor: theme.teaGreen,
              color: theme.white,
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>+</span> New Menu
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Search menus..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: '8px 12px',
            border: `1px solid ${theme.lightGray}`,
            borderRadius: '6px',
            fontSize: '14px'
          }}
        />
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: '8px 12px',
            border: `1px solid ${theme.lightGray}`,
            borderRadius: '6px',
            fontSize: '14px',
            backgroundColor: theme.white
          }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>
    </div>
  );
};

export default MenuToolbar;
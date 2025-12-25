// src/components/menus/MenuBasicInfo.js
import React from 'react';

const MenuBasicInfo = ({ formData, onChange, theme }) => {
  const handleChange = (field, value) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <>
      {/* Basic Information Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: theme.gunmetal,
            marginBottom: '4px'
          }}>
            Menu Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: `1px solid ${theme.lightGray}`,
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: theme.gunmetal,
            marginBottom: '4px'
          }}>
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: `1px solid ${theme.lightGray}`,
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="brunch">Brunch</option>
            <option value="special">Special Event</option>
          </select>
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: theme.gunmetal,
            marginBottom: '4px'
          }}>
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: `1px solid ${theme.lightGray}`,
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: theme.gunmetal,
            marginBottom: '4px'
          }}>
            Target Food Cost %
          </label>
          <input
            type="number"
            value={formData.targetFoodCost}
            onChange={(e) => handleChange('targetFoodCost', parseFloat(e.target.value))}
            min="0"
            max="100"
            style={{
              width: '100%',
              padding: '8px',
              border: `1px solid ${theme.lightGray}`,
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      {/* Description Field */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: theme.gunmetal,
          marginBottom: '4px'
        }}>
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
          style={{
            width: '100%',
            padding: '8px',
            border: `1px solid ${theme.lightGray}`,
            borderRadius: '6px',
            fontSize: '14px',
            resize: 'vertical'
          }}
        />
      </div>
    </>
  );
};

export default MenuBasicInfo;
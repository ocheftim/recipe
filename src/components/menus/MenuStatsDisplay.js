// src/components/menus/MenuStatsDisplay.js
import React from 'react';

const MenuStatsDisplay = ({ stats, targetFoodCost, theme }) => {
  return (
    <div style={{
      padding: '16px',
      backgroundColor: theme.seasalt,
      borderRadius: '6px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      marginBottom: '24px'
    }}>
      <StatItem
        label="Total Cost"
        value={`$${stats.totalCost.toFixed(2)}`}
        color={theme.gunmetal}
        theme={theme}
      />
      <StatItem
        label="Total Revenue"
        value={`$${stats.totalRevenue.toFixed(2)}`}
        color={theme.gunmetal}
        theme={theme}
      />
      <StatItem
        label="Actual Food Cost"
        value={`${stats.actualFoodCost}%`}
        color={stats.actualFoodCost <= targetFoodCost ? theme.teaGreen : theme.red}
        theme={theme}
      />
    </div>
  );
};

const StatItem = ({ label, value, color, theme }) => (
  <div>
    <div style={{
      fontSize: '12px',
      color: theme.silver,
      marginBottom: '4px'
    }}>
      {label}
    </div>
    <div style={{
      fontSize: '18px',
      fontWeight: '600',
      color: color
    }}>
      {value}
    </div>
  </div>
);

export default MenuStatsDisplay;
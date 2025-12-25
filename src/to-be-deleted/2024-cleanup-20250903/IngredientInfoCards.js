// src/components/ingredients/IngredientInfoCards.js

import React from 'react';
import { Package, DollarSign, AlertTriangle, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/ingredients/formatters';
import { calculateInventoryValue, calculateLowStockItems } from '../../utils/ingredients/calculations';
import { TOQUEWORKS_THEME } from '../../constants/theme';

const IngredientInfoCards = ({ ingredients }) => {
  const totalValue = calculateInventoryValue(ingredients);
  const lowStockCount = calculateLowStockItems(ingredients);
  const totalItems = ingredients.length;
  const avgCasePrice = totalItems > 0 
    ? ingredients.reduce((sum, ing) => sum + ing.casePrice, 0) / totalItems 
    : 0;

  const cards = [
    {
      title: 'Total Ingredients',
      value: totalItems,
      icon: Package,
      color: TOQUEWORKS_THEME.colors.primary,
      bgColor: '#E8F5E9'
    },
    {
      title: 'Inventory Value',
      value: formatCurrency(totalValue),
      icon: DollarSign,
      color: '#1565C0',
      bgColor: '#E3F2FD'
    },
    {
      title: 'Low Stock Items',
      value: lowStockCount,
      icon: AlertTriangle,
      color: lowStockCount > 0 ? '#F57C00' : '#2E7D32',
      bgColor: lowStockCount > 0 ? '#FFF3E0' : '#E8F5E9'
    },
    {
      title: 'Avg Case Price',
      value: formatCurrency(avgCasePrice),
      icon: TrendingUp,
      color: '#7B1FA2',
      bgColor: '#F3E5F5'
    }
  ];

  return (
    <div style={styles.container}>
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} style={styles.card}>
            <div style={{ ...styles.iconContainer, backgroundColor: card.bgColor }}>
              <Icon size={24} color={card.color} />
            </div>
            <div style={styles.content}>
              <p style={styles.label}>{card.title}</p>
              <p style={styles.value}>{card.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '24px'
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  iconContainer: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1
  },
  label: {
    fontSize: '13px',
    color: '#6C757D',
    margin: '0 0 4px 0',
    fontWeight: '500'
  },
  value: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#212529',
    margin: 0
  }
};

export default IngredientInfoCards;
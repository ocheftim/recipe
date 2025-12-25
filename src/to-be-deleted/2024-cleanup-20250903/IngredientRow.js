import React, { useState } from 'react';
import { Edit2, Save, X, Trash2 } from 'lucide-react';
import { formatCurrency, formatUnitPrice } from '../../utils/ingredients/formatters';
import { TOQUEWORKS_THEME } from '../../constants/theme';
import { CATEGORIES } from '../../constants/ingredients/units';

const IngredientRow = ({ ingredient, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(ingredient);
  const [currentUnit, setCurrentUnit] = useState(ingredient.unit);

  const handleSave = () => {
    onUpdate(ingredient.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(ingredient);
    setIsEditing(false);
  };

  const cycleUnit = () => {
    const units = Object.keys(ingredient.alternateUnits);
    const currentIndex = units.indexOf(currentUnit);
    const nextIndex = (currentIndex + 1) % units.length;
    setCurrentUnit(units[nextIndex]);
  };

  const getStockStatus = () => {
    if (ingredient.stockQty === 0) return { color: '#DC3545', text: 'Out' };
    if (ingredient.stockQty < ingredient.parLevel) return { color: '#FFC107', text: 'Low' };
    return { color: '#28A745', text: 'OK' };
  };

  const stockStatus = getStockStatus();

  if (isEditing) {
    return (
      <tr style={styles.row}>
        <td style={styles.td}>
          <input
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            style={styles.input}
          />
        </td>
        <td style={styles.td}>
          <select
            value={editData.category}
            onChange={(e) => setEditData({ ...editData, category: e.target.value })}
            style={styles.select}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </td>
        <td style={styles.td}>
          <input
            value={editData.supplier}
            onChange={(e) => setEditData({ ...editData, supplier: e.target.value })}
            style={styles.input}
          />
        </td>
        <td style={styles.td}>
          <input
            value={editData.caseSize}
            onChange={(e) => setEditData({ ...editData, caseSize: e.target.value })}
            style={styles.input}
          />
        </td>
        <td style={styles.td}>
          <input
            type="number"
            value={editData.casePrice}
            onChange={(e) => setEditData({ ...editData, casePrice: parseFloat(e.target.value) })}
            style={styles.input}
          />
        </td>
        <td style={styles.td}>-</td>
        <td style={styles.td}>
          <input
            type="number"
            value={editData.stockQty}
            onChange={(e) => setEditData({ ...editData, stockQty: parseInt(e.target.value) })}
            style={{ ...styles.input, width: '60px' }}
          />
        </td>
        <td style={styles.td}>
          <input
            type="number"
            value={editData.parLevel}
            onChange={(e) => setEditData({ ...editData, parLevel: parseInt(e.target.value) })}
            style={{ ...styles.input, width: '60px' }}
          />
        </td>
        <td style={styles.td}>
          <button onClick={handleSave} style={{ ...styles.iconButton, color: '#28A745' }}>
            <Save size={16} />
          </button>
          <button onClick={handleCancel} style={{ ...styles.iconButton, color: '#6C757D' }}>
            <X size={16} />
          </button>
        </td>
      </tr>
    );
  }

  return (
    <tr style={styles.row}>
      <td style={styles.td}>
        <div style={styles.ingredientName}>{ingredient.name}</div>
      </td>
      <td style={styles.td}>
        <span style={styles.categoryBadge}>{ingredient.category}</span>
      </td>
      <td style={styles.td}>{ingredient.supplier}</td>
      <td style={styles.td}>{ingredient.caseSize}</td>
      <td style={styles.td}>{formatCurrency(ingredient.casePrice)}</td>
      <td style={{ ...styles.td, cursor: 'pointer' }} onClick={cycleUnit}>
        <span style={styles.unitPrice}>
          {formatUnitPrice(ingredient.alternateUnits[currentUnit], currentUnit)}
        </span>
      </td>
      <td style={styles.td}>
        <span style={{ ...styles.stockBadge, backgroundColor: stockStatus.color }}>
          {ingredient.stockQty} {stockStatus.text}
        </span>
      </td>
      <td style={styles.td}>{ingredient.parLevel}</td>
      <td style={styles.td}>
        <button onClick={() => setIsEditing(true)} style={styles.iconButton}>
          <Edit2 size={16} />
        </button>
        <button onClick={() => onDelete(ingredient.id)} style={{ ...styles.iconButton, color: '#DC3545' }}>
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
};

const styles = {
  row: {
    borderBottom: '1px solid #E9ECEF',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#F8F9FA'
    }
  },
  td: {
    padding: '16px 12px',
    fontSize: '14px'
  },
  ingredientName: {
    fontWeight: '500',
    color: '#212529'
  },
  categoryBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '6px 10px',
    border: '1px solid #DEE2E6',
    borderRadius: '4px',
    fontSize: '14px'
  },
  select: {
    width: '100%',
    padding: '6px 10px',
    border: '1px solid #DEE2E6',
    borderRadius: '4px',
    fontSize: '14px',
    backgroundColor: 'white'
  },
  unitPrice: {
    display: 'inline-block',
    backgroundColor: '#E3F2FD',
    color: '#1565C0',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: '500'
  },
  stockBadge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '4px',
    color: 'white',
    fontSize: '12px',
    fontWeight: '600'
  },
  iconButton: {
    padding: '6px',
    marginRight: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#6C757D',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#F8F9FA'
    }
  }
};

export default IngredientRow;
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { FIELD_WIDTHS, COLUMN_CONFIG } from '../../config/ingredientsConfig';
import { getPrimaryUnitCost } from '../../utils/ingredientsHelpers';
import { formatCurrency } from '../../utils/formatters';
import styles from '../ingredients/ingredients.module.css';

// Reusable Sub-components
const AllergenIcons = ({ allergens }) => {
  if (!allergens?.length) return <span className={styles.noAllergens}>None</span>;

  return (
    <div className={styles.allergenContainer}>
      <div className={styles.allergenTagsWrapper}>
        {allergens.map(allergen => (
          <span key={allergen} className={styles.allergenTag}>
            {allergen}
          </span>
        ))}
      </div>
    </div>
  );
};

const StockBadge = ({ current, reorderPoint }) => {
  const isLowStock = current <= reorderPoint;
  return (
    <span className={`${styles.stockBadge} ${isLowStock ? styles.stockLow : ''}`}>
      {isLowStock && <AlertTriangle size={14} className="inline mr-1" />}
      {current}
    </span>
  );
};

// Column Renderers - organized by data type
const renderNameColumn = (ingredient, setEditingIngredient) => (
  <div className={`${styles.tableCell} ${styles.nameColumn}`} style={{ width: FIELD_WIDTHS.name }}>
    <button
      onClick={() => setEditingIngredient(ingredient)}
      className={styles.nameLink}
    >
      {ingredient.name}
    </button>
    {(ingredient.vendorName || ingredient.vendor) && (
      <div className={styles.vendorNameSubtext}>
        {ingredient.vendorName || ingredient.vendor}
      </div>
    )}
  </div>
);

const renderTextColumn = (value, columnKey) => (
  <div className={styles.tableCell} style={{ width: FIELD_WIDTHS[columnKey] }}>
    {value}
  </div>
);

const renderCurrencyColumn = (amount, columnKey) => (
  <div className={`${styles.tableCell} ${styles.currency}`} style={{ width: FIELD_WIDTHS[columnKey] }}>
    {formatCurrency(amount)}
  </div>
);

const renderCostPerUnitColumn = (ingredient) => (
  <div className={`${styles.tableCell} ${styles.currency}`} style={{ width: FIELD_WIDTHS.costPerUnit }}>
    {getPrimaryUnitCost(ingredient)}
  </div>
);

const renderAllergenColumn = (allergens) => (
  <div className={styles.tableCell} style={{ width: FIELD_WIDTHS.allergens }}>
    <AllergenIcons allergens={allergens} />
  </div>
);

const renderStockColumn = (ingredient) => (
  <div className={styles.tableCell} style={{ width: FIELD_WIDTHS.stock }}>
    <StockBadge current={ingredient.cases} reorderPoint={ingredient.reorderPoint} />
  </div>
);

// Main Column Renderer Function
export const renderColumn = (columnKey, ingredient, setEditingIngredient) => {
  if (!COLUMN_CONFIG[columnKey]) return null;

  switch (columnKey) {
    case 'name':
      return renderNameColumn(ingredient, setEditingIngredient);
    case 'category':
      return renderTextColumn(ingredient.category, columnKey);
    case 'apCost':
      return renderCurrencyColumn(ingredient.apCost, columnKey);
    case 'caseDescription':
      return renderTextColumn(ingredient.caseDescription, columnKey);
    case 'costPerUnit':
      return renderCostPerUnitColumn(ingredient);
    case 'allergens':
      return renderAllergenColumn(ingredient.allergens);
    case 'lastUpdated':
      return renderTextColumn(ingredient.lastUpdated, columnKey);
    case 'stock':
      return renderStockColumn(ingredient);
    default:
      return null;
  }
};

// Export sub-components for potential reuse
export { AllergenIcons, StockBadge };
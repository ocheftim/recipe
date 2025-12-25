// src/components/recipes/RecipeCostingTab.js
import React from 'react';
import CurrencyInput from './forms/CurrencyInput';

const RecipeCostingTab = ({ 
  formData, 
  totalCost, 
  costPerServing, 
  foodCostPercent, 
  onInputChange, 
  theme 
}) => {
  return (
    <div style={{ padding: '20px', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ backgroundColor: '#f8f9fa', padding: '16px', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: theme?.gunmetal }}>Cost Summary</h4>
          <div style={{ fontSize: '12px', color: theme?.dimGray, marginBottom: '8px' }}>
            Total Recipe Cost: <strong style={{ color: theme?.gunmetal }}>${totalCost.toFixed(2)}</strong>
          </div>
          <div style={{ fontSize: '12px', color: theme?.dimGray, marginBottom: '8px' }}>
            Cost Per Serving: <strong style={{ color: theme?.gunmetal }}>${costPerServing.toFixed(2)}</strong>
          </div>
          <div style={{ fontSize: '12px', color: theme?.dimGray }}>
            Yield: <strong style={{ color: theme?.gunmetal }}>{formData.yield || 0} servings</strong>
          </div>
        </div>

        <div>
          <CurrencyInput
            label="Menu Price"
            value={formData.menuPrice}
            onChange={(value) => onInputChange('menuPrice', value)}
            placeholder="$16.99"
            theme={theme}
          />
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: theme?.gunmetal }}>Profitability Analysis</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: theme?.dimGray }}>Gross Margin</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: ((parseFloat(formData.menuPrice) || 0) - costPerServing) >= 0 ? theme?.green : theme?.cardinal }}>
              ${((parseFloat(formData.menuPrice) || 0) - costPerServing).toFixed(2)}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: theme?.dimGray }}>Food Cost %</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: foodCostPercent <= 30 ? theme?.green : foodCostPercent <= 35 ? '#F59E0B' : theme?.cardinal }}>
              {foodCostPercent.toFixed(1)}%
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: theme?.dimGray }}>Margin %</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: (100 - foodCostPercent) >= 65 ? theme?.green : (100 - foodCostPercent) >= 50 ? '#F59E0B' : theme?.cardinal }}>
              {(100 - foodCostPercent).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {formData.ingredients.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: theme?.gunmetal }}>Ingredient Cost Breakdown</h4>
          <div style={{ border: `1px solid ${theme?.silver || '#BBBFC2'}`, borderRadius: '4px', overflow: 'hidden' }}>
            <table style={{ width: '100%', fontSize: '12px' }}>
              <thead style={{ backgroundColor: '#f8f9fa' }}>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px', color: theme?.charcoal }}>Ingredient</th>
                  <th style={{ textAlign: 'right', padding: '8px', color: theme?.charcoal }}>Cost</th>
                  <th style={{ textAlign: 'right', padding: '8px', color: theme?.charcoal }}>% of Total</th>
                </tr>
              </thead>
              <tbody>
                {formData.ingredients.map((ingredient, index) => {
                  const cost = parseFloat(ingredient.cost) || 0;
                  const percentage = totalCost > 0 ? (cost / totalCost) * 100 : 0;
                  return (
                    <tr key={index} style={{ borderTop: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '8px' }}>{ingredient.name || 'Unnamed ingredient'}</td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>${cost.toFixed(2)}</td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        <span style={{ 
                          color: percentage > 30 ? theme?.cardinal : percentage > 15 ? '#F59E0B' : theme?.charcoal 
                        }}>
                          {percentage.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCostingTab;
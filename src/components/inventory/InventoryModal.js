import React, { useState } from 'react';

// Inventory Modal Component
const InventoryModal = ({ item, ingredients, onSave, onClose, theme }) => {
  const [formData, setFormData] = useState(item);
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.ingredientId) newErrors.ingredientId = 'Ingredient is required';
    if (formData.currentStock < 0) newErrors.currentStock = 'Stock cannot be negative';
    if (formData.minStock < 0) newErrors.minStock = 'Minimum stock cannot be negative';
    if (formData.maxStock <= 0) newErrors.maxStock = 'Maximum stock must be positive';
    if (formData.costPerUnit < 0) newErrors.costPerUnit = 'Cost cannot be negative';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSave(formData);
  };

  return (
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
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: theme.white,
        borderRadius: '12px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: `1px solid ${theme.seasalt}`
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: '600',
            color: theme.gunmetal
          }}>
            {item.id ? 'Edit Inventory Item' : 'Add Inventory Item'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: theme.silver
            }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.gunmetal,
                marginBottom: '8px'
              }}>
                Ingredient *
              </label>
              <select
                value={formData.ingredientId}
                onChange={(e) => setFormData({ ...formData, ingredientId: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.ingredientId ? theme.red : theme.lightGray}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: theme.white
                }}
              >
                <option value="">Select ingredient</option>
                {ingredients.map(ingredient => (
                  <option key={ingredient.id} value={ingredient.id}>
                    {ingredient.name} ({ingredient.category})
                  </option>
                ))}
              </select>
              {errors.ingredientId && (
                <div style={{ color: theme.red, fontSize: '12px', marginTop: '4px' }}>
                  {errors.ingredientId}
                </div>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.gunmetal,
                marginBottom: '8px'
              }}>
                Current Stock *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.currentStock}
                onChange={(e) => setFormData({ ...formData, currentStock: parseFloat(e.target.value) || 0 })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.currentStock ? theme.red : theme.lightGray}`,
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                placeholder="0.00"
              />
              {errors.currentStock && (
                <div style={{ color: theme.red, fontSize: '12px', marginTop: '4px' }}>
                  {errors.currentStock}
                </div>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.gunmetal,
                marginBottom: '8px'
              }}>
                Unit
              </label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${theme.lightGray}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: theme.white
                }}
              >
                <option value="lb">lb</option>
                <option value="oz">oz</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="each">each</option>
                <option value="dozen">dozen</option>
                <option value="case">case</option>
                <option value="liter">liter</option>
                <option value="gallon">gallon</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.gunmetal,
                marginBottom: '8px'
              }}>
                Minimum Stock *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: parseFloat(e.target.value) || 0 })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.minStock ? theme.red : theme.lightGray}`,
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                placeholder="0.00"
              />
              {errors.minStock && (
                <div style={{ color: theme.red, fontSize: '12px', marginTop: '4px' }}>
                  {errors.minStock}
                </div>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.gunmetal,
                marginBottom: '8px'
              }}>
                Maximum Stock *
              </label>
              <input
                type="number"
                min="1"
                step="0.01"
                value={formData.maxStock}
                onChange={(e) => setFormData({ ...formData, maxStock: parseFloat(e.target.value) || 1 })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.maxStock ? theme.red : theme.lightGray}`,
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                placeholder="100.00"
              />
              {errors.maxStock && (
                <div style={{ color: theme.red, fontSize: '12px', marginTop: '4px' }}>
                  {errors.maxStock}
                </div>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.gunmetal,
                marginBottom: '8px'
              }}>
                Location
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${theme.lightGray}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: theme.white
                }}
              >
                <option value="main_storage">Main Storage</option>
                <option value="walk_in_cooler">Walk-in Cooler</option>
                <option value="freezer">Freezer</option>
                <option value="dry_storage">Dry Storage</option>
                <option value="prep_area">Prep Area</option>
                <option value="wine_cellar">Wine Cellar</option>
                <option value="off_site">Off-site Storage</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.gunmetal,
                marginBottom: '8px'
              }}>
                Cost per Unit ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.costPerUnit}
                onChange={(e) => setFormData({ ...formData, costPerUnit: parseFloat(e.target.value) || 0 })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.costPerUnit ? theme.red : theme.lightGray}`,
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                placeholder="0.00"
              />
              {errors.costPerUnit && (
                <div style={{ color: theme.red, fontSize: '12px', marginTop: '4px' }}>
                  {errors.costPerUnit}
                </div>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.gunmetal,
                marginBottom: '8px'
              }}>
                Expiration Date
              </label>
              <input
                type="date"
                value={formData.expirationDate}
                onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${theme.lightGray}`,
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.gunmetal,
                marginBottom: '8px'
              }}>
                Batch Number
              </label>
              <input
                type="text"
                value={formData.batchNumber}
                onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${theme.lightGray}`,
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                placeholder="Enter batch number"
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.gunmetal,
                marginBottom: '8px'
              }}>
                Supplier
              </label>
              <input
                type="text"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${theme.lightGray}`,
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                placeholder="Enter supplier name"
              />
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            paddingTop: '20px',
            borderTop: `1px solid ${theme.seasalt}`
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 24px',
                border: `1px solid ${theme.lightGray}`,
                borderRadius: '8px',
                backgroundColor: theme.white,
                color: theme.charcoal,
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                padding: '12px 24px',
                backgroundColor: theme.yellowGreen,
                color: theme.white,
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {item.id ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryModal;
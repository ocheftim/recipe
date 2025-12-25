// src/components/menus/MenuItemsList.js
import React from 'react';

const MenuItemsList = ({ items, recipes, onUpdate, theme }) => {
  const addMenuItem = () => {
    const newItem = {
      id: Date.now(),
      recipeId: null,
      price: 0,
      quantity: 1
    };
    onUpdate([...items, newItem]);
  };

  const updateMenuItem = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    onUpdate(updatedItems);
  };

  const removeMenuItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    onUpdate(updatedItems);
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: theme.gunmetal
        }}>
          Menu Items
        </h3>
        <button
          type="button"
          onClick={addMenuItem}
          style={{
            backgroundColor: theme.teaGreen,
            color: theme.white,
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          + Add Item
        </button>
      </div>

      {items.length === 0 ? (
        <EmptyItemsState theme={theme} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map((item, index) => (
            <MenuItemRow
              key={item.id}
              item={item}
              index={index}
              recipes={recipes}
              onUpdate={updateMenuItem}
              onRemove={removeMenuItem}
              theme={theme}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const EmptyItemsState = ({ theme }) => (
  <div style={{
    padding: '24px',
    textAlign: 'center',
    backgroundColor: theme.seasalt,
    borderRadius: '6px',
    color: theme.silver
  }}>
    No items added. Click "Add Item" to start building your menu.
  </div>
);

const MenuItemRow = ({ item, index, recipes, onUpdate, onRemove, theme }) => (
  <div style={{
    padding: '12px',
    backgroundColor: theme.seasalt,
    borderRadius: '6px',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr auto',
    gap: '12px',
    alignItems: 'center'
  }}>
    <div>
      <label style={{
        display: 'block',
        fontSize: '12px',
        fontWeight: '500',
        color: theme.gunmetal,
        marginBottom: '4px'
      }}>
        Recipe
      </label>
      <select
        value={item.recipeId || ''}
        onChange={(e) => onUpdate(index, 'recipeId', e.target.value)}
        required
        style={{
          width: '100%',
          padding: '8px',
          border: `1px solid ${theme.lightGray}`,
          borderRadius: '6px',
          fontSize: '14px',
          backgroundColor: theme.white
        }}
      >
        <option value="">Select a recipe</option>
        {recipes.map(recipe => (
          <option key={recipe.id} value={recipe.id}>
            {recipe.name} (Cost: ${recipe.cost?.toFixed(2) || '0.00'})
          </option>
        ))}
      </select>
    </div>

    <div>
      <label style={{
        display: 'block',
        fontSize: '12px',
        fontWeight: '500',
        color: theme.gunmetal,
        marginBottom: '4px'
      }}>
        Price
      </label>
      <input
        type="number"
        value={item.price}
        onChange={(e) => onUpdate(index, 'price', parseFloat(e.target.value) || 0)}
        min="0"
        step="0.01"
        required
        style={{
          width: '100%',
          padding: '8px',
          border: `1px solid ${theme.lightGray}`,
          borderRadius: '6px',
          fontSize: '14px',
          backgroundColor: theme.white
        }}
      />
    </div>

    <div>
      <label style={{
        display: 'block',
        fontSize: '12px',
        fontWeight: '500',
        color: theme.gunmetal,
        marginBottom: '4px'
      }}>
        Quantity
      </label>
      <input
        type="number"
        value={item.quantity}
        onChange={(e) => onUpdate(index, 'quantity', parseInt(e.target.value) || 1)}
        min="1"
        style={{
          width: '100%',
          padding: '8px',
          border: `1px solid ${theme.lightGray}`,
          borderRadius: '6px',
          fontSize: '14px',
          backgroundColor: theme.white
        }}
      />
    </div>

    <button
      type="button"
      onClick={() => onRemove(index)}
      style={{
        background: 'none',
        border: 'none',
        color: theme.red,
        fontSize: '20px',
        cursor: 'pointer',
        padding: '4px',
        marginTop: '20px'
      }}
    >
      ×
    </button>
  </div>
);

export default MenuItemsList;
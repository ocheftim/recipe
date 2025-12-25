// src/components/menus/MenuCard.js
import React from 'react';

const MenuCard = ({ 
  menu, 
  stats, 
  onEdit, 
  onDuplicate, 
  onDelete, 
  showDropdown, 
  setShowDropdown, 
  theme 
}) => {
  return (
    <div
      style={{
        backgroundColor: theme.white,
        border: `1px solid ${theme.lightGray}`,
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Menu Card Header */}
      <div style={{
        padding: '20px',
        borderBottom: `1px solid ${theme.lightGray}`
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '8px'
        }}>
          <h3 
            onClick={() => onEdit(menu)}
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: theme.gunmetal,
              margin: 0,
              cursor: 'pointer',
              textDecoration: 'underline',
              textDecorationColor: 'transparent',
              transition: 'text-decoration-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.textDecorationColor = theme.gunmetal}
            onMouseLeave={(e) => e.target.style.textDecorationColor = 'transparent'}
          >
            {menu.name}
          </h3>
          
          {/* Dropdown Menu */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowDropdown(showDropdown === menu.id ? null : menu.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                color: theme.silver
              }}
            >
              ⋮
            </button>
            
            {showDropdown === menu.id && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                marginTop: '4px',
                backgroundColor: theme.white,
                border: `1px solid ${theme.lightGray}`,
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 10,
                minWidth: '150px'
              }}>
                <button
                  onClick={() => onEdit(menu)}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px 16px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: theme.gunmetal
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDuplicate(menu)}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px 16px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: theme.gunmetal
                  }}
                >
                  Duplicate
                </button>
                <hr style={{
                  margin: 0,
                  border: 'none',
                  borderTop: `1px solid ${theme.lightGray}`
                }} />
                <button
                  onClick={() => onDelete(menu.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px 16px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: theme.red
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        
        <p style={{
          fontSize: '14px',
          color: theme.silver,
          margin: '8px 0'
        }}>
          {menu.description || 'No description'}
        </p>
        
        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '12px'
        }}>
          <span style={{
            display: 'inline-block',
            padding: '4px 8px',
            backgroundColor: menu.status === 'active' 
              ? theme.teaGreen 
              : menu.status === 'draft'
              ? theme.orange
              : theme.silver,
            color: theme.white,
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
            textTransform: 'uppercase'
          }}>
            {menu.status}
          </span>
          
          <span style={{
            display: 'inline-block',
            padding: '4px 8px',
            backgroundColor: theme.seasalt,
            color: theme.gunmetal,
            borderRadius: '4px',
            fontSize: '12px',
            textTransform: 'capitalize'
          }}>
            {menu.type}
          </span>
        </div>
      </div>
      
      {/* Menu Stats */}
      {stats && (
        <div style={{
          padding: '16px 20px',
          backgroundColor: theme.seasalt,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px'
        }}>
          <div>
            <div style={{
              fontSize: '12px',
              color: theme.silver,
              marginBottom: '4px'
            }}>
              Items
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: '600',
              color: theme.gunmetal
            }}>
              {stats.itemCount}
            </div>
          </div>
          
          <div>
            <div style={{
              fontSize: '12px',
              color: theme.silver,
              marginBottom: '4px'
            }}>
              Food Cost
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: '600',
              color: menu.actualFoodCost && menu.actualFoodCost <= menu.targetFoodCost 
                ? theme.teaGreen 
                : theme.red
            }}>
              {menu.actualFoodCost ? `${menu.actualFoodCost}%` : 'N/A'}
            </div>
          </div>
          
          <div>
            <div style={{
              fontSize: '12px',
              color: theme.silver,
              marginBottom: '4px'
            }}>
              Total Price
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: '600',
              color: theme.gunmetal
            }}>
              ${stats.revenue.toFixed(2)}
            </div>
          </div>
          
          <div>
            <div style={{
              fontSize: '12px',
              color: theme.silver,
              marginBottom: '4px'
            }}>
              Margin
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: '600',
              color: theme.gunmetal
            }}>
              {stats.margin}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuCard;
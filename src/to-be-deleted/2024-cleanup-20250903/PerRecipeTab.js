import React from 'react';
import { formatCurrency } from '../../utils/formatters';

const PerRecipeTab = ({ 
  analysisData, 
  expandedRecipe, 
  setExpandedRecipe,
  sortBy,
  sortDirection,
  handleSort,
  getSortIcon,
  theme 
}) => {
  const toggleRecipeExpansion = (recipeId) => {
    setExpandedRecipe(expandedRecipe === recipeId ? null : recipeId);
  };

  return (
    <div>
      {/* Per Recipe Table */}
      <div style={{
        backgroundColor: theme.white,
        borderRadius: '12px',
        boxShadow: '0 1px 3px 0 rgba(31, 45, 56, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Table Header - Match SharedDataView style */}
        <div style={{
          backgroundColor: theme.seasalt,
          padding: '16px 20px',
          borderBottom: `1px solid ${theme.silver}`
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr 80px',
            gap: '20px',
            alignItems: 'center'
          }}>
            {/* Recipe Name Header */}
            <div 
              onClick={() => handleSort('name')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: '700',
                color: theme.charcoal,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = theme.gunmetal}
              onMouseOut={(e) => e.currentTarget.style.color = theme.charcoal}
            >
              <span>Recipe Name</span>
              <span style={{ 
                fontSize: '10px',
                color: sortBy === 'name' ? theme.charcoal : theme.silver,
                transition: 'color 0.2s ease'
              }}>
                {getSortIcon('name')}
              </span>
            </div>
            <div 
              onClick={() => handleSort('category')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: '700',
                color: theme.charcoal,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = theme.gunmetal}
              onMouseOut={(e) => e.currentTarget.style.color = theme.charcoal}
            >
              <span>Category</span>
              <span style={{ 
                fontSize: '10px',
                color: sortBy === 'category' ? theme.charcoal : theme.silver,
                transition: 'color 0.2s ease'
              }}>
                {getSortIcon('category')}
              </span>
            </div>
            <div 
              onClick={() => handleSort('costPerServing')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: '700',
                color: theme.charcoal,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = theme.gunmetal}
              onMouseOut={(e) => e.currentTarget.style.color = theme.charcoal}
            >
              <span>Cost/Serving</span>
              <span style={{ 
                fontSize: '10px',
                color: sortBy === 'costPerServing' ? theme.charcoal : theme.silver,
                transition: 'color 0.2s ease'
              }}>
                {getSortIcon('costPerServing')}
              </span>
            </div>
            <div 
              onClick={() => handleSort('menuPrice')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: '700',
                color: theme.charcoal,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = theme.gunmetal}
              onMouseOut={(e) => e.currentTarget.style.color = theme.charcoal}
            >
              <span>Menu Price</span>
              <span style={{ 
                fontSize: '10px',
                color: sortBy === 'menuPrice' ? theme.charcoal : theme.silver,
                transition: 'color 0.2s ease'
              }}>
                {getSortIcon('menuPrice')}
              </span>
            </div>
            <div 
              onClick={() => handleSort('margin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: '700',
                color: theme.charcoal,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = theme.gunmetal}
              onMouseOut={(e) => e.currentTarget.style.color = theme.charcoal}
            >
              <span>Margin</span>
              <span style={{ 
                fontSize: '10px',
                color: sortBy === 'margin' ? theme.charcoal : theme.silver,
                transition: 'color 0.2s ease'
              }}>
                {getSortIcon('margin')}
              </span>
            </div>
            <div 
              onClick={() => handleSort('foodCostPercent')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: '700',
                color: theme.charcoal,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = theme.gunmetal}
              onMouseOut={(e) => e.currentTarget.style.color = theme.charcoal}
            >
              <span>Food Cost %</span>
              <span style={{ 
                fontSize: '10px',
                color: sortBy === 'foodCostPercent' ? theme.charcoal : theme.silver,
                transition: 'color 0.2s ease'
              }}>
                {getSortIcon('foodCostPercent')}
              </span>
            </div>
            <div 
              onClick={() => handleSort('marginPercent')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: '700',
                color: theme.charcoal,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = theme.gunmetal}
              onMouseOut={(e) => e.currentTarget.style.color = theme.charcoal}
            >
              <span>Margin %</span>
              <span style={{ 
                fontSize: '10px',
                color: sortBy === 'marginPercent' ? theme.charcoal : theme.silver,
                transition: 'color 0.2s ease'
              }}>
                {getSortIcon('marginPercent')}
              </span>
            </div>
            <div style={{
              fontSize: '12px',
              fontWeight: '700',
              color: theme.charcoal,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              textAlign: 'center'
            }}>
              Details
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {analysisData.sortedRecipes.map((recipe, index) => (
            <div key={recipe.id || index}>
              {/* Recipe Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr 80px',
                gap: '20px',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: `1px solid ${theme.silver}`,
                backgroundColor: index % 2 === 0 ? theme.white : theme.seasalt,
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = theme.teaGreen + '40';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = index % 2 === 0 ? theme.white : theme.seasalt;
              }}
              >
                <div style={{
                  fontWeight: '600',
                  color: theme.gunmetal,
                  fontSize: '14px'
                }}>
                  {recipe.name}
                </div>
                <div style={{
                  textAlign: 'center',
                  color: theme.charcoal,
                  fontSize: '13px',
                  fontWeight: '500'
                }}>
                  {recipe.category}
                </div>
                <div style={{
                  textAlign: 'center',
                  fontWeight: '600',
                  color: theme.gunmetal,
                  fontSize: '14px'
                }}>
                  {formatCurrency(recipe.costPerServing)}
                </div>
                <div style={{
                  textAlign: 'center',
                  fontWeight: '600',
                  color: theme.gunmetal,
                  fontSize: '14px'
                }}>
                  {formatCurrency(recipe.menuPrice)}
                </div>
                <div style={{
                  textAlign: 'center',
                  fontWeight: '600',
                  color: recipe.margin > 0 ? theme.yellowGreen : theme.silver,
                  fontSize: '14px'
                }}>
                  {formatCurrency(recipe.margin)}
                </div>
                <div style={{
                  textAlign: 'center',
                  fontWeight: '600',
                  color: recipe.foodCostPercent < 30 ? theme.yellowGreen : 
                        recipe.foodCostPercent < 35 ? theme.charcoal : '#e74c3c',
                  fontSize: '14px'
                }}>
                  {recipe.foodCostPercent.toFixed(1)}%
                </div>
                <div style={{
                  textAlign: 'center',
                  fontWeight: '600',
                  color: recipe.marginPercent > 70 ? theme.yellowGreen : 
                        recipe.marginPercent > 65 ? theme.charcoal : '#e74c3c',
                  fontSize: '14px'
                }}>
                  {recipe.marginPercent.toFixed(1)}%
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => toggleRecipeExpansion(recipe.id)}
                    style={{
                      background: 'none',
                      border: `1px solid ${theme.silver}`,
                      borderRadius: '4px',
                      width: '32px',
                      height: '32px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme.charcoal,
                      fontSize: '14px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = theme.teaGreen + '40';
                      e.currentTarget.style.borderColor = theme.yellowGreen;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = theme.silver;
                    }}
                  >
                    {expandedRecipe === recipe.id ? '−' : '+'}
                  </button>
                </div>
              </div>

              {/* Expanded Recipe Details */}
              {expandedRecipe === recipe.id && (
                <div style={{
                  padding: '24px',
                  backgroundColor: theme.seasalt,
                  borderBottom: `1px solid ${theme.silver}`
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '32px'
                  }}>
                    {/* Left Column - Recipe Ingredients */}
                    <div>
                      <h4 style={{
                        margin: '0 0 16px 0',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: theme.gunmetal
                      }}>
                        Recipe Ingredients
                      </h4>
                      <div style={{
                        backgroundColor: theme.white,
                        borderRadius: '8px',
                        padding: '16px',
                        border: `1px solid ${theme.silver}`
                      }}>
                        {recipe.ingredients && recipe.ingredients.length > 0 ? (
                          recipe.ingredients.map((ingredient, idx) => (
                            <div key={idx} style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '8px 0',
                              borderBottom: idx < recipe.ingredients.length - 1 ? `1px solid ${theme.silver}` : 'none'
                            }}>
                              <div>
                                <span style={{ 
                                  fontWeight: '500',
                                  color: theme.gunmetal,
                                  fontSize: '14px'
                                }}>
                                  {ingredient.name}
                                </span>
                                <div style={{
                                  fontSize: '12px',
                                  color: theme.charcoal,
                                  marginTop: '2px'
                                }}>
                                  {ingredient.quantity} {ingredient.unit}
                                </div>
                              </div>
                              <div style={{
                                fontWeight: '600',
                                color: theme.gunmetal,
                                fontSize: '14px'
                              }}>
                                {formatCurrency(ingredient.cost || 0)}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div style={{
                            textAlign: 'center',
                            color: theme.charcoal,
                            fontSize: '14px',
                            fontStyle: 'italic',
                            padding: '16px 0'
                          }}>
                            No ingredients data available
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Column - Cost Analysis */}
                    <div>
                      <h4 style={{
                        margin: '0 0 16px 0',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: theme.gunmetal
                      }}>
                        Cost Analysis
                      </h4>
                      <div style={{
                        backgroundColor: theme.white,
                        borderRadius: '8px',
                        padding: '16px',
                        border: `1px solid ${theme.silver}`
                      }}>
                        <div style={{
                          display: 'grid',
                          gap: '12px'
                        }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <span style={{
                              fontSize: '14px',
                              color: theme.charcoal,
                              fontWeight: '500'
                            }}>
                              Servings:
                            </span>
                            <span style={{
                              fontSize: '14px',
                              fontWeight: '600',
                              color: theme.gunmetal
                            }}>
                              {recipe.servings || 'N/A'}
                            </span>
                          </div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <span style={{
                              fontSize: '14px',
                              color: theme.charcoal,
                              fontWeight: '500'
                            }}>
                              Total Recipe Cost:
                            </span>
                            <span style={{
                              fontSize: '14px',
                              fontWeight: '600',
                              color: theme.gunmetal
                            }}>
                              {formatCurrency((recipe.costPerServing || 0) * (recipe.servings || 1))}
                            </span>
                          </div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <span style={{
                              fontSize: '14px',
                              color: theme.charcoal,
                              fontWeight: '500'
                            }}>
                              Cost per Serving:
                            </span>
                            <span style={{
                              fontSize: '14px',
                              fontWeight: '600',
                              color: theme.gunmetal
                            }}>
                              {formatCurrency(recipe.costPerServing)}
                            </span>
                          </div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <span style={{
                              fontSize: '14px',
                              color: theme.charcoal,
                              fontWeight: '500'
                            }}>
                              Menu Price:
                            </span>
                            <span style={{
                              fontSize: '14px',
                              fontWeight: '600',
                              color: theme.gunmetal
                            }}>
                              {formatCurrency(recipe.menuPrice)}
                            </span>
                          </div>
                          <div style={{
                            height: '1px',
                            backgroundColor: theme.silver,
                            margin: '8px 0'
                          }}></div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <span style={{
                              fontSize: '14px',
                              color: theme.charcoal,
                              fontWeight: '600'
                            }}>
                              Gross Margin:
                            </span>
                            <span style={{
                              fontSize: '16px',
                              fontWeight: '700',
                              color: recipe.margin > 0 ? theme.yellowGreen : '#e74c3c'
                            }}>
                              {formatCurrency(recipe.margin)}
                            </span>
                          </div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <span style={{
                              fontSize: '14px',
                              color: theme.charcoal,
                              fontWeight: '600'
                            }}>
                              Food Cost %:
                            </span>
                            <span style={{
                              fontSize: '16px',
                              fontWeight: '700',
                              color: recipe.foodCostPercent < 30 ? theme.yellowGreen : 
                                    recipe.foodCostPercent < 35 ? theme.charcoal : '#e74c3c'
                            }}>
                              {recipe.foodCostPercent.toFixed(1)}%
                            </span>
                          </div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <span style={{
                              fontSize: '14px',
                              color: theme.charcoal,
                              fontWeight: '600'
                            }}>
                              Margin %:
                            </span>
                            <span style={{
                              fontSize: '16px',
                              fontWeight: '700',
                              color: recipe.marginPercent > 70 ? theme.yellowGreen : 
                                    recipe.marginPercent > 65 ? theme.charcoal : '#e74c3c'
                            }}>
                              {recipe.marginPercent.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerRecipeTab;
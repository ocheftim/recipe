import React, { useState, useMemo } from 'react';
import { formatCurrency } from '../../utils/formatters';
import PerRecipeTab from './PerRecipeTab';

const RecipeCostAnalysisModal = ({ recipes, isOpen, onClose, theme }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // Calculate analysis data
  const analysisData = useMemo(() => {
    if (!recipes || recipes.length === 0) return null;

    const totalRecipes = recipes.length;
    const avgCostPerServing = recipes.reduce((sum, r) => sum + (r.costPerServing || 0), 0) / totalRecipes;
    const avgFoodCostPercent = recipes.reduce((sum, r) => sum + (r.foodCostPercent || 0), 0) / totalRecipes;
    const avgMenuPrice = recipes.reduce((sum, r) => sum + (r.menuPrice || 0), 0) / totalRecipes;

    // Enhanced recipes with calculated fields
    const enhancedRecipes = recipes.map(recipe => ({
      ...recipe,
      margin: (recipe.menuPrice || 0) - (recipe.costPerServing || 0),
      marginPercent: recipe.menuPrice && recipe.costPerServing ? 
        ((recipe.menuPrice - recipe.costPerServing) / recipe.menuPrice) * 100 : 0,
      foodCostPercent: recipe.menuPrice && recipe.costPerServing ? 
        (recipe.costPerServing / recipe.menuPrice) * 100 : 0,
      profitability: recipe.menuPrice && recipe.costPerServing ? 
        recipe.menuPrice - recipe.costPerServing : 0
    }));

    // Sort recipes
    const sortedRecipes = [...enhancedRecipes].sort((a, b) => {
      let aVal, bVal;
      
      switch (sortBy) {
        case 'name':
          aVal = a.name || '';
          bVal = b.name || '';
          break;
        case 'category':
          aVal = a.category || '';
          bVal = b.category || '';
          break;
        case 'costPerServing':
          aVal = a.costPerServing || 0;
          bVal = b.costPerServing || 0;
          break;
        case 'menuPrice':
          aVal = a.menuPrice || 0;
          bVal = b.menuPrice || 0;
          break;
        case 'margin':
          aVal = a.margin || 0;
          bVal = b.margin || 0;
          break;
        case 'foodCostPercent':
          aVal = a.foodCostPercent || 0;
          bVal = b.foodCostPercent || 0;
          break;
        case 'marginPercent':
          aVal = a.marginPercent || 0;
          bVal = b.marginPercent || 0;
          break;
        default:
          return 0;
      }
      
      if (typeof aVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      } else {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
    });

    // Category statistics
    const categoryStats = recipes.reduce((acc, recipe) => {
      const category = recipe.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = {
          count: 0,
          totalCost: 0,
          totalMenuPrice: 0,
          totalMargin: 0,
          recipes: []
        };
      }
      
      acc[category].count++;
      acc[category].totalCost += recipe.costPerServing || 0;
      acc[category].totalMenuPrice += recipe.menuPrice || 0;
      acc[category].totalMargin += (recipe.menuPrice || 0) - (recipe.costPerServing || 0);
      acc[category].recipes.push(recipe);
      
      return acc;
    }, {});

    // Process category stats
    const processedCategories = Object.entries(categoryStats).map(([category, stats]) => {
      const avgCost = stats.totalCost / stats.count;
      const avgPrice = stats.totalMenuPrice / stats.count;
      const avgMargin = stats.totalMargin / stats.count;
      const avgFoodCostPercent = avgPrice > 0 ? (avgCost / avgPrice) * 100 : 0;
      
      return {
        name: category,
        count: stats.count,
        avgCost,
        avgPrice,
        avgMargin,
        avgFoodCostPercent,
        totalRevenue: stats.totalMenuPrice,
        recipes: stats.recipes
      };
    });

    return {
      totalRecipes,
      avgCostPerServing,
      avgFoodCostPercent,
      avgMenuPrice,
      enhancedRecipes,
      sortedRecipes,
      categories: processedCategories,
      overview: {
        totalRecipes,
        avgCostPerServing,
        avgFoodCostPercent,
        avgMenuPrice,
        totalRevenue: recipes.reduce((sum, r) => sum + (r.menuPrice || 0), 0),
        totalCost: recipes.reduce((sum, r) => sum + (r.costPerServing || 0), 0),
        avgMargin: recipes.reduce((sum, r) => sum + ((r.menuPrice || 0) - (r.costPerServing || 0)), 0) / totalRecipes
      }
    };
  }, [recipes, sortBy, sortDirection]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const toggleRecipeExpansion = (recipeId) => {
    setExpandedRecipe(expandedRecipe === recipeId ? null : recipeId);
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return '▲';
    return sortDirection === 'asc' ? '▲' : '▼';
  };

  const StatCard = ({ icon: Icon, title, value, subtitle }) => (
    <div style={{
      backgroundColor: theme.white,
      border: `1px solid ${theme.silver}`,
      borderRadius: '8px',
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      {Icon && <Icon size={24} color={theme.charcoal} />}
      <div>
        <div style={{
          fontSize: '12px',
          color: theme.charcoal,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontWeight: '600',
          marginBottom: '4px'
        }}>
          {title}
        </div>
        <div style={{
          fontSize: '20px',
          fontWeight: '700',
          color: theme.gunmetal,
          marginBottom: subtitle ? '2px' : '0'
        }}>
          {value}
        </div>
        {subtitle && (
          <div style={{
            fontSize: '11px',
            color: theme.charcoal,
            fontWeight: '500'
          }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );

  if (!isOpen || !analysisData) return null;

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
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: theme.white,
        borderRadius: '12px',
        width: '95%',
        maxWidth: '1400px',
        height: '90%',
        maxHeight: '800px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: `1px solid ${theme.silver}`
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: '600',
            color: theme.gunmetal
          }}>
            Recipe Cost Analysis
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: theme.charcoal,
              padding: '4px 8px',
              borderRadius: '4px',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = theme.silver + '40'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ 
          flex: 1, 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            borderBottom: `1px solid ${theme.silver}`,
            backgroundColor: theme.seasalt
          }}>
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'perRecipe', label: 'Per Recipe' },
              { key: 'categories', label: 'By Category' },
              { key: 'performers', label: 'Top/Bottom Performers' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '16px 24px',
                  border: 'none',
                  backgroundColor: activeTab === tab.key ? theme.white : 'transparent',
                  color: activeTab === tab.key ? theme.gunmetal : theme.charcoal,
                  fontWeight: activeTab === tab.key ? '600' : '400',
                  fontSize: '14px',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab.key ? `2px solid ${theme.yellowGreen}` : 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  if (activeTab !== tab.key) {
                    e.target.style.backgroundColor = theme.silver + '20';
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab.key) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{
            flex: 1,
            overflow: 'auto',
            padding: '24px'
          }}>
            {activeTab === 'overview' && (
              <div>
                {/* Overview Stats */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  marginBottom: '32px'
                }}>
                  <StatCard
                    title="Total Recipes"
                    value={analysisData.overview.totalRecipes}
                  />
                  <StatCard
                    title="Avg Cost/Serving"
                    value={formatCurrency(analysisData.overview.avgCostPerServing)}
                  />
                  <StatCard
                    title="Avg Menu Price"
                    value={formatCurrency(analysisData.overview.avgMenuPrice)}
                  />
                  <StatCard
                    title="Avg Margin"
                    value={formatCurrency(analysisData.overview.avgMargin)}
                  />
                  <StatCard
                    title="Avg Food Cost %"
                    value={`${analysisData.overview.avgFoodCostPercent.toFixed(1)}%`}
                    subtitle={analysisData.overview.avgFoodCostPercent < 30 ? 'Excellent' : 
                             analysisData.overview.avgFoodCostPercent < 35 ? 'Good' : 'Needs Improvement'}
                  />
                  <StatCard
                    title="Total Revenue"
                    value={formatCurrency(analysisData.overview.totalRevenue)}
                    subtitle="If all recipes sold once"
                  />
                </div>

                {/* Quick Insights */}
                <div style={{
                  backgroundColor: theme.seasalt,
                  borderRadius: '8px',
                  padding: '20px',
                  marginBottom: '24px'
                }}>
                  <h3 style={{
                    margin: '0 0 16px 0',
                    fontSize: '18px',
                    fontWeight: '600',
                    color: theme.gunmetal
                  }}>
                    Quick Insights
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px'
                  }}>
                    <div>
                      <h4 style={{
                        margin: '0 0 8px 0',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: theme.charcoal
                      }}>
                        Cost Distribution
                      </h4>
                      <div style={{ fontSize: '13px', color: theme.charcoal, lineHeight: '1.5' }}>
                        • Highest cost recipe: {formatCurrency(Math.max(...analysisData.enhancedRecipes.map(r => r.costPerServing || 0)))}
                        <br />
                        • Lowest cost recipe: {formatCurrency(Math.min(...analysisData.enhancedRecipes.map(r => r.costPerServing || 0)))}
                        <br />
                        • Cost range: {formatCurrency(Math.max(...analysisData.enhancedRecipes.map(r => r.costPerServing || 0)) - Math.min(...analysisData.enhancedRecipes.map(r => r.costPerServing || 0)))}
                      </div>
                    </div>
                    <div>
                      <h4 style={{
                        margin: '0 0 8px 0',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: theme.charcoal
                      }}>
                        Profitability
                      </h4>
                      <div style={{ fontSize: '13px', color: theme.charcoal, lineHeight: '1.5' }}>
                        • Most profitable: {formatCurrency(Math.max(...analysisData.enhancedRecipes.map(r => r.margin || 0)))}
                        <br />
                        • Least profitable: {formatCurrency(Math.min(...analysisData.enhancedRecipes.map(r => r.margin || 0)))}
                        <br />
                        • Recipes with good margins (>70%): {analysisData.enhancedRecipes.filter(r => r.marginPercent > 70).length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'perRecipe' && (
              <PerRecipeTab
                analysisData={analysisData}
                expandedRecipe={expandedRecipe}
                setExpandedRecipe={setExpandedRecipe}
                sortBy={sortBy}
                sortDirection={sortDirection}
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                theme={theme}
              />
            )}

            {activeTab === 'categories' && (
              <div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '16px'
                }}>
                  {analysisData.categories.map(category => (
                    <div key={category.name} style={{
                      backgroundColor: theme.white,
                      border: `1px solid ${theme.silver}`,
                      borderRadius: '8px',
                      padding: '20px'
                    }}>
                      <h3 style={{
                        margin: '0 0 16px 0',
                        fontSize: '18px',
                        fontWeight: '600',
                        color: theme.gunmetal
                      }}>
                        {category.name}
                      </h3>
                      <div style={{
                        display: 'grid',
                        gap: '8px',
                        fontSize: '14px'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                          <span style={{ color: theme.charcoal }}>Recipes:</span>
                          <span style={{ fontWeight: '600', color: theme.gunmetal }}>{category.count}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                          <span style={{ color: theme.charcoal }}>Avg Cost:</span>
                          <span style={{ fontWeight: '600', color: theme.gunmetal }}>{formatCurrency(category.avgCost)}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                          <span style={{ color: theme.charcoal }}>Avg Price:</span>
                          <span style={{ fontWeight: '600', color: theme.gunmetal }}>{formatCurrency(category.avgPrice)}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                          <span style={{ color: theme.charcoal }}>Avg Margin:</span>
                          <span style={{ 
                            fontWeight: '600', 
                            color: category.avgMargin > 0 ? theme.yellowGreen : '#e74c3c' 
                          }}>
                            {formatCurrency(category.avgMargin)}
                          </span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                          <span style={{ color: theme.charcoal }}>Food Cost %:</span>
                          <span style={{ 
                            fontWeight: '600', 
                            color: category.avgFoodCostPercent < 30 ? theme.yellowGreen : 
                                  category.avgFoodCostPercent < 35 ? theme.charcoal : '#e74c3c'
                          }}>
                            {category.avgFoodCostPercent.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'performers' && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '32px'
              }}>
                {/* Top Performers */}
                <div>
                  <h3 style={{
                    margin: '0 0 20px 0',
                    fontSize: '20px',
                    fontWeight: '600',
                    color: theme.gunmetal
                  }}>
                    Top Performers
                  </h3>
                  
                  {/* Most Profitable */}
                  <div style={{
                    backgroundColor: theme.white,
                    border: `1px solid ${theme.silver}`,
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '16px'
                  }}>
                    <h4 style={{
                      margin: '0 0 12px 0',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: theme.charcoal,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Most Profitable
                    </h4>
                    {analysisData.enhancedRecipes
                      .sort((a, b) => (b.margin || 0) - (a.margin || 0))
                      .slice(0, 5)
                      .map((recipe, index) => (
                        <div key={recipe.id || index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 0',
                          borderBottom: index < 4 ? `1px solid ${theme.silver}` : 'none'
                        }}>
                          <div>
                            <div style={{
                              fontWeight: '500',
                              color: theme.gunmetal,
                              fontSize: '14px'
                            }}>
                              {recipe.name}
                            </div>
                            <div style={{
                              fontSize: '12px',
                              color: theme.charcoal
                            }}>
                              {recipe.category}
                            </div>
                          </div>
                          <div style={{
                            fontWeight: '600',
                            color: theme.yellowGreen,
                            fontSize: '14px'
                          }}>
                            {formatCurrency(recipe.margin || 0)}
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Best Food Cost % */}
                  <div style={{
                    backgroundColor: theme.white,
                    border: `1px solid ${theme.silver}`,
                    borderRadius: '8px',
                    padding: '16px'
                  }}>
                    <h4 style={{
                      margin: '0 0 12px 0',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: theme.charcoal,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Best Food Cost %
                    </h4>
                    {analysisData.enhancedRecipes
                      .sort((a, b) => (a.foodCostPercent || 100) - (b.foodCostPercent || 100))
                      .slice(0, 5)
                      .map((recipe, index) => (
                        <div key={recipe.id || index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 0',
                          borderBottom: index < 4 ? `1px solid ${theme.silver}` : 'none'
                        }}>
                          <div>
                            <div style={{
                              fontWeight: '500',
                              color: theme.gunmetal,
                              fontSize: '14px'
                            }}>
                              {recipe.name}
                            </div>
                            <div style={{
                              fontSize: '12px',
                              color: theme.charcoal
                            }}>
                              {recipe.category}
                            </div>
                          </div>
                          <div style={{
                            fontWeight: '600',
                            color: theme.yellowGreen,
                            fontSize: '14px'
                          }}>
                            {(recipe.foodCostPercent || 0).toFixed(1)}%
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Bottom Performers */}
                <div>
                  <h3 style={{
                    margin: '0 0 20px 0',
                    fontSize: '20px',
                    fontWeight: '600',
                    color: theme.gunmetal
                  }}>
                    Needs Improvement
                  </h3>
                  
                  {/* Least Profitable */}
                  <div style={{
                    backgroundColor: theme.white,
                    border: `1px solid ${theme.silver}`,
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '16px'
                  }}>
                    <h4 style={{
                      margin: '0 0 12px 0',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: theme.charcoal,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Least Profitable
                    </h4>
                    {analysisData.enhancedRecipes
                      .sort((a, b) => (a.margin || 0) - (b.margin || 0))
                      .slice(0, 5)
                      .map((recipe, index) => (
                        <div key={recipe.id || index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 0',
                          borderBottom: index < 4 ? `1px solid ${theme.silver}` : 'none'
                        }}>
                          <div>
                            <div style={{
                              fontWeight: '500',
                              color: theme.gunmetal,
                              fontSize: '14px'
                            }}>
                              {recipe.name}
                            </div>
                            <div style={{
                              fontSize: '12px',
                              color: theme.charcoal
                            }}>
                              {recipe.category}
                            </div>
                          </div>
                          <div style={{
                            fontWeight: '600',
                            color: '#e74c3c',
                            fontSize: '14px'
                          }}>
                            {formatCurrency(recipe.margin || 0)}
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Worst Food Cost % */}
                  <div style={{
                    backgroundColor: theme.white,
                    border: `1px solid ${theme.silver}`,
                    borderRadius: '8px',
                    padding: '16px'
                  }}>
                    <h4 style={{
                      margin: '0 0 12px 0',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: theme.charcoal,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Highest Food Cost %
                    </h4>
                    {analysisData.enhancedRecipes
                      .sort((a, b) => (b.foodCostPercent || 0) - (a.foodCostPercent || 0))
                      .slice(0, 5)
                      .map((recipe, index) => (
                        <div key={recipe.id || index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 0',
                          borderBottom: index < 4 ? `1px solid ${theme.silver}` : 'none'
                        }}>
                          <div>
                            <div style={{
                              fontWeight: '500',
                              color: theme.gunmetal,
                              fontSize: '14px'
                            }}>
                              {recipe.name}
                            </div>
                            <div style={{
                              fontSize: '12px',
                              color: theme.charcoal
                            }}>
                              {recipe.category}
                            </div>
                          </div>
                          <div style={{
                            fontWeight: '600',
                            color: '#e74c3c',
                            fontSize: '14px'
                          }}>
                            {(recipe.foodCostPercent || 0).toFixed(1)}%
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCostAnalysisModal;
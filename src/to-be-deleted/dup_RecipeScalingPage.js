import React, { useState, useEffect } from 'react';

const TOQUEWORKS_THEME = {
  gunmetal: '#1F2D38',
  charcoal: '#2A3E51', 
  silver: '#BBBFC2',
  yellowGreen: '#8AC732',
  teaGreen: '#C0E095',
  seasalt: '#F6F8F8',
  white: '#FFFFFF',
  green: '#10B981',
  red: '#EF4444', 
  orange: '#F59E0B',
  lightGray: '#E5E7EB',
  dimGray: '#6B7280'
};

const RecipeScalingPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [scalingFactor, setScalingFactor] = useState(1);
  const [targetServings, setTargetServings] = useState('');
  const [scaledIngredients, setScaledIngredients] = useState([]);
  const [showScaledRecipe, setShowScaledRecipe] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Load recipes from localStorage with error handling
  useEffect(() => {
    try {
      const savedRecipes = localStorage.getItem('toqueworks_recipes');
      if (savedRecipes) {
        const parsedRecipes = JSON.parse(savedRecipes);
        console.log('Loaded recipes:', parsedRecipes); // Debug log
        setRecipes(Array.isArray(parsedRecipes) ? parsedRecipes : []);
      } else {
        console.log('No recipes found in localStorage'); // Debug log
        // Create sample recipes for testing if none exist
        const sampleRecipes = [
          {
            id: 1,
            name: "Classic Marinara Sauce",
            category: "Sauce",
            servings: 4,
            ingredients: [
              { name: "Tomatoes", quantity: "2", unit: "lbs" },
              { name: "Onion", quantity: "1", unit: "medium" },
              { name: "Garlic", quantity: "3", unit: "cloves" },
              { name: "Olive Oil", quantity: "2", unit: "tbsp" }
            ]
          },
          {
            id: 2,
            name: "Chicken Soup",
            category: "Soup",
            servings: 6,
            ingredients: [
              { name: "Chicken Breast", quantity: "1", unit: "lb" },
              { name: "Carrots", quantity: "2", unit: "cups" },
              { name: "Celery", quantity: "1", unit: "cup" },
              { name: "Chicken Broth", quantity: "4", unit: "cups" }
            ]
          }
        ];
        setRecipes(sampleRecipes);
        localStorage.setItem('toqueworks_recipes', JSON.stringify(sampleRecipes));
      }
    } catch (error) {
      console.error('Error loading recipes:', error);
      setRecipes([]);
    }
  }, []);

  // Calculate scaling when recipe or factor changes
  useEffect(() => {
    if (selectedRecipe && scalingFactor > 0) {
      const scaled = selectedRecipe.ingredients.map(ingredient => ({
        ...ingredient,
        scaledQuantity: (parseFloat(ingredient.quantity) * scalingFactor).toFixed(2),
        originalQuantity: ingredient.quantity
      }));
      setScaledIngredients(scaled);
    }
  }, [selectedRecipe, scalingFactor]);

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
    setTargetServings(recipe.servings || 4);
    setScalingFactor(1);
    setShowScaledRecipe(false);
  };

  const handleServingsChange = (newServings) => {
    setTargetServings(newServings);
    if (selectedRecipe && selectedRecipe.servings) {
      const factor = newServings / selectedRecipe.servings;
      setScalingFactor(factor);
    }
  };

  const handleFactorChange = (newFactor) => {
    setScalingFactor(newFactor);
    if (selectedRecipe && selectedRecipe.servings) {
      const newServings = Math.round(selectedRecipe.servings * newFactor);
      setTargetServings(newServings);
    }
  };

  const handleScale = () => {
    setShowScaledRecipe(true);
  };

  const handleSaveScaledRecipe = () => {
    if (!selectedRecipe) return;
    
    const scaledRecipe = {
      ...selectedRecipe,
      id: Date.now(),
      name: `${selectedRecipe.name} (Scaled x${scalingFactor.toFixed(2)})`,
      servings: parseInt(targetServings),
      ingredients: scaledIngredients.map(ing => ({
        ...ing,
        quantity: ing.scaledQuantity
      })),
      notes: `${selectedRecipe.notes || ''}\n\nScaled from original recipe (${selectedRecipe.servings} servings) by factor of ${scalingFactor.toFixed(2)}`
    };

    const updatedRecipes = [...recipes, scaledRecipe];
    setRecipes(updatedRecipes);
    localStorage.setItem('toqueworks_recipes', JSON.stringify(updatedRecipes));
    
    alert('Scaled recipe saved successfully!');
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      padding: '24px',
      backgroundColor: TOQUEWORKS_THEME.seasalt,
      minHeight: '100vh'
    }}>
      {/* Page Header */}
      <div style={{
        backgroundColor: TOQUEWORKS_THEME.white,
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{
              margin: 0,
              fontSize: '28px',
              fontWeight: '600',
              color: TOQUEWORKS_THEME.gunmetal
            }}>
              Recipe Scaling
            </h1>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '14px',
            color: TOQUEWORKS_THEME.silver
          }}>
            Professional Recipe Scaling Tools
          </div>
        </div>
        
        <p style={{
          margin: 0,
          color: TOQUEWORKS_THEME.charcoal,
          fontSize: '16px'
        }}>
          Scale recipes up or down while maintaining perfect proportions for consistent results.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedRecipe ? '1fr 1fr' : '1fr',
        gap: '24px'
      }}>
        {/* Recipe Selection */}
        <div style={{
          backgroundColor: TOQUEWORKS_THEME.white,
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '20px 24px',
            backgroundColor: TOQUEWORKS_THEME.seasalt,
            borderBottom: `1px solid ${TOQUEWORKS_THEME.lightGray}`
          }}>
            <h3 style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: '600',
              color: TOQUEWORKS_THEME.gunmetal,
              marginBottom: '16px'
            }}>
              Select Recipe to Scale
            </h3>
            
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${TOQUEWORKS_THEME.lightGray}`,
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>
          
          <div style={{
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {filteredRecipes.length === 0 ? (
              <div style={{
                padding: '40px',
                textAlign: 'center',
                color: TOQUEWORKS_THEME.silver
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px',
                  color: TOQUEWORKS_THEME.silver
                }}>
                  📚
                </div>
                <p>No recipes found. Create some recipes first!</p>
              </div>
            ) : (
              filteredRecipes.map(recipe => (
                <div
                  key={recipe.id}
                  onClick={() => handleRecipeSelect(recipe)}
                  style={{
                    padding: '16px 24px',
                    borderBottom: `1px solid ${TOQUEWORKS_THEME.lightGray}`,
                    cursor: 'pointer',
                    backgroundColor: selectedRecipe?.id === recipe.id ? TOQUEWORKS_THEME.teaGreen : 'transparent',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => {
                    if (selectedRecipe?.id !== recipe.id) {
                      e.target.style.backgroundColor = TOQUEWORKS_THEME.seasalt;
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedRecipe?.id !== recipe.id) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{
                        margin: 0,
                        fontSize: '16px',
                        fontWeight: '600',
                        color: TOQUEWORKS_THEME.gunmetal,
                        marginBottom: '4px'
                      }}>
                        {recipe.name}
                      </h4>
                      <div style={{
                        display: 'flex',
                        gap: '16px',
                        fontSize: '14px',
                        color: TOQUEWORKS_THEME.silver
                      }}>
                        <span>{recipe.category}</span>
                        <span>{recipe.servings} servings</span>
                      </div>
                    </div>
                    {selectedRecipe?.id === recipe.id && (
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: TOQUEWORKS_THEME.yellowGreen
                      }} />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Scaling Controls & Results */}
        {selectedRecipe && (
          <div style={{
            backgroundColor: TOQUEWORKS_THEME.white,
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '20px 24px',
              backgroundColor: TOQUEWORKS_THEME.seasalt,
              borderBottom: `1px solid ${TOQUEWORKS_THEME.lightGray}`
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: '600',
                color: TOQUEWORKS_THEME.gunmetal,
                marginBottom: '8px'
              }}>
                Scale: {selectedRecipe.name}
              </h3>
              <p style={{
                margin: 0,
                fontSize: '14px',
                color: TOQUEWORKS_THEME.silver
              }}>
                Original: {selectedRecipe.servings} servings
              </p>
            </div>
            
            <div style={{ padding: '24px' }}>
              {/* Scaling Controls */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: TOQUEWORKS_THEME.gunmetal,
                    marginBottom: '8px'
                  }}>
                    Target Servings
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="number"
                      value={targetServings}
                      onChange={(e) => handleServingsChange(parseInt(e.target.value) || 1)}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        border: `1px solid ${TOQUEWORKS_THEME.lightGray}`,
                        borderRadius: '6px',
                        textAlign: 'center',
                        fontSize: '16px',
                        fontWeight: '600'
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: TOQUEWORKS_THEME.gunmetal,
                    marginBottom: '8px'
                  }}>
                    Scaling Factor
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={scalingFactor.toFixed(2)}
                    onChange={(e) => handleFactorChange(parseFloat(e.target.value) || 1)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: `1px solid ${TOQUEWORKS_THEME.lightGray}`,
                      borderRadius: '6px',
                      textAlign: 'center',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  />
                </div>
              </div>

              {/* Quick Scale Buttons */}
              <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '24px',
                flexWrap: 'wrap'
              }}>
                {[0.5, 1, 1.5, 2, 3, 4].map(factor => (
                  <button
                    key={factor}
                    onClick={() => handleFactorChange(factor)}
                    style={{
                      padding: '8px 16px',
                      border: `1px solid ${scalingFactor === factor ? TOQUEWORKS_THEME.yellowGreen : TOQUEWORKS_THEME.lightGray}`,
                      borderRadius: '20px',
                      backgroundColor: scalingFactor === factor ? TOQUEWORKS_THEME.teaGreen : TOQUEWORKS_THEME.white,
                      color: TOQUEWORKS_THEME.gunmetal,
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    {factor}x
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '24px'
              }}>
                <button
                  onClick={handleScale}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: TOQUEWORKS_THEME.yellowGreen,
                    color: TOQUEWORKS_THEME.white,
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#7AB429'}
                  onMouseOut={(e) => e.target.style.backgroundColor = TOQUEWORKS_THEME.yellowGreen}
                >
                  Calculate Scale
                </button>
                
                {showScaledRecipe && (
                  <button
                    onClick={handleSaveScaledRecipe}
                    style={{
                      padding: '12px',
                      backgroundColor: TOQUEWORKS_THEME.green,
                      color: TOQUEWORKS_THEME.white,
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    Save
                  </button>
                )}
              </div>

              {/* Scaled Ingredients Display */}
              {showScaledRecipe && scaledIngredients.length > 0 && (
                <div style={{
                  border: `1px solid ${TOQUEWORKS_THEME.lightGray}`,
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '12px 16px',
                    backgroundColor: TOQUEWORKS_THEME.seasalt,
                    borderBottom: `1px solid ${TOQUEWORKS_THEME.lightGray}`,
                    fontSize: '14px',
                    fontWeight: '600',
                    color: TOQUEWORKS_THEME.gunmetal
                  }}>
                    Scaled Ingredients ({targetServings} servings)
                  </div>
                  
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {scaledIngredients.map((ingredient, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '12px 16px',
                          borderBottom: index < scaledIngredients.length - 1 ? `1px solid ${TOQUEWORKS_THEME.lightGray}` : 'none',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <span style={{
                          color: TOQUEWORKS_THEME.gunmetal,
                          fontWeight: '500'
                        }}>
                          {ingredient.name}
                        </span>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '14px'
                        }}>
                          <span style={{
                            color: TOQUEWORKS_THEME.silver,
                            textDecoration: 'line-through'
                          }}>
                            {ingredient.originalQuantity} {ingredient.unit}
                          </span>
                          <span style={{
                            color: TOQUEWORKS_THEME.yellowGreen,
                            fontWeight: '600'
                          }}>
                            {ingredient.scaledQuantity} {ingredient.unit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeScalingPage;
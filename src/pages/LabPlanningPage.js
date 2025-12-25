// LabPlanningPage.js - Instructor Lab Session Planning
import React, { useState, useMemo, useEffect } from 'react';
import recipesData from '../data/quickBreadsRecipesEnhanced';
import { shamrockMapping } from '../data/shamrockMapping';
import STYLES from '../styles/globalStyles';

// Destructure from default import
const { quickBreadsRecipesEnhanced, acfefStandards } = recipesData;

const {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BUTTONS,
  FORMS,
  TABLES
} = STYLES;

// Get settings
const getSettings = () => {
  const saved = localStorage.getItem('toqueworks_settings');
  return saved ? JSON.parse(saved) : {
    labBudgetPerClass: 150.00,
    defaultClassSize: 12,
    defaultStudentPairing: 'pairs',
    maxServingsPerPair: 6,
    vendorMarkup: 0
  };
};

// Get classes
const getClasses = () => {
  const saved = localStorage.getItem('toqueworks_classes');
  return saved ? JSON.parse(saved) : [
    { id: 'CUL140', code: 'CUL 140', name: 'Baking & Pastry Fundamentals', weeks: 16, budget: 150.00 }
  ];
};

// Calculate ingredient cost
const calculateIngredientCost = (recipe, scaleFactor = 1) => {
  const settings = getSettings();
  const markup = 1 + (settings.vendorMarkup / 100);
  
  return recipe.ingredients.reduce((sum, ing) => {
    const shamrockItem = shamrockMapping[ing.name];
    if (shamrockItem) {
      return sum + (ing.quantity * scaleFactor * shamrockItem.pricePerUnit * markup);
    }
    return sum;
  }, 0);
};

const LabPlanningPage = () => {
  const [classes] = useState(getClasses());
  const [selectedClass, setSelectedClass] = useState(classes[0]?.id || '');
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [classSize, setClassSize] = useState(12);
  const [pairingMode, setPairingMode] = useState('pairs');

  const localStyles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: SPACING.xxl,
      backgroundColor: COLORS.background,
      minHeight: '100vh'
    },
    header: {
      marginBottom: SPACING.xl
    },
    h1: {
      fontSize: TYPOGRAPHY.fontSize.xxxl,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      color: COLORS.primary,
      margin: 0
    },
    selectionBar: {
      display: 'flex',
      gap: SPACING.lg,
      padding: SPACING.xl,
      backgroundColor: COLORS.lightBackground,
      borderRadius: SPACING.sm,
      border: `1px solid ${COLORS.border}`,
      marginBottom: SPACING.xl,
      alignItems: 'center'
    },
    selectGroup: {
      flex: 1
    },
    label: {
      ...FORMS.label,
      display: 'block',
      marginBottom: SPACING.sm,
      fontWeight: TYPOGRAPHY.fontWeight.semibold
    },
    select: {
      ...FORMS.select.base,
      width: '100%'
    },
    input: {
      ...FORMS.input.base,
      width: '100%'
    },
    budgetCard: {
      padding: SPACING.xl,
      backgroundColor: COLORS.background,
      border: `2px solid ${COLORS.border}`,
      borderRadius: SPACING.sm,
      marginBottom: SPACING.xl
    },
    budgetHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.lg
    },
    budgetBar: {
      height: '40px',
      backgroundColor: COLORS.lightBackground,
      borderRadius: SPACING.sm,
      overflow: 'hidden',
      position: 'relative',
      border: `1px solid ${COLORS.border}`
    },
    budgetFill: {
      height: '100%',
      transition: 'width 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      color: 'white'
    },
    recipesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: SPACING.lg,
      marginBottom: SPACING.xl
    },
    recipeCard: {
      padding: SPACING.lg,
      backgroundColor: COLORS.background,
      border: `1px solid ${COLORS.border}`,
      borderRadius: SPACING.sm,
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    recipeCardSelected: {
      borderColor: COLORS.accent,
      borderWidth: '2px',
      backgroundColor: COLORS.lightBackground
    },
    checkbox: {
      width: '18px',
      height: '18px',
      accentColor: COLORS.accent,
      cursor: 'pointer',
      marginRight: SPACING.sm
    },
    badge: {
      display: 'inline-block',
      padding: `${SPACING.xs} ${SPACING.sm}`,
      borderRadius: SPACING.xs,
      fontSize: TYPOGRAPHY.fontSize.xs,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      marginRight: SPACING.xs,
      marginBottom: SPACING.xs
    },
    competencySection: {
      marginTop: SPACING.xl,
      padding: SPACING.xl,
      backgroundColor: COLORS.lightBackground,
      borderRadius: SPACING.sm
    }
  };

  // Get current class info
  const currentClass = classes.find(c => c.id === selectedClass);
  const weeklyBudget = currentClass?.budget || 150;

  // Filter recipes for selected class/week
  const availableRecipes = useMemo(() => {
    // For now, showing all recipes
    // In production, filter by: recipe.assignedTo.some(a => a.classId === selectedClass && a.week === selectedWeek)
    return quickBreadsRecipesEnhanced;
  }, [selectedClass, selectedWeek]);

  // Calculate costs for selected recipes
  const labDetails = useMemo(() => {
    const recipes = availableRecipes.filter(r => selectedRecipes.includes(r.id));
    const totalCost = recipes.reduce((sum, r) => {
      const cost = calculateIngredientCost(r, 1);
      return sum + cost;
    }, 0);

    const budgetPercent = (totalCost / weeklyBudget * 100).toFixed(1);
    const withinBudget = totalCost <= weeklyBudget;

    // Collect ACFEF standards
    const allKnowledge = new Set();
    const allCompetencies = new Set();
    recipes.forEach(r => {
      r.acfefKnowledge?.forEach(k => allKnowledge.add(k));
      r.acfefCompetencies?.forEach(c => allCompetencies.add(c));
    });

    return {
      recipes,
      totalCost,
      budgetPercent,
      withinBudget,
      knowledgeCovered: Array.from(allKnowledge),
      competenciesCovered: Array.from(allCompetencies)
    };
  }, [selectedRecipes, availableRecipes, weeklyBudget]);

  const toggleRecipe = (recipeId) => {
    setSelectedRecipes(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const getBudgetColor = (percent) => {
    if (percent >= 100) return COLORS.error;
    if (percent >= 90) return COLORS.warning;
    return COLORS.success;
  };

  return (
    <div style={localStyles.container}>
      {/* Header */}
      <div style={localStyles.header}>
        <h1 style={localStyles.h1}>Lab Planning</h1>
        <p style={{ fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.secondary, marginTop: SPACING.sm }}>
          Select class, week, and recipes for your lab session
        </p>
      </div>

      {/* Class & Week Selection */}
      <div style={localStyles.selectionBar}>
        <div style={localStyles.selectGroup}>
          <label style={localStyles.label}>Class *</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            style={localStyles.select}
          >
            {classes.map(c => (
              <option key={c.id} value={c.id}>
                {c.code} - {c.name}
              </option>
            ))}
          </select>
        </div>

        <div style={localStyles.selectGroup}>
          <label style={localStyles.label}>Week *</label>
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
            style={localStyles.select}
          >
            {Array.from({ length: currentClass?.weeks || 16 }, (_, i) => i + 1).map(week => (
              <option key={week} value={week}>Week {week}</option>
            ))}
          </select>
        </div>

        <div style={localStyles.selectGroup}>
          <label style={localStyles.label}>Class Size</label>
          <input
            type="number"
            min="1"
            max="30"
            value={classSize}
            onChange={(e) => setClassSize(parseInt(e.target.value) || 12)}
            style={localStyles.input}
          />
        </div>

        <div style={localStyles.selectGroup}>
          <label style={localStyles.label}>Pairing</label>
          <select
            value={pairingMode}
            onChange={(e) => setPairingMode(e.target.value)}
            style={localStyles.select}
          >
            <option value="pairs">Pairs</option>
            <option value="individual">Individual</option>
          </select>
        </div>
      </div>

      {/* Budget Card */}
      <div style={localStyles.budgetCard}>
        <div style={localStyles.budgetHeader}>
          <div>
            <h2 style={{ fontSize: TYPOGRAPHY.fontSize.xl, fontWeight: TYPOGRAPHY.fontWeight.bold, margin: 0, marginBottom: SPACING.xs }}>
              {currentClass?.code} - Week {selectedWeek} Budget
            </h2>
            <p style={{ fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.secondary, margin: 0 }}>
              {labDetails.recipes.length} recipes selected • Budget: ${weeklyBudget.toFixed(2)}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '32px', fontWeight: TYPOGRAPHY.fontWeight.bold, color: getBudgetColor(labDetails.budgetPercent) }}>
              ${labDetails.totalCost.toFixed(2)}
            </div>
            <div style={{ fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.secondary }}>
              {labDetails.withinBudget ? (
                <span style={{ color: COLORS.success }}>${(weeklyBudget - labDetails.totalCost).toFixed(2)} under budget</span>
              ) : (
                <span style={{ color: COLORS.error }}>OVER BUDGET: ${(labDetails.totalCost - weeklyBudget).toFixed(2)}</span>
              )}
            </div>
          </div>
        </div>
        
        <div style={localStyles.budgetBar}>
          <div 
            style={{
              ...localStyles.budgetFill,
              width: `${Math.min(labDetails.budgetPercent, 100)}%`,
              backgroundColor: getBudgetColor(labDetails.budgetPercent)
            }}
          >
            {labDetails.budgetPercent}%
          </div>
        </div>
      </div>

      {/* Recipe Selection */}
      <div style={{ marginBottom: SPACING.xl }}>
        <h2 style={{ fontSize: TYPOGRAPHY.fontSize.xl, fontWeight: TYPOGRAPHY.fontWeight.semibold, marginBottom: SPACING.lg }}>
          Available Recipes for {currentClass?.code} - Week {selectedWeek}
        </h2>
        
        {availableRecipes.length === 0 ? (
          <div style={{ padding: SPACING.xl, textAlign: 'center', backgroundColor: COLORS.lightBackground, borderRadius: SPACING.sm }}>
            <p style={{ color: COLORS.secondary }}>
              No recipes assigned to this week yet. Contact administrator to assign recipes.
            </p>
          </div>
        ) : (
          <div style={localStyles.recipesGrid}>
            {availableRecipes.map(recipe => {
              const isSelected = selectedRecipes.includes(recipe.id);
              const cost = calculateIngredientCost(recipe, 1);
              
              return (
                <div
                  key={recipe.id}
                  style={{
                    ...localStyles.recipeCard,
                    ...(isSelected ? localStyles.recipeCardSelected : {})
                  }}
                  onClick={() => toggleRecipe(recipe.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: SPACING.md }}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleRecipe(recipe.id)}
                      style={localStyles.checkbox}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: TYPOGRAPHY.fontSize.md, fontWeight: TYPOGRAPHY.fontWeight.semibold, margin: 0, marginBottom: SPACING.xs }}>
                        {recipe.name}
                      </h3>
                      <div style={{ fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.secondary }}>
                        Yields {recipe.yieldAmount} {recipe.yieldUnit}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ fontSize: TYPOGRAPHY.fontSize.sm, marginBottom: SPACING.sm }}>
                    <strong>Cost:</strong> ${cost.toFixed(2)}
                  </div>
                  
                  <div style={{ fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.secondary, marginBottom: SPACING.sm }}>
                    Time: {recipe.prepTime} + {recipe.bakeTime}
                  </div>
                  
                  <div style={{ marginTop: SPACING.sm }}>
                    <div style={{ fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.secondary, marginBottom: SPACING.xs }}>
                      ACFEF Coverage:
                    </div>
                    <div>
                      {recipe.acfefKnowledge?.slice(0, 3).map(k => (
                        <span key={k} style={{
                          ...localStyles.badge,
                          backgroundColor: '#E3F2FD',
                          color: '#1565C0'
                        }}>
                          {k}
                        </span>
                      ))}
                      {recipe.acfefKnowledge?.length > 3 && (
                        <span style={{ fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.secondary }}>
                          +{recipe.acfefKnowledge.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ACFEF Standards Coverage */}
      {labDetails.recipes.length > 0 && (
        <>
          <div style={localStyles.competencySection}>
            <h3 style={{ fontSize: TYPOGRAPHY.fontSize.lg, fontWeight: TYPOGRAPHY.fontWeight.semibold, marginBottom: SPACING.lg }}>
              ACFEF Standards Covered in This Lab
            </h3>
            
            <div style={{ marginBottom: SPACING.lg }}>
              <h4 style={{ fontSize: TYPOGRAPHY.fontSize.sm, fontWeight: TYPOGRAPHY.fontWeight.semibold, color: COLORS.secondary, marginBottom: SPACING.sm, textTransform: 'uppercase' }}>
                Knowledge Areas ({labDetails.knowledgeCovered.length})
              </h4>
              <div>
                {labDetails.knowledgeCovered.map(k => (
                  <span key={k} style={{
                    ...localStyles.badge,
                    backgroundColor: '#E3F2FD',
                    color: '#1565C0'
                  }}>
                    {k}: {acfefStandards.knowledge[k]}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 style={{ fontSize: TYPOGRAPHY.fontSize.sm, fontWeight: TYPOGRAPHY.fontWeight.semibold, color: COLORS.secondary, marginBottom: SPACING.sm, textTransform: 'uppercase' }}>
                Competencies ({labDetails.competenciesCovered.length})
              </h4>
              <div>
                {labDetails.competenciesCovered.map(c => (
                  <span key={c} style={{
                    ...localStyles.badge,
                    backgroundColor: '#E8F5E9',
                    color: '#2E7D32'
                  }}>
                    {c}: {acfefStandards.competencies[c]}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Generate Requisition Button */}
          <div style={{ marginTop: SPACING.xl, textAlign: 'center' }}>
            <button
              onClick={() => alert('Generate Requisition feature coming soon!\n\nThis will create a Shamrock Foods shopping list with:\n- All ingredients from selected recipes\n- Quantities scaled for class size\n- Product codes\n- Total cost\n- Export to PDF/CSV')}
              style={{
                ...BUTTONS.primary,
                fontSize: TYPOGRAPHY.fontSize.lg,
                padding: `${SPACING.md} ${SPACING.xxl}`,
                minWidth: '300px'
              }}
            >
              Generate Requisition
            </button>
            <p style={{ fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.secondary, marginTop: SPACING.md }}>
              Creates a shopping list for purchasing department
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default LabPlanningPage;

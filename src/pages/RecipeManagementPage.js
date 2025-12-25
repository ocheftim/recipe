// RecipeManagementPage.js - ToqueWorks Recipe CRUD Operations
import React, { useState } from 'react';
import recipesData from '../data/quickBreadsRecipesEnhanced';
import STYLES from '../styles/globalStyles';

// Destructure from default import
const { acfefStandards } = recipesData;

const {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BUTTONS,
  FORMS,
  MODALS
} = STYLES;

const RecipeManagementPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Quick Breads',
    courseCode: 'CUL 140',
    weekNumber: 3,
    yieldAmount: 12,
    yieldUnit: 'servings',
    prepTime: '',
    bakeTime: '',
    difficulty: 'beginner',
    acfefKnowledge: [],
    acfefCompetencies: [],
    learningObjectives: [''],
    minServings: 6,
    maxServings: 24,
    idealPairYield: 6,
    scalingNotes: '',
    ingredients: [{ name: '', quantity: '', unit: 'cup', notes: '' }],
    instructions: ['']
  });

  const localStyles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: SPACING.xxl,
      backgroundColor: COLORS.background,
      minHeight: '100vh'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.xxl
    },
    h1: {
      fontSize: TYPOGRAPHY.fontSize.xxxl,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      color: COLORS.primary,
      margin: 0
    },
    btnPrimary: {
      ...BUTTONS.primary,
      padding: `${SPACING.md} ${SPACING.xl}`
    },
    modal: {
      ...MODALS.overlay
    },
    modalContent: {
      backgroundColor: COLORS.background,
      border: `1px solid ${COLORS.border}`,
      borderRadius: SPACING.sm,
      maxWidth: '900px',
      width: '90%',
      maxHeight: '90vh',
      overflowY: 'auto'
    },
    modalHeader: {
      padding: SPACING.xl,
      borderBottom: `1px solid ${COLORS.border}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    modalBody: {
      padding: SPACING.xl
    },
    modalFooter: {
      padding: SPACING.lg,
      borderTop: `1px solid ${COLORS.border}`,
      display: 'flex',
      justifyContent: 'flex-end',
      gap: SPACING.md
    },
    section: {
      marginBottom: SPACING.xxl,
      paddingBottom: SPACING.xl,
      borderBottom: `1px solid ${COLORS.border}`
    },
    sectionTitle: {
      fontSize: TYPOGRAPHY.fontSize.lg,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      marginBottom: SPACING.lg,
      color: COLORS.primary
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: SPACING.lg
    },
    formGroup: {
      marginBottom: SPACING.lg
    },
    label: {
      ...FORMS.label,
      display: 'block',
      marginBottom: SPACING.sm,
      fontWeight: TYPOGRAPHY.fontWeight.semibold
    },
    input: {
      ...FORMS.input.base,
      width: '100%'
    },
    select: {
      ...FORMS.select.base,
      width: '100%'
    },
    textarea: {
      ...FORMS.textarea.base,
      width: '100%',
      minHeight: '100px'
    },
    checkboxGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: SPACING.sm,
      maxHeight: '200px',
      overflowY: 'auto',
      padding: SPACING.sm,
      border: `1px solid ${COLORS.border}`,
      borderRadius: SPACING.xs
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: SPACING.sm,
      fontSize: TYPOGRAPHY.fontSize.sm,
      cursor: 'pointer'
    },
    ingredientRow: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 2fr auto',
      gap: SPACING.sm,
      marginBottom: SPACING.sm
    },
    btnSmall: {
      ...BUTTONS.secondary,
      padding: `${SPACING.xs} ${SPACING.sm}`,
      fontSize: TYPOGRAPHY.fontSize.sm
    },
    btnDanger: {
      ...BUTTONS.secondary,
      padding: `${SPACING.xs} ${SPACING.sm}`,
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.error
    },
    helpText: {
      fontSize: TYPOGRAPHY.fontSize.xs,
      color: COLORS.secondary,
      marginTop: SPACING.xs
    },
    alert: {
      padding: SPACING.lg,
      backgroundColor: '#E8F5E9',
      border: `1px solid ${COLORS.success}`,
      borderRadius: SPACING.sm,
      marginBottom: SPACING.xl
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: '', unit: 'cup', notes: '' }]
    }));
  };

  const removeIngredient = (index) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const updateIngredient = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) => 
        i === index ? { ...ing, [field]: value } : ing
      )
    }));
  };

  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const removeInstruction = (index) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  const updateInstruction = (index, value) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.map((inst, i) => 
        i === index ? value : inst
      )
    }));
  };

  const addLearningObjective = () => {
    setFormData(prev => ({
      ...prev,
      learningObjectives: [...prev.learningObjectives, '']
    }));
  };

  const removeLearningObjective = (index) => {
    setFormData(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter((_, i) => i !== index)
    }));
  };

  const updateLearningObjective = (index, value) => {
    setFormData(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives.map((obj, i) => 
        i === index ? value : obj
      )
    }));
  };

  const toggleACFEF = (type, code) => {
    const field = type === 'knowledge' ? 'acfefKnowledge' : 'acfefCompetencies';
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(code)
        ? prev[field].filter(c => c !== code)
        : [...prev[field], code]
    }));
  };

  const handleSave = () => {
    // In real implementation, this would save to backend/database
    const recipe = {
      id: Date.now(),
      ...formData,
      ingredients: formData.ingredients.filter(i => i.name && i.quantity),
      instructions: formData.instructions.filter(i => i.trim()),
      learningObjectives: formData.learningObjectives.filter(o => o.trim())
    };
    
    console.log('Saving recipe:', recipe);
    
    // Save to localStorage for demo
    const existing = JSON.parse(localStorage.getItem('toqueworks_custom_recipes') || '[]');
    localStorage.setItem('toqueworks_custom_recipes', JSON.stringify([...existing, recipe]));
    
    alert('Recipe saved successfully!');
    setShowAddModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Quick Breads',
      courseCode: 'CUL 140',
      weekNumber: 3,
      yieldAmount: 12,
      yieldUnit: 'servings',
      prepTime: '',
      bakeTime: '',
      difficulty: 'beginner',
      acfefKnowledge: [],
      acfefCompetencies: [],
      learningObjectives: [''],
      minServings: 6,
      maxServings: 24,
      idealPairYield: 6,
      scalingNotes: '',
      ingredients: [{ name: '', quantity: '', unit: 'cup', notes: '' }],
      instructions: ['']
    });
  };

  return (
    <div style={localStyles.container}>
      {/* Header */}
      <div style={localStyles.header}>
        <div>
          <h1 style={localStyles.h1}>Recipe Management</h1>
          <p style={{ fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.secondary, marginTop: SPACING.sm }}>
            Add, edit, and manage recipes for curriculum
          </p>
        </div>
        <button
          style={localStyles.btnPrimary}
          onClick={() => setShowAddModal(true)}
          onMouseEnter={(e) => e.target.style.opacity = '0.9'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          + Add New Recipe
        </button>
      </div>

      {/* Info Box */}
      <div style={localStyles.alert}>
        <strong>Quick Add Process:</strong> Use this streamlined form to add new recipes with ACFEF standards, 
        scaling information, and complete ingredient lists. Recipes can be immediately used in Lab Planning.
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div style={localStyles.modal}>
          <div style={localStyles.modalContent}>
            <div style={localStyles.modalHeader}>
              <h2 style={{ margin: 0 }}>Add New Recipe</h2>
              <button
                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: COLORS.secondary }}
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>

            <div style={localStyles.modalBody}>
              {/* Basic Information */}
              <div style={localStyles.section}>
                <h3 style={localStyles.sectionTitle}>Basic Information</h3>
                <div style={localStyles.formGrid}>
                  <div style={localStyles.formGroup}>
                    <label style={localStyles.label}>Recipe Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      style={localStyles.input}
                      placeholder="e.g., Classic Buttermilk Biscuits"
                    />
                  </div>

                  <div style={localStyles.formGroup}>
                    <label style={localStyles.label}>Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => updateField('category', e.target.value)}
                      style={localStyles.select}
                    >
                      <option value="Quick Breads">Quick Breads</option>
                      <option value="Yeast Breads">Yeast Breads</option>
                      <option value="Pastries">Pastries</option>
                      <option value="Cakes">Cakes</option>
                      <option value="Cookies">Cookies</option>
                    </select>
                  </div>

                  <div style={localStyles.formGroup}>
                    <label style={localStyles.label}>Course Code</label>
                    <input
                      type="text"
                      value={formData.courseCode}
                      onChange={(e) => updateField('courseCode', e.target.value)}
                      style={localStyles.input}
                    />
                  </div>

                  <div style={localStyles.formGroup}>
                    <label style={localStyles.label}>Week Number</label>
                    <input
                      type="number"
                      value={formData.weekNumber}
                      onChange={(e) => updateField('weekNumber', parseInt(e.target.value))}
                      style={localStyles.input}
                    />
                  </div>

                  <div style={localStyles.formGroup}>
                    <label style={localStyles.label}>Yield Amount</label>
                    <input
                      type="number"
                      value={formData.yieldAmount}
                      onChange={(e) => updateField('yieldAmount', parseInt(e.target.value))}
                      style={localStyles.input}
                    />
                  </div>

                  <div style={localStyles.formGroup}>
                    <label style={localStyles.label}>Yield Unit</label>
                    <input
                      type="text"
                      value={formData.yieldUnit}
                      onChange={(e) => updateField('yieldUnit', e.target.value)}
                      style={localStyles.input}
                      placeholder="e.g., biscuits, muffins, servings"
                    />
                  </div>

                  <div style={localStyles.formGroup}>
                    <label style={localStyles.label}>Prep Time</label>
                    <input
                      type="text"
                      value={formData.prepTime}
                      onChange={(e) => updateField('prepTime', e.target.value)}
                      style={localStyles.input}
                      placeholder="e.g., 15 minutes"
                    />
                  </div>

                  <div style={localStyles.formGroup}>
                    <label style={localStyles.label}>Bake/Cook Time</label>
                    <input
                      type="text"
                      value={formData.bakeTime}
                      onChange={(e) => updateField('bakeTime', e.target.value)}
                      style={localStyles.input}
                      placeholder="e.g., 12-15 minutes"
                    />
                  </div>

                  <div style={localStyles.formGroup}>
                    <label style={localStyles.label}>Difficulty</label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => updateField('difficulty', e.target.value)}
                      style={localStyles.select}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Scaling Information */}
              <div style={localStyles.section}>
                <h3 style={localStyles.sectionTitle}>Scaling Information</h3>
                <div style={localStyles.formGrid}>
                  <div style={localStyles.formGroup}>
                    <label style={localStyles.label}>Min Servings</label>
                    <input
                      type="number"
                      value={formData.minServings}
                      onChange={(e) => updateField('minServings', parseInt(e.target.value))}
                      style={localStyles.input}
                    />
                  </div>

                  <div style={localStyles.formGroup}>
                    <label style={localStyles.label}>Max Servings</label>
                    <input
                      type="number"
                      value={formData.maxServings}
                      onChange={(e) => updateField('maxServings', parseInt(e.target.value))}
                      style={localStyles.input}
                    />
                  </div>

                  <div style={localStyles.formGroup}>
                    <label style={localStyles.label}>Ideal Pair Yield</label>
                    <input
                      type="number"
                      value={formData.idealPairYield}
                      onChange={(e) => updateField('idealPairYield', parseInt(e.target.value))}
                      style={localStyles.input}
                    />
                    <div style={localStyles.helpText}>
                      Maximum servings per pair (typically 6)
                    </div>
                  </div>
                </div>

                <div style={localStyles.formGroup}>
                  <label style={localStyles.label}>Scaling Notes</label>
                  <textarea
                    value={formData.scalingNotes}
                    onChange={(e) => updateField('scalingNotes', e.target.value)}
                    style={localStyles.textarea}
                    placeholder="Notes about how this recipe scales..."
                  />
                </div>
              </div>

              {/* ACFEF Standards */}
              <div style={localStyles.section}>
                <h3 style={localStyles.sectionTitle}>ACFEF Standards Coverage</h3>
                
                <div style={{ marginBottom: SPACING.lg }}>
                  <label style={localStyles.label}>Knowledge Areas</label>
                  <div style={localStyles.checkboxGrid}>
                    {Object.entries(acfefStandards.knowledge).map(([code, description]) => (
                      <label key={code} style={localStyles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={formData.acfefKnowledge.includes(code)}
                          onChange={() => toggleACFEF('knowledge', code)}
                        />
                        <span>
                          <strong>{code}:</strong> {description}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={localStyles.label}>Competencies</label>
                  <div style={localStyles.checkboxGrid}>
                    {Object.entries(acfefStandards.competencies).map(([code, description]) => (
                      <label key={code} style={localStyles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={formData.acfefCompetencies.includes(code)}
                          onChange={() => toggleACFEF('competencies', code)}
                        />
                        <span>
                          <strong>{code}:</strong> {description}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Learning Objectives */}
              <div style={localStyles.section}>
                <h3 style={localStyles.sectionTitle}>Learning Objectives</h3>
                {formData.learningObjectives.map((obj, index) => (
                  <div key={index} style={{ display: 'flex', gap: SPACING.sm, marginBottom: SPACING.sm }}>
                    <input
                      type="text"
                      value={obj}
                      onChange={(e) => updateLearningObjective(index, e.target.value)}
                      style={{ ...localStyles.input, flex: 1 }}
                      placeholder="Enter learning objective..."
                    />
                    <button
                      style={localStyles.btnDanger}
                      onClick={() => removeLearningObjective(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button style={localStyles.btnSmall} onClick={addLearningObjective}>
                  + Add Objective
                </button>
              </div>

              {/* Ingredients */}
              <div style={localStyles.section}>
                <h3 style={localStyles.sectionTitle}>Ingredients</h3>
                {formData.ingredients.map((ing, index) => (
                  <div key={index} style={localStyles.ingredientRow}>
                    <input
                      type="text"
                      value={ing.name}
                      onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                      style={localStyles.input}
                      placeholder="Ingredient name"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={ing.quantity}
                      onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                      style={localStyles.input}
                      placeholder="Qty"
                    />
                    <select
                      value={ing.unit}
                      onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                      style={localStyles.select}
                    >
                      <option value="cup">cup</option>
                      <option value="tbsp">tbsp</option>
                      <option value="tsp">tsp</option>
                      <option value="oz">oz</option>
                      <option value="lb">lb</option>
                      <option value="gram">gram</option>
                      <option value="each">each</option>
                      <option value="large">large</option>
                    </select>
                    <input
                      type="text"
                      value={ing.notes}
                      onChange={(e) => updateIngredient(index, 'notes', e.target.value)}
                      style={localStyles.input}
                      placeholder="Notes (optional)"
                    />
                    <button
                      style={localStyles.btnDanger}
                      onClick={() => removeIngredient(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button style={localStyles.btnSmall} onClick={addIngredient}>
                  + Add Ingredient
                </button>
              </div>

              {/* Instructions */}
              <div style={localStyles.section}>
                <h3 style={localStyles.sectionTitle}>Instructions</h3>
                {formData.instructions.map((inst, index) => (
                  <div key={index} style={{ display: 'flex', gap: SPACING.sm, marginBottom: SPACING.sm }}>
                    <span style={{ fontWeight: TYPOGRAPHY.fontWeight.bold, color: COLORS.secondary, minWidth: '24px' }}>
                      {index + 1}.
                    </span>
                    <textarea
                      value={inst}
                      onChange={(e) => updateInstruction(index, e.target.value)}
                      style={{ ...localStyles.input, flex: 1, minHeight: '60px' }}
                      placeholder="Enter instruction step..."
                    />
                    <button
                      style={localStyles.btnDanger}
                      onClick={() => removeInstruction(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button style={localStyles.btnSmall} onClick={addInstruction}>
                  + Add Step
                </button>
              </div>
            </div>

            <div style={localStyles.modalFooter}>
              <button
                style={BUTTONS.secondary}
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                style={localStyles.btnPrimary}
                onClick={handleSave}
                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Save Recipe
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Placeholder for recipe list */}
      <div style={{ padding: SPACING.xl, textAlign: 'center', color: COLORS.secondary }}>
        Recipe list will display here. Use the "Add New Recipe" button to get started.
      </div>
    </div>
  );
};

export default RecipeManagementPage;

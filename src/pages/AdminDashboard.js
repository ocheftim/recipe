// AdminDashboard.js - ToqueWorks Administrator Dashboard
import React, { useState, useEffect } from 'react';
import { acfefStandards } from '../data/quickBreadsRecipesEnhanced';
import STYLES from '../styles/globalStyles';

const {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BUTTONS,
  FORMS,
  TABLES,
  MODALS
} = STYLES;

// Sample initial data structure
const initialClasses = [
  {
    id: 'CUL140',
    code: 'CUL 140',
    name: 'Baking & Pastry Fundamentals',
    weeks: 16,
    budget: 150.00
  },
  {
    id: 'CUL150',
    code: 'CUL 150',
    name: 'Advanced Culinary Techniques',
    weeks: 16,
    budget: 200.00
  }
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('classes');
  const [classes, setClasses] = useState(() => {
    const saved = localStorage.getItem('toqueworks_classes');
    return saved ? JSON.parse(saved) : initialClasses;
  });
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem('toqueworks_recipes');
    return saved ? JSON.parse(saved) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [editingItem, setEditingItem] = useState(null);

  // Class form data
  const [classForm, setClassForm] = useState({
    code: '',
    name: '',
    weeks: 16,
    budget: 150.00
  });

  // Recipe form data
  const [recipeForm, setRecipeForm] = useState({
    name: '',
    category: 'Quick Breads',
    assignedTo: [], // [{classId: 'CUL140', week: 3}]
    yieldAmount: 12,
    yieldUnit: 'servings',
    prepTime: '',
    bakeTime: '',
    difficulty: 'beginner',
    acfefKnowledge: [],
    acfefCompetencies: [],
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
      marginBottom: SPACING.xxl
    },
    h1: {
      fontSize: TYPOGRAPHY.fontSize.xxxl,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      color: COLORS.primary,
      margin: 0
    },
    tabs: {
      display: 'flex',
      gap: SPACING.xs,
      marginBottom: SPACING.xl,
      borderBottom: `2px solid ${COLORS.border}`
    },
    tab: {
      padding: `${SPACING.md} ${SPACING.xl}`,
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: '2px solid transparent',
      marginBottom: '-2px',
      cursor: 'pointer',
      fontSize: TYPOGRAPHY.fontSize.md,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: COLORS.secondary,
      transition: 'all 0.2s ease'
    },
    activeTab: {
      color: COLORS.primary,
      borderBottomColor: COLORS.accent
    },
    section: {
      backgroundColor: COLORS.background,
      border: `1px solid ${COLORS.border}`,
      borderRadius: SPACING.sm,
      padding: SPACING.xl,
      marginBottom: SPACING.xl
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.lg
    },
    btnPrimary: {
      ...BUTTONS.primary,
      padding: `${SPACING.md} ${SPACING.xl}`
    },
    btn: {
      ...BUTTONS.secondary,
      padding: `${SPACING.sm} ${SPACING.md}`
    },
    table: {
      ...TABLES.container
    },
    th: {
      ...TABLES.headerCell,
      backgroundColor: COLORS.lightBackground
    },
    td: {
      ...TABLES.cell,
      borderBottom: `1px solid ${COLORS.subtleBorder}`
    },
    modal: {
      ...MODALS.overlay
    },
    modalContent: {
      backgroundColor: COLORS.background,
      border: `1px solid ${COLORS.border}`,
      borderRadius: SPACING.sm,
      maxWidth: '800px',
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
    formGroup: {
      marginBottom: SPACING.lg
    },
    label: {
      ...FORMS.label,
      display: 'block',
      marginBottom: SPACING.sm
    },
    input: {
      ...FORMS.input.base,
      width: '100%'
    },
    select: {
      ...FORMS.select.base,
      width: '100%'
    },
    uploadBox: {
      border: `2px dashed ${COLORS.border}`,
      borderRadius: SPACING.sm,
      padding: SPACING.xxl,
      textAlign: 'center',
      backgroundColor: COLORS.lightBackground,
      cursor: 'pointer',
      transition: 'all 0.2s ease'
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
    }
  };

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('toqueworks_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('toqueworks_recipes', JSON.stringify(recipes));
  }, [recipes]);

  // Class Management Functions
  const handleAddClass = () => {
    setModalMode('add');
    setClassForm({ code: '', name: '', weeks: 16, budget: 150.00 });
    setShowModal(true);
  };

  const handleEditClass = (classItem) => {
    setModalMode('edit');
    setEditingItem(classItem);
    setClassForm({
      code: classItem.code,
      name: classItem.name,
      weeks: classItem.weeks,
      budget: classItem.budget
    });
    setShowModal(true);
  };

  const handleSaveClass = () => {
    if (modalMode === 'add') {
      const newClass = {
        id: classForm.code.replace(/\s+/g, ''),
        code: classForm.code,
        name: classForm.name,
        weeks: parseInt(classForm.weeks),
        budget: parseFloat(classForm.budget)
      };
      setClasses([...classes, newClass]);
    } else {
      setClasses(classes.map(c => 
        c.id === editingItem.id 
          ? { ...c, ...classForm, id: classForm.code.replace(/\s+/g, '') }
          : c
      ));
    }
    setShowModal(false);
  };

  const handleDeleteClass = (classId) => {
    if (window.confirm('Delete this class? This will also remove all recipe assignments.')) {
      setClasses(classes.filter(c => c.id !== classId));
      // Also remove from recipe assignments
      setRecipes(recipes.map(r => ({
        ...r,
        assignedTo: (r.assignedTo || []).filter(a => a.classId !== classId)
      })));
    }
  };

  // Recipe Management Functions
  const handleAddRecipe = () => {
    setModalMode('add');
    setRecipeForm({
      name: '',
      category: 'Quick Breads',
      assignedTo: [],
      yieldAmount: 12,
      yieldUnit: 'servings',
      prepTime: '',
      bakeTime: '',
      difficulty: 'beginner',
      acfefKnowledge: [],
      acfefCompetencies: [],
      ingredients: [{ name: '', quantity: '', unit: 'cup', notes: '' }],
      instructions: ['']
    });
    setShowModal(true);
  };

  const handleSaveRecipe = () => {
    if (modalMode === 'add') {
      const newRecipe = {
        id: Date.now(),
        ...recipeForm
      };
      setRecipes([...recipes, newRecipe]);
    } else {
      setRecipes(recipes.map(r => 
        r.id === editingItem.id ? { ...r, ...recipeForm } : r
      ));
    }
    setShowModal(false);
  };

  const handleDeleteRecipe = (recipeId) => {
    if (window.confirm('Delete this recipe?')) {
      setRecipes(recipes.filter(r => r.id !== recipeId));
    }
  };

  const addIngredient = () => {
    setRecipeForm({
      ...recipeForm,
      ingredients: [...recipeForm.ingredients, { name: '', quantity: '', unit: 'cup', notes: '' }]
    });
  };

  const updateIngredient = (index, field, value) => {
    const newIngredients = [...recipeForm.ingredients];
    newIngredients[index][field] = value;
    setRecipeForm({ ...recipeForm, ingredients: newIngredients });
  };

  const removeIngredient = (index) => {
    setRecipeForm({
      ...recipeForm,
      ingredients: recipeForm.ingredients.filter((_, i) => i !== index)
    });
  };

  const toggleACFEF = (type, code) => {
    const field = type === 'knowledge' ? 'acfefKnowledge' : 'acfefCompetencies';
    setRecipeForm({
      ...recipeForm,
      [field]: recipeForm[field].includes(code)
        ? recipeForm[field].filter(c => c !== code)
        : [...recipeForm[field], code]
    });
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`CSV Upload: ${file.name}\nThis would parse and import vendor pricing data.`);
      // In production, parse CSV and update shamrockMapping
    }
  };

  return (
    <div style={localStyles.container}>
      {/* Header */}
      <div style={localStyles.header}>
        <h1 style={localStyles.h1}>Administrator Dashboard</h1>
        <p style={{ fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.secondary, marginTop: SPACING.sm }}>
          Manage classes, recipes, and vendor pricing
        </p>
      </div>

      {/* Tabs */}
      <div style={localStyles.tabs}>
        <button
          style={{
            ...localStyles.tab,
            ...(activeTab === 'classes' ? localStyles.activeTab : {})
          }}
          onClick={() => setActiveTab('classes')}
        >
          Classes
        </button>
        <button
          style={{
            ...localStyles.tab,
            ...(activeTab === 'recipes' ? localStyles.activeTab : {})
          }}
          onClick={() => setActiveTab('recipes')}
        >
          Recipes
        </button>
        <button
          style={{
            ...localStyles.tab,
            ...(activeTab === 'vendor' ? localStyles.activeTab : {})
          }}
          onClick={() => setActiveTab('vendor')}
        >
          Vendor Pricing
        </button>
        <button
          style={{
            ...localStyles.tab,
            ...(activeTab === 'settings' ? localStyles.activeTab : {})
          }}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      {/* Classes Tab */}
      {activeTab === 'classes' && (
        <div style={localStyles.section}>
          <div style={localStyles.sectionHeader}>
            <h2 style={{ fontSize: TYPOGRAPHY.fontSize.xl, margin: 0 }}>Manage Classes</h2>
            <button
              style={localStyles.btnPrimary}
              onClick={handleAddClass}
            >
              + Add Class
            </button>
          </div>

          <table style={localStyles.table}>
            <thead>
              <tr>
                <th style={localStyles.th}>Class Code</th>
                <th style={localStyles.th}>Class Name</th>
                <th style={localStyles.th}>Weeks</th>
                <th style={localStyles.th}>Budget</th>
                <th style={localStyles.th}>Recipes Assigned</th>
                <th style={localStyles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map(classItem => (
                <tr key={classItem.id}>
                  <td style={localStyles.td}>
                    <strong>{classItem.code}</strong>
                  </td>
                  <td style={localStyles.td}>{classItem.name}</td>
                  <td style={localStyles.td}>{classItem.weeks} weeks</td>
                  <td style={localStyles.td}>${classItem.budget.toFixed(2)}</td>
                  <td style={localStyles.td}>
                    {recipes.filter(r => r.assignedTo && r.assignedTo.some(a => a.classId === classItem.id)).length} recipes
                  </td>
                  <td style={localStyles.td}>
                    <button
                      style={localStyles.btn}
                      onClick={() => handleEditClass(classItem)}
                    >
                      Edit
                    </button>
                    {' '}
                    <button
                      style={{ ...localStyles.btn, color: COLORS.error }}
                      onClick={() => handleDeleteClass(classItem.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Recipes Tab */}
      {activeTab === 'recipes' && (
        <div style={localStyles.section}>
          <div style={localStyles.sectionHeader}>
            <h2 style={{ fontSize: TYPOGRAPHY.fontSize.xl, margin: 0 }}>Manage Recipes</h2>
            <button
              style={localStyles.btnPrimary}
              onClick={handleAddRecipe}
            >
              + Add Recipe
            </button>
          </div>

          <table style={localStyles.table}>
            <thead>
              <tr>
                <th style={localStyles.th}>Recipe Name</th>
                <th style={localStyles.th}>Category</th>
                <th style={localStyles.th}>Yield</th>
                <th style={localStyles.th}>Assigned To</th>
                <th style={localStyles.th}>ACFEF Coverage</th>
                <th style={localStyles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map(recipe => (
                <tr key={recipe.id}>
                  <td style={localStyles.td}>
                    <strong>{recipe.name}</strong>
                  </td>
                  <td style={localStyles.td}>{recipe.category}</td>
                  <td style={localStyles.td}>
                    {recipe.yieldAmount} {recipe.yieldUnit}
                  </td>
                  <td style={localStyles.td}>
                    {recipe.assignedTo && recipe.assignedTo.length > 0 ? (
                      <div style={{ fontSize: TYPOGRAPHY.fontSize.xs }}>
                        {recipe.assignedTo.map((a, i) => (
                          <div key={i}>{a.classId} - Week {a.week}</div>
                        ))}
                      </div>
                    ) : (
                      <span style={{ color: COLORS.secondary, fontSize: TYPOGRAPHY.fontSize.xs }}>
                        Not assigned
                      </span>
                    )}
                  </td>
                  <td style={localStyles.td}>
                    <div style={{ fontSize: TYPOGRAPHY.fontSize.xs }}>
                      K: {recipe.acfefKnowledge?.length || 0} | C: {recipe.acfefCompetencies?.length || 0}
                    </div>
                  </td>
                  <td style={localStyles.td}>
                    <button
                      style={localStyles.btn}
                      onClick={() => {
                        setModalMode('edit');
                        setEditingItem(recipe);
                        setRecipeForm(recipe);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>
                    {' '}
                    <button
                      style={{ ...localStyles.btn, color: COLORS.error }}
                      onClick={() => handleDeleteRecipe(recipe.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {recipes.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ ...localStyles.td, textAlign: 'center', padding: SPACING.xl, color: COLORS.secondary }}>
                    No recipes yet. Click "Add Recipe" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Vendor Pricing Tab */}
      {activeTab === 'vendor' && (
        <div style={localStyles.section}>
          <h2 style={{ fontSize: TYPOGRAPHY.fontSize.xl, marginBottom: SPACING.lg }}>Vendor Pricing Management</h2>
          
          <div
            style={localStyles.uploadBox}
            onClick={() => document.getElementById('csvUpload').click()}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = COLORS.accent}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = COLORS.border}
          >
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: SPACING.md, color: COLORS.primary }}>UPLOAD</div>
            <h3 style={{ fontSize: TYPOGRAPHY.fontSize.lg, marginBottom: SPACING.sm }}>
              Upload Shamrock Foods CSV
            </h3>
            <p style={{ fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.secondary }}>
              Click to upload vendor pricing data
            </p>
            <input
              id="csvUpload"
              type="file"
              accept=".csv"
              style={{ display: 'none' }}
              onChange={handleCSVUpload}
            />
          </div>

          <div style={{ marginTop: SPACING.xl, padding: SPACING.lg, backgroundColor: COLORS.lightBackground, borderRadius: SPACING.sm }}>
            <h4 style={{ fontSize: TYPOGRAPHY.fontSize.md, marginBottom: SPACING.md }}>CSV Format</h4>
            <pre style={{ fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.secondary }}>
{`Item Code,Product Name,Unit,Price Per Unit
12345,All-Purpose Flour,lb,0.89
23456,Granulated Sugar,lb,0.75
...`}
            </pre>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div style={localStyles.section}>
          <h2 style={{ fontSize: TYPOGRAPHY.fontSize.xl, marginBottom: SPACING.lg }}>System Settings</h2>
          <p style={{ color: COLORS.secondary }}>
            Global settings moved to Settings page. Use this for admin-specific configurations.
          </p>
        </div>
      )}

      {/* Modal for Classes */}
      {showModal && activeTab === 'classes' && (
        <div style={localStyles.modal}>
          <div style={localStyles.modalContent}>
            <div style={localStyles.modalHeader}>
              <h2 style={{ margin: 0 }}>
                {modalMode === 'add' ? 'Add New Class' : 'Edit Class'}
              </h2>
              <button
                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <div style={localStyles.modalBody}>
              <div style={localStyles.formGroup}>
                <label style={localStyles.label}>Class Code *</label>
                <input
                  type="text"
                  value={classForm.code}
                  onChange={(e) => setClassForm({ ...classForm, code: e.target.value })}
                  style={localStyles.input}
                  placeholder="e.g., CUL 140"
                />
              </div>

              <div style={localStyles.formGroup}>
                <label style={localStyles.label}>Class Name *</label>
                <input
                  type="text"
                  value={classForm.name}
                  onChange={(e) => setClassForm({ ...classForm, name: e.target.value })}
                  style={localStyles.input}
                  placeholder="e.g., Baking & Pastry Fundamentals"
                />
              </div>

              <div style={localStyles.formGroup}>
                <label style={localStyles.label}>Number of Weeks</label>
                <input
                  type="number"
                  value={classForm.weeks}
                  onChange={(e) => setClassForm({ ...classForm, weeks: e.target.value })}
                  style={localStyles.input}
                />
              </div>

              <div style={localStyles.formGroup}>
                <label style={localStyles.label}>Weekly Lab Budget</label>
                <input
                  type="number"
                  step="0.01"
                  value={classForm.budget}
                  onChange={(e) => setClassForm({ ...classForm, budget: e.target.value })}
                  style={localStyles.input}
                />
              </div>
            </div>

            <div style={localStyles.modalFooter}>
              <button
                style={BUTTONS.secondary}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                style={localStyles.btnPrimary}
                onClick={handleSaveClass}
              >
                Save Class
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Recipes - Simplified */}
      {showModal && activeTab === 'recipes' && (
        <div style={localStyles.modal}>
          <div style={localStyles.modalContent}>
            <div style={localStyles.modalHeader}>
              <h2 style={{ margin: 0 }}>
                {modalMode === 'add' ? 'Add New Recipe' : 'Edit Recipe'}
              </h2>
              <button
                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <div style={localStyles.modalBody}>
              <p style={{ color: COLORS.secondary, marginBottom: SPACING.lg }}>
                Use Recipe Management page for full recipe details. This is a quick add/edit.
              </p>
              
              <div style={localStyles.formGroup}>
                <label style={localStyles.label}>Recipe Name *</label>
                <input
                  type="text"
                  value={recipeForm.name}
                  onChange={(e) => setRecipeForm({ ...recipeForm, name: e.target.value })}
                  style={localStyles.input}
                  placeholder="e.g., Classic Buttermilk Biscuits"
                />
              </div>

              <div style={localStyles.formGroup}>
                <label style={localStyles.label}>Category</label>
                <select
                  value={recipeForm.category}
                  onChange={(e) => setRecipeForm({ ...recipeForm, category: e.target.value })}
                  style={localStyles.select}
                >
                  <option value="Quick Breads">Quick Breads</option>
                  <option value="Yeast Breads">Yeast Breads</option>
                  <option value="Pastries">Pastries</option>
                  <option value="Cakes">Cakes</option>
                </select>
              </div>
            </div>

            <div style={localStyles.modalFooter}>
              <button
                style={BUTTONS.secondary}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                style={localStyles.btnPrimary}
                onClick={handleSaveRecipe}
              >
                Save Recipe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

// Settings.js - ToqueWorks Professional Settings Management
import React, { useState, useEffect } from 'react';
import STYLES from '../styles/globalStyles';

const {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BUTTONS,
  FORMS,
  TABLES,
  MODALS,
  CARDS,
  STATUS,
  UTILS,
  ANIMATIONS,
  combineStyles
} = STYLES;

const Settings = () => {
  // Component-specific styles
  const localStyles = {
    container: {
      ...UTILS.pageContainer,
      padding: SPACING.lg,
      maxWidth: '1400px',
      margin: '0 auto'
    },
    header: {
      marginBottom: SPACING.xl,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    headerTitle: {
      ...TYPOGRAPHY.h1,
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.sm
    },
    headerSubtitle: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.secondary,
      marginTop: SPACING.xs
    },
    headerActions: {
      display: 'flex',
      gap: SPACING.sm
    },
    btnSecondary: {
      ...BUTTONS.secondary,
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.sm
    },
    btnPrimary: {
      ...BUTTONS.primary,
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.sm
    },
    btnDisabled: {
      ...BUTTONS.secondary,
      backgroundColor: COLORS.muted,
      color: COLORS.border,
      cursor: 'not-allowed'
    },
    tabContainer: {
      display: 'flex',
      gap: SPACING.sm,
      marginBottom: SPACING.xl,
      overflowX: 'auto'
    },
    tabButton: {
      ...BUTTONS.secondary,
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.sm,
      borderRadius: SPACING.sm,
      transition: ANIMATIONS.transition.normal
    },
    tabButtonActive: {
      backgroundColor: COLORS.accent,
      color: COLORS.background
    },
    tabContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: SPACING.xl
    },
    section: {
      ...CARDS.base,
      padding: SPACING.xl
    },
    sectionTitle: {
      fontSize: TYPOGRAPHY.fontSize.lg,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      color: COLORS.primary,
      marginBottom: SPACING.lg
    },
    grid: {
      display: 'grid',
      gap: SPACING.lg
    },
    gridCols2: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: SPACING.lg
    },
    gridCols3: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: SPACING.lg
    },
    gridCols4: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: SPACING.lg
    },
    formGroup: {
      marginBottom: SPACING.lg
    },
    formLabel: {
      ...FORMS.label,
      display: 'block',
      marginBottom: SPACING.xs
    },
    formInput: {
      ...FORMS.input.base,
      width: '100%'
    },
    formSelect: {
      ...FORMS.select.base,
      width: '100%'
    },
    formTextarea: {
      ...FORMS.textarea.base,
      width: '100%'
    },
    formHelpText: {
      fontSize: TYPOGRAPHY.fontSize.xs,
      color: COLORS.muted,
      marginTop: SPACING.xs
    },
    checkbox: {
      ...FORMS.checkbox,
      marginRight: SPACING.sm
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.sm,
      marginBottom: SPACING.sm,
      cursor: 'pointer'
    },
    checkboxText: {
      color: COLORS.secondary
    },
    inputGroup: {
      display: 'flex',
      gap: SPACING.sm
    },
    inputGroupItem: {
      flex: 1
    },
    inputSmall: {
      ...FORMS.input.base,
      width: '100px'
    },
    selectSmall: {
      ...FORMS.select.base,
      width: '200px'
    },
    infoBox: {
      backgroundColor: '#EFF6FF',
      border: '1px solid #BFDBFE',
      borderRadius: SPACING.sm,
      padding: SPACING.lg,
      display: 'flex',
      alignItems: 'flex-start',
      gap: SPACING.sm
    },
    infoText: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: '#1E40AF'
    },
    errorToast: {
      position: 'fixed',
      bottom: SPACING.lg,
      right: SPACING.lg,
      backgroundColor: COLORS.error,
      color: COLORS.background,
      padding: `${SPACING.sm} ${SPACING.lg}`,
      borderRadius: SPACING.sm,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.sm
    },
    indentedOption: {
      marginLeft: SPACING.xl,
      marginTop: SPACING.sm
    },
    spinner: {
      display: 'inline-block',
      width: '16px',
      height: '16px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      borderTopColor: 'white',
      animation: 'spin 0.6s linear infinite'
    }
  };

  // Initialize settings from localStorage or defaults
  const [generalSettings, setGeneralSettings] = useState({
    businessName: '',
    businessType: 'restaurant',
    currency: 'USD',
    currencySymbol: '$',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    unitSystem: 'imperial',
    language: 'en',
    taxRate: 8.5,
    laborCostPercentage: 30,
    overheadPercentage: 20
  });

  const [recipeOptions, setRecipeOptions] = useState({
    // Default Values
    defaultServings: 8,
    defaultPrepTime: 30,
    defaultCookTime: 60,
    defaultCategory: 'Entrees',
    
    // Costing Rules
    targetFoodCostPercent: 30,
    warningFoodCostPercent: 35,
    minimumProfitMargin: 65,
    includePackagingInCost: false,
    packagingCostPercent: 2,
    includeLaborInCost: false,
    laborCostMethod: 'percentage',
    laborHourlyRate: 15,
    
    // Display Preferences
    showCostInRecipeList: true,
    showProfitMargin: true,
    showFoodCostPercent: true,
    showNutritionalInfo: false,
    showAllergens: true,
    showPrepInstructions: true,
    defaultViewMode: 'table',
    recipesPerPage: 25,
    
    // Recipe Management
    enableVersioning: false,
    autoCalculateCosts: true,
    requireCostValidation: true,
    allowDuplicateRecipes: false,
    autoSaveInterval: 30,
    enableRecipeSharing: false,
    
    // Scaling Options
    enableBatchScaling: true,
    maxScaleFactor: 100,
    scalingTimeAdjustment: true,
    roundScaledQuantities: true,
    scalingDecimalPlaces: 2
  });

  const [dataManagement, setDataManagement] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    lastBackup: null,
    dataRetentionDays: 90,
    enableCloudSync: false,
    compressionEnabled: false
  });

  const [notifications, setNotifications] = useState({
    highCostAlerts: true,
    lowInventoryAlerts: false,
    priceChangeAlerts: true,
    newRecipeReminders: false,
    costAnalysisReports: 'weekly'
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('general');

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedGeneralSettings = localStorage.getItem('toqueworks_general_settings');
        const savedRecipeOptions = localStorage.getItem('toqueworks_recipe_options');
        const savedDataManagement = localStorage.getItem('toqueworks_data_management');
        const savedNotifications = localStorage.getItem('toqueworks_notifications');
        
        if (savedGeneralSettings) {
          setGeneralSettings(JSON.parse(savedGeneralSettings));
        }
        if (savedRecipeOptions) {
          setRecipeOptions(JSON.parse(savedRecipeOptions));
        }
        if (savedDataManagement) {
          setDataManagement(JSON.parse(savedDataManagement));
        }
        if (savedNotifications) {
          setNotifications(JSON.parse(savedNotifications));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    
    loadSettings();
  }, []);

  // Track changes
  useEffect(() => {
    setHasChanges(true);
    setSaveStatus(null);
  }, [generalSettings, recipeOptions, dataManagement, notifications]);

  // Save settings to localStorage
  const saveSettings = () => {
    setSaveStatus('saving');
    try {
      localStorage.setItem('toqueworks_general_settings', JSON.stringify(generalSettings));
      localStorage.setItem('toqueworks_recipe_options', JSON.stringify(recipeOptions));
      localStorage.setItem('toqueworks_data_management', JSON.stringify(dataManagement));
      localStorage.setItem('toqueworks_notifications', JSON.stringify(notifications));
      
      if (recipeOptions.defaultViewMode) {
        localStorage.setItem('recipesViewMode', recipeOptions.defaultViewMode);
      }
      
      setSaveStatus('saved');
      setHasChanges(false);
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveStatus('error');
    }
  };

  // Reset to defaults
  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) {
      setGeneralSettings({
        businessName: '',
        businessType: 'restaurant',
        currency: 'USD',
        currencySymbol: '$',
        timezone: 'America/New_York',
        dateFormat: 'MM/DD/YYYY',
        unitSystem: 'imperial',
        language: 'en',
        taxRate: 8.5,
        laborCostPercentage: 30,
        overheadPercentage: 20
      });
      
      setRecipeOptions({
        defaultServings: 8,
        defaultPrepTime: 30,
        defaultCookTime: 60,
        defaultCategory: 'Entrees',
        targetFoodCostPercent: 30,
        warningFoodCostPercent: 35,
        minimumProfitMargin: 65,
        includePackagingInCost: false,
        packagingCostPercent: 2,
        includeLaborInCost: false,
        laborCostMethod: 'percentage',
        laborHourlyRate: 15,
        showCostInRecipeList: true,
        showProfitMargin: true,
        showFoodCostPercent: true,
        showNutritionalInfo: false,
        showAllergens: true,
        showPrepInstructions: true,
        defaultViewMode: 'table',
        recipesPerPage: 25,
        enableVersioning: false,
        autoCalculateCosts: true,
        requireCostValidation: true,
        allowDuplicateRecipes: false,
        autoSaveInterval: 30,
        enableRecipeSharing: false,
        enableBatchScaling: true,
        maxScaleFactor: 100,
        scalingTimeAdjustment: true,
        roundScaledQuantities: true,
        scalingDecimalPlaces: 2
      });
      
      setDataManagement({
        autoBackup: true,
        backupFrequency: 'daily',
        lastBackup: null,
        dataRetentionDays: 90,
        enableCloudSync: false,
        compressionEnabled: false
      });
      
      setNotifications({
        highCostAlerts: true,
        lowInventoryAlerts: false,
        priceChangeAlerts: true,
        newRecipeReminders: false,
        costAnalysisReports: 'weekly'
      });
    }
  };

  // Export all settings
  const exportSettings = () => {
    const allSettings = {
      general: generalSettings,
      recipeOptions: recipeOptions,
      dataManagement: dataManagement,
      notifications: notifications,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(allSettings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `toqueworks-settings-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  // Import settings
  const importSettings = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          if (imported.general) setGeneralSettings(imported.general);
          if (imported.recipeOptions) setRecipeOptions(imported.recipeOptions);
          if (imported.dataManagement) setDataManagement(imported.dataManagement);
          if (imported.notifications) setNotifications(imported.notifications);
          setSaveStatus('saved');
        } catch (error) {
          console.error('Error importing settings:', error);
          alert('Error importing settings. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Tab Button Component
  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        ...localStyles.tabButton,
        ...(activeTab === id ? localStyles.tabButtonActive : {})
      }}
      onMouseEnter={(e) => {
        if (activeTab !== id) {
          e.currentTarget.style.backgroundColor = COLORS.lightBackground;
        }
      }}
      onMouseLeave={(e) => {
        if (activeTab !== id) {
          e.currentTarget.style.backgroundColor = COLORS.background;
        }
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={localStyles.container}>
      {/* Header */}
      <div style={localStyles.header}>
        <div>
          <h1 style={localStyles.headerTitle}>
            Settings
          </h1>
          <p style={localStyles.headerSubtitle}>
            Configure ToqueWorks to match your business needs
          </p>
        </div>
        <div style={localStyles.headerActions}>
          <button
            onClick={resetToDefaults}
            style={localStyles.btnSecondary}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.lightBackground}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.background}
          >
            ↺ Reset to Defaults
          </button>
          <button
            onClick={saveSettings}
            disabled={!hasChanges}
            style={hasChanges ? localStyles.btnPrimary : localStyles.btnDisabled}
            onMouseEnter={(e) => hasChanges && (e.currentTarget.style.backgroundColor = COLORS.accentHover)}
            onMouseLeave={(e) => hasChanges && (e.currentTarget.style.backgroundColor = COLORS.accent)}
          >
            {saveStatus === 'saving' ? (
              <>
                <span style={localStyles.spinner}></span>
                Saving...
              </>
            ) : saveStatus === 'saved' ? (
              <>
                ✓ Saved
              </>
            ) : (
              <>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={localStyles.tabContainer}>
        <TabButton id="general" label="General" />
        <TabButton id="recipes" label="Recipe Options" />
        <TabButton id="display" label="Display" />
        <TabButton id="costing" label="Costing Rules" />
        <TabButton id="data" label="Data Management" />
        <TabButton id="notifications" label="Notifications" />
      </div>

      {/* General Settings Tab */}
      {activeTab === 'general' && (
        <div style={localStyles.tabContent}>
          <div style={localStyles.section}>
            <h2 style={localStyles.sectionTitle}>Business Information</h2>
            <div style={localStyles.gridCols2}>
              <div>
                <label style={localStyles.formLabel}>Business Name</label>
                <input
                  type="text"
                  value={generalSettings.businessName}
                  onChange={(e) => setGeneralSettings({...generalSettings, businessName: e.target.value})}
                  placeholder="Your Restaurant Name"
                  style={localStyles.formInput}
                  onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                  onBlur={(e) => e.target.style.borderColor = COLORS.border}
                />
              </div>
              <div>
                <label style={localStyles.formLabel}>Business Type</label>
                <select
                  value={generalSettings.businessType}
                  onChange={(e) => setGeneralSettings({...generalSettings, businessType: e.target.value})}
                  style={localStyles.formSelect}
                  onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                  onBlur={(e) => e.target.style.borderColor = COLORS.border}
                >
                  <option value="restaurant">Restaurant</option>
                  <option value="bakery">Bakery</option>
                  <option value="catering">Catering</option>
                  <option value="food_truck">Food Truck</option>
                  <option value="ghost_kitchen">Ghost Kitchen</option>
                  <option value="hotel">Hotel</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div style={localStyles.section}>
            <h2 style={localStyles.sectionTitle}>Regional Settings</h2>
            <div style={localStyles.gridCols2}>
              <div>
                <label style={localStyles.formLabel}>Currency</label>
                <div style={localStyles.inputGroup}>
                  <select
                    value={generalSettings.currency}
                    onChange={(e) => setGeneralSettings({...generalSettings, currency: e.target.value})}
                    style={{ ...localStyles.formSelect, flex: 1 }}
                    onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                    onBlur={(e) => e.target.style.borderColor = COLORS.border}
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                  </select>
                  <input
                    type="text"
                    value={generalSettings.currencySymbol}
                    onChange={(e) => setGeneralSettings({...generalSettings, currencySymbol: e.target.value})}
                    style={{ ...localStyles.formInput, width: '60px', textAlign: 'center' }}
                    placeholder="$"
                    onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                    onBlur={(e) => e.target.style.borderColor = COLORS.border}
                  />
                </div>
              </div>
              <div>
                <label style={localStyles.formLabel}>Unit System</label>
                <select
                  value={generalSettings.unitSystem}
                  onChange={(e) => setGeneralSettings({...generalSettings, unitSystem: e.target.value})}
                  style={localStyles.formSelect}
                  onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                  onBlur={(e) => e.target.style.borderColor = COLORS.border}
                >
                  <option value="imperial">Imperial (lb, oz, cups)</option>
                  <option value="metric">Metric (kg, g, ml)</option>
                </select>
              </div>
              <div>
                <label style={localStyles.formLabel}>Date Format</label>
                <select
                  value={generalSettings.dateFormat}
                  onChange={(e) => setGeneralSettings({...generalSettings, dateFormat: e.target.value})}
                  style={localStyles.formSelect}
                  onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                  onBlur={(e) => e.target.style.borderColor = COLORS.border}
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <label style={localStyles.formLabel}>Timezone</label>
                <select
                  value={generalSettings.timezone}
                  onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                  style={localStyles.formSelect}
                  onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                  onBlur={(e) => e.target.style.borderColor = COLORS.border}
                >
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="Europe/London">London</option>
                  <option value="Europe/Paris">Paris</option>
                  <option value="Asia/Tokyo">Tokyo</option>
                </select>
              </div>
            </div>
          </div>

          <div style={localStyles.section}>
            <h2 style={localStyles.sectionTitle}>Default Cost Parameters</h2>
            <div style={localStyles.gridCols3}>
              <div>
                <label style={localStyles.formLabel}>Tax Rate (%)</label>
                <input
                  type="number"
                  value={generalSettings.taxRate}
                  onChange={(e) => setGeneralSettings({...generalSettings, taxRate: parseFloat(e.target.value)})}
                  style={localStyles.formInput}
                  step="0.1"
                  min="0"
                  max="100"
                  onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                  onBlur={(e) => e.target.style.borderColor = COLORS.border}
                />
              </div>
              <div>
                <label style={localStyles.formLabel}>Labor Cost (%)</label>
                <input
                  type="number"
                  value={generalSettings.laborCostPercentage}
                  onChange={(e) => setGeneralSettings({...generalSettings, laborCostPercentage: parseFloat(e.target.value)})}
                  style={localStyles.formInput}
                  step="0.1"
                  min="0"
                  max="100"
                  onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                  onBlur={(e) => e.target.style.borderColor = COLORS.border}
                />
              </div>
              <div>
                <label style={localStyles.formLabel}>Overhead (%)</label>
                <input
                  type="number"
                  value={generalSettings.overheadPercentage}
                  onChange={(e) => setGeneralSettings({...generalSettings, overheadPercentage: parseFloat(e.target.value)})}
                  style={localStyles.formInput}
                  step="0.1"
                  min="0"
                  max="100"
                  onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                  onBlur={(e) => e.target.style.borderColor = COLORS.border}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recipe Options Tab */}
      {activeTab === 'recipes' && (
        <div style={localStyles.tabContent}>
          <div style={localStyles.section}>
            <h2 style={localStyles.sectionTitle}>Default Recipe Values</h2>
            <div style={localStyles.gridCols4}>
              <div>
                <label style={localStyles.formLabel}>Default Servings</label>
                <input
                  type="number"
                  value={recipeOptions.defaultServings}
                  onChange={(e) => setRecipeOptions({...recipeOptions, defaultServings: parseInt(e.target.value)})}
                  style={localStyles.formInput}
                  min="1"
                  onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                  onBlur={(e) => e.target.style.borderColor = COLORS.border}
                />
              </div>
              <div>
                <label style={localStyles.formLabel}>Default Prep Time (min)</label>
                <input
                  type="number"
                  value={recipeOptions.defaultPrepTime}
                  onChange={(e) => setRecipeOptions({...recipeOptions, defaultPrepTime: parseInt(e.target.value)})}
                  style={localStyles.formInput}
                  min="0"
                  onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                  onBlur={(e) => e.target.style.borderColor = COLORS.border}
                />
              </div>
              <div>
                <label style={localStyles.formLabel}>Default Cook Time (min)</label>
                <input
                  type="number"
                  value={recipeOptions.defaultCookTime}
                  onChange={(e) => setRecipeOptions({...recipeOptions, defaultCookTime: parseInt(e.target.value)})}
                  style={localStyles.formInput}
                  min="0"
                  onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                  onBlur={(e) => e.target.style.borderColor = COLORS.border}
                />
              </div>
              <div>
                <label style={localStyles.formLabel}>Default Category</label>
                <select
                  value={recipeOptions.defaultCategory}
                  onChange={(e) => setRecipeOptions({...recipeOptions, defaultCategory: e.target.value})}
                  style={localStyles.formSelect}
                  onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                  onBlur={(e) => e.target.style.borderColor = COLORS.border}
                >
                  <option value="Appetizers">Appetizers</option>
                  <option value="Entrees">Entrees</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Sides">Sides</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>
            </div>
          </div>

          <div style={localStyles.section}>
            <h2 style={localStyles.sectionTitle}>Recipe Management</h2>
            <div style={localStyles.grid}>
              <label style={localStyles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={recipeOptions.autoCalculateCosts}
                  onChange={(e) => setRecipeOptions({...recipeOptions, autoCalculateCosts: e.target.checked})}
                  style={localStyles.checkbox}
                />
                <span style={localStyles.checkboxText}>Automatically calculate recipe costs</span>
              </label>
              <label style={localStyles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={recipeOptions.requireCostValidation}
                  onChange={(e) => setRecipeOptions({...recipeOptions, requireCostValidation: e.target.checked})}
                  style={localStyles.checkbox}
                />
                <span style={localStyles.checkboxText}>Require cost validation before saving</span>
              </label>
              <label style={localStyles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={recipeOptions.allowDuplicateRecipes}
                  onChange={(e) => setRecipeOptions({...recipeOptions, allowDuplicateRecipes: e.target.checked})}
                  style={localStyles.checkbox}
                />
                <span style={localStyles.checkboxText}>Allow duplicate recipe names</span>
              </label>
              <label style={localStyles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={recipeOptions.enableVersioning}
                  onChange={(e) => setRecipeOptions({...recipeOptions, enableVersioning: e.target.checked})}
                  style={localStyles.checkbox}
                />
                <span style={localStyles.checkboxText}>Enable recipe version history</span>
              </label>
              <label style={localStyles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={recipeOptions.enableRecipeSharing}
                  onChange={(e) => setRecipeOptions({...recipeOptions, enableRecipeSharing: e.target.checked})}
                  style={localStyles.checkbox}
                />
                <span style={localStyles.checkboxText}>Enable recipe sharing between team members</span>
              </label>
            </div>
          </div>

          <div style={localStyles.section}>
            <h2 style={localStyles.sectionTitle}>Scaling Options</h2>
            <div style={localStyles.gridCols2}>
              <div>
                <label style={localStyles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={recipeOptions.enableBatchScaling}
                    onChange={(e) => setRecipeOptions({...recipeOptions, enableBatchScaling: e.target.checked})}
                    style={localStyles.checkbox}
                  />
                  <span style={localStyles.checkboxText}>Enable batch scaling features</span>
                </label>
                <label style={localStyles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={recipeOptions.scalingTimeAdjustment}
                    onChange={(e) => setRecipeOptions({...recipeOptions, scalingTimeAdjustment: e.target.checked})}
                    style={localStyles.checkbox}
                  />
                  <span style={localStyles.checkboxText}>Adjust cooking times when scaling</span>
                </label>
                <label style={localStyles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={recipeOptions.roundScaledQuantities}
                    onChange={(e) => setRecipeOptions({...recipeOptions, roundScaledQuantities: e.target.checked})}
                    style={localStyles.checkbox}
                  />
                  <span style={localStyles.checkboxText}>Round scaled quantities</span>
                </label>
              </div>
              <div style={localStyles.grid}>
                <div>
                  <label style={localStyles.formLabel}>Maximum Scale Factor</label>
                  <input
                    type="number"
                    value={recipeOptions.maxScaleFactor}
                    onChange={(e) => setRecipeOptions({...recipeOptions, maxScaleFactor: parseInt(e.target.value)})}
                    style={localStyles.formInput}
                    min="1"
                    max="1000"
                    onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                    onBlur={(e) => e.target.style.borderColor = COLORS.border}
                  />
                </div>
                <div>
                  <label style={localStyles.formLabel}>Scaling Decimal Places</label>
                  <input
                    type="number"
                    value={recipeOptions.scalingDecimalPlaces}
                    onChange={(e) => setRecipeOptions({...recipeOptions, scalingDecimalPlaces: parseInt(e.target.value)})}
                    style={localStyles.formInput}
                    min="0"
                    max="4"
                    onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                    onBlur={(e) => e.target.style.borderColor = COLORS.border}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Display Tab */}
      {activeTab === 'display' && (
        <div style={localStyles.tabContent}>
          <div style={localStyles.section}>
            <h2 style={localStyles.sectionTitle}>Recipe List Display</h2>
            <div style={localStyles.gridCols2}>
              <div style={localStyles.grid}>
                <label style={localStyles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={recipeOptions.showCostInRecipeList}
                    onChange={(e) => setRecipeOptions({...recipeOptions, showCostInRecipeList: e.target.checked})}
                    style={localStyles.checkbox}
                  />
                  <span style={localStyles.checkboxText}>Show costs in recipe list</span>
                </label>
                <label style={localStyles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={recipeOptions.showProfitMargin}
                    onChange={(e) => setRecipeOptions({...recipeOptions, showProfitMargin: e.target.checked})}
                    style={localStyles.checkbox}
                  />
                  <span style={localStyles.checkboxText}>Show profit margins</span>
                </label>
                <label style={localStyles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={recipeOptions.showFoodCostPercent}
                    onChange={(e) => setRecipeOptions({...recipeOptions, showFoodCostPercent: e.target.checked})}
                    style={localStyles.checkbox}
                  />
                  <span style={localStyles.checkboxText}>Show food cost percentage</span>
                </label>
                <label style={localStyles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={recipeOptions.showAllergens}
                    onChange={(e) => setRecipeOptions({...recipeOptions, showAllergens: e.target.checked})}
                    style={localStyles.checkbox}
                  />
                  <span style={localStyles.checkboxText}>Show allergen information</span>
                </label>
                <label style={localStyles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={recipeOptions.showNutritionalInfo}
                    onChange={(e) => setRecipeOptions({...recipeOptions, showNutritionalInfo: e.target.checked})}
                    style={localStyles.checkbox}
                  />
                  <span style={localStyles.checkboxText}>Show nutritional information</span>
                </label>
              </div>
              <div style={localStyles.grid}>
                <div>
                  <label style={localStyles.formLabel}>Default View Mode</label>
                  <select
                    value={recipeOptions.defaultViewMode}
                    onChange={(e) => setRecipeOptions({...recipeOptions, defaultViewMode: e.target.value})}
                    style={localStyles.formSelect}
                    onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                    onBlur={(e) => e.target.style.borderColor = COLORS.border}
                  >
                    <option value="table">Table View</option>
                    <option value="cards">Card View</option>
                  </select>
                </div>
                <div>
                  <label style={localStyles.formLabel}>Recipes Per Page</label>
                  <select
                    value={recipeOptions.recipesPerPage}
                    onChange={(e) => setRecipeOptions({...recipeOptions, recipesPerPage: parseInt(e.target.value)})}
                    style={localStyles.formSelect}
                    onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                    onBlur={(e) => e.target.style.borderColor = COLORS.border}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Costing Rules Tab */}
      {activeTab === 'costing' && (
        <div style={localStyles.tabContent}>
          <div style={localStyles.section}>
            <h2 style={localStyles.sectionTitle}>Food Cost Targets</h2>
            <div style={localStyles.gridCols3}>
              <div>
                <label style={localStyles.formLabel}>Target Food Cost (%)</label>
                <input
                  type="number"
                  value={recipeOptions.targetFoodCostPercent}
                  onChange={(e) => setRecipeOptions({...recipeOptions, targetFoodCostPercent: parseFloat(e.target.value)})}
                  style={localStyles.formInput}
                  step="0.1"
                  min="0"
                  max="100"
                  onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                  onBlur={(e) => e.target.style.borderColor = COLORS.border}
                />
                <p style={localStyles.formHelpText}>
                  Ideal food cost percentage for profitability
                </p>
              </div>
              <div>
                <label style={localStyles.formLabel}>Warning Threshold (%)</label>
                <input
                  type="number"
                  value={recipeOptions.warningFoodCostPercent}
                  onChange={(e) => setRecipeOptions({...recipeOptions, warningFoodCostPercent: parseFloat(e.target.value)})}
                  style={localStyles.formInput}
                  step="0.1"
                  min="0"
                  max="100"
                  onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                  onBlur={(e) => e.target.style.borderColor = COLORS.border}
                />
                <p style={localStyles.formHelpText}>
                  Show warning when food cost exceeds this
                </p>
              </div>
              <div>
                <label style={localStyles.formLabel}>Min Profit Margin (%)</label>
                <input
                  type="number"
                  value={recipeOptions.minimumProfitMargin}
                  onChange={(e) => setRecipeOptions({...recipeOptions, minimumProfitMargin: parseFloat(e.target.value)})}
                  style={localStyles.formInput}
                  step="0.1"
                  min="0"
                  max="100"
                  onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                  onBlur={(e) => e.target.style.borderColor = COLORS.border}
                />
                <p style={localStyles.formHelpText}>
                  Alert when margin falls below this
                </p>
              </div>
            </div>
          </div>

          <div style={localStyles.section}>
            <h2 style={localStyles.sectionTitle}>Additional Cost Factors</h2>
            <div style={localStyles.grid}>
              <div>
                <label style={localStyles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={recipeOptions.includePackagingInCost}
                    onChange={(e) => setRecipeOptions({...recipeOptions, includePackagingInCost: e.target.checked})}
                    style={localStyles.checkbox}
                  />
                  <span style={localStyles.checkboxText}>Include packaging costs in recipe cost</span>
                </label>
                {recipeOptions.includePackagingInCost && (
                  <div style={localStyles.indentedOption}>
                    <label style={localStyles.formLabel}>Packaging Cost (% of food cost)</label>
                    <input
                      type="number"
                      value={recipeOptions.packagingCostPercent}
                      onChange={(e) => setRecipeOptions({...recipeOptions, packagingCostPercent: parseFloat(e.target.value)})}
                      style={localStyles.inputSmall}
                      step="0.1"
                      min="0"
                      max="20"
                      onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                      onBlur={(e) => e.target.style.borderColor = COLORS.border}
                    />
                  </div>
                )}
              </div>
              
              <div>
                <label style={localStyles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={recipeOptions.includeLaborInCost}
                    onChange={(e) => setRecipeOptions({...recipeOptions, includeLaborInCost: e.target.checked})}
                    style={localStyles.checkbox}
                  />
                  <span style={localStyles.checkboxText}>Include labor costs in recipe cost</span>
                </label>
                {recipeOptions.includeLaborInCost && (
                  <div style={{ ...localStyles.indentedOption, display: 'flex', gap: SPACING.lg }}>
                    <div>
                      <label style={localStyles.formLabel}>Labor Cost Method</label>
                      <select
                        value={recipeOptions.laborCostMethod}
                        onChange={(e) => setRecipeOptions({...recipeOptions, laborCostMethod: e.target.value})}
                        style={localStyles.selectSmall}
                        onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                        onBlur={(e) => e.target.style.borderColor = COLORS.border}
                      >
                        <option value="percentage">Percentage of Food Cost</option>
                        <option value="hourly">Hourly Rate</option>
                      </select>
                    </div>
                    {recipeOptions.laborCostMethod === 'hourly' && (
                      <div>
                        <label style={localStyles.formLabel}>Hourly Rate ($)</label>
                        <input
                          type="number"
                          value={recipeOptions.laborHourlyRate}
                          onChange={(e) => setRecipeOptions({...recipeOptions, laborHourlyRate: parseFloat(e.target.value)})}
                          style={localStyles.inputSmall}
                          step="0.50"
                          min="0"
                          onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                          onBlur={(e) => e.target.style.borderColor = COLORS.border}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Data Management Tab */}
      {activeTab === 'data' && (
        <div style={localStyles.tabContent}>
          <div style={localStyles.section}>
            <h2 style={localStyles.sectionTitle}>Backup Settings</h2>
            <div style={localStyles.grid}>
              <label style={localStyles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={dataManagement.autoBackup}
                  onChange={(e) => setDataManagement({...dataManagement, autoBackup: e.target.checked})}
                  style={localStyles.checkbox}
                />
                <span style={localStyles.checkboxText}>Enable automatic backups</span>
              </label>
              
              {dataManagement.autoBackup && (
                <div style={localStyles.indentedOption}>
                  <label style={localStyles.formLabel}>Backup Frequency</label>
                  <select
                    value={dataManagement.backupFrequency}
                    onChange={(e) => setDataManagement({...dataManagement, backupFrequency: e.target.value})}
                    style={localStyles.selectSmall}
                    onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                    onBlur={(e) => e.target.style.borderColor = COLORS.border}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              )}
              
              <div>
                <label style={localStyles.formLabel}>Data Retention Period (days)</label>
                <input
                  type="number"
                  value={dataManagement.dataRetentionDays}
                  onChange={(e) => setDataManagement({...dataManagement, dataRetentionDays: parseInt(e.target.value)})}
                  style={localStyles.inputSmall}
                  min="1"
                  max="365"
                  onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                  onBlur={(e) => e.target.style.borderColor = COLORS.border}
                />
              </div>
            </div>
          </div>

          <div style={localStyles.section}>
            <h2 style={localStyles.sectionTitle}>Import/Export</h2>
            <div style={{ display: 'flex', gap: SPACING.lg }}>
              <button
                onClick={exportSettings}
                style={localStyles.btnSecondary}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.lightBackground}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.background}
              >
                ↓ Export Settings
              </button>
              <label 
                style={{ ...localStyles.btnSecondary, cursor: 'pointer' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.lightBackground}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.background}
              >
                ↑ Import Settings
                <input
                  type="file"
                  accept=".json"
                  onChange={importSettings}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <p style={localStyles.formHelpText}>
              Export your settings for backup or import them to another device
            </p>
          </div>

          {dataManagement.lastBackup && (
            <div style={localStyles.infoBox}>
              <span>ℹ</span>
              <div>
                <p style={localStyles.infoText}>
                  Last backup: {new Date(dataManagement.lastBackup).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div style={localStyles.tabContent}>
          <div style={localStyles.section}>
            <h2 style={localStyles.sectionTitle}>Alert Preferences</h2>
            <div style={localStyles.grid}>
              <label style={localStyles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={notifications.highCostAlerts}
                  onChange={(e) => setNotifications({...notifications, highCostAlerts: e.target.checked})}
                  style={localStyles.checkbox}
                />
                <div>
                  <span style={localStyles.checkboxText}>High food cost alerts</span>
                  <p style={localStyles.formHelpText}>
                    Notify when recipes exceed target food cost percentage
                  </p>
                </div>
              </label>
              
              <label style={localStyles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={notifications.lowInventoryAlerts}
                  onChange={(e) => setNotifications({...notifications, lowInventoryAlerts: e.target.checked})}
                  style={localStyles.checkbox}
                />
                <div>
                  <span style={localStyles.checkboxText}>Low inventory alerts</span>
                  <p style={localStyles.formHelpText}>
                    Alert when ingredients are running low
                  </p>
                </div>
              </label>
              
              <label style={localStyles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={notifications.priceChangeAlerts}
                  onChange={(e) => setNotifications({...notifications, priceChangeAlerts: e.target.checked})}
                  style={localStyles.checkbox}
                />
                <div>
                  <span style={localStyles.checkboxText}>Price change alerts</span>
                  <p style={localStyles.formHelpText}>
                    Notify when ingredient prices change significantly
                  </p>
                </div>
              </label>
              
              <label style={localStyles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={notifications.newRecipeReminders}
                  onChange={(e) => setNotifications({...notifications, newRecipeReminders: e.target.checked})}
                  style={localStyles.checkbox}
                />
                <div>
                  <span style={localStyles.checkboxText}>New recipe reminders</span>
                  <p style={localStyles.formHelpText}>
                    Remind to cost and price new recipes
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div style={localStyles.section}>
            <h2 style={localStyles.sectionTitle}>Report Frequency</h2>
            <div>
              <label style={localStyles.formLabel}>Cost Analysis Reports</label>
              <select
                value={notifications.costAnalysisReports}
                onChange={(e) => setNotifications({...notifications, costAnalysisReports: e.target.value})}
                style={localStyles.selectSmall}
                onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                onBlur={(e) => e.target.style.borderColor = COLORS.border}
              >
                <option value="never">Never</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <p style={localStyles.formHelpText}>
                Receive summary reports of recipe costs and profitability
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Save Status Toast */}
      {saveStatus === 'error' && (
        <div style={localStyles.errorToast}>
          × Error saving settings
        </div>
      )}
      
      {/* CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Settings;
// SettingsPage.js - ToqueWorks Administrator Settings
import React, { useState, useEffect } from 'react';
import STYLES from '../styles/globalStyles';

const {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BUTTONS,
  FORMS,
  CARDS
} = STYLES;

// Default settings
const defaultSettings = {
  labBudgetPerClass: 150.00,
  defaultClassSize: 12,
  defaultStudentPairing: 'pairs', // 'pairs' or 'individual'
  maxServingsPerPair: 6,
  maxServingsPerIndividual: 6,
  vendorMarkup: 0, // percentage markup on Shamrock prices
  alertThresholdPercent: 90, // alert when at 90% of budget
  course: 'CUL 140',
  courseWeek: 3
};

const SettingsPage = () => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('toqueworks_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [showSaved, setShowSaved] = useState(false);

  const localStyles = {
    container: {
      maxWidth: '1200px',
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
    section: {
      backgroundColor: COLORS.background,
      border: `1px solid ${COLORS.border}`,
      borderRadius: SPACING.sm,
      padding: SPACING.xl,
      marginBottom: SPACING.xl
    },
    sectionTitle: {
      fontSize: TYPOGRAPHY.fontSize.xl,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      color: COLORS.primary,
      marginBottom: SPACING.lg,
      paddingBottom: SPACING.md,
      borderBottom: `2px solid ${COLORS.border}`
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: SPACING.xl
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
    helpText: {
      fontSize: TYPOGRAPHY.fontSize.xs,
      color: COLORS.secondary,
      marginTop: SPACING.xs
    },
    buttonGroup: {
      display: 'flex',
      gap: SPACING.md,
      marginTop: SPACING.xl
    },
    btnPrimary: {
      ...BUTTONS.primary,
      padding: `${SPACING.md} ${SPACING.xl}`
    },
    btnSecondary: {
      ...BUTTONS.secondary,
      padding: `${SPACING.md} ${SPACING.xl}`
    },
    alert: {
      padding: SPACING.lg,
      backgroundColor: '#E8F5E9',
      border: `1px solid #4CAF50`,
      borderRadius: SPACING.sm,
      color: '#2E7D32',
      marginBottom: SPACING.xl,
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.md
    }
  };

  const handleSave = () => {
    localStorage.setItem('toqueworks_settings', JSON.stringify(settings));
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all settings to defaults?')) {
      setSettings(defaultSettings);
      localStorage.setItem('toqueworks_settings', JSON.stringify(defaultSettings));
    }
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div style={localStyles.container}>
      {/* Header */}
      <div style={localStyles.header}>
        <h1 style={localStyles.h1}>Administrator Settings</h1>
        <p style={{ fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.secondary, marginTop: SPACING.sm }}>
          Configure system-wide settings for lab budgeting and recipe management
        </p>
      </div>

      {/* Saved Alert */}
      {showSaved && (
        <div style={localStyles.alert}>
          <span style={{ fontSize: '20px' }}>✓</span>
          <span style={{ fontWeight: TYPOGRAPHY.fontWeight.semibold }}>Settings saved successfully!</span>
        </div>
      )}

      {/* Budget Settings */}
      <div style={localStyles.section}>
        <h2 style={localStyles.sectionTitle}>Lab Budget Settings</h2>
        <div style={localStyles.formGrid}>
          <div style={localStyles.formGroup}>
            <label style={localStyles.label}>
              Lab Budget Per Class Session
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm }}>
              <span style={{ fontSize: TYPOGRAPHY.fontSize.lg, fontWeight: TYPOGRAPHY.fontWeight.semibold }}>$</span>
              <input
                type="number"
                min="0"
                step="10"
                value={settings.labBudgetPerClass}
                onChange={(e) => updateSetting('labBudgetPerClass', parseFloat(e.target.value))}
                style={localStyles.input}
              />
            </div>
            <div style={localStyles.helpText}>
              Total ingredient budget for all recipes in a single lab session
            </div>
          </div>

          <div style={localStyles.formGroup}>
            <label style={localStyles.label}>
              Budget Alert Threshold
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm }}>
              <input
                type="number"
                min="50"
                max="100"
                step="5"
                value={settings.alertThresholdPercent}
                onChange={(e) => updateSetting('alertThresholdPercent', parseInt(e.target.value))}
                style={localStyles.input}
              />
              <span style={{ fontSize: TYPOGRAPHY.fontSize.md }}>%</span>
            </div>
            <div style={localStyles.helpText}>
              Alert when lab cost reaches this percentage of budget (currently ${(settings.labBudgetPerClass * settings.alertThresholdPercent / 100).toFixed(2)})
            </div>
          </div>

          <div style={localStyles.formGroup}>
            <label style={localStyles.label}>
              Vendor Price Markup
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm }}>
              <input
                type="number"
                min="0"
                max="50"
                step="5"
                value={settings.vendorMarkup}
                onChange={(e) => updateSetting('vendorMarkup', parseInt(e.target.value))}
                style={localStyles.input}
              />
              <span style={{ fontSize: TYPOGRAPHY.fontSize.md }}>%</span>
            </div>
            <div style={localStyles.helpText}>
              Add markup to Shamrock prices (for shipping, handling, etc.)
            </div>
          </div>
        </div>
      </div>

      {/* Class Configuration */}
      <div style={localStyles.section}>
        <h2 style={localStyles.sectionTitle}>Class Configuration</h2>
        <div style={localStyles.formGrid}>
          <div style={localStyles.formGroup}>
            <label style={localStyles.label}>
              Default Class Size
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={settings.defaultClassSize}
              onChange={(e) => updateSetting('defaultClassSize', parseInt(e.target.value))}
              style={localStyles.input}
            />
            <div style={localStyles.helpText}>
              Default number of students per lab session
            </div>
          </div>

          <div style={localStyles.formGroup}>
            <label style={localStyles.label}>
              Default Student Pairing
            </label>
            <select
              value={settings.defaultStudentPairing}
              onChange={(e) => updateSetting('defaultStudentPairing', e.target.value)}
              style={localStyles.select}
            >
              <option value="pairs">Pairs (2 students)</option>
              <option value="individual">Individual (1 student)</option>
              <option value="groups">Groups (3-4 students)</option>
            </select>
            <div style={localStyles.helpText}>
              How students typically work in labs
            </div>
          </div>

          <div style={localStyles.formGroup}>
            <label style={localStyles.label}>
              Max Servings Per Pair
            </label>
            <input
              type="number"
              min="1"
              max="12"
              value={settings.maxServingsPerPair}
              onChange={(e) => updateSetting('maxServingsPerPair', parseInt(e.target.value))}
              style={localStyles.input}
            />
            <div style={localStyles.helpText}>
              Maximum servings a pair should produce (minimize waste)
            </div>
          </div>

          <div style={localStyles.formGroup}>
            <label style={localStyles.label}>
              Max Servings Per Individual
            </label>
            <input
              type="number"
              min="1"
              max="12"
              value={settings.maxServingsPerIndividual}
              onChange={(e) => updateSetting('maxServingsPerIndividual', parseInt(e.target.value))}
              style={localStyles.input}
            />
            <div style={localStyles.helpText}>
              Maximum servings an individual should produce
            </div>
          </div>
        </div>
      </div>

      {/* Course Settings */}
      <div style={localStyles.section}>
        <h2 style={localStyles.sectionTitle}>Current Course Settings</h2>
        <div style={localStyles.formGrid}>
          <div style={localStyles.formGroup}>
            <label style={localStyles.label}>
              Course Code
            </label>
            <input
              type="text"
              value={settings.course}
              onChange={(e) => updateSetting('course', e.target.value)}
              style={localStyles.input}
              placeholder="e.g., CUL 140"
            />
            <div style={localStyles.helpText}>
              Current course being managed
            </div>
          </div>

          <div style={localStyles.formGroup}>
            <label style={localStyles.label}>
              Week Number
            </label>
            <input
              type="number"
              min="1"
              max="16"
              value={settings.courseWeek}
              onChange={(e) => updateSetting('courseWeek', parseInt(e.target.value))}
              style={localStyles.input}
            />
            <div style={localStyles.helpText}>
              Current week in the course
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={localStyles.buttonGroup}>
        <button
          style={localStyles.btnPrimary}
          onClick={handleSave}
          onMouseEnter={(e) => e.target.style.opacity = '0.9'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          Save Settings
        </button>
        <button
          style={localStyles.btnSecondary}
          onClick={handleReset}
          onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.lightBackground}
          onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.background}
        >
          Reset to Defaults
        </button>
      </div>

      {/* Current Values Summary */}
      <div style={{ ...localStyles.section, marginTop: SPACING.xxl, backgroundColor: COLORS.lightBackground }}>
        <h3 style={{ ...localStyles.sectionTitle, borderBottom: 'none', marginBottom: SPACING.md }}>
          Current Configuration Summary
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: SPACING.lg }}>
          <div>
            <div style={{ fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.secondary, marginBottom: SPACING.xs }}>
              LAB BUDGET
            </div>
            <div style={{ fontSize: TYPOGRAPHY.fontSize.xl, fontWeight: TYPOGRAPHY.fontWeight.bold, color: COLORS.primary }}>
              ${settings.labBudgetPerClass.toFixed(2)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.secondary, marginBottom: SPACING.xs }}>
              CLASS SIZE
            </div>
            <div style={{ fontSize: TYPOGRAPHY.fontSize.xl, fontWeight: TYPOGRAPHY.fontWeight.bold, color: COLORS.primary }}>
              {settings.defaultClassSize} students
            </div>
          </div>
          <div>
            <div style={{ fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.secondary, marginBottom: SPACING.xs }}>
              PAIRING MODE
            </div>
            <div style={{ fontSize: TYPOGRAPHY.fontSize.xl, fontWeight: TYPOGRAPHY.fontWeight.bold, color: COLORS.primary, textTransform: 'capitalize' }}>
              {settings.defaultStudentPairing}
            </div>
          </div>
          <div>
            <div style={{ fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.secondary, marginBottom: SPACING.xs }}>
              MAX SERVINGS/PAIR
            </div>
            <div style={{ fontSize: TYPOGRAPHY.fontSize.xl, fontWeight: TYPOGRAPHY.fontWeight.bold, color: COLORS.primary }}>
              {settings.maxServingsPerPair}
            </div>
          </div>
          <div>
            <div style={{ fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.secondary, marginBottom: SPACING.xs }}>
              BUDGET PER STUDENT
            </div>
            <div style={{ fontSize: TYPOGRAPHY.fontSize.xl, fontWeight: TYPOGRAPHY.fontWeight.bold, color: COLORS.primary }}>
              ${(settings.labBudgetPerClass / settings.defaultClassSize).toFixed(2)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.secondary, marginBottom: SPACING.xs }}>
              COURSE
            </div>
            <div style={{ fontSize: TYPOGRAPHY.fontSize.xl, fontWeight: TYPOGRAPHY.fontWeight.bold, color: COLORS.primary }}>
              {settings.course} Week {settings.courseWeek}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

// src/constants/theme.js
export const THEME = {
  primary: '#8AC732',      // Brand green (yellowGreen)
  gunmetal: '#1F2D38',     // Dark navy
  charcoal: '#2A3E51',     // Medium navy
  gray: '#53646E',         // Medium gray
  silver: '#BBBFC2',       // Light gray
  light: '#F6F8F8',        // Very light gray
  seasalt: '#F6F8F8',      // Same as light
  dimGray: '#6B7280',      // Neutral gray
  cardinal: '#EF4444',     // Red for errors/warnings
  green: '#10B981',        // Success green
  yellowGreen: '#8AC732'   // Same as primary
};

// Optional: Add semantic color mappings
export const COLORS = {
  // Status colors
  success: THEME.green,
  warning: '#F59E0B',
  error: THEME.cardinal,
  info: THEME.primary,
  
  // Text colors
  textPrimary: THEME.gunmetal,
  textSecondary: THEME.gray,
  textMuted: THEME.dimGray,
  
  // Background colors
  bgPrimary: '#FFFFFF',
  bgSecondary: THEME.light,
  bgTertiary: THEME.seasalt,
  
  // Border colors
  borderPrimary: THEME.silver,
  borderSecondary: THEME.light,
  
  // Food cost thresholds
  foodCostGood: THEME.green,      // < 30%
  foodCostWarning: '#F59E0B',     // 30-35%
  foodCostDanger: THEME.cardinal, // > 35%
};

// Optional: Add responsive breakpoints
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Optional: Add common spacing values
export const SPACING = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
};

export default THEME;
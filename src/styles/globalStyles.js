// src/styles/globalStyles.js - COMPLETE EXTENDED VERSION

// ============================================
// COLOR PALETTE - UPDATED
// ============================================
export const COLORS = {
  // Primary Colors
  primary: '#1F2D38',      // Gunmetal - primary text, headers
  secondary: '#6B7280',    // Gray - secondary text
  tertiary: '#9CA3AF',     // Light gray - disabled, hints
  accent: '#8AC732',       // Lime Green - CTAs, success
  
  // Background Colors
  background: '#FFFFFF',
  lightBackground: '#FAFAFA',
  darkBackground: '#111827',
  
  // Border Colors
  border: '#E5E7EB',
  subtleBorder: '#F6F8F8',
  
  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Special Colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: 'rgba(0, 0, 0, 0.1)',
  
  // NEWLY ADDED COLORS
  accentHover: '#7BA428',   // Darker shade of accent for hover states
  muted: '#9CA3AF'          // Same as tertiary, for semantic clarity
};

// ============================================
// TYPOGRAPHY
// ============================================
export const TYPOGRAPHY = {
  // Font Sizes
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px'
  },
  
  // Font Weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75
  },
  
  // Letter Spacing
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.05em'
  },
  
  // Heading Styles
  heading: {
    sm: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: 1.3
    },
    md: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.3
    },
    lg: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: 1.2
    }
  },
  
  // Label Styles
  label: {
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: COLORS.secondary
  },
  
  // Body Text
  body: {
    fontSize: '14px',
    lineHeight: 1.5,
    color: COLORS.primary
  }
};

// ============================================
// SPACING
// ============================================
export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  xxxl: '48px'
};

// ============================================
// FIELD WIDTHS
// ============================================
export const FIELD_WIDTHS = {
  small: '120px',
  medium: '200px',
  large: '300px',
  full: '100%',
  
  // Specific field types
  quantity: '80px',
  price: '100px',
  percentage: '80px',
  date: '140px',
  time: '100px',
  email: '250px',
  phone: '150px'
};

// ============================================
// PAGE LAYOUT
// ============================================
export const PAGE_CONTAINER = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: SPACING.xl
};

export const PAGE_HEADER = {
  container: {
    marginBottom: SPACING.xl,
    paddingBottom: SPACING.lg,
    borderBottom: `1px solid ${COLORS.border}`
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xxl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.secondary
  }
};

export const DIVIDER = {
  horizontal: {
    width: '100%',
    height: '1px',
    backgroundColor: COLORS.border,
    margin: `${SPACING.lg} 0`
  },
  vertical: {
    width: '1px',
    height: '100%',
    backgroundColor: COLORS.border,
    margin: `0 ${SPACING.lg}`
  }
};

// ============================================
// BUTTONS
// ============================================
export const BUTTONS = {
  primary: {
    backgroundColor: COLORS.primary,
    color: COLORS.background,
    padding: `${SPACING.sm} ${SPACING.lg}`,
    borderRadius: SPACING.sm,
    border: 'none',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  secondary: {
    backgroundColor: COLORS.background,
    color: COLORS.primary,
    padding: `${SPACING.sm} ${SPACING.lg}`,
    borderRadius: SPACING.sm,
    border: `1px solid ${COLORS.border}`,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  ghost: {
    backgroundColor: 'transparent',
    color: COLORS.primary,
    padding: `${SPACING.sm} ${SPACING.lg}`,
    border: 'none',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  danger: {
    backgroundColor: COLORS.error,
    color: COLORS.background,
    padding: `${SPACING.sm} ${SPACING.lg}`,
    borderRadius: SPACING.sm,
    border: 'none',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  success: {
    backgroundColor: COLORS.success,
    color: COLORS.background,
    padding: `${SPACING.sm} ${SPACING.lg}`,
    borderRadius: SPACING.sm,
    border: 'none',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  outline: {
    backgroundColor: 'transparent',
    color: COLORS.primary,
    padding: `${SPACING.sm} ${SPACING.lg}`,
    borderRadius: SPACING.sm,
    border: `1px solid ${COLORS.border}`,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }
};

// ============================================
// FORMS
// ============================================
export const FORMS = {
  label: {
    fontSize: '11px',
    fontWeight: 500,
    color: COLORS.secondary,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: SPACING.xs
  },
  input: {
    base: {
      padding: `${SPACING.sm} ${SPACING.md}`,
      border: `1px solid ${COLORS.border}`,
      borderRadius: SPACING.sm,
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.primary,
      backgroundColor: COLORS.background,
      outline: 'none',
      transition: 'all 0.15s ease'
    },
    error: {
      borderColor: COLORS.error,
      backgroundColor: '#FEF2F2'
    },
    focus: {
      borderColor: COLORS.primary,
      boxShadow: `0 0 0 3px ${COLORS.primary}20`
    },
    disabled: {
      backgroundColor: COLORS.lightBackground,
      color: COLORS.tertiary,
      cursor: 'not-allowed'
    }
  },
  select: {
    base: {
      padding: `${SPACING.sm} ${SPACING.md}`,
      border: `1px solid ${COLORS.border}`,
      borderRadius: SPACING.sm,
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.primary,
      backgroundColor: COLORS.background,
      outline: 'none',
      cursor: 'pointer',
      transition: 'all 0.15s ease'
    }
  },
  textarea: {
    base: {
      padding: `${SPACING.sm} ${SPACING.md}`,
      border: `1px solid ${COLORS.border}`,
      borderRadius: SPACING.sm,
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.primary,
      backgroundColor: COLORS.background,
      outline: 'none',
      resize: 'vertical',
      minHeight: '80px',
      transition: 'all 0.15s ease'
    }
  },
  checkbox: {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.sm
    },
    input: {
      width: '16px',
      height: '16px',
      cursor: 'pointer'
    },
    label: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.primary,
      cursor: 'pointer'
    }
  },
  errorText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.error,
    marginTop: SPACING.xs
  },
  helpText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.tertiary,
    marginTop: SPACING.xs
  }
};

// ============================================
// TABLES
// ============================================
export const TABLES = {
  container: {
    width: '100%',
    backgroundColor: COLORS.background,
    borderRadius: SPACING.sm,
    overflow: 'hidden',
    border: `1px solid ${COLORS.border}`
  },
  header: {
    backgroundColor: COLORS.lightBackground,
    borderBottom: `2px solid ${COLORS.border}`
  },
  headerCell: {
    padding: SPACING.md,
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.secondary,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  row: {
    borderBottom: `1px solid ${COLORS.border}`,
    transition: 'background-color 0.15s ease'
  },
  rowHover: {
    backgroundColor: COLORS.lightBackground
  },
  cell: {
    padding: SPACING.md,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.primary
  },
  emptyState: {
    padding: SPACING.xxl,
    textAlign: 'center',
    color: COLORS.tertiary
  }
};

// ============================================
// CARDS - EXTENDED
// ============================================
export const CARDS = {
  container: {
    backgroundColor: COLORS.background,
    borderRadius: SPACING.sm,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${COLORS.border}`,
    padding: SPACING.lg
  },
  // NEWLY ADDED - base card without padding for more flexible use
  base: {
    backgroundColor: COLORS.background,
    borderRadius: SPACING.sm,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${COLORS.border}`
  },
  header: {
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottom: `1px solid ${COLORS.border}`
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.primary
  },
  body: {
    padding: SPACING.lg
  },
  footer: {
    marginTop: SPACING.lg,
    paddingTop: SPACING.md,
    borderTop: `1px solid ${COLORS.border}`
  }
};

// ============================================
// STATUS
// ============================================
export const STATUS = {
  badge: {
    display: 'inline-block',
    padding: `2px ${SPACING.sm}`,
    borderRadius: '12px',
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    textTransform: 'uppercase'
  },
  success: {
    backgroundColor: `${COLORS.success}15`,
    color: COLORS.success
  },
  warning: {
    backgroundColor: `${COLORS.warning}15`,
    color: COLORS.warning
  },
  error: {
    backgroundColor: `${COLORS.error}15`,
    color: COLORS.error
  },
  info: {
    backgroundColor: `${COLORS.info}15`,
    color: COLORS.info
  },
  neutral: {
    backgroundColor: COLORS.lightBackground,
    color: COLORS.secondary
  }
};

// ============================================
// MODALS - EXTENDED
// ============================================
export const MODALS = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    backgroundColor: COLORS.background,
    borderRadius: SPACING.sm,
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    border: `1px solid ${COLORS.border}`,
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'hidden'
  },
  // NEWLY ADDED - alternative naming for consistency
  content: {
    backgroundColor: COLORS.background,
    borderRadius: SPACING.sm,
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    border: `1px solid ${COLORS.border}`,
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'hidden'
  },
  header: {
    padding: `${SPACING.lg} ${SPACING.xl}`,
    borderBottom: `1px solid ${COLORS.border}`,
    backgroundColor: COLORS.lightBackground
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.primary
  },
  // NEWLY ADDED - close button style
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    color: COLORS.secondary,
    cursor: 'pointer',
    padding: '0',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    padding: SPACING.xl,
    overflowY: 'auto'
  },
  footer: {
    padding: `${SPACING.lg} ${SPACING.xl}`,
    borderTop: `1px solid ${COLORS.border}`,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: SPACING.md
  }
};

// ============================================
// DROPDOWNS
// ============================================
export const DROPDOWNS = {
  trigger: {
    cursor: 'pointer',
    userSelect: 'none'
  },
  menu: {
    position: 'absolute',
    backgroundColor: COLORS.background,
    border: `1px solid ${COLORS.border}`,
    borderRadius: SPACING.sm,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
    minWidth: '150px'
  },
  item: {
    padding: `${SPACING.sm} ${SPACING.md}`,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.primary,
    cursor: 'pointer',
    transition: 'background-color 0.15s ease'
  },
  itemHover: {
    backgroundColor: COLORS.lightBackground
  },
  divider: {
    height: '1px',
    backgroundColor: COLORS.border,
    margin: `${SPACING.xs} 0`
  }
};

// ============================================
// PROGRESS
// ============================================
export const PROGRESS = {
  container: {
    width: '100%'
  },
  bar: {
    width: '100%',
    height: '8px',
    backgroundColor: COLORS.lightBackground,
    borderRadius: '4px',
    overflow: 'hidden'
  },
  fill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.secondary,
    marginBottom: SPACING.xs
  },
  value: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.tertiary,
    marginTop: SPACING.xs
  }
};

// ============================================
// TABS
// ============================================
export const TABS = {
  container: {
    display: 'flex',
    borderBottom: `1px solid ${COLORS.border}`
  },
  tab: {
    padding: `${SPACING.md} ${SPACING.xl}`,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.secondary,
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  tabActive: {
    color: COLORS.primary,
    borderBottomColor: COLORS.primary
  },
  tabHover: {
    backgroundColor: COLORS.lightBackground
  },
  content: {
    padding: SPACING.xl
  }
};

// ============================================
// UTILITIES - EXTENDED
// ============================================
export const UTILS = {
  // Existing flex utilities
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  flexStart: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  textEllipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  visuallyHidden: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0
  },

  // NEWLY ADDED UTILITIES
  pageContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: SPACING.xl
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: SPACING.xs,
    fontSize: '18px',
    color: COLORS.secondary,
    transition: 'all 0.2s ease'
  },
  actionsDropdown: {
    position: 'absolute',
    right: 0,
    top: '100%',
    marginTop: SPACING.xs,
    backgroundColor: COLORS.background,
    border: `1px solid ${COLORS.border}`,
    borderRadius: SPACING.sm,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
    minWidth: '120px'
  },
  dropdownItem: {
    padding: `${SPACING.sm} ${SPACING.lg}`,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.primary,
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
    border: 'none',
    background: 'transparent',
    width: '100%',
    textAlign: 'left',
    display: 'block'
  }
};

// ============================================
// BREAKPOINTS
// ============================================
export const BREAKPOINTS = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px'
};

// ============================================
// ANIMATIONS
// ============================================
export const ANIMATIONS = {
  transition: {
    fast: 'all 0.15s ease',
    normal: 'all 0.2s ease',
    slow: 'all 0.3s ease'
  },
  hover: {
    scale: 'transform: scale(1.02)',
    lift: 'transform: translateY(-2px)',
    opacity: 'opacity: 0.8'
  },
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms'
  }
};

// ============================================
// Z-INDEX SCALE
// ============================================
export const Z_INDEX = {
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
  toast: 70
};

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get status color based on value
export const getStatusColor = (status) => {
  const statusMap = {
    active: COLORS.success,
    pending: COLORS.warning,
    inactive: COLORS.error,
    draft: COLORS.info,
    published: COLORS.success,
    archived: COLORS.secondary
  };
  return statusMap[status?.toLowerCase()] || COLORS.secondary;
};

// Get food cost color based on percentage
export const getFoodCostColor = (percentage) => {
  if (percentage <= 25) return COLORS.success;
  if (percentage <= 30) return COLORS.accent;
  if (percentage <= 35) return COLORS.warning;
  return COLORS.error;
};

// Combine multiple style objects
export const combineStyles = (...styles) => {
  return Object.assign({}, ...styles);
};

// ============================================
// EXPORT ALL AS DEFAULT - UPDATED
// ============================================
const STYLES = {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  FIELD_WIDTHS,
  PAGE_CONTAINER,
  PAGE_HEADER,
  DIVIDER,
  BUTTONS,
  FORMS,
  TABLES,
  CARDS,
  STATUS,
  MODALS,
  DROPDOWNS,
  PROGRESS,
  TABS,
  UTILS,
  BREAKPOINTS,
  ANIMATIONS,
  Z_INDEX,
  // Helper functions
  getStatusColor,
  getFoodCostColor,
  combineStyles
};

export default STYLES;
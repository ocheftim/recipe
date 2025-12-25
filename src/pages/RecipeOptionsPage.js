// RecipeOptionsPage.js - ToqueWorks Recipe Options Settings Page
import React from 'react';
import RecipeOptionsSettings from '../components/settings/RecipeOptionsSettings';
import STYLES from '../styles/globalStyles';

const {
  COLORS,
  UTILS
} = STYLES;

const RecipeOptionsPage = () => {
  // Component-specific styles
  const localStyles = {
    container: {
      ...UTILS.pageContainer,
      minHeight: '100vh',
      backgroundColor: COLORS.background
    }
  };

  return (
    <div style={localStyles.container}>
      <RecipeOptionsSettings />
    </div>
  );
};

export default RecipeOptionsPage;
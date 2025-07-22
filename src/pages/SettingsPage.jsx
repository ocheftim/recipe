import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthWrapper';
import PageLayout from '../components/PageLayout';
import { seedRecipes, clearAllRecipes } from '../utils/seedRecipes';

const SettingsPage = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    // Application Preferences
    defaultServings: 4,
    defaultCurrency: 'USD',
    measurementUnit: 'imperial',
    
    // Recipe Display
    showNutritionInfo: true,
    showCostPerServing: true,
    showPrepTime: true,
    showDifficulty: true,
    
    // Notifications
    emailNotifications: true,
    recipeReminders: false,
    weeklyMenuSuggestions: true,
    
    // Privacy & Data
    publicProfile: false,
    shareRecipes: true,
    dataExport: false,
    
    // Appearance
    theme: 'light',
    compactView: false,
    showThumbnails: true
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem(`userSettings_${user?.uid}`);
    if (savedSettings) {
      try {
        setSettings(prev => ({ ...prev, ...JSON.parse(savedSettings) }));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, [user]);

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
    if (success) setSuccess('');
    if (error) setError('');
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Save to localStorage (in a real app, you'd save to Firebase)
      localStorage.setItem(`userSettings_${user?.uid}`, JSON.stringify(settings));
      setSuccess('Settings saved successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      setError('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleExportData = () => {
    // Create a simple data export
    const exportData = {
      user: {
        email: user?.email,
        displayName: user?.displayName,
        uid: user?.uid,
        createdAt: user?.metadata?.creationTime
      },
      settings: settings,
      exportedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `recipe-builder-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) {
      setSettings({
        defaultServings: 4,
        defaultCurrency: 'USD',
        measurementUnit: 'imperial',
        showNutritionInfo: true,
        showCostPerServing: true,
        showPrepTime: true,
        showDifficulty: true,
        emailNotifications: true,
        recipeReminders: false,
        weeklyMenuSuggestions: true,
        publicProfile: false,
        shareRecipes: true,
        dataExport: false,
        theme: 'light',
        compactView: false,
        showThumbnails: true
      });
      setSuccess('Settings reset to defaults');
    }
  };

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-gray-900">{label}</div>
        {description && <div className="text-xs text-gray-500">{description}</div>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <PageLayout 
      title={
        <div className="flex items-center justify-between w-full">
          <span>Settings</span>
          <div className="flex space-x-3">
            <button
              onClick={handleResetSettings}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Reset to Defaults
            </button>
            <button
              onClick={handleSaveSettings}
              disabled={saving}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3">
            <div className="text-sm text-green-700">{success}</div>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {/* Application Preferences */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-6 py-4">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Application Preferences</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Servings</label>
                  <select
                    value={settings.defaultServings}
                    onChange={(e) => handleSettingChange('defaultServings', parseInt(e.target.value))}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(num => (
                      <option key={num} value={num}>{num} serving{num !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select
                    value={settings.defaultCurrency}
                    onChange={(e) => handleSettingChange('defaultCurrency', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD ($)</option>
                    <option value="AUD">AUD ($)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Measurements</label>
                  <select
                    value={settings.measurementUnit}
                    onChange={(e) => handleSettingChange('measurementUnit', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="imperial">Imperial (cups, oz, lb)</option>
                    <option value="metric">Metric (ml, g, kg)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Display */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-6 py-4">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Recipe Display</h3>
            <div className="space-y-4">
              <ToggleSwitch
                enabled={settings.showNutritionInfo}
                onChange={(value) => handleSettingChange('showNutritionInfo', value)}
                label="Show Nutrition Information"
                description="Display calories and nutritional facts when available"
              />
              <ToggleSwitch
                enabled={settings.showCostPerServing}
                onChange={(value) => handleSettingChange('showCostPerServing', value)}
                label="Show Cost Per Serving"
                description="Calculate and display estimated cost per serving"
              />
              <ToggleSwitch
                enabled={settings.showPrepTime}
                onChange={(value) => handleSettingChange('showPrepTime', value)}
                label="Show Preparation Time"
                description="Display prep and cook time in recipe lists"
              />
              <ToggleSwitch
                enabled={settings.showDifficulty}
                onChange={(value) => handleSettingChange('showDifficulty', value)}
                label="Show Difficulty Rating"
                description="Display difficulty level (Easy, Medium, Hard)"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-6 py-4">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Notifications</h3>
            <div className="space-y-4">
              <ToggleSwitch
                enabled={settings.emailNotifications}
                onChange={(value) => handleSettingChange('emailNotifications', value)}
                label="Email Notifications"
                description="Receive email updates about your recipes and account"
              />
              <ToggleSwitch
                enabled={settings.recipeReminders}
                onChange={(value) => handleSettingChange('recipeReminders', value)}
                label="Recipe Reminders"
                description="Get reminders about saved recipes you haven't made recently"
              />
              <ToggleSwitch
                enabled={settings.weeklyMenuSuggestions}
                onChange={(value) => handleSettingChange('weeklyMenuSuggestions', value)}
                label="Weekly Menu Suggestions"
                description="Receive personalized weekly menu suggestions"
              />
            </div>
          </div>
        </div>

        {/* Privacy & Data */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-6 py-4">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Privacy & Data</h3>
            <div className="space-y-4">
              <ToggleSwitch
                enabled={settings.publicProfile}
                onChange={(value) => handleSettingChange('publicProfile', value)}
                label="Public Profile"
                description="Allow others to see your profile and shared recipes"
              />
              <ToggleSwitch
                enabled={settings.shareRecipes}
                onChange={(value) => handleSettingChange('shareRecipes', value)}
                label="Share Recipes"
                description="Allow sharing your recipes with other users"
              />
              
              <div className="pt-2">
                <button
                  onClick={handleExportData}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Export My Data
                </button>
                <div className="mt-1 text-xs text-gray-500">
                  Download a copy of all your data including recipes, settings, and profile information
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-6 py-4">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Appearance</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                <select
                  value={settings.theme}
                  onChange={(e) => handleSettingChange('theme', e.target.value)}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto (system preference)</option>
                </select>
              </div>
              
              <ToggleSwitch
                enabled={settings.compactView}
                onChange={(value) => handleSettingChange('compactView', value)}
                label="Compact View"
                description="Show more items per page with less spacing"
              />
              <ToggleSwitch
                enabled={settings.showThumbnails}
                onChange={(value) => handleSettingChange('showThumbnails', value)}
                label="Show Thumbnails"
                description="Display recipe and ingredient images in lists"
              />
            </div>
          </div>
        </div>

        {/* Development Tools */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-6 py-4">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Development Tools</h3>
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="text-sm text-yellow-800 mb-3">
                  <strong>⚠️ Development Only:</strong> These tools are for testing and development purposes.
                </div>
                
                <div className="space-y-3">
                  <div>
                    <button
                      onClick={async () => {
                        try {
                          setLoading(true);
                          setError('');
                          const result = await seedRecipes();
                          setSuccess(result.message);
                          setTimeout(() => setSuccess(''), 5000);
                        } catch (error) {
                          console.error('Seed error:', error);
                          setError('❌ Error adding recipes: ' + error.message);
                        }
                        setLoading(false);
                      }}
                      disabled={loading}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                    >
                      {loading ? 'Adding Recipes...' : '🌱 Add Test Recipes'}
                    </button>
                    <div className="mt-1 text-xs text-gray-600">
                      Adds 20 sample recipes with professional data for testing pagination, sorting, and search features
                    </div>
                  </div>
                  
                  <div>
                    <button
                      onClick={async () => {
                        if (!window.confirm('Are you sure you want to delete ALL recipes? This cannot be undone!')) return;
                        try {
                          setLoading(true);
                          setError('');
                          const result = await clearAllRecipes();
                          setSuccess(result.message);
                          setTimeout(() => setSuccess(''), 5000);
                        } catch (error) {
                          console.error('Clear error:', error);
                          setError('❌ Error clearing recipes: ' + error.message);
                        }
                        setLoading(false);
                      }}
                      disabled={loading}
                      className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 disabled:opacity-50"
                    >
                      {loading ? 'Clearing...' : '🗑️ Clear All Recipes'}
                    </button>
                    <div className="mt-1 text-xs text-gray-600">
                      Removes all recipes from the database (useful for testing)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SettingsPage;
// src/components/menus/MenuAnalyticsModal.js - REFACTORED
import React, { useState } from 'react';
import { X, Calendar, BarChart3, Grid3X3, TrendingUp, List, Lightbulb } from 'lucide-react';
import { useMenuAnalytics } from '../../hooks/menus/useMenuAnalytics';
import TabButton from './analytics/TabButton';
import OverviewTab from './analytics/OverviewTab';
import MatrixTab from './analytics/MatrixTab';

const MenuAnalyticsModal = ({ isOpen, onClose, menu, getRecipeById }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('7d');

  // Use extracted analytics hook
  const analyticsData = useMenuAnalytics(menu, getRecipeById, timeframe);

  if (!isOpen) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'matrix', label: 'Performance Matrix', icon: Grid3X3 },
    { id: 'items', label: 'Item Analysis', icon: List },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
  ];

  const timeframes = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab analyticsData={analyticsData} />;
      case 'matrix':
        return <MatrixTab analyticsData={analyticsData} getRecipeById={getRecipeById} />;
      case 'items':
        return <ItemAnalysisTab analyticsData={analyticsData} getRecipeById={getRecipeById} />;
      case 'trends':
        return <TrendsTab analyticsData={analyticsData} />;
      case 'recommendations':
        return <RecommendationsTab analyticsData={analyticsData} getRecipeById={getRecipeById} />;
      default:
        return <OverviewTab analyticsData={analyticsData} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-hidden mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Menu Analytics</h2>
            <p className="text-gray-600">{menu?.name || 'Menu Analysis'}</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Timeframe Selector */}
            <div className="flex items-center space-x-2">
              <Calendar size={20} className="text-gray-500" />
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                {timeframes.map((tf) => (
                  <option key={tf.value} value={tf.value}>
                    {tf.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 p-6 border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tabId={tab.id}
              label={tab.label}
              icon={tab.icon}
              activeTab={activeTab}
              onTabClick={setActiveTab}
            />
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

// Placeholder components for remaining tabs (to be extracted later)
const ItemAnalysisTab = ({ analyticsData, getRecipeById }) => (
  <div className="text-center py-8">
    <p className="text-gray-500">Item Analysis Tab - Coming Soon</p>
  </div>
);

const TrendsTab = ({ analyticsData }) => (
  <div className="text-center py-8">
    <p className="text-gray-500">Trends Tab - Coming Soon</p>
  </div>
);

const RecommendationsTab = ({ analyticsData, getRecipeById }) => (
  <div className="text-center py-8">
    <p className="text-gray-500">Recommendations Tab - Coming Soon</p>
  </div>
);

export default MenuAnalyticsModal;

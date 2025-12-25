// src/components/menus/analytics/MetricCard.js
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MetricCard = ({ title, value, subtitle, trend, icon: Icon, color = 'blue' }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon className={`text-${color}-600`} size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
      {trend !== undefined && (
        <div className={`flex items-center space-x-1 ${
          trend >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className="text-sm font-medium">
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        </div>
      )}
    </div>
  </div>
);

export default MetricCard;

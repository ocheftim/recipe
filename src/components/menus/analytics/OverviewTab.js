// src/components/menus/analytics/OverviewTab.js
import React from 'react';
import { DollarSign, Users, TrendingUp, Award } from 'lucide-react';
import MetricCard from './MetricCard';

const OverviewTab = ({ analyticsData }) => {
  if (!analyticsData?.overview) return null;

  const { overview } = analyticsData;

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Orders"
          value={overview.totalOrders.toLocaleString()}
          trend={overview.orderTrend}
          icon={Users}
          color="blue"
        />
        <MetricCard
          title="Revenue"
          value={`$${overview.revenue.toLocaleString()}`}
          trend={overview.revenueTrend}
          icon={DollarSign}
          color="green"
        />
        <MetricCard
          title="Avg Order Value"
          value={`$${overview.avgOrderValue}`}
          icon={TrendingUp}
          color="purple"
        />
        <MetricCard
          title="Customer Rating"
          value={`${overview.customerRating}/5`}
          subtitle={`${overview.profitMargin}% profit margin`}
          icon={Award}
          color="yellow"
        />
      </div>

      {/* Top Performing Items */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Top Performing Items</h3>
        <div className="space-y-3">
          {analyticsData.topItems?.slice(0, 5).map((item, index) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-sm font-medium">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.orders} orders</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${item.revenue}</p>
                <p className="text-sm text-gray-600">{item.profitMargin}% margin</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;

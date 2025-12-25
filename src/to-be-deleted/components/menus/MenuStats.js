// src/components/menus/MenuStats.js
import React from 'react';
import { Menu as MenuIcon, DollarSign, TrendingUp, Users } from 'lucide-react';

const MenuStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Active Menus',
      value: stats.activeMenus,
      subtitle: `of ${stats.totalMenus} total`,
      icon: MenuIcon,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Avg Menu Price',
      value: `$${stats.averageMenuPrice.toFixed(0)}`,
      subtitle: `${stats.averageMargin.toFixed(1)}% margin`,
      icon: DollarSign,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Total Items',
      value: stats.totalMenuItems,
      subtitle: `${stats.averageItemsPerMenu.toFixed(1)} per menu`,
      icon: TrendingUp,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Est. Revenue',
      value: `$${Math.round(stats.totalMenuRevenue)}`,
      subtitle: 'potential per service',
      icon: Users,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statCards.map((stat, index) => {
        const IconComponent = stat.icon;
        
        return (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                <IconComponent className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                {stat.subtitle && (
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuStats;
// src/hooks/menus/useMenuAnalytics.js
import { useMemo } from 'react';

export const useMenuAnalytics = (menu, getRecipeById, timeframe) => {
  const analyticsData = useMemo(() => {
    if (!menu) return null;

    // Mock analytics data based on timeframe
    const mockData = {
      overview: {
        totalOrders: timeframe === '7d' ? 142 : timeframe === '30d' ? 587 : 2340,
        revenue: timeframe === '7d' ? 3840 : timeframe === '30d' ? 15670 : 62450,
        avgOrderValue: timeframe === '7d' ? 27.04 : timeframe === '30d' ? 26.70 : 26.69,
        topItems: [
          { recipeId: 'r1', name: 'Signature Burger', orders: 45, revenue: 1215 },
          { recipeId: 'r2', name: 'Caesar Salad', orders: 38, revenue: 532 },
          { recipeId: 'r3', name: 'Margherita Pizza', orders: 34, revenue: 578 }
        ]
      },
      matrix: {
        starPerformers: [
          { recipeId: 'r1', volume: 45, margin: 68, score: 85 },
          { recipeId: 'r3', volume: 34, margin: 72, score: 82 }
        ],
        cashCows: [
          { recipeId: 'r2', volume: 38, margin: 45, score: 65 }
        ],
        risingStars: [
          { recipeId: 'r4', volume: 28, margin: 58, score: 70 }
        ],
        problemItems: [
          { recipeId: 'r5', volume: 12, margin: 25, score: 35 }
        ]
      }
    };

    return mockData;
  }, [menu, timeframe, getRecipeById]);

  return analyticsData;
};

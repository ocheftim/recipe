import React from 'react';
import { getTrendIcon, calculateCostChange } from './costHistoryUtils';
import { formatCurrency } from '../../utils/formatters';

const CostHistoryList = ({ ingredientHistory }) => {
  if (ingredientHistory.length === 0) {
    return (
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Cost History (0 entries)
        </h3>
        <div className="text-center py-8">
          <p className="text-gray-500">No cost history available</p>
          <p className="text-sm text-gray-400 mt-1">Add entries above to track cost changes</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Cost History ({ingredientHistory.length} entries)
      </h3>
      
      <div className="space-y-3">
        {ingredientHistory.map((entry, index) => {
          const previousEntry = ingredientHistory[index + 1];
          const trendIcon = previousEntry ? getTrendIcon(entry.cost, previousEntry.cost) : null;
          const costChange = calculateCostChange(entry.cost, previousEntry?.cost);
          
          return (
            <div key={entry.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-600">
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(entry.cost)}
                  </div>
                  {trendIcon}
                </div>
                <div className="text-xs text-gray-500">
                  Added {new Date(entry.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              {entry.notes && (
                <div className="mt-2 text-sm text-gray-600 italic">
                  {entry.notes}
                </div>
              )}
              
              {costChange && (
                <div className="mt-2 text-xs">
                  <span className={costChange.className}>
                    {costChange.text}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CostHistoryList;
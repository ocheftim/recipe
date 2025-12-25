import React from 'react';

const PageHeader = ({ title, searchTerm, onSearchChange, searchPlaceholder, newButtonText, onNewItem, onExport, onImport, filteredCount, totalCount, theme }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600">{filteredCount} of {totalCount} items</p>
        </div>
        <div className="flex space-x-2">
          {onExport && <button onClick={onExport} className="px-4 py-2 bg-blue-500 text-white rounded">Export</button>}
          {onImport && <button onClick={onImport} className="px-4 py-2 bg-green-500 text-white rounded">Import</button>}
          {onNewItem && <button onClick={onNewItem} className="px-4 py-2 bg-yellow-500 text-white rounded">{newButtonText}</button>}
        </div>
      </div>
      {onSearchChange && <input type="text" value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} placeholder={searchPlaceholder} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />}
    </div>
  );
};

export default PageHeader;
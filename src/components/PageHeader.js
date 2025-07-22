// PageHeader.js
import React from 'react';

const PageHeader = ({ children, subtitle }) => {
  return (
    <div className="mb-4">
      <h1 className="text-xl font-semibold text-black">{children}</h1>
      {subtitle && (
        <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default PageHeader;

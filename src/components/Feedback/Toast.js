// Toast.js
import React from 'react';

const Toast = ({ message, visible }) => {
  if (!visible) return null;

  return (
    <div className="absolute top-2 right-2 bg-green-600 text-white text-sm px-3 py-1 rounded shadow z-50">
      {message}
    </div>
  );
};

export default Toast;

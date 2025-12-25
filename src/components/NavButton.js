import React from 'react';

const NavButton = ({ item, isActive, onClick }) => {
  const handleMouseEnter = (e) => {
    if (!isActive) {
      e.currentTarget.style.backgroundColor = '#2A3E51'; // Reverted back to original
    }
  };

  const handleMouseLeave = (e) => {
    if (!isActive) {
      e.currentTarget.style.backgroundColor = 'transparent';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          w-full text-left px-4 py-3 rounded-lg text-sm font-medium
          transition-all duration-200 relative overflow-hidden
          ${isActive
            ? 'text-white bg-[#2A3E51]' // Reverted back to original
            : 'text-white/70 hover:text-white'
          }
        `}
      >
        {/* Green accent bar for active item */}
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8AC732]" />
        )}
        <span className="relative z-10">{item.label}</span>
      </button>
    </div>
  );
};

export default NavButton;
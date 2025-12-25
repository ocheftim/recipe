// src/components/Navigation.js - Clean Production Component
import React from 'react';
import { navItems } from '../config/navigation';

const Navigation = ({ activePage, onPageChange }) => {
  // Handle navigation click - both parent and child items navigate
  const handleNavClick = (itemId) => {
    onPageChange(itemId);
  };

  return (
    <nav
      className="flex flex-col py-4 relative shadow-lg w-[300px] min-h-screen"
      style={{ backgroundColor: '#1F2D38' }}
    >
      {/* Logo Section */}
      <div className="px-4 pb-4 mb-2">
        <img
          src="/Toque_Logo_Green_White.svg"
          alt="ToqueWorks Logo"
          className="w-full h-auto max-w-[200px] mx-auto brightness-100"
        />
      </div>

      {/* Navigation Buttons - Scrollable if needed */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2 px-3 pb-4">
          {navItems.map((item) => {
            const hasSubMenu = item.dropdown && item.dropdown.length > 0;
            const isParentActive = activePage === item.id;
            const isChildActive = hasSubMenu && item.dropdown.some(sub => sub.id === activePage);
            
            // ✅ FIX: Parent should have green border when ANY child is active
            const shouldShowParentActive = isParentActive || isChildActive;

            return (
              <div key={item.id} className="relative">
                {/* Main Navigation Item - Parent level */}
                <div
                  className={`flex items-center w-full px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 relative ${
                    shouldShowParentActive
                      ? 'bg-[#2A3E51] text-white shadow-md border-l-4 border-[#8AC732]'
                      : 'text-gray-300 hover:bg-[#2A3E51] hover:text-white'
                  }`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <span className="font-medium">{item.label}</span>
                </div>

                {/* Sub-menu Items - Child level with distinctive red border */}
                {hasSubMenu && (
                  <div className="mt-1 ml-4 space-y-1 mb-2">
                    {item.dropdown.map((subItem) => {
                      const isSubItemActive = activePage === subItem.id;

                      return (
                        <div
                          key={subItem.id}
                          className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 relative ${
                            isSubItemActive
                              ? 'bg-[#2A3E51] text-white shadow-md border-l-4'
                              : 'text-gray-400 hover:bg-[#2A3E51] hover:text-white'
                          }`}
                          style={{
                            borderLeftColor: isSubItemActive ? '#C73240' : 'transparent'
                          }}
                          onClick={() => handleNavClick(subItem.id)}
                        >
                          <div className="flex-1">
                            <div className="font-medium text-sm">
                              {subItem.label}
                            </div>
                            {subItem.description && (
                              <div className="text-xs opacity-75 mt-1">
                                {subItem.description}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
import React, { useState, useEffect, useRef } from 'react';

const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    setShowMenu(false);
    console.log('Logging out...');
    alert('Logout functionality - implement your auth logic here');
  };

  const handlePreferences = () => {
    setShowMenu(false);
    console.log('Opening preferences...');
    alert('Preferences functionality - implement your settings modal here');
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center space-x-3" ref={menuRef}>
      <div className="text-right">
        <div className="text-sm font-medium text-gray-700">John Doe</div>
        <div className="text-xs text-gray-500">Chef Manager</div>
      </div>
      
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium 
                     transition-all duration-200 hover:ring-2 hover:ring-blue-300 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#1C2933]"
        >
          JD
        </button>
        
        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
            <button
              onClick={handlePreferences}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 
                         hover:bg-gray-100 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Preferences
            </button>
            
            <hr className="my-1 border-gray-200" />
            
            <button
              onClick={handleLogout}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 
                         hover:bg-red-50 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
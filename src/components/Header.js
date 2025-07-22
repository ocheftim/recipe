import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Header = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getUserInitials = (user) => {
    if (user?.displayName) {
      return user.displayName.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  const getUserDisplayName = (user) => {
    return user?.displayName || user?.email || 'User';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between h-16">
        {/* Logo and Nav */}
        <div className="flex items-center space-x-4">
          <img
            src="/ToqueWorksLogo_Black.png"
            alt="ToqueWorks Logo"
            className="h-10 w-auto mr-4 flex-shrink-0"
          />
          <nav className="hidden md:flex space-x-4">
            <button
              onClick={() => navigate('/recipes')}
              className="text-gray-700 hover:text-black"
            >
              Recipes
            </button>
            <a href="#" className="text-gray-700 hover:text-black">Ingredients</a>
            <a href="#" className="text-gray-700 hover:text-black">Menus</a>
            <a href="#" className="text-gray-700 hover:text-black">Recipe Books</a>
          </nav>
        </div>

        {/* Right Side: Search Bar and User */}
        <div className="flex items-center space-x-3 min-w-0">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded px-2 py-1 text-sm w-36 sm:w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {/* User Section */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {getUserInitials(user)}
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <div className="font-medium">{getUserDisplayName(user)}</div>
                    <div className="text-gray-500 text-xs">{user.email}</div>
                  </div>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      // Add profile navigation here if needed
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      // Add settings navigation here if needed
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </button>
                  <div className="border-t">
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

// src/components/PageLayout.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import FontSwitcher from "./FontSwitcher";
import Navigation from "./Navigation";
import { Search } from "lucide-react";

function PageLayout({
  title,
  subtitle,
  font,
  onFontChange,
  children,
  footer,
  searchTerm,
  setSearchTerm,
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleUpdateDisplayName = async () => {
    const newName = prompt("Enter new display name:");
    if (newName?.trim()) {
      try {
        await updateProfile(auth.currentUser, { displayName: newName.trim() });
        setDropdownOpen(false);
        window.location.reload();
      } catch (err) {
        alert("Error: " + err.message);
      }
    }
  };

  const getUserInitials = (u) =>
    u?.displayName?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() ||
    u?.email?.[0].toUpperCase() || "U";

  const getUserDisplayName = (u) => u?.displayName || "User";

  return (
    <div
      className={`grid grid-cols-[80px_16px_1fr_16px] min-h-screen bg-gray-100 text-gray-900 ${font}`}
    >
      {/* Nav (Col 1) */}
      <div className="bg-white border-r border-gray-200">
        <Navigation />
      </div>

      {/* Spacer (Col 2) */}
      <div className="bg-gray-100" />

      {/* Content (Col 3) */}
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-2 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <img
              src="/ToqueWorksLogo_Black.png"
              alt="ToqueWorks Logo"
              className="h-25 w-auto max-w-[160px] object-contain"
            />
            <div className="flex items-center gap-4">
              {setSearchTerm && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-1 text-sm rounded w-48 text-black border border-gray-300"
                  />
                  <Search className="absolute left-2 top-1.5 w-4 h-4 text-gray-400" />
                </div>
              )}
              {onFontChange && (
                <FontSwitcher selectedFont={font} onChange={onFontChange} />
              )}
              {user ? (
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold"
                >
                  {getUserInitials(user)}
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Dropdown */}
        {dropdownOpen && user && (
          <>
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setDropdownOpen(false)}
            />
            <div className="fixed top-24 right-6 w-48 bg-white border rounded shadow z-[9999]">
              <div className="px-4 py-2 border-b text-sm">
                <div className="font-medium">{getUserDisplayName(user)}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
              <button onClick={() => navigate("/profile")} className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">
                Profile
              </button>
              <button onClick={() => navigate("/settings")} className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">
                Settings
              </button>
              <button onClick={handleUpdateDisplayName} className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">
                Update Name
              </button>
              <div className="border-t">
                <button onClick={handleSignOut} className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full text-left">
                  Sign Out
                </button>
              </div>
            </div>
          </>
        )}

        {/* Main */}
        <main className="py-4 px-0 overflow-y-auto">
          <div className="bg-white p-6 rounded shadow text-sm space-y-4 galley-text">
            <div>
              <h1
                className="mb-1"
                style={{
                  fontSize: "32px",
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                  fontFamily: '"Work Sans", sans-serif',
                  lineHeight: "40px",
                }}
              >
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-gray-600">{subtitle}</p>
              )}
            </div>
            {children}
          </div>
          {footer && <div className="pt-3">{footer}</div>}
        </main>
      </div>

      {/* Spacer (Col 4) */}
      <div className="bg-gray-100" />
    </div>
  );
}

export default PageLayout;

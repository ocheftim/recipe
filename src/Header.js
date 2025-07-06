// Header.js
import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-[#14523F] text-white px-6 py-2 shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <img
            src="/ToqueWorks.png"
            alt="Toque Logo"
            className="h-28 w-auto object-contain"
          />
          <nav className="flex gap-6 items-center ml-[80px]">
            <button
              onClick={() => navigate("/")}
              className="text-base font-medium text-white border-b-2 border-white pb-1"
            >
              Recipes
            </button>
            <button
              onClick={() => navigate("/ingredients")}
              className="text-base font-medium text-white hover:text-gray-200"
            >
              Ingredients
            </button>
            <button
              onClick={() => navigate("/menus")}
              className="text-base font-medium text-white hover:text-gray-200"
            >
              Menus
            </button>
            <button
              onClick={() => navigate("/books")}
              className="text-base font-medium text-white hover:text-gray-200"
            >
              Recipe Books
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

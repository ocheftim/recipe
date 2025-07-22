import React from "react";
import { Menu } from "lucide-react";

const recipeCategories = [
  "Appetizer/Hors d'oeuvre",
  "Beverage",
  "Bread",
  "Breakfast",
  "Dessert/Pastry",
  "Garnish",
  "Intermezzo",
  "Mains",
  "Pasta",
  "Salad",
  "Sandwich",
  "Sauce",
  "Marinade/Seasoning",
  "Side",
  "Soup/Stew/Stock",
  "Mise en Place",
  "Classroom",
];

export default function RecipeCategoriesPanel({
  isOpen,
  setIsOpen,
  activeCategory,
  setActiveCategory,
  ownerFilter,
  setOwnerFilter,
  navigate,
}) {
  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-gray-800 font-dm-sans shadow-lg z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between p-4 text-lg font-semibold border-b border-gray-200">
          <span>Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded hover:bg-gray-100 transition"
            title="Close Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Categories */}
        <ul className="mt-4 space-y-2 px-4">
          <div className="text-sm font-medium text-gray-500 mb-1">Categories</div>
          {recipeCategories.map((category) => (
            <li
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setIsOpen(false);
              }}
              className={
                "text-sm cursor-pointer px-3 py-2 rounded-md transition " +
                (activeCategory === category
                  ? "bg-[#e0f2ea] text-gray-800 font-semibold"
                  : "hover:bg-[#e0f2ea] hover:text-gray-800")
              }
            >
              {category}
            </li>
          ))}
        </ul>

        {/* Divider */}
        <hr className="my-4 border-gray-200 mx-4" />

        {/* Owner Filter + CTA */}
        <div className="px-4 space-y-2">
          <div className="text-sm font-medium text-gray-500">Filter by Owner</div>
          {["All", "Personal", "First Concept"].map((option) => (
            <div
              key={option}
              onClick={() => {
                setOwnerFilter(option);
                setIsOpen(false);
              }}
              className={
                "text-sm px-3 py-1 rounded-md cursor-pointer " +
                (ownerFilter === option
                  ? "bg-[#e0f2ea] text-gray-800 font-semibold"
                  : "hover:bg-[#e0f2ea] hover:text-gray-800")
              }
            >
              {option}
            </div>
          ))}

          <button
            onClick={() => {
              navigate("/recipe");
              setIsOpen(false);
            }}
            className="mt-4 w-full bg-[#3A9C71] hover:bg-[#48B481] text-white text-sm py-2 rounded"
          >
            + New Recipe
          </button>
        </div>
      </div>
    </>
  );
}

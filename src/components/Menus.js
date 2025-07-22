// Menus.js
import React, { useState } from "react";
import PageLayout from "./PageLayout";

function Menus({ font, onFontChange }) {
  const [menus, setMenus] = useState([]);
  const [newMenuName, setNewMenuName] = useState("");

  const addMenu = () => {
    if (!newMenuName.trim()) return;
    setMenus([...menus, { name: newMenuName.trim(), items: [] }]);
    setNewMenuName("");
  };

  return (
    <PageLayout
      title="Menus"
      subtitle="Organize dishes into seasonal or themed menus."
      font={font}
      onFontChange={onFontChange}
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMenuName}
            onChange={(e) => setNewMenuName(e.target.value)}
            className="border rounded px-3 py-1 text-sm w-64"
            placeholder="New menu name"
          />
          <button
            onClick={addMenu}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            ➕ Add Menu
          </button>
        </div>

        {menus.length === 0 && (
          <p className="text-sm text-gray-500 italic">No menus yet.</p>
        )}

        <ul className="space-y-2">
          {menus.map((menu, idx) => (
            <li
              key={idx}
              className="bg-gray-50 p-3 rounded shadow-sm border"
            >
              <h3 className="font-semibold text-gray-800 text-sm">{menu.name}</h3>
              <p className="text-xs text-gray-500">{menu.items.length} items</p>
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}

export default Menus;

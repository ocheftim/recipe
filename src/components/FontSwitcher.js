// FontSwitcher.js
import React, { useState } from "react";
import { Settings } from "lucide-react";

const FontSwitcher = ({ selectedFont, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full text-white hover:bg-white/20 transition"
        title="Change font"
      >
        <Settings size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow p-2 space-y-1 w-44 z-50">
          {theme.options.fontList.map((f) => (
            <button
              key={f.value}
              className={`w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
                selectedFont === f.value
                  ? "font-bold text-green-700"
                  : "text-gray-800"
              }`}
              onClick={() => {
                onChange(f.value);
                setOpen(false);
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FontSwitcher;

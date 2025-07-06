// Dashboard With Timestamps
import Header from "./Header"; // or "./components/Header" if in a folder
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MoreVertical, Trash2, FileText, Upload, Printer,
  Apple, BookOpen, Library, HelpCircle, Share2, Search
} from "lucide-react";
import { Listbox } from "@headlessui/react";

function Dashboard() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("All");

  const ownerOptions = ["All", "Personal", "First Concept"];

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const validRecipes = [];

    keys.forEach((key) => {
      try {
        const val = JSON.parse(localStorage.getItem(key));
        if (val && typeof val.title === "string" && Array.isArray(val.ingredients)) {
          validRecipes.push({
            key,
            title: val.title,
            owner: key.startsWith("personal") ? "Personal" : "First Concept",
            lastUpdated: val.lastUpdated || null
          });
        }
      } catch (err) {
        console.warn(`⚠️ Could not parse ${key}`, err);
      }
    });

    setRecipes(validRecipes);
  }, []);

  const toggleSelect = (key) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((id) => id !== key) : [...prev, key]
    );
  };

  const formatDate = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric", month: "short", day: "numeric"
    });
  };

  const exportSelected = () => {
    selected.forEach((key) => {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const blob = new Blob([raw], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${key}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  };

  const sendSelected = async () => {
    for (const key of selected) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const file = new File([raw], `${key}.json`, { type: "application/json" });

      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            title: "Recipe: " + key,
            text: "Here's a recipe from the Recipe Dashboard",
            files: [file],
          });
          continue;
        } catch (err) {
          console.warn("Share cancelled or denied", err);
        }
      }

      const blob = new Blob([raw], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${key}.json`;
      a.click();
    }
  };

  const deleteSelected = () => {
    if (window.confirm(`Delete ${selected.length} recipe(s)?`)) {
      selected.forEach((key) => localStorage.removeItem(key));
      setRecipes((prev) => prev.filter((r) => !selected.includes(r.key)));
      setSelected([]);
    }
  };

  const handleDelete = (key) => {
    if (window.confirm(`Delete this recipe?`)) {
      localStorage.removeItem(key);
      setRecipes(recipes.filter((r) => r.key !== key));
      setSelected(selected.filter((s) => s !== key));
    }
  };

  const filteredRecipes = recipes.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (ownerFilter === "All" || r.owner === ownerFilter)
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-dm-sans">
      {/* Header */}
      <Header currentPage="Recipes" />

      {/* Toolbar */}
      <div className="bg-white border-b w-full">
        <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Left: Filter */}
          <div className="flex items-center gap-4">
            <Listbox value={ownerFilter} onChange={setOwnerFilter}>
              <div className="relative">
                <Listbox.Button className="px-2 py-1 border rounded text-sm bg-white w-40 text-left flex justify-between items-center">
                  <span>{ownerFilter}</span>
                  <svg
                    className="w-4 h-4 ml-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 w-40 rounded-md bg-white border shadow-md z-10 text-sm">
                  {ownerOptions.map((option) => (
                    <Listbox.Option
                      key={option}
                      value={option}
                      className={({ active }) =>
                        `cursor-pointer px-3 py-1 ${active ? 'bg-gray-100' : ''}`
                      }
                    >
                      {option}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>

            <button
              onClick={() => navigate("/recipe")}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
            >
              + New Recipe
            </button>
          </div>

          {/* Right: Search + Help */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border pl-8 pr-3 py-1 text-sm rounded w-48"
              />
              <Search className="absolute left-2 top-1.5 w-4 h-4 text-gray-400" />
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <HelpCircle size={18} />
            </button>
          </div>
        </div>
      </div>
      {/* Bulk Actions */}
      {selected.length > 0 && (
        <div className="flex items-center gap-4 px-6 py-2 bg-blue-50 border-b text-sm">
          <div className="flex items-center gap-2 text-blue-600 font-semibold">
            <input
              type="checkbox"
              checked={
                filteredRecipes.length > 0 &&
                selected.length === filteredRecipes.length
              }
              onChange={() => {
                if (selected.length === filteredRecipes.length) {
                  setSelected([]);
                } else {
                  setSelected(filteredRecipes.map((r) => r.key));
                }
              }}
            />
            <span>{selected.length} Selected</span>
          </div>
          <button onClick={exportSelected}><FileText size={16} title="Export" /></button>
          <button onClick={sendSelected}><Share2 size={16} title="Send" /></button>
          <button onClick={printSelected}><Printer size={16} title="Print" /></button>
          <button onClick={deleteSelected}><Trash2 size={16} title="Delete" /></button>
        </div>
      )}

{/* Main Content */}
<main className="w-full max-w-screen-xl mx-auto p-6 space-y-4">
  <div className="text-xl font-semibold">Recipes</div>

  {filteredRecipes.map((recipe, index) => (
    <div
      key={recipe.key}
      className={`flex items-center justify-between bg-white px-4 py-3 rounded shadow hover:shadow-md transition ${
        selected.includes(recipe.key) ? "bg-blue-50" : ""
      }`}
    >
      {/* Left side: checkbox + title */}
      <div className="flex items-center gap-3 w-[300px]">
        <input
          type="checkbox"
          checked={selected.includes(recipe.key)}
          onChange={() => toggleSelect(recipe.key)}
        />
        <button
          className="text-left font-medium hover:underline truncate"
          style={{ maxWidth: "240px" }}
          onClick={() => navigate(`/recipe?title=${encodeURIComponent(recipe.title)}`)}
        >
          {recipe.title}
        </button>
      </div>

      {/* Right side: owner, timestamp, menu */}
      <div className="flex items-center gap-3 text-sm text-gray-500 w-[280px] justify-end">
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white text-xs shrink-0">
          {recipe.owner === "Personal" ? "P" : "FC"}
        </div>
        <span className="w-[110px] text-right shrink-0">
          {formatDate(recipe.lastUpdated)}
        </span>
        <div className="relative shrink-0">
          <button
            onClick={() =>
              setMenuOpenIndex(index === menuOpenIndex ? null : index)
            }
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <MoreVertical size={20} />
          </button>

          {menuOpenIndex === index && (
            <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-md border z-10">
              <ul className="text-sm text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                  <FileText size={16} /> Add to Recipe Book
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                  <Upload size={16} /> Send a copy
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                  <FileText size={16} /> Make a copy
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                  <Upload size={16} /> Export
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                  <Printer size={16} /> Print
                </li>
                <li
                  onClick={() => handleDelete(recipe.key)}
                  className="px-4 py-2 hover:bg-red-100 cursor-pointer text-red-600 flex items-center gap-2"
                >
                  <Trash2 size={16} /> Delete
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  ))}

  {filteredRecipes.length === 0 && (
    <p className="text-gray-500 text-sm">No recipes found.</p>
  )}
</main>


    </div>
  );
}

export default Dashboard;

// Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MoreVertical, Trash2, FileText, Upload, Printer,
  Apple, BookOpen, Library, HelpCircle, Users, Share2
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("All");

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

  const printSelected = () => {
    const recipesToPrint = selected
      .map((key) => {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const recipe = JSON.parse(raw);

        const ingredientsHTML = recipe.ingredients.map((ing) => `
          <tr>
            <td>${ing.qty}</td>
            <td>${ing.unit}</td>
            <td>${ing.ingredient}</td>
            <td>${ing.modifier || ""}</td>
            <td>${ing.category} / ${ing.subcategory}</td>
            <td style="text-align:right;">$${parseFloat(ing.cost).toFixed(2)}</td>
          </tr>
        `).join("");

        const totalCost = recipe.ingredients.reduce((sum, ing) => {
          return sum + parseFloat(ing.cost || 0);
        }, 0);

        return `
          <section>
            <h1>${recipe.title}</h1>
            <p><strong>Printed:</strong> ${new Date().toLocaleString()}</p>
            <table>
              <thead>
                <tr>
                  <th>Qty</th>
                  <th>Unit</th>
                  <th>Ingredient</th>
                  <th>Modifier</th>
                  <th>Category</th>
                  <th style="text-align:right;">Cost</th>
                </tr>
              </thead>
              <tbody>
                ${ingredientsHTML}
              </tbody>
            </table>
            <h2>Total Cost: $${totalCost.toFixed(2)}</h2>
            ${recipe.instructions ? `<h2>Instructions</h2><p>${recipe.instructions}</p>` : ""}
          </section>
        `;
      })
      .filter(Boolean)
      .join("");

    const html = `
      <html>
        <head>
          <title>Selected Recipes</title>
          <style>
            @media print {
              @page {
                margin: 1in;
              }

              body {
                counter-reset: page;
              }

              footer::after {
                content: "Page " counter(page);
              }

              footer {
                position: fixed;
                bottom: 0;
                right: 0;
                padding: 0.5rem 1rem;
                font-size: 12px;
                color: #555;
              }

              section {
                page-break-after: always;
              }
            }

            body {
              font-family: sans-serif;
              padding: 20px;
            }

            h1 {
              font-size: 24px;
              margin-bottom: 0.5rem;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 1rem;
            }

            th, td {
              border: 1px solid #ccc;
              padding: 6px;
              text-align: left;
              font-size: 14px;
            }

            th {
              background: #f0f0f0;
            }

            h2 {
              font-size: 18px;
              margin-top: 2rem;
            }

            section {
              margin-bottom: 60px;
            }
          </style>
        </head>
        <body>
          ${recipesToPrint}
          <footer></footer>
        </body>
      </html>
    `;

    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
      win.focus();
      win.print();
    }
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
            files: [file]
          });
        } catch (err) {
          console.warn("Share cancelled or not supported", err);
        }
      } else {
        const blob = new Blob([raw], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${key}.json`;
        a.click();
      }
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
      <header className="bg-[#14523F] text-white px-6 py-2 shadow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <img src="/ToqueWorks.png" alt="Toque Logo" className="h-28 w-auto object-contain" />
          <nav className="flex gap-6 mt-4 sm:mt-0">
            <button onClick={() => navigate("/")} className="text-base font-medium text-white border-b-2 border-white pb-1 flex items-center gap-2">
              <FileText size={20} /> Recipes
            </button>
            <button onClick={() => navigate("/ingredients")} className="text-base font-medium text-white hover:text-gray-200 flex items-center gap-2">
              <Apple size={20} /> Ingredients
            </button>
            <button onClick={() => navigate("/menus")} className="text-base font-medium text-white hover:text-gray-200 flex items-center gap-2">
              <BookOpen size={20} /> Menus
            </button>
            <button onClick={() => navigate("/books")} className="text-base font-medium text-white hover:text-gray-200 flex items-center gap-2">
              <Library size={20} /> Recipe Books
            </button>
          </nav>
        </div>
      </header>

      <div className="flex items-center justify-between px-6 py-3 bg-white border-b">
        <div className="flex items-center gap-4">
          <select
            className="px-2 py-1 border rounded text-sm"
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Personal">Personal</option>
            <option value="First Concept">First Concept</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-1 text-sm rounded"
          />
          <button className="text-gray-500 hover:text-gray-700">
            <HelpCircle size={18} />
          </button>
        </div>
      </div>

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

      <main className="p-6 space-y-4">
        <div className="text-xl font-semibold">Recipes</div>

        {filteredRecipes.length > 0 && (
          <div className="flex items-center gap-3 text-sm text-gray-600 px-4 py-2">
            <input
              type="checkbox"
              checked={filteredRecipes.length > 0 && selected.length === filteredRecipes.length}
              onChange={() => {
                if (selected.length === filteredRecipes.length) {
                  setSelected([]);
                } else {
                  setSelected(filteredRecipes.map((r) => r.key));
                }
              }}
            />
            <span>Select All</span>
          </div>
        )}

        <div className="space-y-2">
          {filteredRecipes.map((recipe, index) => (
            <div
              key={recipe.key}
              className={`flex items-center justify-between bg-white px-4 py-3 rounded shadow hover:shadow-md transition ${
                selected.includes(recipe.key) ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selected.includes(recipe.key)}
                  onChange={() => toggleSelect(recipe.key)}
                />
                <button
                  className="text-left font-medium hover:underline"
                  onClick={() => navigate(`/recipe?title=${encodeURIComponent(recipe.title)}`)}
                >
                  {recipe.title}
                </button>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-500">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white text-xs">
                  {recipe.owner === "Personal" ? "P" : "FC"}
                </div>
                <span>{formatDate(recipe.lastUpdated)}</span>
                <div className="relative">
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
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

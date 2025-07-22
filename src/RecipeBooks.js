// RecipeBooks.js
import React, { useState } from "react";
import PageLayout from "./PageLayout";

function RecipeBooks({ font, onFontChange }) {
  const [books, setBooks] = useState([]);
  const [newBookName, setNewBookName] = useState("");

  const addBook = () => {
    if (!newBookName.trim()) return;
    setBooks([...books, { name: newBookName.trim(), recipes: [] }]);
    setNewBookName("");
  };

  return (
    <PageLayout
      title="Recipe Books"
      subtitle="Group recipes into collections for printing or sharing."
      font={font}
      onFontChange={onFontChange}
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newBookName}
            onChange={(e) => setNewBookName(e.target.value)}
            className="border rounded px-3 py-1 text-sm w-64"
            placeholder="New recipe book name"
          />
          <button
            onClick={addBook}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            ➕ Add Book
          </button>
        </div>

        {books.length === 0 && (
          <p className="text-sm text-gray-500 italic">No recipe books yet.</p>
        )}

        <ul className="space-y-2">
          {books.map((book, idx) => (
            <li
              key={idx}
              className="bg-gray-50 p-3 rounded shadow-sm border"
            >
              <h3 className="font-semibold text-gray-800 text-sm">{book.name}</h3>
              <p className="text-xs text-gray-500">{book.recipes.length} recipes</p>
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}

export default RecipeBooks;

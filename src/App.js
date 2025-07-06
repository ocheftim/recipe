// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import RecipeEditor from "./RecipeEditor";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-satoshi">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/recipe" element={<RecipeEditor />} />
        <Route
          path="*"
          element={
            <div className="p-8 text-center text-red-500 font-semibold">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

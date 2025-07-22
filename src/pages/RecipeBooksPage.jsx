// src/recipes/recipebooks/RecipeBooksPage.jsx
import React from "react";
import PageLayout from "../components/PageLayout";

const RecipeBooksPage = () => {
  return (
    <PageLayout
      title="Recipe Books"
      subtitle="Browse and manage your collection of recipe books"
    >
      <div className="space-y-6 text-sm">
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-600">
            The recipe books feature is under construction and will allow you to
            organize, export, and share collections of recipes.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default RecipeBooksPage;

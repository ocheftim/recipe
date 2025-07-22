// src/pages/MenusPage.jsx
import React from "react";
import PageLayout from "../components/PageLayout";

const MenusPage = () => {
  return (
    <PageLayout
      title="Menus"
      subtitle="View and manage your seasonal or daily menus"
    >
      <div className="space-y-6 text-sm">
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-600">
            This section will allow you to organize, preview, and publish menus tied to recipes.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default MenusPage;

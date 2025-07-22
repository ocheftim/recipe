// src/Dashboard.jsx
import React from "react";
import PageLayout from "../components/PageLayout";

const Dashboard = () => {
  return (
    <PageLayout title="Dashboard" subtitle="Welcome to ToqueWorks">
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="bg-white p-8 rounded shadow-md text-center w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Dashboard</h2>
          <p className="text-gray-500 text-lg">Dashboard Coming Soon...</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;

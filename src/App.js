// src/App.js - Final working version with all routes
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, ProtectedRoute, useAuth } from "./components/AuthWrapper";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import RecipesPage from "./pages/RecipesPage";
import RecipeEditor from "./pages/RecipeEditor";
import RecipePrintPage from "./pages/RecipePrintPage";
import IngredientsPage from "./recipes/ingredients/IngredientsPage";
import IngredientEditor from "./recipes/ingredients/IngredientEditor";
import MenusPage from "./pages/MenusPage";
import RecipeBooksPage from "./pages/RecipeBooksPage";
import SettingsPage from "./pages/SettingsPage";

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Route - Login */}
      <Route
        path="/login"
        element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recipes"
        element={
          <ProtectedRoute>
            <RecipesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recipes/new"
        element={
          <ProtectedRoute>
            <RecipeEditor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recipes/:id/print"
        element={
          <ProtectedRoute>
            <RecipePrintPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recipes/:id"
        element={
          <ProtectedRoute>
            <RecipeEditor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ingredients"
        element={
          <ProtectedRoute>
            <IngredientsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ingredients/new"
        element={
          <ProtectedRoute>
            <IngredientEditor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ingredients/:id"
        element={
          <ProtectedRoute>
            <IngredientEditor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/menus"
        element={
          <ProtectedRoute>
            <MenusPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recipe-books"
        element={
          <ProtectedRoute>
            <RecipeBooksPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Catch-all for unauthenticated users */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
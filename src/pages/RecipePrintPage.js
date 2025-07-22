// src/pages/RecipePrintPage.js - Safe minimal version
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const RecipePrintPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (id) {
          console.log("📖 Loading recipe for print:", id);
          const recipeDoc = await getDoc(doc(db, 'recipes', id));
          if (recipeDoc.exists()) {
            setRecipe(recipeDoc.data());
            console.log("✅ Recipe loaded for print");
          } else {
            console.error("❌ Recipe not found for print");
          }
        }
      } catch (error) {
        console.error('❌ Error fetching recipe for print:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading recipe for print...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Recipe not found</div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen p-8 print:p-4">
      {/* Simple Print Layout */}
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{recipe.name?.toUpperCase() || "RECIPE"}</h1>
          <div className="text-sm space-y-1">
            <div>TYPE: {recipe.type || "RECIPE"}</div>
            <div>SERVINGS: {recipe.servings || "1"}</div>
            <div>DIFFICULTY: {recipe.difficulty || "MEDIUM"}</div>
          </div>
        </div>

        {/* Ingredients */}
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">INGREDIENTS</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">QUANTITY</th>
                  <th className="border border-gray-300 p-2 text-left">UNIT</th>
                  <th className="border border-gray-300 p-2 text-left">INGREDIENT</th>
                </tr>
              </thead>
              <tbody>
                {recipe.ingredients.map((ingredient, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{ingredient.quantity}</td>
                    <td className="border border-gray-300 p-2">{ingredient.unit}</td>
                    <td className="border border-gray-300 p-2">{ingredient.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Instructions */}
        {recipe.instructions && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">INSTRUCTIONS</h2>
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {recipe.instructions}
            </div>
          </div>
        )}

        {/* Notes */}
        {recipe.notes && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">NOTES</h2>
            <div className="text-sm leading-relaxed">
              {recipe.notes}
            </div>
          </div>
        )}

        {/* Print Button */}
        <div className="text-center print:hidden">
          <button 
            onClick={() => window.print()}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            🖨️ Print Recipe
          </button>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          @page {
            margin: 0.5in;
          }
          .print\\:hidden {
            display: none;
          }
          .print\\:p-4 {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default RecipePrintPage;
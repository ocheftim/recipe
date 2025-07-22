import React, { useEffect, useState } from "react";
import {
  fetchIngredients,
  addIngredient,
  updateIngredient,
  deleteIngredient
} from "../utils/firestoreHelpers";

import AddIngredientModal from './AddIngredientModal';

export default function IngredientManager() {
  const [ingredients, setIngredients] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState(null);

  // Load ingredients on mount
  useEffect(() => {
    fetchIngredients().then(setIngredients);
  }, []);

  const handleAdd = async (newIngredient) => {
    const saved = await addIngredient(newIngredient);
    setIngredients(prev => [...prev, saved]);
  };

  const handleEdit = async (id, updatedData) => {
    await updateIngredient(id, updatedData);
    setIngredients(prev =>
      prev.map(ing => (ing.id === id ? { ...ing, ...updatedData } : ing))
    );
  };

  const handleDelete = async (id) => {
    await deleteIngredient(id);
    setIngredients(prev => prev.filter(ing => ing.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Ingredient Manager</h2>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary mb-4">
        Add Ingredient
      </button>

      <ul className="space-y-2">
        {ingredients.map((ing) => (
          <li key={ing.id} className="border p-2 rounded flex justify-between">
            <span>{ing.name} – {ing.category} / {ing.subcategory}</span>
            <div className="space-x-2">
              <button
                onClick={() => {
                  setEditingIngredient(ing);
                  setModalOpen(true);
                }}
                className="btn btn-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(ing.id)}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {modalOpen && (
        <AddIngredientModal
          initialData={editingIngredient}
          onSave={(data) => {
            if (editingIngredient) {
              handleEdit(editingIngredient.id, data);
            } else {
              handleAdd(data);
            }
            setEditingIngredient(null);
            setModalOpen(false);
          }}
          onCancel={() => {
            setEditingIngredient(null);
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

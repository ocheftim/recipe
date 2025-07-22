import React, { useState } from "react";
import AddIngredientModal from "./AddIngredientModal";

export default function RecipeIngredients({ ingredients, setIngredients, masterIngredients }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSave = (ingredient) => {
    if (editingIndex !== null) {
      const updated = [...ingredients];
      updated[editingIndex] = ingredient;
      setIngredients(updated);
    } else {
      setIngredients([...ingredients, ingredient]);
    }
    setModalOpen(false);
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setModalOpen(true);
  };

  const handleDelete = (index) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Ingredients</h3>

      <button
        onClick={() => {
          setModalOpen(true);
          setEditingIndex(null);
        }}
        className="btn btn-primary mb-3"
      >
        Add Ingredient
      </button>

      <ul className="space-y-2">
  {ingredients.map((ing, index) => (
    <li
      key={index}
      className="flex justify-between items-center border p-2 rounded"
    >
      <div className="flex items-center w-full">
        {/* Qty + Unit */}
        <div className="w-24 flex items-baseline justify-start">
          <span className="text-sm">{ing.amount}</span>
          <span className="text-sm ml-3">{ing.unit}</span>
        </div>

        {/* Ingredient name (no extra space before) */}
        <div className="ml-0 text-sm">
          {ing.name}
          {ing.preparation ? `, ${ing.preparation}` : ""}
        </div>
      </div>

      <div className="flex items-center space-x-2 ml-4">
        <button onClick={() => handleEdit(index)} className="btn btn-sm">
          Edit
        </button>
        <button
          onClick={() => handleDelete(index)}
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
          initialData={editingIndex !== null ? ingredients[editingIndex] : null}
          onSave={handleSave}
          onCancel={() => {
            setModalOpen(false);
            setEditingIndex(null);
          }}
          masterIngredients={masterIngredients}
        />
      )}
    </div>
  );
}

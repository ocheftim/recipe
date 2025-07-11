import React, { useState } from "react";
import InstructionModal from "./InstructionModal";

function PrepInstructions({ instructions, setInstructions }) {
  const [editingIndex, setEditingIndex] = useState(null);

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const closeModal = () => {
    setEditingIndex(null);
  };

  const updateInstruction = (index, updated) => {
    const updatedList = [...instructions];
    updatedList[index] = updated;
    setInstructions(updatedList);
  };

  const handleAddInstruction = () => {
    const newInstructions = [...instructions, { title: "", description: "" }];
    setInstructions(newInstructions);
    setEditingIndex(newInstructions.length - 1);
  };

  const handleRemove = (index) => {
    const updated = instructions.filter((_, i) => i !== index);
    setInstructions(updated);
  };

  return (
    <div className="space-y-2 max-w-[800px] w-full">
      <h2 className="text-lg font-semibold">Instructions</h2>

      {instructions.length === 0 && (
        <p className="text-sm italic text-gray-500">No instructions added yet.</p>
      )}

      {instructions.map((step, index) => (
        <div
          key={index}
          className="group relative text-left w-full text-sm px-1 py-1 hover:bg-gray-50 rounded transition"
        >
          <button
            onClick={() => handleEdit(index)}
            className="w-full text-left"
          >
            <div className="flex items-start gap-2">
              <span className="font-semibold text-gray-800 w-5 text-right">
                {index + 1}.
              </span>
              <div className="space-y-0.5">
                <p className="font-semibold text-gray-900">
                  {step.title || <em className="text-gray-400">No title</em>}
                </p>
                <p className="text-gray-800">
                  {step.description || (
                    <em className="text-gray-400">No details provided.</em>
                  )}
                </p>
              </div>
            </div>
          </button>
          <button
            onClick={() => handleRemove(index)}
            className="absolute top-1 right-1 text-gray-400 hover:text-red-500 text-xs hidden group-hover:block"
            title="Remove step"
          >
            ❌
          </button>
        </div>
      ))}

      <button
        onClick={handleAddInstruction}
        className="text-sm text-green-700 border border-green-600 px-3 py-1 rounded hover:bg-green-50 mt-2"
      >
        ➕ Add Instruction
      </button>

      {editingIndex !== null && (
        <InstructionModal
          step={instructions[editingIndex]}
          onSave={(updated) => {
            updateInstruction(editingIndex, updated);
            closeModal();
          }}
          onCancel={closeModal}
        />
      )}
    </div>
  );
}

export default PrepInstructions;

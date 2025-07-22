import React, { useState, useEffect } from "react";

function InstructionModal({ step, onSave, onCancel }) {
  const [local, setLocal] = useState({ ...step });

  useEffect(() => {
    setLocal({ ...step });
  }, [step]);

  const handleChange = (field, value) => {
    setLocal((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(local);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] space-y-4">
        <h2 className="text-lg font-bold">Edit Step</h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Step Title</label>
          <input
            value={local.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="e.g., Sear the Chicken"
            className="w-full border p-2 rounded"
          />

          <label className="block text-sm font-medium text-gray-700">Step Description</label>
          <textarea
            value={local.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="e.g., Heat olive oil in a sauté pan and sear chicken until golden on both sides..."
            className="w-full border p-2 rounded"
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstructionModal;

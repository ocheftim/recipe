import React from "react";
import { ArrowUp, ArrowDown, X } from "lucide-react";

function PrepInstructions({ instructions = [], setInstructions }) {
  const handleChange = (index, field, value) => {
    const updated = [...instructions];
    updated[index][field] = value;
    setInstructions(updated);
  };

  const handleRemove = (index) => {
    const updated = instructions.filter((_, i) => i !== index);
    setInstructions(updated);
  };

  const handleAdd = () => {
    setInstructions([...instructions, { title: "", detail: "" }]);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const updated = [...instructions];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setInstructions(updated);
  };

  const moveDown = (index) => {
    if (index === instructions.length - 1) return;
    const updated = [...instructions];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    setInstructions(updated);
  };

  return (
    <div className="space-y-4">
      {Array.isArray(instructions) && instructions.map((step, i) => (
        <div key={i} className="space-y-1 relative mb-3">
          <div className="flex justify-between items-start">
            <div className="flex items-baseline gap-2 w-full">
              <span className="text-sm font-semibold text-gray-600">
                {i + 1}.
              </span>
              <input
                type="text"
                className="border-b border-gray-300 px-1 py-0.5 text-sm font-semibold w-full"
                placeholder="Step Title"
                value={step.title}
                onChange={(e) => handleChange(i, "title", e.target.value)}
              />
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveUp(i)}
                  className="text-gray-400 hover:text-gray-700"
                  title="Move up"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  onClick={() => moveDown(i)}
                  className="text-gray-400 hover:text-gray-700"
                  title="Move down"
                >
                  <ArrowDown size={14} />
                </button>
                <button
                  onClick={() => handleRemove(i)}
                  className="text-red-500 hover:text-red-700 text-sm font-bold px-2"
                  title="Remove step"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </div>
          <textarea
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            rows={2}
            placeholder="Step detail or instructions"
            value={step.detail}
            onChange={(e) => handleChange(i, "detail", e.target.value)}
          ></textarea>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="mt-2 text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
      >
        + Add Step
      </button>
    </div>
  );
}

export default PrepInstructions;

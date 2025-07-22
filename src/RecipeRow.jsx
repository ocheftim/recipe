import { Pencil, Copy, Trash2 } from "lucide-react";

export default function RecipeRow({
  recipe,
  onEdit,
  onDuplicate,
  onDelete,
  selected,
  toggleSelect
}) {
  return (
    <div
      className={`flex items-center justify-between bg-white px-4 py-3 rounded hover:shadow transition border ${
        selected ? "border-blue-500 bg-blue-50" : "border-gray-200"
      }`}
    >
      {/* Left: Title & Meta */}
      <div className="flex items-center gap-3 w-full max-w-[50%]">
        <input
          type="checkbox"
          checked={selected}
          onChange={toggleSelect}
          className="shrink-0"
        />
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 truncate max-w-xs">
            {recipe.title}
          </span>
          <span className="text-xs text-gray-500">
            {recipe.owner === "Personal" ? "Personal" : "First Concept"} ·{" "}
            {formatDate(recipe.lastUpdated)}
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex gap-3 items-center text-gray-400 hover:text-gray-600 transition text-sm">
        <button onClick={onEdit} title="Edit">
          <Pencil size={18} />
        </button>
        <button onClick={onDuplicate} title="Duplicate">
          <Copy size={18} />
        </button>
        <button onClick={onDelete} title="Delete">
          <Trash2 size={18} className="text-red-400 hover:text-red-600" />
        </button>
      </div>
    </div>
  );
}

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

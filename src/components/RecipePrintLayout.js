// Example 1: Add to your RecipeEditor component
import { useNavigate, useParams } from 'react-router-dom';

const RecipeEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handlePrint = () => {
    // Open print page in new tab
    window.open(`/recipes/${id}/print`, '_blank');
  };

  return (
    <PageLayout title="Recipe Editor">
      {/* Your existing header */}
      <div className="flex items-center justify-between mb-6">
        <h1>Recipe Details</h1>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            🖨️ Print Recipe
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Save
          </button>
        </div>
      </div>
      {/* Rest of your component */}
    </PageLayout>
  );
};

// Example 2: Add to a recipe list/card component
const RecipeCard = ({ recipe }) => {
  const handlePrint = () => {
    window.open(`/recipes/${recipe.id}/print`, '_blank');
  };

  return (
    <div className="border rounded-lg p-4">
      <h3>{recipe.name}</h3>
      <p>{recipe.description}</p>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => navigate(`/recipes/${recipe.id}`)}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={handlePrint}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          🖨️ Print
        </button>
      </div>
    </div>
  );
};

// Example 3: Add print functionality directly (without new page)
const DirectPrintButton = ({ recipe }) => {
  const handleDirectPrint = () => {
    // Create a temporary div with the print layout
    const printWindow = window.open('', '_blank');
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Recipe</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            @media print {
              @page { margin: 0.5in; }
              .print-hidden { display: none; }
            }
          </style>
        </head>
        <body>
          <div id="print-content"></div>
          <script>
            // Render your RecipePrintLayout component here
            window.print();
            setTimeout(() => window.close(), 100);
          </script>
        </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <button
      onClick={handleDirectPrint}
      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
    >
      🖨️ Quick Print
    </button>
  );
};
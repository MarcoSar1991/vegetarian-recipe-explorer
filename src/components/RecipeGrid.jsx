import RecipeCard from "./RecipeCard.jsx";

export default function RecipeGrid({ results }) {
  // Se results non è definito o è vuoto mostra messaggio
  if (!results || results.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No recipes found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {results.map((result) => (
        <RecipeCard key={result.id} result={result} />
      ))}
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import RecipeGrid from "../components/RecipeGrid.jsx";
import { searchRecipes } from "../services/api.jsx";

export default function Home() {

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const data = await searchRecipes(query);
      setResults(data);

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto p-4 flex flex-col gap-3 sm:flex-row sm:justify-between items-center">

          <h1 className="text-xl font-bold text-green-600">
            Veggie Recipes
          </h1>

          <button
            onClick={() => navigate("/favorites")}
            className="text-lg font-medium cursor-pointer"
          >
            ❤️ Favorites
          </button>

          <SearchBar onSearch={handleSearch} />

        </div>
      </header>

      <main className="max-w-7xl mx-auto">

        {loading && (
          <p className="text-center mt-10">Loading...</p>
        )}

        {error && (
          <p className="text-center text-red-500 mt-10">
            {error}
          </p>
        )}

        {!loading && !error && (
          <RecipeGrid results={results} />
        )}

      </main>
    </>
  );
}

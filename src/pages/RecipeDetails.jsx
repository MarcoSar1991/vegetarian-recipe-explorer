import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeDetails } from "../services/api.jsx";
import DOMPurify from "dompurify";
import { useContext } from "react";
import FavoritesContext from "../context/FavoritesContext.jsx";

export default function RecipeDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullSummary, setShowFullSummary] = useState(false);

  useEffect(() => {

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getRecipeDetails(id);
        setRecipe(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();

  }, [id]);

  // ---------------- LOADING SKELETON ----------------

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-14 bg-white shadow-sm"></div>
        <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-gray-200 rounded-lg"></div>
          <div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  // ---------------- SAFE DATA ----------------

  const ingredients = recipe.extendedIngredients || [];
  const instructions = recipe.analyzedInstructions?.[0]?.steps || [];
  const favorite = isFavorite(recipe.id);

  return (
    <div className="pb-10">

      {/* ---------------- HEADER ---------------- */}

      <div className="sticky top-0 bg-white/90 backdrop-blur z-20 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-medium text-blue-600 hover:underline cursor-pointer"
          >
            ← Back
          </button>

        </div>
      </div>

      {/* ---------------- MAIN TOP SECTION ---------------- */}

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* IMAGE SECTION */}

        <div className="w-full lg:my-auto">

          <div className="relative overflow-hidden rounded-xl shadow-md">

            <img
              src={recipe.image}
              alt={recipe.title}
              loading="lazy"
              className="w-full h-72 md:h-full object-cover"
            />

          </div>

          <button
            onClick={() =>
              toggleFavorite({
                id: recipe.id,
                title: recipe.title,
                image: recipe.image
              })
            }
            className={`mt-3 w-full py-2 rounded-lg font-medium transition cursor-pointer ${
              favorite
                ? "bg-red-100 text-red-600"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {favorite ? "Saved to favorites" : "Add to favorites"}
          </button>

        </div>

        {/* INFO SECTION */}

        <div className="flex flex-col justify-start">

          <h1 className="text-2xl lg:text-3xl font-bold">
            {recipe.title}
          </h1>

          {/* COOKING INFO */}

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">

            {recipe.readyInMinutes && (
              <span>⏱ {recipe.readyInMinutes} min</span>
            )}

            {recipe.servings && (
              <span>🍽 {recipe.servings} servings</span>
            )}

          </div>

          {/* SUMMARY */}

          <div className="mt-4">

            <h2 className="font-semibold mb-2">Summary</h2>

            <div
              className={`text-sm text-gray-700 leading-relaxed ${
                showFullSummary ? "" : "line-clamp-4"
              }`}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(recipe.summary)
              }}
            />

            <button
              onClick={() => setShowFullSummary(prev => !prev)}
              className="text-blue-600 text-sm mt-2"
            >
              {showFullSummary ? "Show less" : "Read more"}
            </button>

          </div>

          {/* INGREDIENTS */}

          <div className="mt-5">

            <h2 className="font-semibold mb-3">Ingredients</h2>

            <div className="columns-1 sm:columns-2 gap-6 bg-gray-50 pl-0 pr-4 py-4 rounded-lg">

              {ingredients.map((item) => (
                <div key={item.id} className="text-sm break-inside-avoid mb-2">
                  • {item.original}
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

      {/* ---------------- INSTRUCTIONS ---------------- */}

      <div className="max-w-4xl mx-auto px-4 mt-8">

        <h2 className="font-semibold mb-3">Instructions</h2>

        <div className="space-y-3">

          {instructions.length > 0 ? (
            instructions.map((step) => (
              <div
                key={step.number}
                className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm"
              >
                <div className="font-bold text-blue-600">
                  {step.number}.
                </div>

                <p className="text-sm text-gray-700">
                  {step.step}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No instructions available.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

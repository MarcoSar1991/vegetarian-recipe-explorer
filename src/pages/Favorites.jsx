import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import FavoritesContext from "../context/FavoritesContext.jsx";

export default function Favorites() {

  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const navigate = useNavigate();

  // EMPTY STATE
  if (favorites.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center text-center p-4">

        <div className="text-5xl mb-4">❤️</div>

        <h2 className="text-xl font-semibold mb-2">
          No favorite recipes yet
        </h2>

        <p className="text-gray-500 mb-4">
          Start saving your favorite vegetarian recipes.
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Browse recipes
        </button>

      </div>
    );
  }

  return (
    <>

      {/* HEADER */}

      <div className="sticky top-0 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm z-20 mb-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-4 sm:px-6">

          <h1 className="text-2xl font-bold">
            ❤️ Favorites ({favorites.length})
          </h1>

          <button
            onClick={() => navigate("/")}
            className="text-sm text-blue-600 hover:underline cursor-pointer"
          >
            ← Back to Home
          </button>

        </div>
      </div>

      {/* GRID */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

        {favorites.map((recipe) => (
          <div key={recipe.id} className="flex flex-col">

            {/* CARD */}
            <div
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer grow"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                loading="lazy"
                className="w-full h-40 object-cover"
              />

              <div className="p-3">
                <h3 className="text-sm font-semibold line-clamp-2">
                  {recipe.title}
                </h3>
              </div>

            </div>

            {/* REMOVE BUTTON */}
            <button
              onClick={() => toggleFavorite(recipe)}
              className="mt-2 w-full text-sm py-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition cursor-pointer"
            >
              Remove from favorites
            </button>

          </div>
        ))}

      </div>

    </>
  );
}

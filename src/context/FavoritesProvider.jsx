import { useEffect, useState } from "react";
import FavoritesContext from "./FavoritesContext";

export function FavoritesProvider({ children }) {

  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add / Remove recipe
  const toggleFavorite = (recipe) => {
    const exists = favorites.some(item => item.id === recipe.id);

    if (exists) {
      setFavorites(prev =>
        prev.filter(item => item.id !== recipe.id)
      );
    } else {
      setFavorites(prev => [...prev, recipe]);
    }
  };

  const isFavorite = (id) => {
    return favorites.some(item => item.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

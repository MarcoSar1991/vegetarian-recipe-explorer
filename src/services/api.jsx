import axios from "axios";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const api = axios.create({
  baseURL: "https://api.spoonacular.com",
  timeout: 10000,
  params: {
    apiKey: API_KEY
  }
});

// SEARCH RECIPES
export const searchRecipes = async (query) => {
  const response = await api.get("/recipes/complexSearch", {
    params: {
      query,
      number: 10,
      diet: "vegetarian"
    }
  });

  return response.data.results;
};

// RECIPE DETAILS
export const getRecipeDetails = async (id) => {
  const response = await api.get(`/recipes/${id}/information`);
  return response.data;
};

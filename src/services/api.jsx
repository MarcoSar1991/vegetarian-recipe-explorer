import axios from "axios";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const assertApiKeyIsConfigured = () => {
  if (!API_KEY) {
    throw new Error("VITE_SPOONACULAR_API_KEY is not configured");
  }
};

const api = axios.create({
  baseURL: "https://api.spoonacular.com",
  timeout: 10000,
  params: {
    apiKey: API_KEY
  }
});

// SEARCH RECIPES
export const searchRecipes = async (query) => {
  assertApiKeyIsConfigured();

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
  assertApiKeyIsConfigured();

  const response = await api.get(`/recipes/${id}/information`);
  return response.data;
};

import axios from "axios";

const recipes = (state = [], action) => {
  if (action.type === "SET_RECIPES") {
    return action.recipes;
  }
  if (action.type === "CREATE_RECIPE") {
    state = [...state, action.recipe];
  }
  if (action.type === "UPDATE_RECIPE") {
    return state.map((recipe) => {
      if (recipe.id === action.recipe.id) {
        return action.recipe;
      } else {
        return recipe;
      }
    });
  }
  return state;
};

export const fetchRecipes = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/recipes");
    dispatch({ type: "SET_RECIPES", recipes: response.data });
  };
};

export const seedSpoonacularRecipe = (spoonacularId) => {
  return async (dispatch) => {
    const response = await axios.post("/api/recipes/spoonacular", {
      recipe_id: spoonacularId,
    });
    dispatch({ type: "CREATE_RECIPE", recipe: response.data });
    return response.data;
  };
};

export default recipes;

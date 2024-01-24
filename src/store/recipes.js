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
  if (action.type === "DELETE_RECIPE") {
    return state.filter((r) => r.id !== action.recipe.id);
  }
  return state;
};

//create a new recipe from scratch
export const createRecipe = ({ recipe, ingredients, instructions }) => {
  return async (dispatch) => {
    const response = await axios.post("/api/recipes", {
      recipe,
      ingredients,
      instructions,
    });
    dispatch({ type: "CREATE_RECIPE", recipe: response.data });
    return response.data;
  };
};

export const deleteRecipe = (r) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.delete(`api/recipes/${r.id}`, {
      headers: {
        authorization: token,
      }, 
    });
    dispatch({ type: "DELETE_RECIPE", recipe: r });
  };
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

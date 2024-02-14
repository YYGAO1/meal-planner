import axios from "axios";

const ingredients = (state = [], action) => {
  if (action.type === "SET_INGREDIENTS") {
    return action.ingredients;
  }
  if (action.type === "CREATE_INGREDIENT") {
    state = [...state, action.ingredient];
  }
  if (action.type === "UPDATE_INGREDIENT") {
    return state.map((i) => {
      if (i.id === action.ingredient.id) {
        return action.ingredient;
      } else {
        return i;
      }
    });
  }
  if (action.type === "DELETE_INGREDIENT") {
    return state.filter((i) => i.id !== action.ingredient.id);
  }
  return state;
};

export const fetchIngredients = (recipeId) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/recipes/${recipeId}/ingredients`);
    dispatch({ type: "SET_INGREDIENTS", ingredients: response.data });
  };
};

export const createIngredient = ({ ingredient }) => {
  return async (dispatch) => {
    const response = await axios.post("/api/ingredients", {
      ingredient,
    });
    dispatch({ type: "CREATE_INGREDIENT", ingredient: response.data });
  };
};

export const deleteIngredients = (_ingredient) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.delete(`api/ingredients/${_ingredient.id}`);
    dispatch({ type: "DELETE_INGREDIENT", ingredient: _ingredient.id });
  };
};

export const fetchIngredientsGroceryList = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/listitems/ingredients", {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "SET_INGREDIENTS", ingredients: response.data });
    }
  };
};

export default ingredients;

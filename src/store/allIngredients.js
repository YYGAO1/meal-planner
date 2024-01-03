import axios from "axios";

const allIngredients = (state = [], action) => {
  if (action.type === "SET_ALL_INGREDIENTS") {
    return action.allIngredients;
  }
  if (action.type === "ADD_TO_ALL_INGREDIENTS") {
    const newIngredients = action.ingredients.filter((newIngredient) => {
      return !state.some(
        (existingIngredient) => existingIngredient.id === newIngredient.id
      );
    });
    return [...state, ...newIngredients];
  }

  return state;
};

export const fetchAllIngredients = () => {
  return async (dispatch) => {
    const response = await axios.get(`/api/ingredients`);
    dispatch({ type: "SET_ALL_INGREDIENTS", allIngredients: response.data });
  };
};

export default allIngredients;

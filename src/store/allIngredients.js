import axios from "axios";

const allIngredients = (state = [], action) => {
  if (action.type === "SET_ALL_INGREDIENTS") {
    return action.allIngredients;
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

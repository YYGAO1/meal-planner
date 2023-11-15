import axios from "axios";

const instructions = (state = [], action) => {
  if (action.type === "SET_INSTRUCTIONS") {
    return action.instructions;
  }
  return state;
};

export const fetchInstructions = (recipeId) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/recipes/${recipeId}/instructions`);
    dispatch({ type: "SET_INSTRUCTIONS", instructions: response.data });
  };
};

export default instructions;

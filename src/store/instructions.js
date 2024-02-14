import axios from "axios";

const instructions = (state = [], action) => {
  if (action.type === "SET_INSTRUCTIONS") {
    return action.instructions;
  }
  if (action.type === "DELETE_INSTRUCTION") {
    return state.filter((i) => i.id !== action.instruction.id);
  }
  return state;
};

export const fetchInstructions = (recipeId) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/recipes/${recipeId}/instructions`);
    dispatch({ type: "SET_INSTRUCTIONS", instructions: response.data });
  };
};

export const deleteInstructions = (_instruction) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.delete(`api/instruction/${_instruction.id}`);
    dispatch({ type: "DELETE_INSTRUCTION", instruction: _instruction.id });
  };
};

export default instructions;

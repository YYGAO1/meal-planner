import axios from "axios";

const day = (state = { meals: [] }, action) => {
  if (action.type === "SET_DAY") {
    return action.day;
  }

  return state;
};

export const fetchDay = (date) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get(`/api/mealplanner/${date}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_DAY", day: response.data });
  };
};

export const addToMealPlanner = ({ id, type, date }) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const recipe = await axios.post("/api/recipes/spoonacular", id);
    dispatch({ type: "CREATE_RECIPE", recipe: recipe.data });
    const response = await axios.post(
      `/api/mealplanner/${date}`,
      { recipeId: id, date: date, type: type },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: "SET_DAY", day: response.data });
  };
};

export default day;

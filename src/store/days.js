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

export const addToMealPlanner = (mealInfo) => {
  console.log("mealInfo", mealInfo);
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (mealInfo.recipe_id.id.length === 6) {
      const recipe = await axios.post("/api/recipes/spoonacular", mealInfo);
      dispatch({ type: "CREATE_RECIPE", recipe: recipe.data });
      const response = await axios.post(
        `/api/mealplanner/${mealInfo.date}`,
        { recipeId: recipe.data.id, date: mealInfo.date, type: mealInfo.type },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch({ type: "SET_DAY", day: response.data });
    } else {
      const response = await axios.post(
        `/api/mealplanner/${mealInfo.date}`,
        {
          recipeId: mealInfo.recipe_id.id,
          date: mealInfo.date,
          type: mealInfo.type,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch({ type: "SET_DAY", day: response.data });
    }
  };
};

export default day;

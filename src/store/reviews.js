import axios from "axios";

const reviews = (state = [], action) => {
  if (action.type === "SET_REVIEWS") {
    return action.reviews;
  }
  if (action.type === "CREATE_REVIEW") {
    state = [...state, action.review];
  }
  if (action.type === "UPDATE_REVIEW") {
    return state.map((r) => {
      if (r.id === action.review.id) {
        return action.review;
      } else {
        return r;
      }
    });
  }
  return state;
};

export const fetchReviews = (recipeId) => {
  return async (dispatch) => {
    console.log("reached store");
    const response = await axios.get("/api/reviews", recipeId);
    console.log("response", response);
  };
};

export const createReview = (review) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const recipe = await axios.post("/api/recipes/spoonacular", review);
    dispatch({ type: "CREATE_RECIPE", recipe: recipe.data });
    const response = await axios.post("/api/reviews", review, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "CREATE_REVIEW", review: response.data });
  };
};

export default reviews;

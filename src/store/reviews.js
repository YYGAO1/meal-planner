import axios from "axios";

const reviews = (state = [], action) => {
  if (action.type === "SET_REVIEWS") {
    return action.reviews;
  }
  if (action.type === "CREATE_REVIEW") {
    return [...state, action.review];
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

export const fetchReviews = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("api/reviews/");
      dispatch({ type: "SET_REVIEWS", reviews: response.data });
    } catch (error) {
      console.log("error fetching reviews: ", error);
    }
  };
};

export const createReviewSpoonacular = (review) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const recipe = await axios.post("/api/recipes/spoonacular", review);
    dispatch({ type: "CREATE_RECIPE", recipe: recipe.data });
    const fullReview = { ...review, recipeId: recipe.data.id };
    const response = await axios.post("/api/reviews", fullReview, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "CREATE_REVIEW", review: response.data });
  };
};

export const createReviewDatabase = (review) => {
  return async (dispatch) => {
    console.log("using createReviewDatabase");
    const token = window.localStorage.getItem("token");
    const response = await axios.post("/api/reviews", review, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "CREATE_REVIEW", review: response.data });
  };
};

export default reviews;

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

export const fetchAllReviews = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("api/reviews/all");
      dispatch({ type: "SET_REVIEWS", reviews: response.data });
    } catch (error) {
      console.log("error fetching all reviews: ", error);
    }
  };
};

export const fetchReviews = (recipeId) => {
  return async (dispatch) => {
    try {
      /*if (!recipeId) {
        dispatch({ type: "SET_REVIEWS", reviews: [] });
      }*/
      console.log("recipeId reaching store: ", recipeId);
      console.log("typeof recipeId in store", typeof recipeId);
      const response = await axios.get(`/api/reviews/${recipeId}`);
      dispatch({ type: "SET_REVIEWS", reviews: response.data });
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
};

export const createReview = (review) => {
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

export default reviews;

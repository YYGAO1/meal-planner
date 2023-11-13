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

export const fetchReviews = (recipeId) => {
  return async (dispatch) => {
    try {
      /*if (!recipeId) {
        dispatch({ type: "SET_REVIEWS", reviews: [] });
      }*/
      const response = await axios.get(`/api/reviews/${recipeId}`);
      dispatch({ type: "SET_REVIEWS", reviews: response.data });
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
};

export const createReview = (review) => {
  return async (dispatch) => {
    console.log("review made it to store", review);
    const token = window.localStorage.getItem("token");
    const recipe = await axios.post("/api/recipes/spoonacular", review);
    console.log("recipe seeded: ", recipe);
    dispatch({ type: "CREATE_RECIPE", recipe: recipe.data });
    const response = await axios.post(
      "/api/reviews",
      { ...review, recipeId: recipe.id },
      {
        headers: {
          authorization: token,
        },
      }
    );
    console.log("review created", response.data);
    dispatch({ type: "CREATE_REVIEW", review: response.data });
  };
};

export default reviews;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../store";

const ReviewForm = ({ recipeId, spoonacularId }) => {
  const { auth, recipes } = useSelector((state) => ({
    auth: state.auth,
    recipes: state.recipes,
  }));
  const dispatch = useDispatch();
  const [review, setReview] = useState({
    subject: "",
    body: "",
    rating: null,
    userId: auth.id,
    recipeId: recipeId,
    spoonacularId: spoonacularId,
  });

  useEffect(() => {
    const recipe = recipes.find((r) => r.id === recipeId * 1);
    if (recipe) {
      setReview({ ...review, spoonacularId: recipe.spoonacular_id });
    }
  }, [recipes]);

  const onChange = (ev) => {
    setReview({ ...review, [ev.target.name]: ev.target.value });
  };

  const addReview = async (ev) => {
    ev.preventDefault();
    await dispatch(createReview(review));
    setReview({
      subject: "",
      body: "",
      rating: null,
      userId: auth.id,
      recipeId: recipeId,
      spoonacularId: spoonacularId,
    });
  };

  return (
    <form onSubmit={addReview}>
      <h2 className="text-secondary">add a review</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        <label
          className="form-label text-success"
          style={{ width: "65%", margin: "5px auto" }}
        >
          subject
          <input
            value={review.subject || ""}
            name="subject"
            className="form-control bg-secondary text-success"
            onChange={onChange}
          />
        </label>
        <label
          className="form-label text-success"
          style={{ width: "65%", margin: "5px auto" }}
        >
          rating (1-5)
          <input
            type="number"
            min="1"
            max="5"
            value={review.rating || ""}
            name="rating"
            className="form-control bg-secondary text-success"
            onChange={onChange}
          />
        </label>
        <label
          className="form-label text-success"
          style={{ width: "65%", margin: "5px auto" }}
        >
          body
          <textarea
            value={review.body || ""}
            name="body"
            className="form-control bg-secondary text-success"
            onChange={onChange}
          />
        </label>
        <button
          className="btn btn-danger text-primary"
          type="submit"
          style={{ width: "35%", margin: "5px auto" }}
        >
          submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;

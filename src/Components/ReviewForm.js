import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../store";

const ReviewForm = ({ recipeId, spoonacularId }) => {
  const { auth, recipes } = useSelector((state) => state);
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
  };

  return (
    <form onSubmit={addReview}>
      <input
        value={review.subject || ""}
        placeholder="subject"
        name="subject"
        onChange={onChange}
      />
      <input
        type="number"
        value={review.rating || ""}
        placeholder="rating"
        name="rating"
        onChange={onChange}
      />
      <textarea
        value={review.body || ""}
        placeholder="body"
        name="body"
        onChange={onChange}
      />
      <button type="submit">submit</button>
    </form>
  );
};

export default ReviewForm;

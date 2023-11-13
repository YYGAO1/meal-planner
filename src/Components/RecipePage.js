import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as DOMPurify from "dompurify";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteFavorite,
  createFavoriteSpoonacular,
  fetchReviews,
} from "../store";
import AddToMealPlanner from "./AddToMealPlanner";
import ReviewForm from "./ReviewForm";

const RecipePage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [extendedIngredients, setExtendedIngredients] = useState([]);
  const cleanSummary = DOMPurify.sanitize(details.summary);
  const { auth, recipes, favorites, reviews } = useSelector((state) => state);
  const dispatch = useDispatch();

  const initialSeededId = localStorage.getItem("seededId")
    ? parseInt(localStorage.getItem("seededId"), 10)
    : null;

  const [seededId, setSeededId] = useState(initialSeededId);

  useEffect(() => {
    const getRecipeData = async () => {
      try {
        const recipe = recipes.find((r) => String(r.spoonacular_id) === id);
        console.log("recipe", recipe);
        if (recipe) {
          const seededFromSpoonRecipe = recipes.find(
            (r) => r.spoonacular_id === id
          );
          console.log("Seeded from Spoon Recipe:", seededFromSpoonRecipe);

          const selectedId = recipe.id || seededFromSpoonRecipe.id;
          console.log("Selected Id:", selectedId);
          console.log("typeof selected id", typeof selectedId);
          setSeededId(selectedId);
        }

        const response = await axios.get(`api/recipes/details/${id}`);
        if (response.data.id) {
          setDetails(response.data);
        }
      } catch (ex) {
        console.log(ex);
      }
    };

    getRecipeData();
  }, [id, recipes]);

  useEffect(() => {
    localStorage.setItem("seededId", seededId);
    console.log("seededId in component", seededId);
    console.log("typeof seededId in component", typeof seededId);
    dispatch(fetchReviews(seededId));
  }, [dispatch, seededId]);

  useEffect(() => {
    if (details.extendedIngredients) {
      setExtendedIngredients(filterDuplicates(details.extendedIngredients));
    }
  }, [details.extendedIngredients]);

  const filterDuplicates = (ingredients) => {
    const seen = {};
    return ingredients.filter((ingredient) => {
      const ingredientKey = ingredient.id;
      if (seen.hasOwnProperty(ingredientKey)) {
        return false;
      } else {
        seen[ingredientKey] = true;
        return true;
      }
    });
  };

  /*const getRecipeDetails = async (id) => {
    try {
      const recipe = recipes.find((r) => r.spoonacular_id === id * 1);
      if (recipe) {
        id = recipe.spoonacular_id;
        setSeededId(recipe.id);
      }
      const response = await axios.get(`api/recipes/details/${id}`);
      setDetails(response.data);
    } catch (ex) {
      console.log(ex);
    }
  };*/

  const isFavorited = (recipeId) => {
    const recipe = recipes.find((r) => r.id === recipeId);
    if (!recipe) {
      const seededFromSpoonRecipe = recipes.find(
        (r) => r.spoonacular_id === recipeId
      );
      if (!seededFromSpoonRecipe) return false;
      const favorite = favorites.find(
        (f) => f.recipe_id === seededFromSpoonRecipe.id
      );
      if (favorite) return favorite;
    } else {
      const favorite = favorites.find((f) => f.recipeId === recipeId);
      if (favorite) return favorite;
    }
    return false;
  };

  const favorite = async (id) => {
    if (isFavorited(id)) {
      const favorite = isFavorited(id);
      dispatch(deleteFavorite(favorite.id));
    } else {
      dispatch(createFavoriteSpoonacular({ recipe_id: id, userId: auth.id }));
    }
  };

  if (
    !details ||
    !details.image ||
    !extendedIngredients ||
    !details.analyzedInstructions
  ) {
    return null;
  }

  return (
    <div>
      <h1 className="text-danger">{details.title}</h1>
      <AddToMealPlanner id={id} />
      <br />
      <div style={{ position: "relative", display: "inline-block" }}>
        <div className="image-wrapper">
          <img src={details.image} alt={details.title} />
          <button
            className="btn"
            onClick={() => favorite(details.id)}
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              backgroundColor: "transparent",
              color: "#50ba58",
            }}
          >
            {" "}
            {!isFavorited(details.id) && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
            )}
            {!!isFavorited(details.id) && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>
            )}
          </button>
        </div>
        <br />
      </div>

      <div
        className="card bg-danger text-success"
        style={{ padding: "5px", margin: "10px" }}
      >
        <p dangerouslySetInnerHTML={{ __html: cleanSummary }}></p>
      </div>

      <div
        className="card bg-danger"
        style={{ padding: "5px", margin: "10px" }}
      >
        <h2 className="text-secondary">ingredients</h2>
        <ul className="text-success" style={{ textAlign: "left" }}>
          {extendedIngredients.map((ingredient) => {
            if (ingredient.id !== -1) {
              return <li key={ingredient.id}>{ingredient.original}</li>;
            }
          })}
        </ul>
      </div>

      <div
        className="card bg-danger"
        style={{ padding: "5px", margin: "10px" }}
      >
        <h2 className="text-secondary">instructions</h2>
        <ol className="text-success" style={{ textAlign: "left" }}>
          {details.analyzedInstructions[0].steps.map((instruction, i) => {
            return <li key={i}>{instruction.step.replaceAll(".", ". ")}</li>;
          })}
        </ol>
      </div>
      <div
        className="card bg-danger"
        style={{ padding: "5px", margin: "10px" }}
      >
        <ReviewForm recipeId={seededId || ""} spoonacularId={id || ""} />
      </div>
      <div
        className="card bg-danger"
        style={{ padding: "5px", margin: "10px" }}
      >
        <ul>
          {reviews.map((review) => {
            return <li key={review.id}>{review.subject}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default RecipePage;

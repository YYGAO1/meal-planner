import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../../env";
import * as DOMPurify from "dompurify";
import { useSelector, useDispatch } from "react-redux";
import { deleteFavorite, createFavoriteSpoonacular } from "../store";

const RecipePage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [extendedIngredients, setExtendedIngredients] = useState([]);
  const cleanSummary = DOMPurify.sanitize(details.summary);
  const { auth, recipes, favorites } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getRecipeDetails(id);
  }, []);

  //for development
  useEffect(() => {
    console.log("details", details);
  }, [details]);

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

  const getRecipeDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": API_KEY,
          },
        }
      );
      setDetails(response.data);
    } catch (ex) {
      console.log(ex);
    }
  };

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
    <div className="container text-center">
      <h1>{details.title}</h1>
      <h2>insert meal planner add form here</h2>

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
      </div>

      <p dangerouslySetInnerHTML={{ __html: cleanSummary }}></p>
      <h2>ingredients</h2>
      <ul style={{ textAlign: "left" }}>
        {extendedIngredients.map((ingredient) => {
          if (ingredient.id !== -1) {
            return <li key={ingredient.id}>{ingredient.original}</li>;
          }
        })}
      </ul>
      <h2>instructions</h2>
      <ol style={{ textAlign: "left" }}>
        {details.analyzedInstructions[0].steps.map((instruction, i) => {
          return <li key={i}>{instruction.step.replaceAll(".", ". ")}</li>;
        })}
      </ol>
    </div>
  );
};

export default RecipePage;

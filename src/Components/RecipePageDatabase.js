import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createFavoriteRecipePage,
  fetchIngredients,
  fetchInstructions,
  fetchRecipes,
  deleteFavorite,
  createListItem,
} from "../store";
import * as DOMPurify from "dompurify";
import AddToMealPlanner from "./AddToMealPlanner";
import ReviewForm from "./ReviewForm";

const RecipePageDatabase = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    recipes,
    ingredients,
    instructions,
    auth,
    reviews,
    favorites,
    listItems,
  } = useSelector((state) => state);
  const recipe = recipes.find((r) => r.id === id);

  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    dispatch(fetchRecipes());
    dispatch(fetchIngredients(id));
    dispatch(fetchInstructions(id));
  }, []);

  useEffect(() => {
    const filteredReviews = reviews
      .filter((review) => review.recipeId === id)
      .sort((a, b) => {
        if (a.createdAt < b.createdAt) {
          return 1;
        }
        if (a.createdAt > b.createdAt) {
          return -1;
        }
        return 0;
      });
    setFilteredReviews(filteredReviews);
  }, [reviews, id]);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const isFavorited = (recipeId) => {
    const favorite = favorites.find((f) => f.recipe_id === recipeId);
    if (favorite) {
      return favorite;
    }
    return false;
  };

  const favorite = async (id) => {
    if (isFavorited(id)) {
      const favorite = isFavorited(id);
      dispatch(deleteFavorite(favorite.id));
    } else {
      dispatch(createFavoriteRecipePage({ recipe_id: id, userId: auth.id }));
    }
  };

  if (!recipe) {
    return null;
  }

  const cleanSummary = DOMPurify.sanitize(recipe.description);

  const addToGroceryList = (ingredientId) => {
    dispatch(createListItem({ ingredientId, userId: auth.id }));
  };

  const isOnGroceryList = (ingredient) => {
    const targetName = ingredient.name;
    console.log("targetName", targetName);

    for (let i = 0; i < listItems.length; i++) {
      const listItem = listItems[i];
      const _ingredient = ingredients.find(
        (i) => i.id === listItem.ingredientId
      );
      if (_ingredient) {
        const name = _ingredient.name;
        console.log("inner name", name);
        if (name === targetName) {
          return true;
        }
      }
    }

    return false;
  };

  return (
    <div>
      <h1 className="text-danger">{recipe.title}</h1>
      <AddToMealPlanner id={id} />

      <br />
      <div style={{ position: "relative", display: "inline-block" }}>
        <div className="image-wrapper">
          <img
            src={recipe.imageURL || recipe.image}
            alt="Recipe Image"
            // style={{
            //   margin: "15px",
            //   padding: "30px",
            //   maxWidth: "700px",
            //   maxHeight: "500px",
            // }}
          />
          <button
            className="btn"
            onClick={() => favorite(id)}
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              backgroundColor: "transparent",
              color: "#50ba58",
            }}
          >
            {" "}
            {!isFavorited(id) && (
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
            {!!isFavorited(id) && (
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
        <p
          dangerouslySetInnerHTML={{
            __html: cleanSummary || "No description yet",
          }}
        ></p>
      </div>

      <div
        className="card bg-danger"
        style={{ padding: "5px", margin: "10px" }}
      >
        <h3>Ingredients</h3>
        <ul style={{ listStyle: "none", paddingLeft: "0" }}>
          {ingredients.map((ingredient) => {
            return (
              <li key={ingredient.id}>
                {ingredient.amount > 0 ? ingredient.amount : null}{" "}
                {ingredient.measurementUnit} {ingredient.name}{" "}
                {!isOnGroceryList(ingredient) && (
                  <button
                    className="btn btn-secondary"
                    title="add to grocery list"
                    onClick={() => addToGroceryList(ingredient.id)}
                  >
                    +
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className="card bg-danger"
        style={{ padding: "5px", margin: "10px" }}
      >
        <h3>Instructions</h3>
        <ol style={{ listStyle: "none", paddingLeft: "0" }}>
          {instructions
            .sort((a, b) => a.listOrder - b.listOrder)
            .map((instruction) => {
              const cleanInstruction = DOMPurify.sanitize(
                instruction.specification,
                { FORBID_TAGS: ["li"] }
              );
              return (
                <li
                  key={instruction.id}
                  dangerouslySetInnerHTML={{ __html: cleanInstruction }}
                />
              );
            })}
        </ol>
      </div>

      <div
        className="card bg-danger"
        style={{ padding: "5px", margin: "10px" }}
      >
        <ReviewForm
          recipeId={id || ""}
          spoonacularId={recipe.spoonacular_id || ""}
        />
      </div>
      <div
        className="card bg-danger"
        style={{ padding: "5px", margin: "10px" }}
      >
        <h2 className="text-secondary">reviews</h2>
        <ul
          style={{
            listStyle: "none",
            padding: "0",
          }}
        >
          {filteredReviews.map((review) => {
            return (
              <li
                key={review.id}
                className="card bg-secondary"
                style={{ margin: "10px" }}
              >
                <div className="row text-primary">
                  <span className="col">{review.subject}</span>
                  <span className="col">{review.rating} / 5 stars </span>
                </div>
                <hr className="text-primary" />
                <div className="text-success">{review.body}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RecipePageDatabase;

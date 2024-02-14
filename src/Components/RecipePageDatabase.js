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
  deleteRecipe,
  deleteIngredients,
  deleteInstructions,
} from "../store";
import * as DOMPurify from "dompurify";
import AddToMealPlanner from "./AddToMealPlanner";
import ReviewForm from "./ReviewForm";
import DeleteRecipeConfirmation from "./DeleteRecipeConfirmation";

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
  } = useSelector((state) => ({
    recipes: state.recipes,
    ingredients: state.ingredients,
    instructions: state.instructions,
    auth: state.auth,
    reviews: state.reviews,
    favorites: state.favorites,
    listItems: state.listItems,
  }));
  const recipe = recipes.find((r) => r.id === id);

  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);

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

  const filterDuplicates = (_ingredients) => {
    const seen = {};
    return _ingredients.filter((ingredient) => {
      const ingredientKey = ingredient.name;
      if (seen.hasOwnProperty(ingredientKey)) {
        return false;
      } else {
        seen[ingredientKey] = true;
        return true;
      }
    });
  };

  useEffect(() => {
    if (ingredients) {
      setFilteredIngredients(filterDuplicates(ingredients));
    }
  }, [ingredients]);

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

  const addAllToGroceryList = () => {
    filteredIngredients.map((ingredient) => {
      if (!isOnGroceryList(ingredient)) addToGroceryList(ingredient.id);
    });
  };

  const addToGroceryList = (ingredientId) => {
    dispatch(createListItem({ ingredientId, userId: auth.id }));
  };

  const isOnGroceryList = (ingredient) => {
    const targetName = ingredient.name;
    for (let i = 0; i < listItems.length; i++) {
      const listItem = listItems[i];
      const _ingredient = ingredients.find(
        (i) => i.id == listItem.ingredientId
      );
      if (_ingredient) {
        const name = _ingredient.name;
        if (name == targetName) {
          return true;
        }
      }
    }

    return false;
  };

  const returnStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push("fill");
    }
    const emptyStars = 5 - rating;
    for (let i = 0; i < emptyStars; i++) {
      stars.push("empty");
    }
    return stars;
  };

  return (
    <div style={{ alignItems: "left" }}>
      <h1 className="text-danger">{recipe.title}</h1>
      {recipe.userId === auth.id
        ? DeleteRecipeConfirmation({ recipe, ingredients, instructions })
        : null}
      <AddToMealPlanner id={id} />
      <br />

      <div style={{ position: "relative", display: "inline-block" }}>
        <div className="image-wrapper">
          <img
            src={recipe.imageURL || recipe.image}
            alt={recipe.title}
            style={{ width: "520" }}
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
        style={{ padding: "5px", margin: "10px", maxWidth: "unset" }}
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
        <h2 className="text-secondary">ingredients</h2>
        <ul className="text-success" style={{ textAlign: "left" }}>
          {filteredIngredients.map((ingredient) => {
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
        <button className="btn btn-secondary" onClick={addAllToGroceryList}>
          add all to grocery list
        </button>
      </div>

      <div
        className="card bg-danger"
        style={{ padding: "5px", margin: "10px" }}
      >
        <h2 className="text-secondary">instructions</h2>
        <ol className="text-success" style={{ textAlign: "left" }}>
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
                  <span className="col">
                    {returnStars(review.rating).map((star, i) => {
                      if (star === "fill") {
                        return (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-star-fill"
                            viewBox="0 0 16 16"
                            key={i}
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                        );
                      } else {
                        return (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-star"
                            viewBox="0 0 16 16"
                            key={i}
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                          </svg>
                        );
                      }
                    })}
                  </span>
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

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addToMealPlanner,
  createFavoriteRecipePage,
  fetchIngredients,
  fetchInstructions,
  createComment,
  fetchRecipes,
} from "../store";
import * as DOMPurify from "dompurify";
import dayjs from "dayjs";
import AddToMealPlanner from "./AddToMealPlanner";

const RecipePageDatabase = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { recipes, ingredients, instructions, auth } = useSelector(
    (state) => state
  );
  const recipe = recipes.find((r) => r.id === id);

  useEffect(() => {
    dispatch(fetchRecipes());
    dispatch(fetchIngredients(id));
    dispatch(fetchInstructions(id));
  }, []);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  if (!recipe) {
    return null;
  }

  const cleanDescription = DOMPurify.sanitize(recipe.description);

  return (
    <div style={{ margin: "50px", textAlign: "center" }}>
      <h1>{recipe.title}</h1>
      <AddToMealPlanner id={id} />

      <span
        dangerouslySetInnerHTML={{
          __html: cleanDescription || "This recipe has no description yet.",
        }}
      />
      <div>
        <img
          src={recipe.imageURL || recipe.image}
          alt="Recipe Image"
          style={{
            margin: "15px",
            padding: "30px",
            maxWidth: "700px",
            maxHeight: "500px",
          }}
        />
      </div>
      <h3>Ingredients</h3>
      <ul style={{ listStyle: "none", paddingLeft: "0" }}>
        {ingredients.map((ingredient) => {
          return (
            <li key={ingredient.id}>
              {ingredient.amount > 0 ? ingredient.amount : null}{" "}
              {ingredient.measurementUnit} {ingredient.name}
            </li>
          );
        })}
      </ul>
      <h3>Directions</h3>
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
  );
};

export default RecipePageDatabase;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../../env";
import * as DOMPurify from "dompurify";

const RecipePage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [extendedIngredients, setExtendedIngredients] = useState([]);
  const cleanSummary = DOMPurify.sanitize(details.summary);

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
      <img src={details.image} />
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

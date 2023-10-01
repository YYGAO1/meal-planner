import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../../env";

const RecipePage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [extendedIngredients, setExtendedIngredients] = useState([]);

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
    console.log("ingredients", ingredients);
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

  if (!details || !extendedIngredients || !details.analyzedInstructions) {
    return null;
  }

  return (
    <div className="container">
      <h1>{details.title}</h1>
      <img src={details.image} />
      <p>{details.summary}</p>
      <h2>ingredients</h2>
      <ul>
        {extendedIngredients.map((ingredient) => {
          if (ingredient.id !== -1) {
            return <li key={ingredient.id}>{ingredient.original}</li>;
          }
        })}
      </ul>
      <h2>instructions</h2>
      <ol>
        {details.analyzedInstructions[0].steps.map((instruction, i) => {
          return <li key={i}>{instruction.step}</li>;
        })}
      </ol>
    </div>
  );
};

export default RecipePage;

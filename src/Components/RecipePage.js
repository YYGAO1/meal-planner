import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../../env";
import * as DOMPurify from "dompurify";
import dayjs from "dayjs";
import { addToMealPlanner } from "../store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "bootstrap";
import { useDispatch } from "react-redux";

const RecipePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [details, setDetails] = useState([]);
  const [extendedIngredients, setExtendedIngredients] = useState([]);
  const cleanSummary = DOMPurify.sanitize(details.summary);

  const types = ["snack", "breakfast", "lunch", "dinner", "dessert", "misc."];
  const today = new Date();
  const [date, setDate] = useState(today);
  const [type, setType] = useState("");

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

  //add to planner
  const addToPlanner = ({ id, type, date }) => {
    const newDate = dayjs(date).format("YYYY-MM-DD");
    dispatch(addToMealPlanner({ id, type, date: newDate }));
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

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
      <form className="row g-3">
        <DatePicker
          showIcon
          selected={date}
          onChange={(newDate) => setDate(newDate)}
        />
        <label class="form-label">Type</label>

        <select
          className="form-select"
          aria-label="Default select example"
          value={type}
          label="type"
          onChange={handleChange}
        >
          {types.map((type) => {
            return (
              <option
                className="dropdown-item"
                type="button"
                value={type}
                key={type}
              >
                {type}
              </option>
            );
          })}
        </select>
        <button
          type="button"
          className="btn"
          onClick={() => addToPlanner({ date, id, type })}
        >
          Add to Meal Planner
        </button>
      </form>
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

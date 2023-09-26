import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../../env";

const RecipeCard = (recipe) => {
  const [details, setDetails] = useState([]);

  const [openItems, setOpenItems] = useState([]);

  const handleAccordionClick = (id) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((item) => item !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };

  const isAccordionOpen = (id) => openItems.includes(id);

  useEffect(() => {
    getRecipeDetails(recipe);
  }, []);

  const getRecipeDetails = async (recipe) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipe.id}/information`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": API_KEY,
          },
        }
      );
      setDetails(response);
    } catch (ex) {
      console.log(ex);
    }
  };

  if (!details.data) {
    return null;
  }

  return (
    <div className="card" style={{ maxWidth: "300px" }}>
      <img src={recipe.image} className="card-img-top" alt={recipe.title} />
      <div className="card-body accordion">
        <div className="accordion-item">
          <h5 className="card-title accordion-header">
            <button
              className={`accordion-button ${
                isAccordionOpen(`collapse${recipe.id}`) ? "" : "collapsed"
              }`}
              type="button"
              onClick={() => handleAccordionClick(`collapse${recipe.id}`)}
            >
              {recipe.title}
            </button>
          </h5>
          <div
            id={`collapse${recipe.id}`}
            className={`accordion-collapse collapse ${
              isAccordionOpen(`collapse${recipe.id}`) ? "show" : ""
            }`}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <p className="card-text">{details.data.summary}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
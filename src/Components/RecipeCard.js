import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../../env";
import { useNavigate } from "react-router-dom";
import * as DOMPurify from "dompurify";

const RecipeCard = (recipe) => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({ summary: "" });
  const [openItems, setOpenItems] = useState([]);
  const [cleanSummary, setCleanSummary] = useState("");

  useEffect(() => {
    if (details.summary) {
      setCleanSummary(DOMPurify.sanitize(details.summary));
    }
  }, [details.summary]);

  const handleAccordionClick = (id) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((item) => item !== id));
    } else {
      getRecipeDetails(recipe);
      setOpenItems([...openItems, id]);
    }
  };

  const isAccordionOpen = (id) => openItems.includes(id);

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
      if (response.data.summary) {
        setDetails(response.data);
        console.log("details set");
      } else {
        console.log("no response.data.summary");
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleImageClick = (id) => {
    navigate(`/recipes/${id}`);
  };

  return (
    <div
      className="card bg-secondary"
      style={{ maxWidth: "300px", margin: "5px" }}
    >
      <img
        src={recipe.image}
        className="card-img-top"
        alt={recipe.title}
        onClick={() => handleImageClick(recipe.id)}
      />

      <div className="card-body accordion">
        <div className="accordion-item">
          <h5 className="card-title accordion-header">
            <button
              className={`accordion-button bg-secondary ${
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
              <p
                className="card-text"
                dangerouslySetInnerHTML={{ __html: cleanSummary || "" }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

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

  const favorite = () => {
    console.log("fav");
  };

  return (
    <div
      className="card bg-secondary"
      style={{ maxWidth: "300px", margin: "5px" }}
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        <div className="image-wrapper">
          <img
            src={recipe.image}
            className="card-img-top img-fluid"
            alt={recipe.title}
            onClick={() => handleImageClick(recipe.id)}
          />
          <button
            className="btn"
            onClick={favorite}
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              backgroundColor: "transparent",
              color: "red",
            }}
          >
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
          </button>
        </div>
      </div>

      <div className="card-body accordion">
        <div className="accordion-item">
          <h5 className="card-title accordion-header">
            <div className="">
              <button
                className={`accordion-button bg-secondary ${
                  isAccordionOpen(`collapse${recipe.id}`) ? "" : "collapsed"
                }`}
                type="button"
                onClick={() => handleAccordionClick(`collapse${recipe.id}`)}
              >
                {recipe.title}
              </button>
            </div>
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

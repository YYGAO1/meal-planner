import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import RecipeCard from "./RecipeCard";

const Recipes = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const searchRecipes = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.get(`/api/recipes/search/${searchTerm}`);
      setResults(response.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div
      className="container bg-primary"
      style={{
        paddingTop: "35px",
        display: "flex",
        flexDirection: "column",
        alignItems: "space-around",
        justifyContent: "space-around",
      }}
    >
      <h1 className="text-secondary">Recipes</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "space-around",
          justifyContent: "space-around",
        }}
      >
        <input
          value={searchTerm}
          onChange={(ev) => setSearchTerm(ev.target.value)}
          className="bg-danger text-success"
          style={{ width: "45%", margin: "5px auto" }}
        />
        <button
          onClick={searchRecipes}
          className="btn btn-secondary text-primary"
          style={{ width: "100px", margin: "5px auto" }}
        >
          search
        </button>
      </form>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "space-around",
        }}
      >
        {results.map((recipe) => {
          return (
            <div key={recipe.id}>
              <RecipeCard {...recipe} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recipes;

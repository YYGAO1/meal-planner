import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../store";
import { API_KEY } from "../../env";
import RecipeCard from "./RecipeCard";

const Recipes = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  //for development, to keep track of state
  useEffect(() => {
    console.log(results);
  }, [results]);

  const searchRecipes = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": API_KEY,
          },
          params: {
            number: 12,
          },
        }
      );
      setResults(response.data.results);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div>
      <h1>Recipes</h1>
      <div>
        Welcome {auth.username}!
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
      <form>
        <input
          value={searchTerm}
          onChange={(ev) => setSearchTerm(ev.target.value)}
        />
        <button onClick={searchRecipes}>search</button>
      </form>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
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

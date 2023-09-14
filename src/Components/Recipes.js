import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../store";
import { API_KEY } from "../../env";

const Recipes = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

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
            number: 10,
          },
        }
      );
      console.log(response.data);
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
    </div>
  );
};

export default Recipes;

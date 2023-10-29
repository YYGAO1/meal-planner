import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import RecipeCard from "./RecipeCard";

const Recipes = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  const searchRecipes = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.get(`/api/recipes/search/${searchTerm}`);
      setResults(response.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    console.log(page);
  }, [page]);

  const decrementPage = () => {
    setPage(page - 1);
  };

  const incrementPage = () => {
    setPage(page + 1);
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
      {!!results.length && (
        <div className="row" style={{ width: "250px", margin: "auto" }}>
          <button
            className="col btn btn-secondary text-primary"
            style={{ margin: "10px" }}
            onClick={decrementPage}
            disabled={page === 1 ? true : false}
          >
            &lt;
          </button>{" "}
          <button
            className="col btn btn-secondary text-primary"
            style={{ margin: "10px" }}
            onClick={incrementPage}
          >
            &gt;
          </button>
        </div>
      )}
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

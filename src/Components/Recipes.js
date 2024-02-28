import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import RecipeCard from "./RecipeCard";

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [searched, setSearched] = useState(false);
  const [paginatedResults, setPaginatedResults] = useState([]);

  useEffect(() => {
    setPaginatedResults(results.slice((page - 1) * 9, page * 9));
  }, [results, page]);

  const searchRecipes = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.get(`/api/recipes/search/${searchTerm}`);
      setResults(response.data);
      setSearched(true);
    } catch (ex) {
      console.log(ex);
    }
  };

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
          onChange={(ev) => {
            setSearched(false);
            setSearchTerm(ev.target.value);
          }}
          className="bg-danger text-success"
          style={{ width: "65%", margin: "5px auto" }}
        />
        <button
          onClick={searchRecipes}
          className="btn btn-secondary text-primary"
          style={{ width: "100px", margin: "5px auto" }}
        >
          search
        </button>
      </form>
      {!!searched && !paginatedResults.length && (
        <h2 className="text-secondary">No results</h2>
      )}
      {!!paginatedResults.length && (
        <div
          className="row"
          style={{
            width: "250px",
            margin: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            className="col btn btn-secondary text-primary"
            style={{ margin: "10px" }}
            onClick={decrementPage}
            disabled={page === 1 ? true : false}
          >
            &lt;
          </button>{" "}
          <div className="col text-danger">{page}</div>
          <button
            className="col btn btn-secondary text-primary"
            style={{ margin: "10px" }}
            onClick={incrementPage}
            disabled={results.length <= page * 9}
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
        {!!paginatedResults &&
          paginatedResults.map((recipe) => {
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

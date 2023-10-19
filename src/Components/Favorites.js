import React from "react";
import { useSelector, useDispatch } from "react-redux";
import RecipeCard from "./RecipeCard";

const Favorites = () => {
  const { auth, recipes, favorites } = useSelector((state) => state);

  if (!favorites || !recipes) {
    return null;
  }

  const myFavorites = favorites
    .filter((f) => f.userId === auth.id)
    .map((f) => {
      if (f.id) {
        return recipes.find((r) => {
          if (r.id) {
            return r.id === f.recipe_id;
          }
        });
      }
    });

  if (!myFavorites.length) {
    return null;
  }

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
      <h1 className="text-secondary">My Favorites</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "space-around",
        }}
      >
        {myFavorites.map((recipe) => {
          if (recipe) {
            return (
              <div key={recipe.id}>
                <RecipeCard {...recipe} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Favorites;

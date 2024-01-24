import React from "react";
import { useSelector, useDispatch } from "react-redux";
import RecipeCard from "./RecipeCard";

const MyRecipes = () => {
  const { auth, recipes } = useSelector((state) => state);

  const myRecipes = recipes.filter((r) => r.userId === auth.id);

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
      <h1 className="text-secondary">My Recipes</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "space-around",
        }}
      >
        {myRecipes.map((recipe) => {
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

export default MyRecipes;

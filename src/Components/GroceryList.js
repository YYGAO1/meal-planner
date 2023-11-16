import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchListItems, fetchIngredientsGroceryList } from "../store";

const GroceryList = () => {
  const dispatch = useDispatch();
  const { listItems, ingredients } = useSelector((state) => ({
    listItems: state.listItems,
    ingredients: state.ingredients,
  }));

  useEffect(() => {
    dispatch(fetchListItems());
    dispatch(fetchIngredientsGroceryList());
  }, []);

  useEffect(() => {
    console.log(ingredients);
  }, [ingredients]);

  if (!listItems.length) return null;

  return (
    <div>
      <h1>Grocery List</h1>
      <ul>
        {listItems.map((item) => {
          const ingredient = ingredients.find(
            (ingredient) => ingredient.id === item.ingredientId
          );
          return <li key={item.id}>{ingredient ? ingredient.name : ""}</li>;
        })}
      </ul>
    </div>
  );
};

export default GroceryList;

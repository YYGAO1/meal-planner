import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchListItems,
  fetchIngredientsGroceryList,
  fetchAllIngredients,
} from "../store";

const GroceryList = () => {
  const dispatch = useDispatch();
  const { listItems, ingredients, allIngredients } = useSelector((state) => ({
    listItems: state.listItems,
    ingredients: state.ingredients,
    allIngredients: state.allIngredients,
  }));

  const [filteredListItems, setFilteredListItems] = useState([]);

  useEffect(() => {
    dispatch(fetchListItems());
    dispatch(fetchIngredientsGroceryList());
    dispatch(fetchAllIngredients());
  }, []);

  const filterDuplicates = (_listitems) => {
    const seen = {};
    return _listitems
      .map((listitem) => {
        const _ingredient = allIngredients.find(
          (ingredient) => ingredient.id === listitem.ingredientId
        );
        return _ingredient;
      })
      .filter((ingredient) => {
        const ingredientKey = ingredient.name;
        if (seen.hasOwnProperty(ingredientKey)) {
          return false;
        } else {
          seen[ingredientKey] = true;
          return true;
        }
      });
  };

  useEffect(() => {
    if (listItems) {
      setFilteredListItems(filterDuplicates(listItems));
    }
  }, [listItems]);

  useEffect(() => {
    console.log(ingredients);
  }, [ingredients]);

  if (!listItems.length) return null;

  return (
    <div>
      <h1>Grocery List</h1>
      <ul>
        {filteredListItems.map((item) => {
          // const ingredient = ingredients.find(
          //   (ingredient) => ingredient.id === item.ingredientId
          // );
          return <li key={item.id}>{item ? item.name : ""}</li>;
        })}
      </ul>
    </div>
  );
};

export default GroceryList;

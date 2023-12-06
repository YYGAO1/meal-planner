import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchListItems,
  fetchIngredientsGroceryList,
  fetchAllIngredients,
  removeListItem,
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
    // dispatch(fetchAllIngredients());
  }, []);

  const filterDuplicates = (_listitems) => {
    const seen = {};

    return _listitems.filter((item) => {
      const _ingredient = allIngredients.find(
        (ingredient) => ingredient.id === item.ingredientId
      );
      if (_ingredient) {
        if (seen.hasOwnProperty(_ingredient.name)) return false;
        else {
          seen[_ingredient.name] = true;
          return true;
        }
      }
    });
  };

  useEffect(() => {
    if (listItems) {
      setFilteredListItems(filterDuplicates(listItems));
    }
  }, [listItems]);

  // useEffect(() => {
  //   console.log(ingredients);
  // }, [ingredients]);

  const remove = (item) => {
    dispatch(removeListItem(item));
  };

  if (!listItems.length) return null;

  return (
    <div>
      <h1>Grocery List</h1>
      <ul>
        {filteredListItems.map((item, i) => {
          const ingredient = ingredients.find(
            (ingredient) => ingredient.id === item.ingredientId
          );
          return (
            <li key={i}>
              <button onClick={() => remove(item)}>x</button>
              {ingredient ? ingredient.name : ""}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GroceryList;

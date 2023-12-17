import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchListItems,
  fetchIngredientsGroceryList,
  fetchAllIngredients,
  removeListItem,
  checkListItem,
  uncheckListItem,
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
    // console.log("running filterDuplicates");
    const filteredItems = _listitems.filter((item) => {
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
    // console.log("filteredItems", filteredItems);
    return filteredItems;
  };

  useEffect(() => {
    if (ingredients && listItems) {
      // console.log("listItems", listItems);
      setFilteredListItems(filterDuplicates(listItems));
    }
  }, [ingredients, allIngredients, listItems]);

  // useEffect(() => {
  //   console.log(ingredients);
  // }, [ingredients]);

  const remove = (item) => {
    dispatch(removeListItem(item));
  };

  const handleCheckButton = (item) => {
    if (!item.isChecked) dispatch(checkListItem(item));
    else dispatch(uncheckListItem(item));
  };

  //if (!listItems.length) return null;

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
      <h1 className="text-secondary">Grocery List</h1>
      <ul
        style={{
          listStyle: "none",
          textAlign: "left",
          width: "75%",
          margin: "auto",
          padding: "15px",
        }}
      >
        {filteredListItems.length ? (
          filteredListItems.map((item, i) => {
            const ingredient = ingredients.find(
              (ingredient) => ingredient.id === item.ingredientId
            );
            return (
              <li
                key={i}
                style={{
                  margin: "5px auto",
                  padding: "5px",
                }}
                className="card bg-danger text-success"
              >
                <div className="row">
                  <div className="col">
                    <button
                      className="btn btn-secondary text-success"
                      style={{ margin: "5px" }}
                      onClick={() => remove(item)}
                    >
                      x
                    </button>
                    <button
                      className="btn btn-secondary text-success"
                      style={{ margin: "5px" }}
                      onClick={() => handleCheckButton(item)}
                    >
                      √
                    </button>
                  </div>
                  <span
                    className="col"
                    style={{
                      textDecoration: item.isChecked ? "line-through" : "none",
                      margin: "auto",
                    }}
                  >
                    {ingredient ? ingredient.name : ""}
                  </span>
                  <span className="col"></span>
                </div>
              </li>
            );
          })
        ) : (
          <h2 className="text-secondary" style={{ textAlign: "center" }}>
            List complete! Hooray!
          </h2>
        )}
      </ul>
      {!!filteredListItems.length &&
        !filteredListItems.some((item) => !item.isChecked) && (
          <h2 className="text-secondary" style={{ textAlign: "center" }}>
            List complete! Hooray!
          </h2>
        )}
    </div>
  );
};

export default GroceryList;

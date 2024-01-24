import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchListItems,
  fetchIngredientsGroceryList,
  fetchAllIngredients,
  removeListItem,
  checkListItem,
  uncheckListItem,
  createCustomListItem,
} from "../store";
import QuantityForm from "./QuantityForm";
import { useNavigate } from "react-router-dom";
import ListItem from "./ListItem";

const GroceryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listItems, ingredients, allIngredients, auth } = useSelector(
    (state) => ({
      listItems: state.listItems,
      ingredients: state.ingredients,
      allIngredients: state.allIngredients,
      auth: state.auth,
    })
  );

  const [filteredListItems, setFilteredListItems] = useState([]);
  const [ingredient, setIngredient] = useState({
    name: "",
    amount: 0,
    measurementUnit: "",
  });

  useEffect(() => {
    dispatch(fetchListItems());
    dispatch(fetchIngredientsGroceryList());
    dispatch(fetchAllIngredients());
  }, []);

  const filterDuplicates = (_listitems) => {
    const seen = {};
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
    return filteredItems;
  };

  useEffect(() => {
    if (ingredients && listItems) {
      setFilteredListItems(filterDuplicates(listItems));
    }
  }, [ingredients, allIngredients, listItems]);

  const remove = (item) => {
    dispatch(removeListItem(item));
  };

  const clearAll = () => {
    listItems.forEach((item) => {
      dispatch(removeListItem(item));
    });
  };

  const checkAll = () => {
    listItems.forEach((item) => {
      dispatch(checkListItem(item));
    });
  };

  const uncheckAll = () => {
    listItems.forEach((item) => {
      dispatch(uncheckListItem(item));
    });
  };

  const onChangeIngredient = (ev) => {
    setIngredient({
      ...ingredient,
      [ev.target.name]: ev.target.value,
    });
  };

  const createCustom = (ev) => {
    ev.preventDefault();
    dispatch(createCustomListItem({ ingredient: ingredient, userId: auth.id }));
    setIngredient({
      name: "",
      amount: 0,
      measurementUnit: "",
    });
  };

  //accordion handling...
  const [openItems, setOpenItems] = useState([]);
  const isAccordionOpen = (id) => openItems.includes(id);

  const handleAccordionClick = (id) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((item) => item !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
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
      <h1 className="text-secondary">Grocery List</h1>

      {/* Primary grocery list */}
      <ul
        style={{
          listStyle: "none",
          textAlign: "left",
          width: "65%",
          margin: "auto",
          padding: "15px",
        }}
      >
        {filteredListItems.length ? (
          filteredListItems
            .filter((item) => !item.isChecked)
            .map((item, i) => {
              return (
                <li
                  key={i}
                  style={{
                    margin: "5px auto",
                    padding: "5px",
                  }}
                  className="card bg-danger text-success"
                >
                  <ListItem {...item} />
                </li>
              );
            })
        ) : (
          <h2 className="text-danger" style={{ textAlign: "center" }}>
            List complete! Hooray!
          </h2>
        )}
      </ul>

      {/* "List complete" message (if all items checked) */}
      {!!filteredListItems.length &&
        !filteredListItems.some((item) => !item.isChecked) && (
          <h2 className="text-secondary" style={{ textAlign: "center" }}>
            List complete! Hooray!
          </h2>
        )}

      {/* Checked items accordion and list */}
      <div
        className="card bg-primary accordion"
        style={{ width: "65%", margin: "auto" }}
      >
        <div className="accordion-item">
          <div className="accordion-header">
            <button
              className={`accordion-button bg-secondary text-success font-weight-bold ${
                isAccordionOpen(`collapseOne`) ? "" : "collapsed"
              }`}
              type="button"
              onClick={() => handleAccordionClick(`collapseOne`)}
              style={{ height: "40px" }}
            >
              <div
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                Checked Items
              </div>
            </button>
          </div>
        </div>
        <div
          id="collapseOne"
          className={`accordion-collapse collapse ${
            isAccordionOpen(`collapseOne`) ? "show" : ""
          }`}
        >
          <ul
            style={{
              listStyle: "none",
              textAlign: "left",
              margin: "auto",
              padding: "15px",
            }}
          >
            {filteredListItems.length !== 0 &&
              filteredListItems
                .filter((item) => item.isChecked)
                .map((item, i) => {
                  return (
                    <li
                      key={i}
                      style={{
                        margin: "5px auto",
                        padding: "5px",
                      }}
                      className="card bg-danger text-success"
                    >
                      <ListItem {...item} />
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>

      <form onSubmit={createCustom}>
        <div style={{ margin: "35px" }}>
          <div className="mb-3">
            <label className="form-label text-secondary">
              amount
              <input
                className="form-control bg-danger text-success"
                value={ingredient.amount}
                name="amount"
                onChange={(ev) => onChangeIngredient(ev)}
              />
            </label>
            <label className="form-label text-secondary">
              measurement unit
              <input
                className="form-control bg-danger text-success"
                value={ingredient.measurementUnit}
                name="measurementUnit"
                onChange={(ev) => onChangeIngredient(ev)}
              />
            </label>
            <label className="form-label text-secondary">
              name
              <input
                className="form-control bg-danger text-success"
                value={ingredient.name}
                name="name"
                onChange={(ev) => onChangeIngredient(ev)}
              />
            </label>{" "}
            <button
              style={{ margin: "35px" }}
              className="btn btn-secondary text-success"
              type="submit"
            >
              add
            </button>
          </div>{" "}
        </div>
      </form>
      {/* Master buttons */}
      <button
        type="button"
        className="btn btn-secondary text-primary"
        onClick={() => clearAll()}
      >
        clear all
      </button>
      <button
        type="button"
        className="btn btn-secondary text-primary"
        onClick={() => checkAll()}
      >
        check all
      </button>
      <button
        type="button"
        className="btn btn-secondary text-primary"
        onClick={() => uncheckAll()}
      >
        uncheck all
      </button>
    </div>
  );
};

export default GroceryList;

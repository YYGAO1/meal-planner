import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateListItem } from "../store";

const QuantityForm = (item) => {
  const dispatch = useDispatch();
  const [workingItem, setWorkingItem] = useState({ ...item });
  const { allIngredients } = useSelector((state) => ({
    allIngredients: state.allIngredients,
  }));

  const _ingredient = allIngredients.find(
    (ingredient) => ingredient.id === item.ingredientId
  );

  const onChange = (ev) => {
    setWorkingItem({ ...workingItem, [ev.target.name]: ev.target.value });
  };

  const updateItem = async () => {
    await dispatch(updateListItem(workingItem));
  };

  return (
    <div className="card bg-danger" style={{ width: "65%", margin: "5px" }}>
      <input
        className="bg-secondary text-success"
        value={workingItem.quantity || ""}
        name="quantity"
        onChange={onChange}
      ></input>
      {!!_ingredient && (
        <p
          className="text-success"
          style={{ margin: "auto", fontStyle: "italic", fontSize: "0.85rem" }}
        >
          from recipe: {_ingredient.amount} {_ingredient.measurementUnit}
        </p>
      )}
      <button
        className="btn btn-secondary text-success"
        style={{ margin: "5px" }}
        onClick={updateItem}
      >
        update
      </button>
    </div>
  );
};

export default QuantityForm;

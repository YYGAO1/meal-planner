import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeListItem, checkListItem, uncheckListItem } from "../store";
import QuantityForm from "./QuantityForm";

const ListItem = (item) => {
  const dispatch = useDispatch();

  const { allIngredients } = useSelector((state) => ({
    allIngredients: state.allIngredients,
  }));
  const ingredient = allIngredients.find(
    (ingredient) => ingredient.id === item.ingredientId
  );

  const remove = (item) => {
    dispatch(removeListItem(item));
  };

  const handleCheckButton = (item) => {
    if (!item.isChecked) dispatch(checkListItem(item));
    else dispatch(uncheckListItem(item));
  };

  //quantity form handling...
  const [openQuantityForm, setOpenQuantityForm] = useState(false);

  const toggleQuantityForm = () => {
    if (openQuantityForm === true) {
      setOpenQuantityForm(false);
    } else {
      setOpenQuantityForm(true);
    }
  };

  useEffect(() => {
    setOpenQuantityForm(false);
  }, [item]);

  return (
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
        <button
          className="btn btn-secondary text-success"
          style={{ margin: "5px" }}
          onClick={() => toggleQuantityForm(item.id)}
        >
          quantity
        </button>
        {!!openQuantityForm && <QuantityForm {...item} />}
      </div>
      <span
        className="col"
        style={{
          margin: "auto",
        }}
      >
        {item ? item.quantity : ""} {ingredient ? ingredient.name : ""}
      </span>
    </div>
  );
};

export default ListItem;

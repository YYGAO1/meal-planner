import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateListItem } from "../store";

const QuantityForm = (item) => {
  const dispatch = useDispatch();
  const [workingItem, setWorkingItem] = useState({ ...item });

  const onChange = (ev) => {
    setWorkingItem({ ...workingItem, [ev.target.name]: ev.target.value });
  };

  const updateItem = async () => {
    await dispatch(updateListItem(workingItem));
  };

  return (
    <div>
      <input
        className="bg-secondary text-success"
        value={workingItem.quantity || ""}
        name="quantity"
        onChange={onChange}
      ></input>
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

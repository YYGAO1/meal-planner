import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchListItems } from "../store";

const GroceryList = () => {
  const dispatch = useDispatch();
  const { listItems } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchListItems());
  }, []);

  useEffect(() => {
    console.log(listItems);
  }, [listItems]);

  if (!listItems.length) return null;

  return (
    <div>
      <h1>Grocery List</h1>
      <ul>
        {listItems.map((item) => {
          return <li key={item.id}>{item.id}</li>;
        })}
      </ul>
    </div>
  );
};

export default GroceryList;

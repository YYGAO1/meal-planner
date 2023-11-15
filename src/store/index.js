import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import favorites from "./favorites";
import recipes from "./recipes";
import day from "./days";
import listItems from "./listitems";
import ingredients from "./ingredients";
import reviews from "./reviews";

const reducer = combineReducers({
  auth,
  favorites,
  recipes,
  day,
  listItems,
  ingredients,
  reviews,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./favorites";
export * from "./recipes";
export * from "./days";
export * from "./listitems";
export * from "./ingredients";
export * from "./reviews";

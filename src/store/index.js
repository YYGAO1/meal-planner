import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import favorites from "./favorites";
import recipes from "./recipes";
import day from "./days";


const reducer = combineReducers({
  auth,
  favorites,
  recipes,
  day,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./favorites";
export * from "./recipes";
export * from "./days";


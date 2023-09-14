import React, { useEffect } from "react";
import Recipes from "./Recipes";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store";
import { Link, Routes, Route } from "react-router-dom";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  return (
    <div>
      <h1>FS App Template</h1>
      {auth.id ? <Recipes /> : <Login />}
      {!!auth.id && (
        <div>
          <nav>
            <Link to="/">Recipes</Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default App;

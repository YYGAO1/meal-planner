import React, { useEffect } from "react";
import Recipes from "./Recipes";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store";
import { Link, Routes, Route } from "react-router-dom";
import { API_KEY } from "../../env";
import MealPlanner from "./MealPlanner";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  return (
    <div>
      <h1>FS App Template</h1>

      {!!auth.id && (
        <div>
          <nav>
            <Link to="/">Recipes</Link>
          </nav>
        </div>
      )}
      {auth.id ? <Recipes /> : <Login />}
      <Routes>
        <Route path="/planner" element={<MealPlanner />} />
      </Routes>
    </div>
  );
};

export default App;

import React, { useEffect } from "react";
import Recipes from "./Recipes";
import Login from "./Login";
import RecipePage from "./RecipePage";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store";
import { Link, Routes, Route } from "react-router-dom";
import MealPlanner from "./MealPlanner";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  return (
    <div className="bg-primary" style={{ height: "100%" }}>
      <h1>Meal Planner</h1>

      {!!auth.id && (
        <div>
          <nav>
            <Link to="/">Recipes</Link>
            <Link to="/mealplanner">Meal Planner</Link>
          </nav>
        </div>
      )}

      <Routes>
        <Route path="/" element={auth.id ? <Recipes /> : <Login />} />
        <Route path="/mealplanner" element={<MealPlanner />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
      </Routes>
    </div>
  );
};

export default App;

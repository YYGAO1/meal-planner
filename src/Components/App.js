import React, { useEffect } from "react";
import Recipes from "./Recipes";
import Login from "./Login";
import RecipePage from "./RecipePage";
import Favorites from "./Favorites";
import SignUp from "./SignUp";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import MealPlanner from "./MealPlanner";
import { logout, fetchFavorites, fetchRecipes } from "../store";
import "bootstrap/dist/js/bootstrap";

import "bootstrap/dist/js/bootstrap";
import UpdateUser from "./UpdateUser";
import UploadRecipe from "./UploadRecipe";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchFavorites());
    dispatch(fetchRecipes());
  }, []);

  return (
    <div
      className="container-fluid text-center bg-primary"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "25px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {!!auth.id && (
          <div className="dropend">
            <button
              className="btn btn-secondary text-primary btn-lg dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              menu
            </button>
            <ul className="dropdown-menu bg-danger">
              <li>
                <Link className="dropdown-item" to="/">
                  Recipes
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/recipes/upload">
                  Upload Recipe
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/mealplanner">
                  Planner
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/favorites">
                  My Favorites
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/user/update">
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  onClick={async () => {
                    await dispatch(logout());
                    navigate("/");
                  }}
                >
                  Logout {auth.username}
                </Link>
              </li>
            </ul>
          </div>
        )}
        <h1 className="text-secondary">Meal Planner</h1>
      </div>

      <Routes>
        <Route path="/" element={auth.id ? <Recipes /> : <Login />} />
        <Route path="/mealplanner" element={<MealPlanner />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/update" element={<UpdateUser />} />
        <Route path="/recipes/upload" element={<UploadRecipe />} />
      </Routes>
    </div>
  );
};

export default App;

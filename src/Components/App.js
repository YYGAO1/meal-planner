import React, { useEffect } from "react";
import Recipes from "./Recipes";
import Login from "./Login";
import RecipePage from "./RecipePage";
import Favorites from "./Favorites";
import SignUp from "./SignUp";
import { useSelector, useDispatch } from "react-redux";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import MealPlanner from "./MealPlanner";
import {
  logout,
  fetchFavorites,
  fetchRecipes,
  fetchListItems,
  loginWithToken,
  fetchIngredients,
  fetchReviews,
  fetchAllIngredients,
} from "../store";
import "bootstrap/dist/js/bootstrap";
import UpdateUser from "./UpdateUser";
import UploadRecipe from "./UploadRecipe";
import GroceryList from "./GroceryList";
import RecipePageDatabase from "./RecipePageDatabase";
import MyRecipes from "./MyRecipes";
import AboutUs from "./AboutUs";

const App = () => {
  const { auth } = useSelector((state) => ({
    auth: state.auth,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchFavorites());
    dispatch(fetchRecipes());
    dispatch(fetchReviews());
    //dispatch(fetchIngredients());
    dispatch(fetchAllIngredients());
  }, []);

  useEffect(() => {
    dispatch(fetchListItems());
  }, [auth]);

  return (
    <div
      className="container-fluid text-center bg-primary"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
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
                <Link className="dropdown-item" to="/aboutus">
                  About Us
                </Link>
              </li>
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
                  Meal Planner
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/grocerylist">
                  Grocery List
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/favorites">
                  My Favorites
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/myrecipes">
                  My Recipes
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
        <h1 className="text-secondary display-3">
          <strong>EatEasy</strong>
        </h1>
      </div>

      <Routes>
        <Route path="/" element={auth.id ? <Recipes /> : <Login />} />
        <Route path="/mealplanner" element={<MealPlanner />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="/recipes/uploaded/:id" element={<RecipePageDatabase />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/myrecipes" element={<MyRecipes />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/update" element={<UpdateUser />} />
        <Route path="/recipes/upload" element={<UploadRecipe />} />
        <Route path="/grocerylist" element={<GroceryList />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </div>
  );
};

export default App;

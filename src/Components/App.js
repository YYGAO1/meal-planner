import React, { useEffect } from "react";
import Recipes from "./Recipes";
import Login from "./Login";
import RecipePage from "./RecipePage";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store";
import { Link, Routes, Route } from "react-router-dom";
import MealPlanner from "./MealPlanner";
import { logout } from "../store";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
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
              className="btn btn-outline-light btn-lg dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              menu
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/">
                  Recipes
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/planner">
                  Planner
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  onClick={() => dispatch(logout())}
                >
                  Logout {auth.username}
                </Link>
              </li>
            </ul>
          </div>
        )}
        <h1>Meal Planner</h1>
      </div>
      <Routes>
        <Route path="/" element={auth.id ? <Recipes /> : <Login />} />
        <Route path="/planner" element={<MealPlanner />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
      </Routes>
    </div>
  );
};

export default App;

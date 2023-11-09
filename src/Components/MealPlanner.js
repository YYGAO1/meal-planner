import * as React from "react";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDay } from "../store";
import { Link } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MealPlanner = () => {
  const { day } = useSelector((state) => state);

  //   const today = dayjs().format("YYYY-MM-DD");
  //   const [date, setDate] = React.useState(dayjs(today));

  const today = new Date();
  const [date, setDate] = React.useState(today);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDay(dayjs(date).format("YYYY-MM-DD")));
  }, [date]);

  // const breakfast = [];
  // const lunch = [];
  // const dinner = [];
  // const snacks = [];
  // const dessert = [];
  // const misc = [];

  // refactor
  const [breakfast, lunch, dinner, snacks, dessert, misc] = [
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  day.meals.map((meal) => {
    if (meal.type === "breakfast") {
      meal.mealrecipes
        .map((mealrecipe) => mealrecipe.recipe)
        .map((recipe) => {
          breakfast.push(recipe);
        });
    }
    if (meal.type === "lunch") {
      meal.mealrecipes
        .map((mealrecipe) => mealrecipe.recipe)
        .map((recipe) => {
          lunch.push(recipe);
        });
    }
    if (meal.type === "dinner") {
      meal.mealrecipes
        .map((mealrecipe) => mealrecipe.recipe)
        .map((recipe) => {
          dinner.push(recipe);
        });
    }
    if (meal.type === "snack") {
      meal.mealrecipes
        .map((mealrecipe) => mealrecipe.recipe)
        .map((recipe) => {
          snacks.push(recipe);
        });
    }
    if (meal.type === "dessert") {
      meal.mealrecipes
        .map((mealrecipe) => mealrecipe.recipe)
        .map((recipe) => {
          dessert.push(recipe);
        });
    }
    if (meal.type === "misc") {
      meal.mealrecipes
        .map((mealrecipe) => mealrecipe.recipe)
        .map((recipe) => {
          misc.push(recipe);
        });
    }
  });

  return (
    <div style={{ width: "100%" }}>
      <h1 className="text-secondary">Planner</h1>
      <div
        className="card bg-danger"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "65%",
          margin: "25px auto",
          padding: "15px",
        }}
      >
        <div
          className="mealPlannerCalendar card bg-secondary"
          style={{ padding: "15px" }}
        >
          <DatePicker
            showIcon
            inline
            dateFormat="MM-dd-yyyy"
            selected={date}
            onChange={(toDate) => setDate(toDate)}
          />
        </div>
        <div className="mealsOfTheDay text-success" style={{ width: "40%" }}>
          <h3>Breakfast</h3>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {breakfast.map((recipe) => (
              <li key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                {/* <p>add to grocery list</p>
              <i class="bi bi-plus-circle"></i> */}
              </li>
            ))}
          </ul>
          <h3>Lunch</h3>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {lunch.map((recipe) => (
              <li key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                {/* <p>add to grocery list</p>
              <i class="bi bi-plus-circle"></i> */}
              </li>
            ))}
          </ul>{" "}
          <h3>Dinner</h3>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {dinner.map((recipe) => (
              <li key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                {/* <p>add to grocery list</p>
              <i class="bi bi-plus-circle"></i> */}
              </li>
            ))}
          </ul>
          <h3>Snacks</h3>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {snacks.map((recipe) => (
              <li key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                {/* <p>add to grocery list</p>
              <i class="bi bi-plus-circle"></i> */}
              </li>
            ))}
          </ul>
          <h3>Desserts</h3>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {dessert.map((recipe) => (
              <li key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                {/* <p>add to grocery list</p>
              <i class="bi bi-plus-circle"></i> */}
              </li>
            ))}
          </ul>
          <h3>Misc.</h3>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {misc.map((recipe) => (
              <li key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                {/* <p>add to grocery list</p>
              <i class="bi bi-plus-circle"></i> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;

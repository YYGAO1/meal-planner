import * as React from "react";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import * as dayjs from "dayjs";
import { fetchDay } from "../store/day";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const MealPlanner = () => {
  const { day } = useSelector((state) => state);

  const today = dayjs().format("YYYY-MM-DD");
  const [date, setDate] = useState(dayjs(today));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDay(dayjs(date).format("YYYY-MM-DD")));
  }, [date]);

  const breakfast = [];
  const lunch = [];
  const dinner = [];
  const snacks = [];

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
  });

  return (
    <div className="mealPlannerCalendar">
      // calendar
      <DatePicker
        showIcon
        selected={date}
        onSelect={handleDateSelect} //when day is clicked
        onChange={handleDateChange} //only when value has changed
      />
    </div>
  );
};

export default MealPlanner;

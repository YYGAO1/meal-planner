import * as React from "react";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import * as dayjs from 'dayjs'
import { fetchDay } from "../store/day";

const MealPlanner = () => {
  const { day } = useSelector((state) => state);

  const today: string = dayjs().format("YYYY-MM-DD");
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

  )
};

export default MealPlanner;

const express = require("express");
const app = express.Router();

const { MealUser, MealRecipe } = require("../db");
const { isLoggedIn } = require("./middleware");

app.get("/:date", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    res.send(await user.getDay(req.params.date));
  } catch (ex) {
    next(ex);
  }
});

app.post("/:date", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    res.send(await user.addToDay(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put("/recipes/:id", async (req, res, next) => {
  try {
    const mealRecipe = await MealRecipe.findByPk(req.params.id);
    res.send(await mealRecipe.update(req.body));
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;

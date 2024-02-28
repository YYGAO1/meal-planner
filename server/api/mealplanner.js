const express = require("express");
const app = express.Router();

const { MealUser } = require("../db");
const { isLoggedIn } = require("./middleware");

app.get("/:date", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    res.send(await user.getDay(req.params.date));
  } catch (ex) {
    next(ex);
  }
});

app.post("/add/:date", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    res.send(await user.addToDay(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.post("/remove/:date", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    res.send(await user.removeFromDay(req.body));
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;

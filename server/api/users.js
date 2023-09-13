const express = require("express");
const app = express.Router();
const { MealUser } = require("../db");

module.exports = app;

//get all users
app.get("/", async (req, res, next) => {
  try {
    res.send(await MealUser.findAll());
  } catch (ex) {
    next(ex);
  }
});

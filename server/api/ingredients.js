const express = require("express");
const app = express.Router();
const { Ingredient } = require("../db");

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await Ingredient.findAll());
  } catch (ex) {
    next(ex);
  }
});

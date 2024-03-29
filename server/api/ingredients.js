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

app.post("/", async (req, res, next) => {
  try {
    const ingredient = await Ingredient.create(req.body);
    res.status(201).send(ingredient);
  } catch (ex) {
    next(ex);
  }
});

app.delete("/:id", async (req, res, next) => {
  try {
    const ingredient = await Ingredient.findByPk(req.params.id);
    await ingredient.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

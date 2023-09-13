const express = require("express");
const app = express.Router();
const { Favorite } = require("../db");

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await Favorite.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const favorite = await Favorite.create(req.body);
    res.status(201).send(favorite);
  } catch (ex) {
    next(ex);
  }
});

app.delete("/:id", async (req, res, next) => {
  try {
    const favorite = await Favorite.findByPk(req.params.id);
    await favorite.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.put("/:id", async (req, res, next) => {
  try {
    const favorite = await Favorite.findByPk(req.params.id);
    res.send(await favorite.update(req.body));
  } catch (ex) {
    next(ex);
  }
});

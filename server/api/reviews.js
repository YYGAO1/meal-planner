const express = require("express");
const app = express.Router();
const { Review } = require("../db");

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await Review.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).send(review);
  } catch (ex) {
    next(ex);
  }
});

app.delete("/:id", async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    await review.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.put("/:id", async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    res.send(await review.update(req.body));
  } catch (ex) {
    next(ex);
  }
});

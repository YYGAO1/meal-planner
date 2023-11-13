const express = require("express");
const app = express.Router();
const { Review } = require("../db");
const { Op } = require("sequelize");
const conn = require("../db/conn");
const { isUUID } = require("validator");

module.exports = app;

app.get("/:recipeId", async (req, res, next) => {
  try {
    if (!isUUID(req.params.recipeId)) {
      console.log("req.params.recipeId is not a valid UUID string");
    } else {
      console.log("moving forward, valid UUID string");
    }

    const reviews = await Review.findAll({
      where: {
        recipeId: req.params.recipeId,
      },
    });
    console.log("After Sequelize Query - Reviews:", reviews);
    res.send(reviews);
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

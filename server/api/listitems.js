const express = require("express");
const app = express.Router();
const { isLoggedIn } = require("./middleware");
const { ListItem } = require("../db");

app.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(
      await ListItem.findAll({
        where: {
          userId: req.user.id,
        },
      })
    );
  } catch (ex) {
    next(ex);
  }
});

app.get("/ingredients", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    res.send(await user.getIngredients());
  } catch (ex) {
    next(ex);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const listItem = await ListItem.create(req.body);
    res.status(201).send(listItem);
  } catch (ex) {
    next(ex);
  }
});

app.delete("/:id", async (req, res, next) => {
  try {
    const item = await ListItem.findByPk(req.params.id);
    await item.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;

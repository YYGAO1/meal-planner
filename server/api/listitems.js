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

module.exports = app;

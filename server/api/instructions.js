const express = require("express");
const app = express.Router();
const { Instruction } = require("../db");

module.exports = app;

app.delete("/:id", async (req, res, next) => {
  try {
    const instruction = await Instruction.findByPk(req.params.id);
    await instruction.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

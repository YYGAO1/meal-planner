const express = require("express");
const app = express();
const path = require("path");
app.use(express.json({ limit: "50mb" }));

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../static/index.html"))
);

app.use("/api/auth", require("./api/auth"));
app.use("/api/recipes", require("./api/recipes"));
app.use("/api/ingredients", require("./api/ingredients"));
app.use("/api/instructions", require("./api/instructions"));
app.use("/api/reviews", require("./api/reviews"));
app.use("/api/users", require("./api/users"));
app.use("/api/favorites", require("./api/favorites"));
app.use("/api/mealplanner", require("./api/mealplanner"));
app.use("/api/listitems", require("./api/listitems"));

module.exports = app;

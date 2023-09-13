const { UUID, UUIDV4, DECIMAL, STRING } = require("sequelize");
const conn = require("./conn");

const Ingredient = conn.define("ingredient", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  amount: {
    type: DECIMAL,
    defaultValue: 0,
  },
  measurementUnit: {
    type: STRING,
    defaultValue: "",
  },
});

module.exports = Ingredient;

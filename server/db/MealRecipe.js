const { UUID, UUIDV4 } = require("sequelize");
const conn = require("./conn");

const MealRecipe = conn.define("mealrecipe", {
  // couldn't find the model/relation with camel case 'mealRecipe'
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
});

module.exports = MealRecipe;

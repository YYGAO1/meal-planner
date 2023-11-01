const { UUID, UUIDV4, STRING, TEXT, INTEGER } = require("sequelize");
const conn = require("./conn");
const axios = require("axios");
require("dotenv").config();
const API_KEY = process.env.API_KEY;
//const env = require("../../env");
//const API_KEY = env.API_KEY;
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const Recipe = conn.define("recipe", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  spoonacular_id: {
    type: INTEGER,
    unique: true,
  },
  description: {
    type: TEXT,
  },
  image: {
    type: TEXT,
    get: function () {
      const prefix_PNG = "data:image/png;base64,";
      const prefix_JPEG = "data:image/jpeg;base64,";
      const prefix_JPG = "data:image/jpg;base64,";
      let data = this.getDataValue("image");
      if (!data) {
        return data;
      }
      if (data.startsWith(prefix_JPEG || prefix_PNG || prefix_JPG)) {
        return data;
      }
      return `${prefix_JPEG || prefix_PNG || prefix_JPG}${data}`;
    },
  },
  imageURL: {
    type: TEXT,
    defaultValue:
      "https://static.vecteezy.com/system/resources/previews/007/126/723/non_2x/chef-hat-line-art-icon-free-vector.jpg",
  },
});

Recipe.seedSpoonacularRecipe = async function (spoonacularId) {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/${spoonacularId}/information`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY,
      },
    }
  );
  if (response.data.error) {
    const error = Error(response.data.error);
    error.status = 401;
    throw error;
  }
  let recipe = await Recipe.findOne({
    where: {
      spoonacular_id: spoonacularId,
    },
  });
  if (!recipe) {
    recipe = await Recipe.create({
      spoonacular_id: spoonacularId,
      title: response.data.title,
      imageURL: response.data.image,
      description: response.data.summary,
    });
    response.data.extendedIngredients.map(async (ingredient) => {
      return await conn.models.ingredient.create({
        name: ingredient.name,
        amount: ingredient.measures.us.amount,
        recipeId: recipe.id,
        measurementUnit: ingredient.measures.us.unitShort,
      });
    });
    const cleanInstructions = DOMPurify.sanitize(response.data.instructions, {
      FORBID_TAGS: ["li", "ol", "br"],
    });
    const instructionsArray = cleanInstructions.split(".");
    instructionsArray.map(async (instruction, idx) => {
      if (instruction.length > 0) {
        return await conn.models.instruction.create({
          listOrder: idx + 1,
          specification: instruction,
          recipeId: recipe.id,
        });
      }
    });
  } else if (recipe) {
    return recipe;
  }
  return recipe;
};

module.exports = Recipe;

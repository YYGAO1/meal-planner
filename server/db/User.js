const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Meal = require("./Meal");
const JWT = process.env.JWT;

const MealUser = conn.define("user", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isAdmin: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

MealUser.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

MealUser.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw "user not found";
  } catch (ex) {
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

MealUser.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

MealUser.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error("bad credentials");
  error.status = 401;
  throw error;
};

MealUser.prototype.getDay = async function (date) {
  let day = await conn.models.day.findOne({
    where: {
      userId: this.id,
      date: date,
    },
  });
  if (!day) {
    day = await conn.models.day.create({
      date: date,
      userId: this.id,
    });
  }
  day = await conn.models.day.findByPk(day.id, {
    include: [
      {
        model: conn.models.meal,
        include: [
          {
            model: conn.models.mealrecipe,
            include: [
              {
                model: conn.models.recipe,
                include: [conn.models.ingredient, conn.models.instruction],
              },
            ],
          },
        ],
      },
    ],
  });
  return day;
};

MealUser.prototype.getIngredients = async function () {
  let listItems = await conn.models.listItem.findAll({
    where: {
      userId: this.id,
    },
  });

  const ingredientIds = [];
  const ingredients = [];

  listItems.forEach((listItem) => {
    ingredientIds.push(listItem.ingredientId);
  });

  await Promise.all(
    ingredientIds.map(async (id) => {
      const ingredient = await conn.models.ingredient.findOne({
        where: {
          id,
        },
      });
      ingredients.push(ingredient);
    })
  );

  //console.log("ingredients from backend", ingredients);
  return ingredients;
};

// NEED TO TEST -AG
MealUser.prototype.addToDay = async function ({ recipeId, type, date }) {
  let day = await this.getDay(date);
  const meals = day.meals.map((meal) => {
    return meal.mealrecipes;
  });
  const recipe = meals.find((mealrecipe) => {
    const _recipe = mealrecipe[0].recipe;
    return _recipe.id === recipeId;
  });
  if (!recipe) {
    const mealSeed = await conn.models.meal.create({
      dayId: day.id,
      type,
    });
    const mealrecipe = await conn.models.mealrecipe.create({
      recipeId,
      mealId: mealSeed.id,
    });
  }
  return this.getDay(date);
};


module.exports = MealUser;

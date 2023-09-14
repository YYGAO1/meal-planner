const { MealUser } = require("../db");

const isLoggedIn = async (req, res, next) => {
  try {
    const user = await MealUser.findByToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  isLoggedIn,
};

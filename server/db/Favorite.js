const { UUID, UUIDV4 } = require("sequelize");
const conn = require("./conn");

const Favorite = conn.define("favorite", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
});

module.exports = Favorite;

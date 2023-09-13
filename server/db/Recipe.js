const { UUID, UUIDV4, STRING, TEXT, INTEGER } = require("sequelize");
const conn = require("./conn");

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

module.exports = Recipe;

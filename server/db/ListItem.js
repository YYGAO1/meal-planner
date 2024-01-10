const { UUID, UUIDV4, BOOLEAN, STRING } = require("sequelize");
const conn = require("./conn");

const ListItem = conn.define("listItem", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  isChecked: {
    type: BOOLEAN,
  },
  quantity: {
    type: STRING,
  },
});

module.exports = ListItem;

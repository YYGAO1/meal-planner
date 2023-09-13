const { UUID, UUIDV4, BOOLEAN } = require("sequelize");
const conn = require("./conn");

const ListItem =
  ("listItem",
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    isChecked: {
      type: BOOLEAN,
    },
    isCleared: {
      type: BOOLEAN,
    },
  });

module.exports = ListItem;

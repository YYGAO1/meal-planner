const conn = require("./conn");
const { UUID, UUIDV4, INTEGER, TEXT } = require("sequelize");
const Instruction = conn.define("instruction", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  listOrder: {
    type: INTEGER,
    allowNull: false,
  },
  specification: {
    type: TEXT,
    allowNull: false,
  },
});
module.exports = Instruction;

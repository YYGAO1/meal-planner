const { UUID, UUIDV4, DATEONLY } = require("sequelize");
const conn = require("./conn");

const Day = conn.define("day", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  date: {
    type: DATEONLY,
    allowNull: false,
  },
});

module.exports = Day;

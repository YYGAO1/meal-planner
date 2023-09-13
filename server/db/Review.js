const { UUID, UUIDV4, STRING, TEXT, INTEGER } = require("sequelize");
const conn = require("./conn");

const Review =
  ("review",
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    subject: {
      type: STRING,
    },
    body: {
      type: TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    rating: {
      type: INTEGER,
      validate: {
        isInt: true,
        min: 1,
        max: 5,
      },
    },
    status: {
      type: ENUM("approved", "pending", "denied"),
      defaultValue: "approved", // change back to 'pending'
    },
  });

module.exports = Review;

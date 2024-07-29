// validation/bookValidationRules.js
const { body } = require("express-validator");

const bookValidationRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("genre").notEmpty().withMessage("Genre is required"),
  body("language").notEmpty().withMessage("Language is required"),
  body("ratings").notEmpty().withMessage("Ratings are required"),
  body("coverPage").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Cover page is required");
    }
    return true;
  }),
  body("year")
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage("Year must be a valid integer and within a reasonable range"),
];
module.exports = bookValidationRules;

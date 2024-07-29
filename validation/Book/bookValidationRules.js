// validation/bookValidationRules.js
const { body } = require("express-validator");

const bookValidationRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("genre").notEmpty().withMessage("Genre is required"),
  body("language").notEmpty().withMessage("Language is required"),
  body("ratings").notEmpty().withMessage("Ratings are required"),
  body("coverPage").isURL().withMessage("Cover page must be a valid URL"),
  body("year")
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage("Year must be a valid integer and within a reasonable range"),
];
module.exports = bookValidationRules;

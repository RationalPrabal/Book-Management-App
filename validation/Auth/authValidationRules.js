const { body } = require("express-validator");

const signupValidationRules = [
  body("email").isEmail().withMessage("Email is not valid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character"),
  body("name").notEmpty().withMessage("Name is required"),
];

const loginValidationRules = [
  body("email").isEmail().withMessage("Email is not valid"),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = {
  signupValidationRules,
  loginValidationRules,
};

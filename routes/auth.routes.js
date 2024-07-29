require("dotenv").config();
const express = require("express");
const { userModel } = require("../models/user.model");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const {
  signupValidationRules,
  loginValidationRules,
} = require("../validation/Auth/authValidationRules");
const validate = require("../middlewares/validator");

/**
 *  @swagger
 *  tags:
 *    name: Auth
 *    description: All the API routes related to authentication.
 */

//! Swagger doc for register route
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "P@ssw0rd!"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               role:
 *                 type: string
 *                 example: "Admin"
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Registration successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpZCI6IjY0MTY2Nzg4OWQxYTQ5M2FlOTlmMzQwNiIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MjM1MTE0MCwiZXhwIjoxNjkyMzUxNzQwfQ.7hQvS-y8KxvlP5wDA1Wy8g2M3q-6GfsoJLTugQwZB6g"
 *       400:
 *         description: User already registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User already registered"
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong"
 */

//! register route
authRouter.post(
  "/register",
  validate(signupValidationRules),
  async (req, res) => {
    const { email, password, name, role } = req.body;
    try {
      let user = await userModel.findOne({ email });
      if (user) {
        return res.status(400).send({ message: "User already registered" });
      }

      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).send({ message: "Something went wrong" });
        } else if (hash) {
          let newUser = new userModel({
            email,
            password: hash,
            name,
            role,
          });
          await newUser.save();

          let token = jwt.sign(
            { email: newUser.email, id: newUser._id, role: newUser.role },
            JWT_SECRET,
            { expiresIn: "7d" }
          );

          return res.status(201).send({
            message: "Registration successful",
            token,
          });
        }
      });
    } catch (err) {
      return res.status(500).send({ message: "Something went wrong" });
    }
  }
);

//! swagger doc for login route
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "P@ssw0rd!"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpZCI6IjY0MTY2Nzg4OWQxYTQ5M2FlOTlmMzQwNiIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MjM1MTE0MCwiZXhwIjoxNjkyMzUxNzQwfQ.7hQvS-y8KxvlP5wDA1Wy8g2M3q-6GfsoJLTugQwZB6g"
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong"
 */

//! login route
authRouter.post("/login", validate(loginValidationRules), async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    let token = jwt.sign(
      { email: user.email, id: user._id, name: user.name, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).send({
      message: "Login successful",
      token,
    });
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
});

module.exports = { authRouter };

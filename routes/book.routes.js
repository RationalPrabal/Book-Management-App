const express = require("express");
const { bookModel } = require("../models/book.model");
const { checkUserRole } = require("../middlewares/checkUserRole");
const validate = require("../middlewares/validator");
const bookValidationRules = require("../validation/Book/bookValidationRules");
const bookRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: All the API routes related to the book.
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Books retrieved successfully"
 *                 books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         description: Title of the book
 *                       genre:
 *                         type: string
 *                         description: Genre of the book
 *                       language:
 *                         type: string
 *                         description: Language in which the book is written
 *                       ratings:
 *                         type: string
 *                         description: Ratings of the book
 *                       coverPage:
 *                         type: string
 *                         description: URL of the cover page image
 *                       year:
 *                         type: integer
 *                         description: Publication year of the book
 *                       creator:
 *                         type: string
 *                         description: MongoDB ObjectId of the creator (author)
 *                         example: "605c72ef2f8fb814c74e5c4f"
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

bookRouter.get(
  "/",
  checkUserRole(["Admin", "Author", "Reader"]),
  async (req, res) => {
    try {
      let books = await bookModel.find();
      return res.status(200).send({
        message: "books retrieved successfully",
        books,
      });
    } catch (err) {
      return res.status(500).send({ message: "Something went wrong" });
    }
  }
);

/**
 *  @swagger
 *  /books/add:
 *    post:
 *      summary: Add a new book
 *      tags: [Books]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  description: Title of the book
 *                genre:
 *                  type: string
 *                  description: Genre of the book
 *                language:
 *                  type: string
 *                  description: Language in which the book is written
 *                ratings:
 *                  type: string
 *                  description: Ratings of the book
 *                coverPage:
 *                  type: string
 *                  description: URL of the cover page image
 *                year:
 *                  type: integer
 *                  description: Publication year of the book
 *      responses:
 *        201:
 *          description: Book created successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Book created successfully"
 *                  book:
 *                    type: object
 *                    properties:
 *                      title:
 *                        type: string
 *                        description: Title of the book
 *                      genre:
 *                        type: string
 *                        description: Genre of the book
 *                      language:
 *                        type: string
 *                        description: Language in which the book is written
 *                      ratings:
 *                        type: string
 *                        description: Ratings of the book
 *                      coverPage:
 *                        type: string
 *                        description: URL of the cover page image
 *                      year:
 *                        type: integer
 *                        description: Publication year of the book
 *                      creator:
 *                        type: string
 *                        description: MongoDB ObjectId of the creator (author)
 *                        example: "605c72ef2f8fb814c74e5c4f"
 *        500:
 *          description: Something went wrong
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Something went wrong"
 */

bookRouter.post(
  "/add",
  checkUserRole(["Admin", "Author"]),
  validate(bookValidationRules),
  async (req, res) => {
    const { title, year, genre, language, ratings, coverPage } = req.body;

    try {
      let newbook = new bookModel({
        title,
        creator: req.user.id,
        coverPage,
        language,
        ratings,
        genre,
        year,
      });
      await newbook.save();
      return res.status(201).send({
        message: "book created successfully",
        book: newbook,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Something went wrong" });
    }
  }
);

/**
 * @swagger
 * /books/edit/{bookId}:
 *   patch:
 *     summary: Edit a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title of the book
 *               genre:
 *                 type: string
 *                 description: Updated genre of the book
 *               language:
 *                 type: string
 *                 description: Updated language of the book
 *               ratings:
 *                 type: string
 *                 description: Updated ratings of the book
 *               coverPage:
 *                 type: string
 *                 description: Updated URL of the cover page image
 *               year:
 *                 type: integer
 *                 description: Updated publication year of the book
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book updated successfully"
 *                 book:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     genre:
 *                       type: string
 *                     language:
 *                       type: string
 *                     ratings:
 *                       type: string
 *                     coverPage:
 *                       type: string
 *                     year:
 *                       type: integer
 *                     creator:
 *                       type: string
 *                       example: "605c72ef2f8fb814c74e5c4f"
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found"
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

bookRouter.patch(
  "/edit/:bookId",
  checkUserRole(["Admin", "Author"]),
  async (req, res) => {
    const { bookId } = req.params;

    try {
      let book = await bookModel.findOne({ _id: bookId });
      if (!book) {
        return res.status(404).send({ message: "book not found" });
      }

      let updatedbook = await bookModel.findByIdAndUpdate(bookId, req.body, {
        new: true,
      });
      return res.status(200).send({
        message: "book updated successfully",
        book: updatedbook,
      });
    } catch (err) {
      return res.status(500).send({ message: "Something went wrong" });
    }
  }
);

/**
 * @swagger
 * /books/delete/{bookId}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book deleted successfully"
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found"
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

bookRouter.delete(
  "/delete/:bookId",
  checkUserRole(["Admin"]),
  async (req, res) => {
    const { bookId } = req.params;

    try {
      await bookModel.findByIdAndDelete({
        _id: bookId,
      });
      return res.status(200).send({ message: "book deleted successfully" });
    } catch (err) {
      return res.status(500).send({ message: "Something went wrong" });
    }
  }
);

module.exports = {
  bookRouter,
};

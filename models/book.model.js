const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    genre: { type: String, required: true },
    language: { type: String, required: true },
    ratings: { type: String, required: true },
    coverPage: { type: String, required: true },
    year: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const bookModel = mongoose.model("Book", bookSchema);

module.exports = {
  bookModel,
};

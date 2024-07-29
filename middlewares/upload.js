//! middleware to upload files on cloud

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../configs/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "book_covers",
    format: async (req, file) => "jpg",
    public_id: (req, file) => file.filename,
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

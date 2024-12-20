const express = require("express");
const multer = require("multer");
const { createPostController } = require("../controllers/post.controller");

const router = express.Router();

// Configure Multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the folder to store images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Generate a unique filename
  },
});

// File filter for image types
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only image files are allowed!"), false); // Reject non-image files
  }
};

// Initialize Multer with storage and file filter
const upload = multer({ storage, fileFilter });

// Define the route with Multer middleware
router.post("/create", upload.array("images", 5), createPostController);

module.exports = router;

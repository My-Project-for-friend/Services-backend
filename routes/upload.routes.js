const fs = require("fs");
const path = require("path");
const multer = require("multer");
const express = require("express");
const { uploadController } = require("../controllers/upload.controller.js");


const router = express.Router();

// Use Multer with memory storage to handle files in memory
const storage = multer.memoryStorage(); // Store files in memory as Buffer
const upload = multer({ storage });

// File upload route (handle files and convert to Base64)
router.post("/uploads", upload.array("images", 5), uploadController);



module.exports = router;

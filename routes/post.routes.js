
const express = require("express");
const { createPostController, getPostController } = require("../controllers/post.controller");

const router = express.Router();


// Create post route
router.post("/create", createPostController);


router.get("/", getPostController);

module.exports = router;

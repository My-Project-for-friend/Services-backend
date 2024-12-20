const express=require("express")
const sanitizeMiddleware=require("../middleware/sanitizationMiddleware.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const router=express.Router();



router.use(sanitizeMiddleware);

router.use("/auth",require('./authRoutes.js'));

router.use("/post",authMiddleware,require("./post.routes.js"));






module.exports=router;
const express=require("express")
const sanitizeMiddleware=require("../middleware/sanitizationMiddleware.js");
const router=express.Router();



router.use(sanitizeMiddleware);

router.use("/auth",require('./authRoutes.js'));






module.exports=router;
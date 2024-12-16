const express=require("express")
const sanitizeMiddleware=require("../middleware/sanitizationMiddleware.js");
const authRoutes=require('./auth.routes.js')
const router=express.Router();



router.use(sanitizeMiddleware);

router.use("/auth",authRoutes);






module.exports=router;
const express=require("express");
const { loginUserController, registerUserController } = require("../controllers/auth.controller");
const router=express.Router();

router.post("/login",loginUserController)


router.post("/register",registerUserController)

module.exports=router
const userModel = require("../models/user.model");
const { missingFieldError, conflictError, internalServerError, notFoundError, unauthorizedError } = require("../utils/error.utils");
const { generateToken } = require("../utils/jwt.utils");
const executedSuccess = require("../utils/success.utils");
const validateUser = require("../validations/user.validation");
const mongoose=require("mongoose")

const registerUserController=async(req,res)=>{
    const session = await mongoose.startSession(); // Start a new session
    session.startTransaction(); // Start a transaction
    try{
        console.log(req.body)
        const {error,value}=validateUser(req.body);
        if(error){
            return missingFieldError(res,error);
        }
        const {email}=value;
        const user=await userModel.findOne({email});
        if(user){
            return conflictError(res,"Account already present","Email Id")
        };
        const newUser=await userModel.create(value);
        const token=generateToken({id:user?._id,email:email})
        session.commitTransaction();
        session.endSession();
        return executedSuccess(res,{newUser,token},"Account created successfully");
    }catch(error){
        session.abortTransaction();
        session.endSession();
        return internalServerError(res,error)
    }
};

const loginUserController=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return missingFieldError(res,"missing fields")
        };
        const user=await userModel.findOne({email});
        if(!user){
            return notFoundError(res,"User",`${email}`)
        };
        const isMatch=await user.comparePassword(password);
        if(!isMatch){
            return unauthorizedError(res,"Invalid credentials")
        }
        const token = generateToken({ id: user._id, email: user.email });

        // Send success response with token
        return executedSuccess(res, { user, token }, "Login successful");
        
    }catch(error){
        return internalServerError(res,error);
    }
}

module.exports={loginUserController,registerUserController};
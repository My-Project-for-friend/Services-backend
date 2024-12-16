const jwt=require("jsonwebtoken")

const generateToken=(payload)=>{
    return jwt.sign(payload,process.env.JWT_KEY,{expiresIn:"1d"})
}

const verifyToken=(token)=>{
    return jwt.verify(token,process.env.JWT_KEY)
}

module.exports={generateToken,verifyToken}
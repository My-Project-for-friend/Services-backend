const userModel = require("../models/user.model")


const createNewUser=async(data)=>{
    const user=await userModel.create(data);
    return {success:true,user};
};



module.exports={createNewUser}
const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        minLength:10,
        maxLength:15
    },
    password:{
        type:String
    }

});

userSchema.pre("save",async function(next){
	
	// isModified => it’s available automatically when you create a schema in Mongoose. 
	if(!this.isModified("password")) {return next();}

	try{
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password,salt);

		return next();
	}catch(err){
		return next(err);
	}
});

userSchema.methods.comparePassword = async function(enteredPassword){
	return await bcrypt.compare(enteredPassword,this.password);
};
const userModel=mongoose.model("users",userSchema);

module.exports=userModel;
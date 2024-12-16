const mongoose=require("mongoose")
require("colors")
const connectDB=async()=>{
    try{
        if (!process.env.MONGO_URI) {
            throw new Error("MongoDB URI not found in environment variables.");
        }
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log(`MongoDB connection established`.bgGreen.black)

    }catch(error){
        console.log(`Error connecting to MongoDb ${error.message}`.bgRed.white)
        process.exit(1);
    }
}

module.exports= connectDB;
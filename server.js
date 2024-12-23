const express=require('express')
const morgan=require("morgan")
require("colors")
const dotenv=require("dotenv")
const connectDb=require("./db/config.js");
const cors=require("cors");
const helmet=require("helmet");
const routes=require("./routes/routes.js")
dotenv.config();

connectDb();


const app=express();

app.use(express.json({ limit: "10mb" })); // Increase limit for JSON payloads
app.use(express.urlencoded({ limit: "10mb", extended: true })); // For form-encoded data

// Middleware to parse URL-encoded data (if needed)
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api",routes);



const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Listening to port no ${port}`.bgMagenta.white)
})
const express=require('express');
const connectionDB=require("./src/Config/database")
const User=require("./src/models/user");
const {ValidationSignupData}=require('./src/utils/validation');
const bcrypt = require("bcryptjs");
const app=express();
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const { auth } = require('./src/middlewares/auth');
const authRouter=require('./src/routes/auth');
const requestRouter=require('./src/routes/request');
const profileRouter=require('./src/routes/profile');
const userRouter=require('./src/routes/user');
require('dotenv').config();
const cors=require('cors');
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
          "https://devconnectui.onrender.com", // Your React app's URL
          "http://localhost:5173",
          // "http://localhost:5173"
          ],
  credentials: true, // Allow cookies or Authorization headers
}));

app.use("/",authRouter);
app.use("/",requestRouter);
app.use("/",profileRouter);
app.use("/",userRouter);

 connectionDB().then(()=>{
    console.log("DB Connection created successfully");
    app.listen(process.env.PORT,()=>{
    console.log("server Created successfully at  port 4000");
});
}).catch(err=>{
    console.error("there is some error in connecting to DB:",err);
});




const express=require('express');
const connectionDB=require("./Config/database");
const User=require("./models/user");
const {ValidationSignupData}=require('./utils/validation');
const bcrypt=require('bcrypt');
const app=express();
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const { auth } = require('./middlewares/auth');
const authRouter=require('./routes/auth');
const requestRouter=require('./routes/request');
const profileRouter=require('./routes/profile');
const userRouter=require('./routes/user');
app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",requestRouter);
app.use("/",profileRouter);
app.use("/",userRouter);
 connectionDB().then(()=>{
    console.log("DB Connection created successfully");
    app.listen(4000,()=>{
    console.log("server Created successfully at  port 4000");
});
}).catch(err=>{
    console.error("there is some error in connecting to DB:",err);
});




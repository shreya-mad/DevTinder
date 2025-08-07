const express=require('express');
const connectionDB=require("./Config/database");
const User=require("./models/user");
const {ValidationSignupData}=require('./utils/validation');
const bcrypt=require('bcrypt');
const app=express();
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const { auth } = require('./middlewares/auth');
app.use(express.json());
app.use(cookieParser());
app.post("/signup",async(req,res)=>{
    const {firstName,lastName,email,password,age,gender}=req.body;
    
    try{
        ValidationSignupData(req);

        const passwordHash=await bcrypt.hash(password,10);
        console.log(passwordHash);
       console.log(password);
        const user=new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
            age,
            gender
        });
        
        await user.save();
        res.send("user added succesfully");
    }catch(err){
        res.status(400).send("there is some error:"+err);
    }
   
});
app.post("/login",async(req,res)=>{   
try{
const{email,password}=req.body;
const user=await User.findOne({email:email});
if(!user)
    throw new Error("invalid email id!!!!");
const isPasswordValid=await bcrypt.compare(password,user.password);
console.log("shreya:"+isPasswordValid);
if(isPasswordValid)
{
    const token=await jwt.sign({_id:user._id},"Dev@Tinder$790",{expiresIn:'1h'});
    console.log(token);
    res.cookie("token",token);
     res.send("login successfull");
}
else 
    throw new Error("password is not Correct");
}catch(err){
   res.status(400).send("error:"+err.message);
}
});
app.get("/profile",auth,async(req,res)=>{
    try{       
    const user= req.user;
     console.log(user);
    res.send(user);
    }catch(err){
        res.status(400).send("there is some error:"+err);
    }
})
app.post('/sendConnectionRequest',auth,async(req,res)=>{
    const user=req.user;

    res.send("connection sent successfully!! and the user name is:"+user.firstName+" "+user.lastName);
});
 connectionDB().then(()=>{
    console.log("DB Connection created successfully");
    app.listen(4000,()=>{
    console.log("server Created successfully at  port 4000");
});
}).catch(err=>{
    console.error("there is some error in connecting to DB:",err);
});




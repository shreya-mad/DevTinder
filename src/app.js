const express=require('express');
const connectionDB=require("./Config/database");
const User=require("./models/user");
const {ValidationSignupData}=require('./utils/validation');
const bcrypt=require('bcrypt');
const app=express();
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
app.use(express.json());
app.use(cookieParser());


app.post("/signup",async(req,res)=>{
    const {firstName,lastName,email,password,age,gender}=req.body;
    console.log("Shreya");
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
    const token=await jwt.sign({_id:user._id},"Dev@Tinder$790");
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

app.get("/profile",async(req,res)=>{
    try{
        const cookie=req.cookies;
    console.log(cookie);
    const {token}=cookie;
    if(!token)
        throw new Error("user not found....please log in again");
    const decodedMsg=await jwt.verify(token,"Dev@Tinder$790");
    const {_id}=decodedMsg;
    console.log("logged in user:"+_id);
    const user=await User.findById(_id);
    if(!user)
        throw new Error("user is not exit...");
    res.send(user);
    }catch(err){
        res.status(400).send("there is some error:"+err);
    }
})

app.get("/user",async(req,res)=>{
    try{
        const user=await User.find({email:req.body.email});
        if(user.length===0){
            res.status(404).send("user not found");
        }
        res.send(user);
    }catch(err){
        res.status(401).send("something went wrong");
    }
});

// getting all the data
app.get("/feed",async(req,res)=>{
    try{
        const user=await User.find({});
        if(user.length===0){
            res.status(404).send("user not found");
        }
        res.send(user);
    }catch(err){
        res.status(401).send("something went wrong");
    }
});

//api for delete
app.delete("/user",async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.body._id);
        res.send("user deleted successfully");
    }catch(err){
        res.status(401).send("something went wrong");
    }
});

//api for update
app.patch("/user",async(req,res)=>{
    
    try{
        const data=req.body;
     // written everthing except what we dont want to update like email id
    const allowed_update=["firstName","lastName","password","age","gender"];
    const isUpdateAllowed=Object.keys(data).every((k)=>
        allowed_update.includes(k)
    )
    if(!isUpdateAllowed){
        res.status(400).send("update not allowed");
    }
        console.log(req.body);
        await User.findByIdAndUpdate({_id:req.body._id},data,{
            runValidators:true
        });
        res.send("user updated successfully");
    }catch(err){
        res.status(401).send("something went wrong");
    }
});

 connectionDB().then(()=>{
    console.log("DB Connection created successfully");
    app.listen(4000,()=>{
    console.log("server Created successfully at  port 4000");
});
}).catch(err=>{
    console.error("there is some error in connecting to DB:",err);
});




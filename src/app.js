const express=require('express');
const connectionDB=require("./Config/database");
const User=require("./modeles/user");
const app=express();

app.post("/signup",async(req,res)=>{
    const userObj={
        firstName:"pinki",
        lastName:"Madeshiya",
        email:"smadeshiya12345@gmail.com",
        password:"shreya@6767",
        age:25,
        gender:"female",
    };
    // creating a new instance of user model
    const user=new User(userObj);
    try{
        await user.save();
    res.send("user added succesfully");
    }catch(err){
        res.status(400).send("there is some error");
    }
})

 connectionDB().then(()=>{
    console.log("DB Connection created successfully");
    app.listen(4000,()=>{
    console.log("server Created successfully at  port 4000");
});
}).catch(err=>{
    console.error("there is some error in connecting to DB:",err);
});




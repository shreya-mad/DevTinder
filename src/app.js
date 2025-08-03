const express=require('express');
const connectionDB=require("./Config/database");
const User=require("./models/user");
const app=express();
app.use(express.json());

app.post("/signup",async(req,res)=>{
    // const userObj={
    //     firstName:"pinki ji",
    //     lastName:"Madeshiya",
    //     email:"smadeshiya12345@gmail.com",
    //     password:"shreya@6767",
    //     age:25,
    //     gender:"female",
    // };
    // creating a new instance of user model
    console.log(req.body);
    const user=new User(req.body);
    try{
        await user.save();
    res.send("user added succesfully");
    }catch(err){
        res.status(400).send("there is some error:"+err);
    }
   
});

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




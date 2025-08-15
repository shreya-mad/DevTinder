const express=require('express');
const { auth } = require('../middlewares/auth');
const profileRouter=express.Router();
const {ValidationSignupData,ValidationProfileData}=require('../utils/validation');
profileRouter.get("/profile/view",auth,async(req,res)=>{
    try{       
    const user= req.user;
     console.log(user);
    res.send(user);
    }catch(err){
        res.status(400).send("there is some error:"+err);
    }
});
profileRouter.patch("/profile/edit",auth,async(req,res)=>{
   
    try{  
         console.log("shreya");     
    if(!ValidationProfileData(req)){
        throw new error("invalid  edit request");
      
    }
    const loggegInUser=req.user;
      console.log(loggegInUser);  
      Object.keys(req.body).forEach(keys=>{
        loggegInUser[keys]=req.body[keys];
      });
      await loggegInUser.save();
       console.log(loggegInUser); 
       res.send("profile updated successfully");
    }catch(err){
        res.status(400).send("there is some error:"+err);
    }
})
module.exports=profileRouter;
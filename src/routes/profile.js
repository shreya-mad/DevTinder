const express=require('express');
const { auth } = require('../middlewares/auth');
const profileRouter=express.Router();
const {ValidationSignupData,ValidationProfileData}=require('../utils/validation');

profileRouter.get("/profile/view",auth,async(req,res)=>{
    try{       
    const user= req.user;
    res.send(user);
    }catch(err){
        res.status(400).send("there is some error:"+err);
    }
});
profileRouter.patch("/profile/edit",auth,async(req,res)=>{
   
    try{        
    // if(!ValidationProfileData(req)){
    //     throw new error("invalid  edit request");   
    // } 
    const loggegInUser=req.user;
      Object.keys(req.body).forEach(keys=>{
        loggegInUser[keys]=req.body[keys];
      });
      await loggegInUser.save();
       res.json({message:"profile updated successfully",data:loggegInUser});
    }catch(err){
        res.status(400).send("there is some error:"+err);
    }
});

module.exports=profileRouter;
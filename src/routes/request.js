const express=require('express');
const { auth } = require('../middlewares/auth');
const requestRouter=express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User=require("../models/user");

// below one is the api for both interested or ignored
requestRouter.post('/Request/send/:status/:toUserId',auth,async(req,res)=>{
    try{        
      const fromUserID=req.user._id; 
      const toUserID=req.params.toUserId;
      const status=req.params.status;
     const allowedStatus=["interested","ignored"];
     if(!allowedStatus.includes(status))
       return res.status(400).send("invalid status type");
    // handling if user sends request to himself
    if(fromUserID==toUserID)
        return res.status(400).json({message:"can not send connection request to youself"});
    // code for handling if toUserId is not present in our db
    const isToUserPresent=await User.findOne({_id:toUserID});
    if(!isToUserPresent)
        return res.status(400).json({message:"user  not found"});
    const allreadyRequestExist=await ConnectionRequest.findOne({
        $or:[
          { fromUserID,toUserID},
          { fromUserID:toUserID,toUserID:fromUserID}
        ]
       
    });
    if(allreadyRequestExist)
        return res.send("there is allready conncetion request pending");

    
      const user=new ConnectionRequest({
        fromUserID,
        toUserID,
        status
      });
       console.log("shreya");
      const data=await user.save();
      res.json({
        message:req.user.firstName+" is "+status+" in "+isToUserPresent.firstName,
        data
      });
    }catch(err){
        res.status(404).send("there is something wrong in sending connection request");
    }
});
// below one is the api for both acdepted or rejected
requestRouter.post("/request/review/:status/:requestID",auth,async(req,res)=>{
  try{

    const logggedInUser=req.user;
        console.log("shreya"+logggedInUser._id);
    const {status,requestID}=req.params;
    const allowedStatus=['accepted', 'rejected'];
    if(!allowedStatus.includes(status))
      return res.status(400).json({message:"status not correct"});
    const connectionRequest=await ConnectionRequest.findOne({
      _id:requestID,
      toUserID:logggedInUser._id,
      status:'interested'
    });
    if(!connectionRequest)
      return res.status(404).json({message:"connection reuqest not found"});
    connectionRequest.status=status;
    const successData=await connectionRequest.save();
    return res.json({message:"connection request "+status,successData});
  }catch(err){

  }
})
module.exports=requestRouter;
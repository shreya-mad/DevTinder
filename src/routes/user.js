const express=require("express");
const ConnectionRequest = require("../models/connectionRequest");
const {auth}=require('../middlewares/auth');
const connectionRequest = require("../models/connectionRequest");
const userRouter=express.Router();

userRouter.get('/user/requests/received',auth,async(req,res)=>{
    try{
      const logggedInUser=req.user;
      const allUser=await ConnectionRequest.find({
        toUserID:logggedInUser._id,
        status:'interested'
      }).populate("fromUserID",["firstName","lastName"]);
      // hamene populate wala isliye kiya kyuki  reuqest recived profile ka complete data chhaiye naki keval sender ki id
      res.json({
        message:"all the reuqest fetched successfully",
        allUser
      });
    }catch(err){
       res.send("there is some error"+err.message);
    }
});
userRouter.get("/user/connections",auth,async(req,res)=>{
  try{
    const logggedInUser=req.user;
    const allConnections=await connectionRequest.find({
      $or:[
        {toUserID:logggedInUser._id},
        {fromUserID:logggedInUser._id}
      ],
      status:'accepted'
    }).populate('fromUserID',["firstName","lastName","email"])
    .populate('toUserID',["firstName","lastName","email"]);
    const data=allConnections.map(row=>{
      if(row.fromUserID._id.toString()===logggedInUser._id.toString())
        return row.toUserID;
      return row.fromUserID;
    })
    res.json({
      message:"all the connections fetched successfully",
      data:data
    })
  }catch(err){
    res.status(400).send("there is something wrong"+err);
  }
});
module.exports=userRouter;


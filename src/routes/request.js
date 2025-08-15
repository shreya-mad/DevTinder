const express=require('express');
const { auth } = require('../middlewares/auth');
const requestRouter=express.Router();

requestRouter.post('/sendConnectionRequest',auth,async(req,res)=>{
    const user=req.user;

    res.send("connection sent successfully!! and the user name is:"+user.firstName+" "+user.lastName);
});
module.exports=requestRouter;
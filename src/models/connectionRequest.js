const mongoose=require('mongoose');
const connectionReuqestSchema=new mongoose.Schema({
    fromUserID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
     toUserID:{
        type:mongoose.Schema.Types.ObjectId,
         required:true
    },
    status:{
        type:String,
        enum:['ignored','interested','accepted', 'rejected' ],
        // below one will be printed when we enter something else than above all 
        message:`{VALUE} is incorrect status type`,
         required:true
    },
},{ timestamps: true });
connectionReuqestSchema.index({fromUserID:1,toUserID:1});
module.exports=mongoose.model("ConnectionRequest",connectionReuqestSchema);

 const mongoose=require('mongoose');
 const connectionDB=async()=>{
    await mongoose.connect("mongodb+srv://shreya19457:KwzezBL2Exo2JyD2@cluster0.nxabzdq.mongodb.net/devTinder");
 }
module.exports=connectionDB;

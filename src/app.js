const express= require('express');
const app = express();
app.use("/test",(req,res)=>{
    res.send('Hello, Worldddd!');
})
app.listen(3000,()=>{
    console.log('Server is running on port 30009999');
});
<!-- 
**SERVER CREATION USING EXPRESS**

const express= require('express');
const app = express();

---------it will give hello worldddd! on url="http://localhost:3000/test" and if we have taken route only "/" then text corrspondig to it will show for every matching router to / so will give same out of / route for route /test,similary for all route as well ,like for /test it will matches and show result accordingly,SO FINAL RESULT IS ORDER OF THE ROUTE MATTERS--------------

app.use("/test",(req,res)=>{
    res.send('Hello, Worldddd!');
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
}); 
-->
<!-- --------when we hit somthing like localhost:3000/test or something else then it is nothing but get api call---------- -->

<!----------- agar ham app.use likhenege below code ki tarah to ye post aur get dono ke liye kam kafrenge to agar hame iska post aur get ka alag alag ,like app.get(),app.post() 

app.use("/test",(req,res)=>{
    res.send('Hello, Worldddd!');
})
------------->
<!-- ====================================================================================== -->



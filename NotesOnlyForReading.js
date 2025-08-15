//1. SERVER CREATION USING EXPRESS
const express= require('express');
const app = express();
app.use("/test",(req,res)=>{
    res.send('Hello, Worldddd!');
});
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
}); 
//  it will give hello worldddd! on url="http://localhost:3000/test" and if we have taken route only "/" then text corrspondig to it will show for every matching router to / so will give same out of / route for route /test,similary for all route as well ,like for /test it will matches and show result accordingly,SO FINAL RESULT IS ORDER OF THE ROUTE MATTERS


// when we hit somthing like localhost:3000/test or something else then it is nothing but get api call
// agar ham app.use likhenege below code ki tarah to ye post,delete,put,patch aur get sare methods  ke liye kam karege to agar hame iska post, get ya koi aur method type ka alag alag chaiye to ham  app.get(),app.post() ,app.delete(),app.put() aisa kuch likhenge

app.use("/test",(req,res)=>{
    res.send('Hello, Worldddd!');
})
const express=require('express');
//const app=express();
app.use('/test',(req,res)=>{
    res.end("hii shreya,server is created succesfully!...........and this is response page");
});
app.listen(4000,()=>{
    console.log("server created");
})

//upar ke case me hamne app.use() use kiya hai to ye all api method type pe work karega like post ,put,get,patch everything...iske api(http://localhost:4000/test) ko jab postman pe dalenge to ye post me,get me,put me patch me sabse work karega aur same response dega to agr hame koi api specific type ki banani hai to uske liye hame uska method type define krna padega like app.get(),app.post(),app.put(),app.patch().

app.get('/test',(req,res)=>{
    res.send("hii shreya,server is created succesfully!...........and this is get method response page");
});

app.post('/test',(req,res)=>{
    res.send("hii shreya,server is created succesfully!...........and this is post method response page");
});

app.put('/test',(req,res)=>{
    res.send("hii shreya,server is created succesfully!...........and this is put method response page");
});

app.patch('/test',(req,res)=>{
    res.send("hii shreya,server is created succesfully!...........and this is patch method response page");
});

app.delete('/test',(req,res)=>{
    res.send("hii shreya,server is created succesfully!.........and this is delete method response page");
});

//========================================================================================================
//USE OF ?,+,(),* IN ROUTES

// when we use ? in any route then this simply make part before ? optional for matching route
app.get('/ab?cd',(req,res)=>{
    res.send("hii shreya,server is created succesfully!...........and this is response page");
});
//above one get matched with route /acd , /abcd


//when we use + in route then this simply character before + must appear atleast once in route
app.get('/ab+cd',(req,res)=>{
    res.send("hii shreya,server is created succesfully!...........and this is response page");
});
//above one get matched with route /abcd,/abbcd,/abbbcd

//when we use + in route then that simply mean anything can be at the place of * ,like empty string or anything string
app.get('/ab*cd',(req,res)=>{
    res.send("hii shreya,server is created succesfully!...........and this is response page");
});
//above one get matched with route /abcd , /absddcd,/adkfdfljdflcd


//5.when we use () in route then that simply groups all the thing written in it

app.get('/ab(cd)?ef',(req,res)=>{
    res.send("hii shreya,server is created succesfully!...........and this is response page");
});
//above one get matched with route /abed,/abcdef

// ===================================================================================================

app.get('/user/:id', (req, res) => {
  res.send('User ID is ' + req.params.id);
});
// from above one method ,we can get id from api url by req.param.id

app.get('/user', (req, res) => { 
});

//if we are not sending any res from the router then this will not return anything so by hitting that api in postman it will show sending ,sending,sending only .....no response

// ======================================================================================================

//one route can have multiple route handler(that can be one,two ,tree or many more) like below one
app.get('/user', 
(req, res) => {
  res.send("response 1");
},
(req, res) => {
  res.send("response 2");
},
);

// to phir upar ke case me jab ham  postman me api hit karenge to ye response1 result dega aur agar ham first wale handler se kuch na respinse bheje aur soche ki second handler ka response api me aa jaega to aisa nahi hai....is case me api ka response nhi ayega to agr aise case me ham second handler ke response k oget krna chhah rhe hai to hame first wale handler me ek thirs parameter kena hoga jiska name next rakh deneg aur usko first wale router me as a function call kr denge like below mentioned code

app.get('/user', 
(req, res,next) => {
  next();
},
(req, res) => {
  res.send("response 2");
},
);

//agr response bhi de rhe hai first handler me aur next fucntion bhi use kr rhe hai to ye error dega kyuki ham allready ek response return kara chuke hai to phir se dusra reponse return krane par error dega....ye postman me first response to de dega but ye wrong way hai ....ye terminal me console me error dega
//WE CAN WRAP ALL THE HANDLERS OR SOME THE HANDLERS IN ARRAY([]) ans it will give same repsonse as previous one;
//below one will works same as above one code

app.get('/user', 
(req, res,next) => {
   res.send("response 1");
});
app.get('/user',
(req, res) => {
  res.send("response 2");
},
);

//================================================================================================== 

// 6.complete list of HTTP status codes grouped by category for interview prep and development use:

// ✅ 1xx – Informational
// Code	Meaning
// 100	Continue
// 101	Switching Protocols
// 102	Processing (WebDAV)
// 103	Early Hints

// ✅ 2xx – Success
// Code	Meaning
// 200	OK (Request succeeded)
// 201	Created
// 202	Accepted
// 203	Non-Authoritative Information
// 204	No Content
// 205	Reset Content
// 206	Partial Content
// 207	Multi-Status (WebDAV)
// 208	Already Reported
// 226	IM Used

// ⚠️ 3xx – Redirection
// Code	Meaning
// 300	Multiple Choices
// 301	Moved Permanently
// 302	Found (Previously “Moved Temporarily”)
// 303	See Other
// 304	Not Modified
// 305	Use Proxy (Deprecated)
// 307	Temporary Redirect
// 308	Permanent Redirect

// ❌ 4xx – Client Errors
// Code	Meaning
// 400	Bad Request
// 401	Unauthorized
// 402	Payment Required (Reserved)
// 403	Forbidden
// 404	Not Found
// 405	Method Not Allowed
// 406	Not Acceptable
// 407	Proxy Authentication Required
// 408	Request Timeout
// 409	Conflict
// 410	Gone
// 411	Length Required
// 412	Precondition Failed
// 413	Payload Too Large
// 414	URI Too Long
// 415	Unsupported Media Type
// 416	Range Not Satisfiable
// 417	Expectation Failed
// 418	I'm a teapot (Easter egg)
// 421	Misdirected Request
// 422	Unprocessable Entity (WebDAV)
// 423	Locked (WebDAV)
// 424	Failed Dependency (WebDAV)
// 425	Too Early
// 426	Upgrade Required
// 428	Precondition Required
// 429	Too Many Requests
// 431	Request Header Fields Too Large
// 451	Unavailable For Legal Reasons

// ❗ 5xx – Server Errors
// Code	Meaning
// 500	Internal Server Error
// 501	Not Implemented
// 502	Bad Gateway
// 503	Service Unavailable
// 504	Gateway Timeout
// 505	HTTP Version Not Supported
// 506	Variant Also Negotiates
// 507	Insufficient Storage (WebDAV)
// 508	Loop Detected (WebDAV)
// 510	Not Extended
// 511	Network Authentication Required


//by deafault any api has status code 200 means succes and you can see it in postman
// ===========================================================================================================

//authorised api call example 
app.get("/admin/getAllData",(req,res)=>{
    const token="xyz";
    const isAdminAuthorised=token==="xyz";
    if(isAdminAuthorised){
        res.send("All data Sent");
    }
    else{
        res.status(401).send("admin is not authorised");
    }
});
//upar ke case me jo authorisation ka code likha hai vo sahi way nhi hai authorise kne ka to  is case me middleware ayenege aur properly work krenge api autorisation ke liye to aise case me ham /admin me sara code likh deneg aur isko top pe dal denege jisse vo /admin se related sare api ko authorise kr dega like agar /admin hi authorise ni hoga to ye vahi ka vahi error throw kr dega aur aage kisi aur route pe nhi jaega   

//Handle  aurth middleware for all get,post.....methods
app.use('/admin',(req,res,next)=>{
console.log("admin auth is getting checked");    
const token="xyz";
const isAdminAuthorised=token==="xyz";
if(!isAdminAuthorised){
    res.status(401).send("unauthorised user");
}else{
    next();
}
})
// for writting neet and clean and perfect formated code we should write logic of authorisation in seperate module and then use in main module app.js by importing that...like below code ,write below code in seperate file then import that in main module and use like:- app.use('/admin', auth)
const auth=(req,res,next)=>{
console.log("admin auth is getting checked");    
const token="xyz";
const isAdminAuthorised=token==="xyz";
if(!isAdminAuthorised){
    res.status(401).send("unauthorised user");
}else{
    next();
}
}

// so final  route would be like below if we want to make it authorised

app.use("/user",auth,(req,res)=>{
    res.send('Hello, Worldddd!..................this is final data after provided to uathorised person after authorisation done');
})

// upar ke api ko jab ham hit krenege to pahle ye auth function pe jaega aur validate krega aur agar user validate ya authorised hoga to phir ye (req,res) wale fucntion pe jaega aur agr user authorided nhi hoga to phir ye api chalega hi nhi 

// in case user login route,we dont need to make it authorised so route for that would be like below

app.get("/login",(req,res)=>{
    res.send('Hello, Worldddd!..................successfully logged in');
})

// ===============================================================================================

// HANDLING ERROR IN ROUTE
// sequence of passing parameter in route
// (req,res) then first one is req and second one is response
// (req,res,next) then first one is req and second one is response and the third one is for going to the next handler 
// (error,req,res,next) then first one is for error and second one is request ,third one is for response and the last one (next one) is for going to next handler
// CODE FOR HANDLING ERROR

app.use("/",(err,req,res,next)=>{
    if(err)
    res.status(500).send('something went wrong');
});
// above one is good way to handle error but best way to handle error is try catch
app.use("/",(err,req,res,next)=>{
    try{
        res.send('hellow world.............'); 
    }catch(err){
        res.status(500).send('getting some error:'+err);
    }  
});
// SEQUENCE OF ROUTE MATTERS A LOT SO FOCUSON IT WHILE WRITING SEQUENCE OF ROUTE


// we have to write below code for better way of code writting at the bottom of all the route so that it get handle any of the error
app.use("/",(err,req,res,next)=>{
    if(err)
    res.status(500).send('something went wrong');
});

//==================================================================================================

// REASON BEHIND USING MONGOOSE OVER MONGODB 

// Feature	                    MongoDB 	                  Mongoose
// Schema Definition	         ❌	                           ✅
// Models	                     ❌	                           ✅
// Validation	                 ❌ (manual)	                   ✅
// Middleware (Hooks)	         ❌	                           ✅
// Relationships (populate)	     ❌ (manual joins)	           ✅
// Learning Curve	            Lower	                  Slightly Higher


// so in this project we usde mongoose rather than mongodb
const { MongoClient } = require('mongodb');
const url="mongodb+srv://shreya19457:KwzezBL2Exo2JyD2@cluster0.nxabzdq.mongodb.net/";
const client=new MongoClient(url);
async function main() {
    await client.connect();
    console.log("database connection done");
    return "Done";
} 
main().then(console.log).catch(console.error).finally(() => client.close());
// above one is the way of connetiong to the database using mongoDB

// mongoDB password....KwzezBL2Exo2JyD2.....and userName......shreya19457...
// i have used knit college email id for creating database
// connectionString=mongodb+srv://shreya19457:KwzezBL2Exo2JyD2@cluster0.nxabzdq.mongodb.net/

// below one is the way connecting to database using mongoose

 const mongoose=require('mongoose');
 mongoose.connect("mongodb+srv://shreya19457:KwzezBL2Exo2JyD2@cluster0.nxabzdq.mongodb.net/");

//above one is the way of connenting datbase but its not standard way to connect with database so we have 
//to connect to database using mongoose by wrapping up above code inside a async function so that we
//can easily determine that weather connection stablished successfully or not so below one correct way to 
//connect DB
 const mongoose=require('mongoose');
 const connectionDB=async()=>{
    await mongoose.connect("mongodb+srv://shreya19457:KwzezBL2Exo2JyD2@cluster0.nxabzdq.mongodb.net/");
 }
 connectionDB().then(()=>{
    console.log("DB Connection created successfully")
}).catch(err=>{
    console.error("there is some error in connecting to DB:"+err);
});
 
// write above code in seperate module and no need to export that ands just simply import that in main 
// module by below line
require("./Config/database");

// connectionString="mongodb+srv://shreya19457:KwzezBL2Exo2JyD2@cluster0.nxabzdq.mongodb.net/"
// above connection string refers to the whole cluster that we have cretaed so if we want to connect 
// any specidic database then simply write that database at the end of connection string like below one
// connectionString="mongodb+srv://shreya19457:KwzezBL2Exo2JyD2@cluster0.nxabzdq.mongodb.net/DevTinder"

// when we write code like below then is will first create server then  connect to the databse and we 
// can check that sequence by running below code ,that will console server creation  text first and then db creation
// but correct way is to connect DB first then create server 

const express=require('express');
require("./Config/database");
// const app=express();
app.listen(4000,()=>{
    console.log("server Created successfully at  port 4000");
});

//so to overcome above issue of creating db first then server creation we export db connection method and
//import that in main file and there call that method of db creation and create server when Db 
// connection is created and that is inside then() function like below one
const express=require('express');
const connectionDB=require("./Config/database");
// const app=express();
 connectionDB().then(()=>{
    console.log("DB Connection created successfully");
    app.listen(4000,()=>{
    console.log("server Created successfully at  port 4000");
});
}).catch(err=>{
    console.error("there is some error in connecting to DB:"+err);
});
 
// so for making any app ,we first connect to DB then create server and then create schema then model

// ======================================================================================================
// creating schema means what all that thing are collecting in it like if we are making user login schema
// then there would be user id,password,email id or something revavent to it etc
// Schema: A blueprint that defines the structure and rules of a MongoDB document.
// Model: A Mongoose object used to create and interact with documents in a MongoDB collection.
// database connection ke code ke loye ek folder hoga jiska name confid hoga aur usle andar files 
// ke andar code hoga db connection ka aur similarly schema creation ke liye ek folder hoga models
// name ka and below one would be the way of crfeating schema 
const mongoose=require('mongoose');
const userSchema=mongoose.Schema({   
});

// camel casing is good way of creating data inside schema .....we will create model inside same file 
// after creating schema and thats code mentioned below

mongoose.Model("User",userSchema);

// making route for signup before db connection and server creation is best practice to write code
// __v:0 in data in mongodb represent versionKey and which is automaiticaly get added
// It is automatically added by Mongoose to track the revision/version of the document.
// The number starts at 0 and increments whenever you update the document (especially useful in 
// concurrent editing or optimistic locking scenarios).

// allways use try catch while intereacting with db like below

      const user=new User(userObj);
      try{
          await user.save();
      res.send("user added succesfully");
      }catch(err){
          res.status(500).send("there is some error");
      }


    // below one post method route for posting data statically ,we will post dynamically in our actual project 
    // like taking data from req and then post that because data passed from body while posting from postman 
    // comes in req of the route
    
    app.post("/signup",async(req,res)=>{
        const userObj={
            firstName:"pinki",
            lastName:"Madeshiya",
            email:"smadeshiya12345@gmail.com",
            password:"shreya@6767",
            age:25,
            gender:"female",
        };
        // creating a new instance of user model
        const user=new User(userObj);
        try{
            await user.save();
        res.send("user added succesfully");
        }catch(err){
            res.status(400).send("there is some error");
        }
    });

    // when we try to console req.body then this will give undefined becuase we are sending data in the form 
    // of json and our server is not able to read that json data so we need a middleware to read that json data
    //and convert that json data into javascript object  and that middleware is provided by an express itself 
    // named express.json()....we write app.use(express.json()) on the top and it will read req for
    //  all the routes

    //user.findd() in mongoDb gives all the matching data and user.findOne() will return only first
    // matching data


    // ================================================================================================

    // all the api example 

    app.post("/signup",async(req,res)=>{
        // const userObj={
        //     firstName:"pinki",
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
            res.status(400).send("there is some error");
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
            await User.findByIdAndUpdate({_id:req.body._id},data);
            res.send("user updated successfully");
        }catch(err){
            res.status(401).send("something went wrong");
        }
    });


    // take a look of schema creation and model creation in user.js in models folder
const mongoose=require('mongoose');
const { ValidationSignupData } = require('./src/utils/validation');
const userSchemaaa=mongoose.Schema({
    firstName:{
        type:String,
         required: true
    },
    lastName:{
        type:String,     
    },
    email:{
        type: String,
    required: true,
    unique: true 
    },
    password:{
        type:String,
         required:true,
          unique: true ,
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validite(value){
            if(value!=='male' || value!=='female' || value!=='transgender'){
               throw new Error("gender validation fails");
            }

        }
    },
});

module.exports=mongoose.model("User",userSchema);


// we can validate something ..like there can be only three genders like below and it is called custom validator or just write  enum: ['male', 'female',"transgender"] in it
// gender:{
//         type:String,
//         validite(value){
//             if(value!=='male' || value!=='female' || value!=='transgender'){
//                throw new Error("gender validation fails");
//             }

//         }
//     },

// above valid function will only work when post some new data...donest work for updating for for checking it
// while updating we have to pass runValidator:true in updating route like below
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

// you can add the time stamp ,that mean when data is added by just adding {timeStamps:true} in schema creation like in below

const userSchemaa=mongoose.Schema({
    firstName:{
        type:String,
         required: true
    },
    lastName:{
        type:String,     
    },
    email:{
        type: String,
    required: true,
    unique: true 
    },
    password:{
        type:String,
         required:true,
          unique: true ,
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validite(value){
            if(value!=='male' || value!=='female' || value!=='transgender'){
               throw new Error("gender validation fails");
            }
        }
    },
},{ timestamps: true });

// we can update our email id according to schema written but email is the mail thing for logic so we should keep it no updatable so for that we have write api level validation so that user cant update that field so we need to write codition inside route like below inside the update route

    const data=req.body;
     // written everthing except what we dont want to update like email id
    const allowed_update=["firstName","lastName","password","age","gender"];
    const isUpdateAllowed=Object.keys(data).every((k)=>
        allowed_update.includes(k)
    )
    if(!isUpdateAllowed){
        res.status(400).send("update not allowed");
    }


    // below one is the whole code for update with email "update not allowed" validation  

    app.patch("/user",async(req,res)=>{
         const data=req.body;
         // written everthing except what we dont want to update like email id
        
        try{
            const allowed_update=["firstName","lastName","password","age","gender"];
        const isUpdateAllowed=Object.keys(data).every((k)=>
            allowed_update.includes(k)
        )
        if(!isUpdateAllowed){
            res.status(400).send("update not allowed");
        }
            console.log(req.body);
            await User.findByIdAndUpdate({_id:req.body._id},data,{
                runValidators:true
            });
            res.send("user updated successfully");
        }catch(err){
            res.status(401).send("something went wrong");
        }
    });


    // for best practice keep validation on almost all the data

    // "validator" is a npm package, which is used for variour validation like email format validation,password validation or something else

//======================================================================================================
// dont trust on data coming from req.body because user or attacker can send any kind of dat so we should 
// apply validation on all the data 
// password should be saved in encrypted format in database instead of original password
// firstly validate all the data by making function and use validate pavakgae for that 
// and after that encrypt the password using npm package bcrypt and then store into the database 
 const passwordHash=await bcrypt.hash(password,10);
// bcrypt allways return promise so writting await infront of it is must


// ===============================================================================================

// what is cookies,jwt token 
// how authentication works
// when user user logged in then server told that yes,this is correct login credential and then sends a 
// authentication key named as jwt(json web token) and after login when user hit any kind of api call 
// then this simply sends to server with that api for authentication purpose like if user request ofr connection
// on linkdn then simply jwt token also go to server with connection api to authenticate/validate user
// inside cookies jwt token is stored so when we perform login then cookies are recieved from server,which 
// contains jwt token


// 🆚 Cookies vs JWT
// Feature	                       Cookies	                             JWT
// Stored In	           Browser (automatically)	        localStorage / sessionStorage / cookie
// Sent With Requests	   Automatically by browser	           Manually in headers (usually)
// Type	                       Session-based	                    Token-based
// Server Load	                Needs session store	                 Stateless
// Use Case	Traditional             web apps	                 APIs, SPAs, mobile apps

// ham login krenge to server email psw ko validate krega phir ek jwt token generate krega aur usko
//  cookies  ke andar wrap kr dega  and this token is very unique (only for that perticular user) and then
// send that cookie response back to the user,now browser will sotre that and then when we make any kind of api
// call then cookie goes with that api call to server for validation and then data would be fetched from DB
// we can send expiry date of that cookie ,like 1 day,1 month or just some hrs
// aur agr kisi cookie ki expiry ho gayi h to phir jab vo server pe jata hai kisi api call ke sath vo 
// server use validate nhi kar pata aur error deta hai,failed login,please login again and login page
//  ko direct kar jata hai  
// creat jwt token then add the token to cookie ans send the reponse back to the user below is the code for
// sending token to cookie
// res.cokkie("token","ldlhfkdhweh3iuohdwekfkhkmdnsmdd");
// here second one is cookie
// for getting cokkies while making another api call we need to install a package for that name cookie-parser
// json web token is divided into three parts 1. header 2.payload 3.signature
// for jwt ,we use library named jsonwebtoken
// signup aur login ke alawa jitne bhi api hai vo bina authentication ke nhi chalnege,means jwt token ke bina

// example of all the ttype of api 


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
     // written everthing except what we dont want to update like email id
    const allowed_update=["firstName","lastName","password","age","gender"];
    const isUpdateAllowed=Object.keys(data).every((k)=>
        allowed_update.includes(k)
    )
    if(!isUpdateAllowed){
        res.status(400).send("update not allowed");
    }
        console.log(req.body);
        await User.findByIdAndUpdate({_id:req.body._id},data,{
            runValidators:true
        });
        res.send("user updated successfully");
    }catch(err){
        res.status(401).send("something went wrong");
    }
});


// jwt token se sare api ko authorise krne ka logic ek alag page me likhenge aur phir sare me api me rote ke bad us function ko calll kr denege jaise isme middlewares me auth.js me logic likha hai


// setting expiry time in jwt token is by setting {expiresIn:'1d'} in bellow token setting code for expiry time 1 day
const token=await jwt.sign({_id:user._id},"Dev@Tinder$790",{expiresIn:'1d'});

// we can expire cookies as well similar to the token soething like below,below is not eaxctly correct like passing date or time for expiry

 res.cookie("token",token,{expires:new Date(Date.now()+8*36000000)});

//  expry of token is must part for secirity purpose


// ALL THE APIs REQUIRED FOR DEV-TINDER APPLICATION
// post/signup
// post/login 
// post/logout 


// get/profile/view 
// patch/profile/edit 


// patch/profile/password(forget password)  
// status:ignore,interested,accepted,rejected

// post/request/send/interested/:userID
// post/request/send/ignored/:userID
// post/request/review/accepted/:requestID
// post/request/review/rejected/:requestID

// get/connection   
// get/request/received
// get/feed          --for showing suggested profile

// express router is used to route all the APIs....like we can keep all the apis in single file like app.js but that is good practice to keep large no of apis like 100 in single file so we should route those api in different groups

// there is no performance difference between app.post or app.expressRouter.post for making any api
// const app=express();
// const authRouter=express.Router();

// hamne sare api ko routes folder ke andar alag alag files banake kr diya hai but vo just for best practice ke liye hai ...ham adirect api ko app.js me bhi bana skte hai to router sirf systematic way me representarion ke liye hai

// logout me simply token ko expire kr denege...like below...hamne expiry time ko current time kr doya jisse cokkie turant expire ho jaegi

authRouter.post("/logout",async(req,res)=>{   
 res.cookie("token",null,{
    expires:new Date(Date.now()),
 })
 res.send("logout successfully");
});
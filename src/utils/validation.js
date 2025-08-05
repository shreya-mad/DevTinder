const validator=require('validator');
const ValidationSignupData=(req)=>{
const {firstName,lastName,email,password}=req.body;
// if(!firstName || !lastName)
//     throw new Error("Name is Not Valid!!");
 if(firstName<4 || firstName>40)
    throw new Error("first name  should be more than 4 character and less than 40 characters");
else if(!validator.isEmail(email))
     throw new Error("email address is Not Valid!!");
else if(!validator.isStrongPassword(password))
     throw new Error("please enter a strong password!!");  
}
module.exports={ValidationSignupData};
const express = require("express");
const {
  ValidationSignupData,
  ValidationProfileData,
} = require("../utils/validation");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer=require('nodemailer');

// const transporter=nodemailer.createTransport({
//     service:"gmail",
//     {
//         user:"smadeshiya12345@gmail.com",
//         pass:""
//     }
// })
authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, age, gender } = req.body;
  try {
    ValidationSignupData(req);
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      age,
      gender,
    });

    await user.save();
    res.send("user added succesfully");
  } catch (err) {
    res.status(400).send("there is some error:" + err);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("invalid email id!!!!");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, "Dev@Tinder$790", {
        expiresIn: "1h",
      });
      res.cookie("token", token);
      res.send("login successfull");
    } else throw new Error("password is not Correct");
  } catch (err) {
    res.status(400).send("error:" + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("logout successfully");
});

authRouter.post("/profile/reset-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) throw new Error("user not found!!!");
    else {
      const resetToekn = await jwt.sign({ _id: user._id }, "Dev@Tinder$790", {
        expiresIn: "15m",
      });
      const tokenUrl = `http://localhost:4000/profile/reset-password-by-mail/${resetToekn}`;
    }
    res.send("email feching done");
  } catch (err) {
    res.status(404).send("there is something wrong" + err.message);
  }
});

module.exports = authRouter;

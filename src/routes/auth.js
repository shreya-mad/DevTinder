const express = require("express");
const {
  ValidationSignupData,
  ValidationProfileData,
} = require("../utils/validation");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: "smadeshiya12345@gmail.com", pass: "govs pagx blsj alei" },
});

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, age, gender, profilePicture } =
    req.body;
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
      profilePicture,
    });

    await user.save();
    res.json({message:"user added succesfully",data:user});
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
      //res.cookie("token",token);
      res.cookie("token", token, {
  httpOnly: true,
  secure: true,       // Render पर जरूरी
  sameSite: "none",   // Cross-site के लिए जरूरी
});

      res.send(user);
    } else throw new Error("password is not Correct");
  } catch (err) {
    res.status(400).send("error:" + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.json({message:"logout successfully"});
});

authRouter.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const token = jwt.sign({ id: user._id }, "Dev@Tinder$790", {
      expiresIn: "15m",
    });
    const resetURL = `http://localhost:5173/reset-password/${token}`;
    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetURL}">here</a> to reset your password.</p>`,
    });
    res.json({ message: "Password reset link sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

authRouter.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = jwt.verify(token, "Dev@Tinder$790");

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });
    res.json({ message: "Password successfully reset" });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(400)
        .json({ message: "Token expired. Please request a new one." });
    }
    return res.status(400).json({ message: "Invalid token" });
  }
});

module.exports = authRouter;


const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      //   unique: true ,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      // enum: ['male', 'female',"transgender"],
      validite(value) {
        if (value !== "male" || value !== "female" || value !== "transgender") {
          throw new Error("gender validation fails");
        }
      },
    },
    profilePicture:{
      type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

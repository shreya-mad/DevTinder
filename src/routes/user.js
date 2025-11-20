const express = require("express");
const ConnectionRequest = require("../models/connectionRequest");
const { auth } = require("../middlewares/auth");
// const connectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();
const User = require("../models/user");
userRouter.get("/user/requests/received", auth, async (req, res) => {
  try {
    const logggedInUser = req.user;
    const allUser = await ConnectionRequest.find({
      toUserID: logggedInUser._id,
      status: "interested",
    }).populate("fromUserID", ["firstName", "lastName","profilePicture","age","gender"]);
    // hamene populate wala isliye kiya kyuki  reuqest recived profile ka complete data chhaiye naki keval sender ki id
    res.json({
      message: "all the reuqest fetched successfully",
      data:allUser,
    });
  } catch (err) {
    res.send("there is some error" + err.message);
  }
});
userRouter.get("/user/connections", auth, async (req, res) => {
  try {
    const logggedInUser = req.user;
    const allConnections = await connectionRequest
      .find({
        $or: [
          { toUserID: logggedInUser._id },
          { fromUserID: logggedInUser._id },
        ],
        status: "accepted",
      })
      .populate("fromUserID", ["firstName", "lastName", "email","profilePicture"])
      .populate("toUserID", ["firstName", "lastName", "email","profilePicture"]);
    const data = allConnections.map((row) => {
      if (row.fromUserID._id.toString() === logggedInUser._id.toString())
        return row.toUserID;
      return row.fromUserID;
    });
    res.json({
      message: "all the connections fetched successfully",
      data: data,
    });
  } catch (err) {
    res.status(400).send("there is something wrong" + err);
  }
});
userRouter.get("/user/feed", auth, async (req, res) => {
  try {
    //  user should not see
    // 1.himeself profile as feed,
    // 2.profile that is allredy in connection with him/her,
    // 3.he showed interest in him/her allready
    // 4. ignored profile
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const logggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ toUserID: logggedInUser._id }, { fromUserID: logggedInUser._id }],
    }).select("fromUserID toUserID");

    const hideUsersFromFeed = new Set();

    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserID.toString());
      hideUsersFromFeed.add(req.toUserID.toString());
    });
    // below one is for getting all the profile excpet those profile which cant be feed rpofile like
    // requested profile,allready in connection,himeself profile etc.
   const users = await User.find({
  _id: {
    $nin: Array.from(hideUsersFromFeed),
    $ne: logggedInUser._id
  }
})
.skip(skip)
.limit(limit);


    res.json({ message: "successfull", data: users });
    // above one is just basic feed api ....actual api should have more complex algo behind showing
    //  feed profile
  } catch (err) {
    res.status(400).send("there is some error " + err);
  }
});
module.exports = userRouter;

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Channel = require("../models/Channel");

// login user
router.post("/", function (req, res) {
  User.findOne({ email: req.body.email }, async function (err, user) {
    if (err)
      return res.json({
        success: false,
        message: "Error during find user",
      });

    if (!user)
      return res.json({
        success: false,
        message: "Auth failed, email not found",
      });

    if (user.token) {
      return res.json({
        success: false,
        message: "You are already login in",
      });
    }

    user.comparepassword(req.body.password, async (err, isMatch) => {
      if (!isMatch)
        return res.json({
          succes: false,
          message: "Password doesn't match",
        });

      let channels = await Channel.find();
      let channelsNames = channels.map((channel) => channel.name);

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res.status(200).json({
          success: true,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: user.token,
          channels: channelsNames,
          id: user._id,
        });
      });
    });
  });
});

module.exports = router;

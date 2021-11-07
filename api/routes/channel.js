const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Channel = require("../models/Channel");
const Creator = require("../models/Creator");

// Create channel
// input: token, channel name
router.post("/", async (req, res) => {
  let token = req.body.token;
  User.findByToken(token, async (err, user) => {
    if (err) return res(err);
    if (user) {
      const newCreator = new Creator({
        userId: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
      });
      await newCreator.save();

      const newChannel = new Channel({
        name: req.body.name,
        creator: new Creator({
          userId: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
        }),
        messages: [],
      });
      await newChannel.save();
      return res.status(200).json({
        createChannelSuccesful: true,
        message: "Create channel",
      });
    } else {
      return res.status(400).json({
        error: true,
        message: "Cannot create channel, token undefined",
      });
    }
  });
});

// Send message
// input: token, channel, message
router.post("/addmessage", async (req, res) => {
  let token = req.body.token;
  User.findByToken(token, async (err, user) => {
    if (user) {
      try {
        await Channel.findOne(
          { name: req.body.channel },
          async function (err, channel) {
            if (!channel)
              return res.status(400).json({
                success: false,
                message: "Channel not found",
              });
            await channel.addMessage({
              userId: user._id.toString(),
              firstName: user.firstName,
              lastName: user.lastName,
              content: req.body.message,
              date: Date.now(),
            });
            await channel.save();
            return res.status(200).json({
              messages: channel.messages,
              success: true,
              message: "Message added",
            });
          }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Unknown error",
      });
    }
  });
});

// Get messages by channel
// input: token, channel
router.post("/getmessages", async (req, res) => {
  let token = req.body.token;
  await User.findByToken(token, async (err, user) => {
    if (err) return res(err);
    if (user) {
      await Channel.findOne(
        { name: req.body.name },
        async function (err, channel) {
          return res.status(200).json({
            isSucces: true,
            messages: channel.messages,
          });
        }
      );
    } else {
      return res.status(400).json({
        isSuccess: false,
        message: "Cannot add message to channel, token undefined",
      });
    }
  });
});

module.exports = router;

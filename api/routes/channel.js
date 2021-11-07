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
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Token undefined",
      });
    }

    if (user) {
      try {
        let newCreator = new Creator({
          userId: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
        });

        await newCreator.save();

        let newChannel = new Channel({
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
          success: true,
          message: "Channel created",
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Error during creating channel",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
  });
});

// Send message
// input: token, channel, message
router.post("/addmessage", async (req, res) => {
  let token = req.body.token;

  User.findByToken(token, async (err, user) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Token undefined",
      });
    }
    if (user) {
      try {
        await Channel.findOne(
          { name: req.body.channel },
          async function (err, channel) {
            if (!channel) {
              return res.status(400).json({
                success: false,
                message: "Channel not found",
              });
            }

            channel.addMessage({
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
        return res.status(400).json({
          success: false,
          message: "Error during add message",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
  });
});

// Get messages by channel
// input: token, channel
router.post("/getmessages", async (req, res) => {
  let token = req.body.token;

  await User.findByToken(token, async (err, user) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Token undefined",
      });
    }
    if (user) {
      await Channel.findOne(
        { name: req.body.name },
        async function (err, channel) {
          return res.status(200).json({
            success: true,
            messages: channel.messages,
          });
        }
      );
    } else {
      return res.status(400).json({
        success: false,
        message: "Cannot find user",
      });
    }
  });
});

module.exports = router;

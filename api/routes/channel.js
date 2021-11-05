const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Channel = require("../models/Channel");
const Creator = require("../models/Creator");

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

// input: token, channel, message
router.post("/addmessage", async (req, res) => {
  let token = req.body.token;
  User.findByToken(token, (err, user) => {
    if (err) return res(err);
    if (user) {
      // add message to channel
      Channel.findOne({ name: req.body.name }, async function (err, channel) {
        channel.messages.push({
          userId: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          content: req.body.content,
          date: Date.now(),
        });
        await channel.save();
        return res.status(200).json({
          error: false,
          message: "Message added",
        });
      });
    } else {
      return res.status(400).json({
        error: true,
        message: "Cannot add message to channel, token undefined",
      });
    }
  });
});

// input: token, channel
router.get("/getmessages", async (req, res) => {
  let token = req.body.token;
  User.findByToken(token, (err, user) => {
    if (err) return res(err);
    if (user) {
      // add message to channel
      Channel.findOne({ name: req.body.name }, async function (err, channel) {
        return res.status(200).json({
          error: false,
          messages: channel.messages,
        });
      });
    } else {
      return res.status(400).json({
        error: true,
        message: "Cannot add message to channel, token undefined",
      });
    }
  });
});

module.exports = router;

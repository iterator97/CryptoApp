const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const newuser = new User(req.body);

  if (newuser.password != newuser.confirmPassword)
    return res.status(400).json({
      succes: false,
      message: "Password not match",
    });

  User.findOne({ email: newuser.email }, async (err, user) => {
    if (user)
      return res.status(400).json({ succes: false, message: "Email exits" });

    await newuser.save((err, doc) => {
      if (err) {
        return res
          .status(400)
          .json({ succes: false, message: "Unknown error" });
      }
      res.status(200).json({
        succes: true,
        message: "Register user succesfully",
      });
    });
  });
});

module.exports = router;

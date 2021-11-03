const express = require("express");
const router = express.Router();
const User = require("../models/User");

// adding new user (sign-up route)
router.post("/", (req, res) => {
  // taking a user
  const newuser = new User(req.body);

  if (newuser.password != newuser.confirmPassword)
    return res.status(400).json({ message: "password not match" });

  User.findOne({ email: newuser.email }, (err, user) => {
    if (user)
      return res.status(400).json({ auth: false, message: "email exits" });

    newuser.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false });
      }
      res.status(200).json({
        succes: true,
        user: doc,
      });
    });
  });
});

module.exports = router;

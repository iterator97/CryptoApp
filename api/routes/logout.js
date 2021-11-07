const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", (req, res) => {
  User.findByToken(req.body.token, (err, user) => {
    if (err) {
      res.status(400).json({
        succes: false,
        message: "Error",
      });
    }
    if (user) {
      user.deleteToken(req.body.token, (err, user) => {
        res.status(200).json({
          succes: true,
          message: "Logout succesfully",
        });
      });
    }
  });
});

module.exports = router;

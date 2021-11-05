const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { auth } = require("../auth/auth");

// get logged in user
router.get("/", auth, function (req, res) {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.firstname + req.user.lastname,
  });
});

module.exports = router;

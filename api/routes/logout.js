const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { auth } = require("../auth/auth");

router.get("/", auth, function (req, res) {
  req.user.deleteToken(req.body.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      succes: true,
      message: "Logout succesfully",
    });
  });
});

module.exports = router;

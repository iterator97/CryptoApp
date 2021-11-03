const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { auth } = require("../auth/auth");

router.get("/", auth, function (req, res) {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

module.exports = router;

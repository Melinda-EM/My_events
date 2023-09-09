const express = require("express");
const User = require("../models/userModel");
const router = new express.Router();

router.post("/register", async (req, res, next) => {
  const user = new User(req.body);
  //await user.save();
  console.log('user :', user);

  try {
    //await user.save();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
  console.log(req.body);
});


module.exports = router;
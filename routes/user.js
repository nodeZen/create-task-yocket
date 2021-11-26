const express = require("express");
const userRoutes = express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtgenerator");
const authorize = require("../middlewares/authorize");

userRoutes.post("/register", async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  const existingUser = await userModel.findOne({ email });
  if (existingUser) return res.json({ userExists: true });
  const salt = await bcrypt.genSalt(10);
  const bcryptPassword = await bcrypt.hash(password, salt);
  const newUser = new userModel({ email, password: bcryptPassword, firstName, lastName });
  newUser
    .save()
    .then(() => {
      const token = jwtGenerator(newUser.email);
      res.json({ token });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

userRoutes.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) return res.json({ userExists: false });
    const isPasswordMatched = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatched) return res.json({ isLoggedIn: false });
    const token = jwtGenerator(existingUser.email);
    return res.json({ token });
  } catch (err) {
    res.status(500).send(err);
  }
});

userRoutes.get("/user-data",authorize, async (req, res, next) => {
  try {
    const { email:reqEmail } = req.body;
    const existingUser = await userModel.findOne({ reqEmail });
    if (!existingUser) return res.json({ userExists: false });
    const {firstName, lastName, email} = existingUser;
    return res.json({ 
      firstName, lastName, email
     });
  } catch (err) {
    res.status(500).send(err);
  }
});

userRoutes.get("/is-verify",authorize, async (req, res, next) => {
   try{
    res.send({authorized:true})
   }catch{
    res.send({authorized:false})
   }
});



module.exports = userRoutes;
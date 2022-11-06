// import models
const Admin = require("../models/admin");
// import jwt token - npm i jsonwebtoken
const jwt = require("jsonwebtoken");
// import bcrypt for hashing password - npm i bcrypt
const bcrypt = require("bcrypt");
// import mongoose for check the proper mongodb object id
const mongoose = require("mongoose");

// Create JWT Token Here
const createJwtToken = (_id) => {
  // jwt.sign('PAYLOAD', 'SECRET','EXPIRES')
  return jwt.sign({_id}, process.env.SECRET_KEY, { expiresIn: '1d' });
};
//
const addNewAdmin = async (req, res) => {
  const postData = req.body;
  try {
    // checking the email already exist or not
    const checkEmailExists = await Admin.findOne({ email: postData.email });
    if (checkEmailExists) {
      res.status(400).json({ msg: "Email already registered!" });
    } else {
      // config the password hashing
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(postData.password, salt);
      const adminData = {
        name: postData.name,
        email: postData.email,
        password: hash,
      };
      // create admin with password hashing
      const newAdminUser = await Admin.create(adminData);
      // create token here
      const jwtToken =  createJwtToken(newAdminUser._id);
      res.status(200).json({
        result: "Admin User Saved!",
        data: newAdminUser,
        jwtToken: jwtToken,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const adminLogin = async (req, res) => {
  const logData = req.body;
  try {
    // checking the valid user email already exist or not
    const validUser = await Admin.findOne({ email: logData.email });
    if (!validUser) res.status(400).json({ msg: "Not a registered mail!" });

    // checking the password while loging
    const matchPassword = await bcrypt.compare(
      logData.password,
      validUser.password
    );
    if (!matchPassword) {
      res.status(400).json({ msg: "Not a valid password" });
    } else {
      // create token here
      const jwtToken =  createJwtToken(validUser._id);
      res.status(200).json({
        result: "Admin User Logged!",
        data: validUser,
        jwtToken: jwtToken,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  addNewAdmin,
  adminLogin,
};

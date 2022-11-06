// import models
const User = require("../models/user");
// import mongoose for check the proper mongodb object id
const mongoose = require("mongoose");

const addNewUser = async (req, res) => {
  const postData = req.body;
  try {
    const newUserData = await User.create(postData);
    res.status(200).json({ result: "User Saved!", data: newUserData });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllUsers = async (req, res) => {
  console.log('**********',req.body)
  try {
    const allUsers = await User.find({"admin_id":req.body.admin_id}).sort({ createdAt: -1 });
    res.status(200).json({ result: "All Users Fetched!", data: allUsers });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getUserById = async (req, res) => {
  const UserID = req.body._id;

  //check mongodb objectid match the standard, if not return this
  if (!mongoose.Types.ObjectId.isValid(UserID)) {
    return res.status(400).json({ error: "Invalid User!" });
  }

  await User.findById(UserID)
    .then((result) => {
      console.log(result);
      if (result) res.status(200).json(result);
      else res.status(400).json({ error: "Invalid User ID" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const updateUserById = async (req, res) => {
  const userId = req.body._id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid User!" });
  }
  try {
    const user = await User.findByIdAndUpdate(
      { _id: userId},
      { ...req.body }
    );
    res.status(200).json({ msg: "User Updated!", result:user });
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteUserById = async (req, res) => {
  const delUserId = req.body._id;
  //check mongodb objectid match the standard, if not return this
  if (!mongoose.Types.ObjectId.isValid(delUserId)) {
    return res.status(400).json({ error: "Invalid User!" });
  }

  try {
    const delUser = await User.findByIdAndDelete(delUserId);
    res.status(200).json({ Msg: "User Deleted!", result: delUser });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = {
  addNewUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};

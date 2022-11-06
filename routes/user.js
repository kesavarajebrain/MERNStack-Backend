//config express
const express = require("express");
const router = express.Router();

//config api which is in the corresponding controller
const {
  addNewUser,
  getUserById,
  updateUserById,
  getAllUsers,
  deleteUserById,
} = require("../controllers/userController");
// import auth the requests
const interceptAuth = require("../middleware/interceptorAuth");
// here we config the interceptor for the router , once verify it then only it will run api call
router.use(interceptAuth);
router.post("/addNewUser", addNewUser);
router.post("/getUserById", getUserById);
router.put("/updateUserById", updateUserById);
router.post("/getAllUsers", getAllUsers);
router.post("/deleteUserById", deleteUserById);


module.exports = router;

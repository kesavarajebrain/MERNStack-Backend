const express = require("express");
const { addNewAdmin, adminLogin } = require("../controllers/adminController");

const router = express.Router();
router.post("/addNewAdmin", addNewAdmin);
router.post("/adminLogin", adminLogin);

module.exports = router;

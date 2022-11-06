//config express
const express = require("express");
const router = express.Router();

//config api which is in the corresponding controller
const {
  sampleGetApicall,
  emptyApiCall,
  samplePostApiCall,
} = require("../controllers/sampleController");

router.get("/", emptyApiCall);
router.get("/sampleGetApicall", sampleGetApicall);
router.post("/samplePostApiCall", samplePostApiCall);

module.exports = router;

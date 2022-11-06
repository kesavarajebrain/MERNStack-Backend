const Sample = require("../models/sample");

const sampleGetApicall = (req, res) => {
  res.send("API Call works! with exact route name");
};

const emptyApiCall = (req, res) => {
  res.send("API Works ! with exact route but no other params!");
};

// sample POST call
const samplePostApiCall = async (req, res) => {
  const postData = req.body;
  try {
    const sampleData = await Sample.create(postData);
    res.status(400).json({result:'saved',data:sampleData});
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  sampleGetApicall,
  emptyApiCall,
  samplePostApiCall,
};

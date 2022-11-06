const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sampleSchema = new Schema(
  {
    // sample schemas for new entry
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timeseries: true, timestamps: true }
); // this is for record the time data

module.exports = mongoose.model("sample", sampleSchema);

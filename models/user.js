const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    // user schemas for new entry
    name: {
      type: String,
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
    admin_id:{
      type:String,
      required:true
    }
  },
  { timeseries: true, timestamps: true }
); // this is for record the time data

module.exports = mongoose.model("user", userSchema);

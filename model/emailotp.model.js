const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OTPSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
    user: {
      
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      
    }
  },
  {
    timestamps: true,
  }
);

module.exports = OTPSchema;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LoggerSchema = new Schema(
  {
    reqURL: String,
    reqBody: String,
    method : String,
    apiMethod : String,
    type : String,
    message : String
  },
  {
    timestamps: true,
  }
);

module.exports = LoggerSchema;

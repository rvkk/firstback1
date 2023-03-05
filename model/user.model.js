const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: String,
    city : String,
    state : String,
    zip : String,
    agegroup: String,
    gender : String,
    religion : String,
    country : String,
    profilePicture: String
  },
  {
    timestamps: true,
  }
);

module.exports = UserSchema;

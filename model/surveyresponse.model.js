const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SurveyResponseSchema = new Schema(
  {
    emotion: {
      type: String
    },
    strength: {
      type: Number
    },
    rating: {
      type: Number
    },
    isLike: {
      type: Boolean
    },
    ipaddress:{
      type:String
    },
    emotionFrom: {
      type:String
    },
    emotionBy: {
      type : String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = SurveyResponseSchema;
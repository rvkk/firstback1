const mongoose = require("mongoose");
const otpSchema = require("../model/emailotp.model");

otpSchema.statics = {
  create: function (data) {
    const otpdata = new this(data);
    return otpdata.save();
  },
  getByUsername: function (username) {
    const obj = { username };
    return this.findOne(obj);
  },
  updateData: function (id, updateData) {
    const query = {
      _id: id
    }
    return this.findOneAndUpdate(query,  updateData, { new: true });
  },
};

const otpModel = mongoose.model("Emailotp", otpSchema);
module.exports = otpModel;

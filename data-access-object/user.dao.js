const mongoose = require("mongoose");
const usersSchema = require("../model/user.model");

usersSchema.statics = {
  create: function (data) {
    const user = new this(data);
    return user.save();
  },
  getByEmail: function (email) {
    const obj = { email };
    return this.findOne(obj);
  },
  getById: function (id) {
    const query = {
      _id: id,
    };
    return this.findOne(query);
  },
  updateData: function (id, updateData) {
    const query = {
      _id: id
    }
    return this.findOneAndUpdate(query,  updateData, { new: true });
  },
};

const usersModel = mongoose.model("User", usersSchema);
module.exports = usersModel;

const mongoose = require("mongoose");
const loggerSchema = require("../model/logger.model");

loggerSchema.statics = {
  create: function (data) {
    const request = new this(data);
    return request.save();
  }
};

const loggerModel = mongoose.model("Logger", loggerSchema);
module.exports = loggerModel;
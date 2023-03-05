const mongoose = require("mongoose");
const surveyresponseSchema = require("../model/surveyresponse.model");

surveyresponseSchema.statics = {
  create: function (data) {
    const survey = new this(data);
    return survey.save();
  },

  getResponseData: function () {
    const query = {
    };
    return this.find(query);
  },

  getEmotionsDataByTopic: function(data) {
    let query = { 
      "emotionFrom" : {'$regex' : data.topic, '$options' : 'i'}
    };
    if (data.period) {
      query = { 
        $and:[
          {"emotionFrom" : {'$regex' : data.topic, '$options' : 'i'}}, 
          {"createdAt": {$gt: data.period}}
        ]
      };
    }
    return this.find(query).select({"emotion": 1, "rating": 1,"isLike": 1,"ipaddress": 1,"emotionFrom": 1,"emotionBy": 1, "strength": 1, "_id": 0});
  },

  getTopMostPolledData: function(data) {
    const aggregator = [
      { $match: { createdAt: { $gte: data.from, $lte: data.to } } },
      { $group: { _id: { $toLower: "$emotionFrom" }, count: { $sum: 1 } } },
      { $sort: {count:-1} }, 
      { $limit : 5 }
    ];
    return this.aggregate(aggregator);
  },

  getResponseDataByCategory : function(req) {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const query = { 
      $and:[
        {"ipaddress" : req.ipaddress},
        {"emotionFrom" : {'$regex' : req.emotionFrom, '$options' : 'i'}}, 
        {"emotionBy":  {'$regex' : req.emotionBy, '$options' : 'i'}},
        {"createdAt": {$gt: date}}
      ]
    };
    return this.exists(query);
  }
};

const surveyModel = mongoose.model("SurveyResponse", surveyresponseSchema);
module.exports = surveyModel;
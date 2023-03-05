const { response } = require("../utils");

const responseHandler = (req, res, next) => {
  return res.json(response.ResponseModelFactory.GetSuccessResponseModel(res.locals.result));
};

module.exports = responseHandler;

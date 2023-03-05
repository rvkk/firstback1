const { errors, response } = require("../utils");

const exceptionHandler = (error, req, res, next) => {
  let errorCode = 500;
  if (error instanceof errors.GeneralError) {
    errorCode = error.getCode();
  }
  const responseModel = response.ResponseModelFactory.GetErrorResponseModel(errorCode, error.message);
  return res.status(errorCode).json(responseModel);
};

module.exports = exceptionHandler;

const loggerDao = require('../data-access-object/logger.dao');
const { errors } = require('../utils');
const bcrypt = require("bcryptjs");

exports.createLoggerData = function (requestData, methodName, loggerType, message){
    const loggerData = {
        "reqURL" : requestData.protocol + '://' + requestData.get('host') + requestData.originalUrl,
        "reqBody" : JSON.stringify(requestData.body),
        "method" : requestData.method,
        "apiMethod" : methodName,
        "type" : loggerType,
        "message" : message
      }
      loggerDao.create(loggerData);
}

exports.validateString =  function (stringToCheck, regexExpression, errorMessage) {
  if(!regexExpression.test(stringToCheck)){
      throw new errors.BadRequest(errorMessage);
  }
}

exports.encrypt = async function encrypt(stringToEncrypt){
  let salt = await bcrypt.genSalt(10);
  let encryptedDate = await bcrypt.hash(stringToEncrypt, salt);
  return encryptedDate;
}


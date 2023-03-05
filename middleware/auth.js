const jwt = require("jsonwebtoken");
const CONSTANTS = require("../config/const-data");
const { errors } = require("../utils");
const loggerDao = require('../data-access-object/logger.dao');

verifyToken = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    throw new errors.UnAuthorized("Empty Token");
  }
  try {
    const decoded = jwt.verify(token, CONSTANTS.SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (e) {
    let errorMessage;
    if (e instanceof jwt.TokenExpiredError) {
      errorMessage = "Un authenticate request";
      const loggerData = {
        "reqURL" : req.protocol + '://' + req.get('host') + req.originalUrl,
        "reqBody" : ' ',
        "method" : e.message,
        "apiMethod" : "auth",
        "type" : "Error",
        "message" : 'Un authenticate request'
      }
       loggerDao.create(loggerData);
    } else {
      const loggerData = {
        "reqURL" : req.protocol + '://' + req.get('host') + req.originalUrl,
        "reqBody" : ' ',
        "method" : e.message,
        "apiMethod" : "auth",
        "type" : "Error",
        "message" : 'Invalid Token'
      }
      loggerDao.create(loggerData);
      errorMessage = "Invalid Token";
    }
    throw new errors.UnAuthorized(errorMessage);
  }
};

retriveAuth = (req, res, next) => {
  const token = req.header("token");
  if (token) {
    try {
      const decoded = jwt.verify(token, CONSTANTS.SECRET_KEY);
      req.user = decoded.user;
    } catch (e) {
      console.log(e);
    }
  }
  next();
};

isAdmin = (req, res, next) => {
  if (req.user.role == CONSTANTS.ADMIN) {
    next();
  } else {
    throw new errors.Forbidden("Require Admin Role!");
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  retriveAuth
};
module.exports = authJwt;

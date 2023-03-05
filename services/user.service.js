const CONSTANTS = require("../config/const-data");
const helperClass = require("../utils/helper");
const { errors } = require('../utils');
const bcrypt = require("bcryptjs");
const User = require("../data-access-object/user.dao");
const jwt = require("jsonwebtoken");


//this method is used for validating signup request
exports.validateSignupRequest =  function (requestBody) {
    helperClass.validateString(requestBody.password, 
                                  CONSTANTS.PASSWORD_REGEX, 
                                  CONSTANTS.INVALID_PASSWORD_ERROR);
  
    helperClass.validateString(requestBody.email, 
                                  CONSTANTS.EMAIL_REGEX, 
                                  CONSTANTS.INVALID_EMAIL_ERROR);
    
    if(requestBody.firstname == '' || requestBody.firstname == undefined || requestBody.firstname == null || requestBody.firstname.length> 20){
      throw new errors.BadRequest(CONSTANTS.INVALID_NAME);
    }else{
      helperClass.validateString(requestBody.firstname, 
                                    CONSTANTS.NAME_REGEX, 
                                    CONSTANTS.INVALID_NAME);
    }
    if(requestBody.lastname == '' || requestBody.lastname == undefined || requestBody.lastname == null || requestBody.lastname.length> 20){
        throw new errors.BadRequest(CONSTANTS.INVALID_NAME);
      }else{
        helperClass.validateString(requestBody.lastname, 
                                      CONSTANTS.NAME_REGEX, 
                                      CONSTANTS.INVALID_NAME);
      }
}

exports.createUser = async(requestBody) => {
    let userBody =  requestBody;
    userBody.password = await helperClass.encrypt(userBody.password); 
    userBody = await User.create(userBody);
    return userBody;
}

exports.signinuser = async (email, password) => {
    let user = await User.getByEmail(email);
    if (!user) {
        throw new errors.UnAuthorized("Incorrect Email");
    }
    let isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
        throw new errors.UnAuthorized("Incorrect Email/Password");
    }
    return this.createLoginResponse(user);
}

exports.createLoginResponse = async(user) => {
    let payload = {
        user: {
          id: user.id
        }
    };
    let token = await jwt.sign(payload, CONSTANTS.SECRET_KEY, {
        expiresIn: 10000,
    });
    let responseData = {
        token,
        _expireIn: 10000,
        "message" : "Login Successful"
    };

    return responseData;
}


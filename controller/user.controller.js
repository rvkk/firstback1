const helperClass = require("../utils/helper");
const mailerClass = require("../utils/mailer");
const CONSTANTS = require("../config/const-data");
const userservice = require('../services/user.service');
const User = require("../data-access-object/user.dao");
const Otp = require("../data-access-object/emailotp.dao");
const jwt = require("jsonwebtoken");
const { errors } = require('../utils');
var nodemailer = require('nodemailer');
//sample
exports.signupUser = async (req, res, next) => {
    try{
        helperClass.createLoggerData(req,'signupUser',
                                        CONSTANTS.INFO_LOGGER_TYPE,'info');
        let user = req.body;
        userservice.validateSignupRequest(user);
        let responseData = await userservice.createUser(user);
        if(responseData){
            const expireIn = 10000;
            let token = '';
            const payload = {
                user: {
                  id: responseData._id
                }
              };
            token = await jwt.sign(payload, CONSTANTS.SECRET_KEY, {
                expiresIn: expireIn,
            });
            res.locals.result = {
                token,
                _expireIn: expireIn,
                "message" : "User Signup Successfully"
            };
        }
        next();
    }catch(err){
        helperClass.createLoggerData(req,'signupUser',
                                      CONSTANTS.ERROR_LOGGER_TYPE,`${JSON.stringify(err)}@@@${err.message}`);
        console.log(err);
        next(err);
    } 
    
} 

/** Sign in user */
exports.signinUser = async (req, res, next) => {
    try {
          helperClass.createLoggerData(req,'signinUser',
                                        CONSTANTS.INFO_LOGGER_TYPE,'info');
          const { email, password } = req.body;
          res.locals.result = await userservice.signinuser(email, password);
          next();
    } catch (err) {
          helperClass.createLoggerData(req,'signinUser',
                                              CONSTANTS.ERROR_LOGGER_TYPE,`${JSON.stringify(err)}@@@${err.message}`);
          next(err);
    }
}

exports.submitAuthResponse = async (req, res, next) => {
    try {
        const loggedInUser = await User.getById(req.user.id);
        if (!loggedInUser) {
          throw new errors.UnAuthorized("User Not Exist");
        }
        const surveyResponse = {
            user:req.user.id,
            emotion: req.body.emotion,
            rating: req.body.rating,
            isLike : req.body.isLike,
            emotionFrom : req.body.emotionFrom,
            emotionBy : req.body.emotionBy,
            ipaddress : req.body.ipaddress
        };
        console.log(surveyResponse)
        await SurveyResponse.create(surveyResponse);
        res.locals.result = 'Response submitted';
        next();
    }catch (err) {
        next(err);
    }
}

exports.sendEmail = async(req, res,next) => {
    try{
        const loggedInUser = await User.getByEmail(req.body.username);
        if (!loggedInUser) {
          throw new errors.UnAuthorized("User with this username not exist");
        }

        const val = Math.floor(1000 + Math.random() * 9000);


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'terragrok@gmail.com',
                pass: 'Welcome#12345'
            }
        });
          
        var mailOptions = {
            from: 'terragrok@gmail.com',
            to: req.body.username,
            text: `Your one time password is ${val}`,
            subject: 'OTP to reset password'
        };

       
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                next(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.locals.result = 'OTP sent sucessfully';
                next();
            }
        });

        let data = {
            "username" : req.body.username,
            "otp" : val,
            "user" : loggedInUser.id
        }

        const otpData = await Otp.getByUsername(req.body.username);
        if (!otpData) {
            await Otp.create(data);
        }else{
            await Otp.updateData(otpData.id, data);
        }
    }catch(err){
        next(err);
    }
}

exports.forgotPassword = async (req, res, next) => {
    try {
        mailerClass.seneEmail();
        res.locals.result = 'Mail Sent';
        next();
    }catch (err) {
        next(err);
    }
    
}

exports.verifyOtp = async (req, res, next) => {
    try{
        let otpData = await Otp.getByUsername(req.body.username);
        console.log(new Date() - otpData.updatedAt);
        console.log(new Date() - otpData.updatedAt <= 180000 );
        if(otpData && otpData.otp == req.body.otp ){
            if(new Date() - otpData.updatedAt <= 180000){
                let user = {
                    "id" : otpData.user
                }
                res.locals.result = await userservice.createLoginResponse(user);
                next();
            }else{
                throw new errors.UnAuthorized("OTP expired");
            }
            
        }else{
            throw new errors.UnAuthorized("OTP is incorrect");
        }

    }catch(err){
        next(err);
    }
}

exports.changePassword = async(req, res, next) => {
    try{
        const loggedInUser = await User.getById(req.user.id);
        if (!loggedInUser) {
          throw new errors.UnAuthorized("User Not Exist");
        }
        
        var password = await helperClass.encrypt(req.body.password); 
        let data = {
            "password" : password,
        }
        await User.updateData(req.user.id, data);
        res.locals.result = "Password updated successfully";
        next();

    }catch(err){
        next(err);
    }
}

exports.getUserProfile = async(req, res, next) => {
    try{
        const loggedInUser = await User.getById(req.user.id);
        if (!loggedInUser) {
          throw new errors.UnAuthorized("User Not Exist");
        }
        loggedInUser._id = null;
        loggedInUser.password = null;
        loggedInUser.createdAt = null;
        loggedInUser.updatedAt = null;
        loggedInUser.__v = null;
        res.locals.result = loggedInUser;
        next();
    }catch(err){
        next(err);
    }
}
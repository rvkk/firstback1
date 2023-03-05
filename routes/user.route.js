const User = require('../controller/user.controller');
const auth = require('../middleware/auth');

module.exports = (router, mainPath) => {
  router.post(`${mainPath}/signup`, User.signupUser);
  router.post(`${mainPath}/signin`, User.signinUser);
  router.post(`${mainPath}/submitAuthResponse`,auth.verifyToken, User.submitAuthResponse);
  router.post(`${mainPath}/forgotPassword`,User.forgotPassword);
  router.post(`${mainPath}/sendEmail` , User.sendEmail);
  router.post(`${mainPath}/verifyOtp` , User.verifyOtp);
  router.post(`${mainPath}/changePassword`,auth.verifyToken, User.changePassword);
  router.get(`${mainPath}/getUserProfile`,auth.verifyToken, User.getUserProfile);
}

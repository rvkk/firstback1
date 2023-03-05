const userRoutes = require("./user.route");
const uploadFiles = require("./upload-files.route");
const servey = require('./servey-response.route');

const ROUTES = {
  USER: "/user",
  UPLOAD_FILES: "/upload-files",
  SERVEY: "/servey"
};

module.exports = (router) => {
  userRoutes(router, ROUTES.USER);
  uploadFiles(router, ROUTES.UPLOAD_FILES);
  servey(router, ROUTES.SERVEY);
};

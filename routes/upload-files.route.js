const uploadMiddleware = require("../middleware/upload-middleware");
const uploadFilesController = require("../controller/upload-files.controller");

module.exports = (router, mainPath) => {
  router.post(
    `${mainPath}/image`,
    [uploadMiddleware.uploadImage],
    uploadFilesController.uploadImage
  );
};

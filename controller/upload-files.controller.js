exports.uploadImage = (req, res, next) => {
  try {
    res.locals.result = {
      fileName: req.file.filename,
    };
    next();
  } catch (err) {
    next(err);
  }
};

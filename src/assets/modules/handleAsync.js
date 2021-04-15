module.exports = cb => (req, res, next) => {
  cb(req, res, next).catch(err => next(err));
};
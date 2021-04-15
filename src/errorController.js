// const AppError = require("./assets/modules/appError");

const sendError = (err, _, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";

  sendError(err, req, res, next);
};
class AppError extends Error {
  constructor(message, code) {
    super(message);
    this.statusCode = code || 500;
    this.status = code.startsWith("4") ? "Failed" : "Error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
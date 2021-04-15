const logger = require("./index").error;
module.exports = () => (err, _1, _2, next) => {
  logger.error(err.message);
  logger.error(JSON.stringify(err.stack, null, 2));
  next(err);
};
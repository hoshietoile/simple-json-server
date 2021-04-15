// 参考
// https://qiita.com/Kento75/items/3c6ae1ba1b433ae433a3
const log4js = require("log4js");
const config = require("../../../config/log4js-config");

log4js.configure(config);
const console = log4js.getLogger();
const access = log4js.getLogger("access");
const error = log4js.getLogger("error");

module.exports = {
  console,
  error,
  access
};
const path = require("path");
const ROOT = path.join(__dirname, "./../");

module.exports = {
  appenders: {
    consoleLog: {
      type: "console"
    },
    errorLog: {
      type: "datefile",
      filename: path.join(ROOT, "./log/error/error.log"),
      pattern: "yyyy-mm-dd",
      keepFileExt: true
      // compress: true
    },
    accessLog: {
      type: "dateFile",
      filename: path.join(ROOT, "./log/access/access.log"),
      pattern: "yyyy-mm-dd",
      keepFileExt: true
      // compress: true
    }
  },
  categories: {
    default: {
      appenders: ["consoleLog"],
      level: "ALL"
    },
    error: {
      appenders: ["errorLog"],
      level: "ERROR"
    },
    access: {
      appenders: ["accessLog"],
      level: "INFO"
    }
  }
};
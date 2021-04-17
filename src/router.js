// dependencies
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const promisify = require("util").promisify;
const express = require("express");
const router = express.Router();
// modules
const controller = require("./controller");
const AppError = require("./assets/modules/appError");
// consts
const JSON_PATH = path.join(__dirname, process.env.JSON_PATH);
// const schemaPath = path.join(__dirname, "./schema")

router.use(async (req, _, next) => {
  try {
    const urlSplit = req.originalUrl.split("/");
    const resource = urlSplit[2];
    req["resource"] = resource;
    await promisify(fs.stat)(path.join(JSON_PATH, `${resource}.json`)).catch(err => {
      throw new AppError(err, "400");
    });
    next();
  } catch(e) {
    next(e);
  }
});

router
  .route("/")
  .get(controller.findAll)
  .post(controller.storeOne);

router
  .route("/:id")
  .get(controller.findOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

module.exports = router;
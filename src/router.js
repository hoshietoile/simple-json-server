const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.use((req, _, next) => {
  try {
    const urlSplit = req.originalUrl.split("/");
    const resource = urlSplit[2];
    req["resource"] = resource;
  } catch(e) {
    next(e);
  }
  next();
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
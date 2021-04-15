const handleAsync = require("./assets/modules/handleAsync");
const yieldResource = require("./assets/modules/yieldResource");

exports.findAll = handleAsync(async (req, res, next) => {
  const rsrc = yieldResource(req, next);
  console.log("findAll", rsrc);
  res.status(200).send();
});

exports.storeOne = handleAsync(async (req, res, next) => {
  const rsrc = yieldResource(req, next);
  console.log("storeOne", rsrc);
  
  res.status(200).send();
});

exports.findOne = handleAsync(async (req, res, next) => {
  const rsrc = yieldResource(req, next);
  console.log("findOne", rsrc);
  res.status(200).send();
});

exports.updateOne = handleAsync(async (req, res, next) => {
  const rsrc = yieldResource(req, next);
  console.log("updateOne", rsrc);
  res.status(200).send();
});

exports.deleteOne = handleAsync(async (req, res, next) => {
  const rsrc = yieldResource(req, next);
  console.log("deleteOne", rsrc);
  res.status(200).send();
});

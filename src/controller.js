// modules
require("dotenv").config();
const handleAsync = require("./assets/modules/handleAsync");
const yieldResource = require("./assets/modules/yieldResource");
// dependencies
const fs = require("fs");
const path = require("path");
const promisify = require("util").promisify;
// consts
const JSON_PATH = path.join(__dirname, process.env.JSON_PATH);

exports.findAll = handleAsync(async (req, res, next) => {
  const rsrc = yieldResource(req, next);
  const resources = await _getResource(rsrc);
  res.status(200).json({
    data: resources
  });
});

exports.storeOne = handleAsync(async (req, res, next) => {
  const rsrc = yieldResource(req, next);
  const reqData = req.body;
  const resources = await _getResource(rsrc);
  const id = _idProvider(resources);
  const storeTarget = { ...reqData, id };
  const newResources = resources.concat(storeTarget);
  await _storeResource(rsrc, newResources);
  
  res.status(201).json();
});

exports.findOne = handleAsync(async (req, res, next) => {
  const rsrc = yieldResource(req, next);
  const id = req.params.id;
  const resources = await _getResource(rsrc);
  const resource = resources.find(resource => resource.id === parseInt(id));
  res.status(200).json({
    data: resource
  });
});

exports.updateOne = handleAsync(async (req, res, next) => {
  const rsrc = yieldResource(req, next);
  const id = req.params.id;
  const reqData = req.body;
  const resources = await _getResource(rsrc);
  const resource = resources.find(resource => resource.id === parseInt(id));
  const newResource = { ...resource, ...reqData };
  const index = resources.findIndex(resource => resource.id === parseInt(id));
  resources.splice(index, 1);
  resources.push(newResource);
  await _storeResource(rsrc, resources);
  res.status(204).json();
});

exports.deleteOne = handleAsync(async (req, res, next) => {
  const rsrc = yieldResource(req, next);
  const id = req.params.id;
  const resources = await _getResource(rsrc);
  const index = resources.findIndex(resource => resource.id === parseInt(id));
  resources.splice(index, 1);
  await _storeResource(rsrc, resources);
  res.status(204).json();
});

const _idProvider = (resource) => {
  const ids = resource.reduce((red, cur) => [...red, parseInt(cur.id)], []);
  const latestId = Math.max(...ids);
  if (isNaN(parseInt(latestId))) return 1;
  return latestId + 1;
};

const _getResource = async (resource) => {
  const jsonData = await promisify(fs.readFile)(path.join(JSON_PATH, `${resource}.json`), {encoding: "utf8"});
  return JSON.parse(jsonData);
};

const _storeResource = async (resource, data) => {
  return await promisify(fs.writeFile)(path.join(JSON_PATH, `${resource}.json`), JSON.stringify(data));
};
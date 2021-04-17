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
  const users = await _getResource(rsrc);
  res.status(200).json({
    data: users
  });
});

exports.storeOne = handleAsync(async (req, res, next) => {
  const rsrc = yieldResource(req, next);
  const reqData = req.body;
  const users = await _getResource(rsrc);
  const id = _idProvider(users);
  const storeTarget = { ...reqData, id };
  const newUsers = users.concat(storeTarget);
  await _storeResource(rsrc, newUsers);
  
  res.status(201).json();
});

exports.findOne = handleAsync(async (req, res, next) => {
  const rsrc = yieldResource(req, next);
  const id = req.params.id;
  const users = await _getResource(rsrc);
  const user = users.find(user => user.id === parseInt(id));
  res.status(200).json({
    data: user
  });
});

exports.updateOne = handleAsync(async (req, res, next) => {
  const rsrc = yieldResource(req, next);
  const id = req.params.id;
  const reqData = req.body;
  const users = await _getResource(rsrc);
  const user = users.find(user => user.id === parseInt(id));
  const newUser = { ...user, ...reqData };
  const index = users.findIndex(user => user.id === parseInt(id));
  users.splice(index, 1);
  users.push(newUser);
  await _storeResource(rsrc, users);
  res.status(204).json();
});

exports.deleteOne = handleAsync(async (req, res, next) => {
  const rsrc = yieldResource(req, next);
  const id = req.params.id;
  const users = await _getResource(rsrc);
  const index = users.findIndex(user => user.id === parseInt(id));
  users.splice(index, 1);
  await _storeResource(rsrc, users);
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
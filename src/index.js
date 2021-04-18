// dependancies
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// modules
const errorLogger = require("./assets/modules/logs/errorLogger");
const accessLogger = require("./assets/modules/logs/accessLogger");
const globalErrorController = require("./errorController");
const AppError = require("./assets/modules/appError");

// consts
// const baseUrl = process.env.BASE_URL;
const port = process.env.PORT;

const app = express();
const router = require("./router");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

// access logs
app.use(accessLogger());

// routers
app.use("/api/users", router);

// error logs
app.use(errorLogger());

// 404 route
app.all("*", (_1, _2, next) => {
  return next(new AppError("Not Found.", "404"));
});

// global error handler
app.use(globalErrorController);

// server listen
app.listen(port, () => {
  console.log(`server's running on port ${port}...`);
});
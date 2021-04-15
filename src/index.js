// dependancies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
// modules
const errorLogger = require("./assets/modules/logs/errorLogger");
const accessLogger = require("./assets/modules/logs/accessLogger");
const globalErrorController = require("./errorController");
// consts
const baseUrl = process.env.BASE_URL;
const port = process.env.PORT;

const app = express();
const router = require("./router");

// TODO: mapping files

// TODO: middlewares
app.use(cors({
  origin: `http://${baseUrl}:${port}`,
  credentials: true
}));

app.use(accessLogger());

// TODO: router
app.use("/api/users", router);


// TODO: log
app.use(errorLogger());

// TODO: global error handler
app.use(globalErrorController);

app.listen(port, () => {
  console.log(`server's running on port ${port}...`);
});
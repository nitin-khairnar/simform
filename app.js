const express = require("express");
const app = express();
const {} = require("dotenv").config();
const port = process.env.PORT;
const mongoDB = require("./config/mongo-config.js");
const userRoute = require("./user-module/routes.js");

app.use(
  express.json({ limit: "200mb", type: "application/json", extended: true })
);
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);

const server = app.listen(port, mongoDB, function (err, result) {
  if (err) {
    console.log("[>>>] Error occurred while starting server!");
  } else {
    console.log("process Id - " + process.pid);
    console.log("app running on port.", server.address().port);
  }
});

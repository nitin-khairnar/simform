const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
const mongoDatabase = process.env.MONGO_DATABASE;

const mongoConnection = `${mongoURI}/${mongoDatabase}`;

const mongodbOptions = {
  useNewUrlParser: true,
};

const mongoConfig = mongoose.connect(
  mongoConnection,
  mongodbOptions,
  (err, result) => {
    if (err) {
      console.log("[>>>] Error occurred while connecting mongodb!");
    } else {
      console.log("[+++] MongoDB connected!");
    }
  }
);

module.exports = mongoConfig;

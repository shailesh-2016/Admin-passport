const { default: mongoose } = require("mongoose");

const MONGO_URL = "mongodb+srv://snmodi2020:Snmodi2020@projects.xeh2g.mongodb.net/";

exports.main = () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

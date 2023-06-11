const mongoose = require("mongoose");

let dotenv = require("dotenv");
const seedData = require("./seed/seed");
dotenv.config();
let URI = process.env.MONGO_URI;
const connectDB = () => {
  mongoose
    .connect(URI)
    .then(() => console.log("Database Connected to ", URI))
    .catch((e) => console.log(e));
};
module.exports = connectDB;

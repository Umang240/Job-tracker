const mongoose = require("mongoose");
const initData = require("./data.js"); 
const Application = require("../models/Application.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/job-tracker";

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(" Connected to MongoDB");

    await Application.deleteMany({}); // optional: clear old entries
    await Application.insertMany(initData.data);
    console.log(" Data was initialized");

    mongoose.connection.close(); 
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  }
}

main();
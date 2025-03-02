
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);



const connectDB = async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/test");
      console.log("DataBase connected successfully!");
    } catch (error) {
      console.error("DataBase connection error:", error);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;
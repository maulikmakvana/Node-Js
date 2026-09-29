const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  department: String,
  designation: String,
  salary: Number,
  joiningDate: String,
  experience: Number,
  createAt: String,
  updateAt: String
});

module.exports = mongoose.model("Employee", employeeSchema);
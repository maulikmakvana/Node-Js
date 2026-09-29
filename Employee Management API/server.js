const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");

connectDB();

const app = express();

app.use(express.json());

app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("Employee Management API is running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//config express
const express = require("express");

//config mongoose
const mongoose = require("mongoose");

//config app
const app = express();

// config env
require("dotenv").config();

//handling json
app.use(express.json());

//log the transactions
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// bare node app this will work in MVC we have separate controllers
app.get("/", (req, res) => {
  res.send("Hello from sever");
});

//Routes for New structure
const sampleRoutes = require("./routes/sample");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

app.use("/sample", sampleRoutes);
app.use("/user", userRoutes);
app.use("/admin",adminRoutes)

//connet Mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Mongo Datebase Connected!");
  })
  .catch((error) => {
    console.log(error);
  });

// config PORT from dotenv file
const PORT = process.env.BACKEND_PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT} `);
});

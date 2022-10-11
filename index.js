require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todolist");

const express = require("express");
const formidable = require("express-formidable");

const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

const taskRoute = require("./routes/tasks");
app.use(taskRoute);

const userRoute = require("./routes/users");
app.use(userRoute);

app.all("*", (req, res) => {
  res.status(400).json("Route introuvable ! 🦒");
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server has started");
});

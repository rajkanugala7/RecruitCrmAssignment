const express = require("express");
const mongoose = require("mongoose");
const { register } = require("./controllers/authController");
require('dotenv').config();

const app = express();
const uri = process.env.MONGO_URL;
mongoose.connect(uri).then(() => {
    console.log('Db connection successful');
  }).catch((err) => {
    console.error(err);
  });


app.get("/addUser", register);


app.listen("8080", () => {
    console.log("Main-service is listening at the port 8080");
})
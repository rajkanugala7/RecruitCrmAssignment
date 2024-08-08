const express = require("express");
const mongoose = require("mongoose");
const { register, login } = require("./controllers/authController");
require('dotenv').config();
const bodyParser = require('body-parser')
const auth=require("./routes/auth");
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())


const uri = process.env.MONGO_URL;
mongoose.connect(uri).then(() => {
    console.log('Db connection successful');
  }).catch((err) => {
    console.error(err);
  });


app.use("/api",auth);


app.listen("8080", () => {
    console.log("Main-service is listening at the port 8080");
})
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const employeeRoutes = require('./routes/employeeRoute')
require("./models/personModel");
require("./models/userModel");


mongoose.connect(
  "mongodb+srv://samer:AbZpTQr6MSrUf11w@cluster0.on79n.mongodb.net/people?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const app = express();

app.use(bodyParser.json());

employeeRoutes(app)



app.listen(5000);

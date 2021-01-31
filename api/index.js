const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoute");
require("./models/personModel");
require("./models/userModel");

mongoose.connect(
  "mongodb+srv://samer:AbZpTQr6MSrUf11w@cluster0.on79n.mongodb.net/people?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const app = express();

app.use(cors())
app.use(bodyParser.json());

employeeRoutes(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "seidor", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

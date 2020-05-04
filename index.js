const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
const routes = require('./routes/api');
const path = require('path');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

// Connecting to mongoDB using Mongoose package
mongoose.connect(process.env.DB, {useNewUrlParser: true})
  .then(() => console.log("DB connected yo"))
  .catch(err => console.log(err));


// Cors handling
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Initialising bodyParser package to read incoming JSON
app.use(bodyParser.json());

// Setting root and telling express to use routes
app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});



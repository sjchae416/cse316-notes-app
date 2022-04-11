const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Set up mongoose connection
var mongoDB = 'mongodb://localhost:27017/LibraryExample'; // insert your database URL here
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('server started!');
});

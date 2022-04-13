const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Note = require('./models/note');
const User = require('./models/user');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));
app.use(bodyParser.json());

//Set up mongoose connection
var mongoDB = 'mongodb://localhost:27017/Notes'; // insert your database URL here
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// get all notes
app.get('/api/notes', async function (req, res) {
  //  res.send('display notes here')
  const notes = await Note.find({});
  const modifiedNotes = notes.map((el) => {
    const ele = el.toObject();
    const ret = { ...ele, id: ele._id };
    delete ret['_id'];
    return ret;
  });
  // res.json(notes);
  res.json(modifiedNotes);
  console.log(notes);
});

// create new note

// update a note

// delete a note

port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('server started!');
});

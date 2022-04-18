const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Note = require('./models/note');
const User = require('./models/user');
const bodyParser = require('body-parser');
const note = require('./models/note');

const app = express();
app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set up mongoose connection
// var mongoDB = 'mongodb://localhost:27017/Notes'; // insert your database URL here
var mongoDB =
	'mongodb+srv://sjchae416:home612899@private.2anro.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'; // insert your database URL here
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// get all notes
app.get('/api/notes', async function (req, res) {
	// console.log(req.body);
	const notes = await Note.find({});
	const modifiedNotes = notes.map((mappedNote) => {
		return mappedNote.toObject();
	});
	// res.json(notes);
	console.log('🚀 ~ file: app.js ~ line 38 ~ modifiedNotes', modifiedNotes);
	res.json(modifiedNotes.reverse());
	// console.log(notes);
});

// create new note
app.post('/api/notes', async function (req, res) {
	console.log('Posted with body: ' + JSON.stringify(req.body));
	const newNote = new Note({
		text: req.body.text,
		lastUpdatedDate: req.body.lastUpdatedDate,
		tags: req.body.tags,
	});
	await newNote.save();
	res.json(newNote);
});

// update a note
app.put('/api/notes/:id', async function (req, res) {
	let id = req.params.id;
	console.log('PUT with id: ' + id + ', body: ' + JSON.stringify(req.body));
	// This below method automatically saves it to the database
	Note.findByIdAndUpdate(
		id,
		{
			text: req.body.text,
			lastUpdatedDate: req.body.lastUpdatedDate,
			tags: req.body.tags,
		},
		function (err, result) {
			if (err) {
				console.log('ERROR: ' + err);
				res.send(err);
			} else {
				// Status 204 represents success with no content
				// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
				res.sendStatus(204);
			}
		}
	);
});

// delete a note
app.delete('/api/notes/:id', async function (req, res) {
	let id = req.params.id;
	console.log(id);
	const afterDelete = await note.findByIdAndDelete(id);
	res.json(afterDelete);
});

// get user
app.get('/api/users', async function (req, res) {
	const users = await User.findOne({});

	res.json(users);
});

// create new user
app.post('/api/users', async function (req, res) {
	const newNote = new Note({
		name: req.body.name,
		email: req.body.email,
		colorScheme: req.body.colorScheme,
	});
	await newNote.save();
	res.json(newNote);
});

// update a user
app.put('/api/users/:id', async function (req, res) {
	const id = req.params.id;
	console.log(req.body);
	User.findByIdAndUpdate(
		id,
		{
			name: req.body.name,
			email: req.body.email,
			colorScheme: req.body.colorScheme,
		},
		function (err, result) {
			if (err) {
				console.log('ERROR: ' + err);
				res.send(err);
			} else {
				res.sendStatus(204);
			}
		}
	);
});

// delete a user
app.delete('/api/users/:id', async function (req, res) {
	let id = req.params.id;
	const afterDelete = await note.findByIdAndDelete(id);
	res.json(afterDelete);
});

port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log('server started!');
});

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Note = require('./models/note');
const User = require('./models/user');
const bodyParser = require('body-parser');
const note = require('./models/note');
const MongoStore = require('connect-mongo');
const session = require('express-session');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var mongoDB =
	'mongodb+srv://sjchae416:home612899@private.2anro.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const sessionSecret = 'make a secret string';

const store = MongoStore.create({
	mongoUrl: mongoDB,
	secret: sessionSecret,
	touchAfter: 24 * 60 * 60,
});

const sessionConfig = {
	store,
	name: 'session',
	secret: sessionSecret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
};

app.use(session(sessionConfig));

app.use((req, res, next) => {
	req.requestTime = Date.now();
	console.log(req.method, req.path);
	next();
});

app.use((err, req, res, next) => {
	console.log('Error handling called');
	res.statusMessage = err.message;

	if (err.name === 'ValidationError') {
		res.status(400).end();
	} else {
		res.status(500).end();
	}
});

// ANCHOR get all notes
app.get('/api/notes', async function (req, res) {
	const notes = await Note.find({ agent: req.session.userId });
	const modifiedNotes = notes.map((mappedNote) => {
		return mappedNote.toObject();
	});
	console.log('🚀 ~ file: app.js ~ line 38 ~ modifiedNotes', modifiedNotes);
	res.json(modifiedNotes.reverse());
});

// ANCHOR create new note
app.post('/api/notes', async function (req, res) {
	console.log('Posted with body: ' + JSON.stringify(req.body));
	const newNote = new Note({
		text: req.body.text,
		lastUpdatedDate: req.body.lastUpdatedDate,
		tags: req.body.tags,
		agent: req.session.userId,
	});
	await newNote.save();
	res.json(newNote);
});

// ANCHOR update a note
app.put('/api/notes/:id', async function (req, res) {
	let id = req.params.id;
	console.log('PUT with id: ' + id + ', body: ' + JSON.stringify(req.body));
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
				res.sendStatus(204);
			}
		}
	);
});

// ANCHOR delete a note
app.delete('/api/notes/:id', async function (req, res) {
	let id = req.params.id;
	console.log(id);
	const afterDelete = await note.findByIdAndDelete(id);
	res.json(afterDelete);
});

// ANCHOR get a user
app.get('/api/users/loggedInUser', async function (req, res) {
	const user = await User.findOne({ _id: req.session.userId });
	console.log(user);
	res.json(user);
});

// ANCHOR update a user
app.put('/api/users', async function (req, res) {
	const id = req.session.userId;
	console.log(req.body);
	User.findByIdAndUpdate(
		id,
		{
			name: req.body.name,
			email: req.body.email,
			colorScheme: req.body.colorScheme,
			profileImageUrl: req.body.profileImageUrl,
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

function wrapAsync(fn) {
	return function (req, res, next) {
		fn(req, res, next).catch((e) => next(e));
	};
}

// ANCHOR signup user
app.post(
	'/api/signup',
	wrapAsync(async function (req, res) {
		const { name, email, password } = req.body;
		const user = new User({ name, email, password });
		await user.save();
		req.session.userId = user._id;
		console.log(user);
		res.json(user);
	})
);

// ANCHOR login user
app.post(
	'/api/login',
	wrapAsync(async function (req, res) {
		const { email, password } = req.body;
		const user = await User.findAndValidate(email, password);
		console.log(user);
		if (user) {
			req.session.userId = user._id;
			res.json(user);
		} else {
			res.sendStatus(401);
		}
	})
);

// ANCHOR logout user
app.post(
	'/api/logout',
	wrapAsync(async function (req, res) {
		req.session.userId = null;
		res.sendStatus(204);
	})
);

port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log('server started!');
});

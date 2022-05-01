const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Note = require('./models/note');
const User = require('./models/user');
const bodyParser = require('body-parser');
const note = require('./models/note');
const MongoStore = require('connect-mongo'); // MongoDB session store
const session = require('express-session');

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

const sessionSecret = 'make a secret string';

// Create Mongo DB Session Store
const store = MongoStore.create({
	mongoUrl: mongoDB,
	secret: sessionSecret,
	touchAfter: 24 * 60 * 60,
});

// Setup to use the express-session package
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
		// later you would want to add: 'secure: true' once your website is hosted on HTTPS.
	},
};

app.use(session(sessionConfig));

// This is middleware that will run before every request
app.use((req, res, next) => {
	// We can set variables on the request, which we can then access in a future method
	req.requestTime = Date.now();
	console.log(req.method, req.path);
	// Calling next() makes it go to the next function that will handle the request
	next();
});

app.use((err, req, res, next) => {
	console.log('Error handling called');
	// If want to print out the error stack, uncomment below
	// console.error(err.stack)
	// Updating the statusMessage with our custom error message (otherwise it will have a default for the status code).
	res.statusMessage = err.message;

	if (err.name === 'ValidationError') {
		res.status(400).end();
	} else {
		// We could further interpret the errors to send a specific status based more error types.
		res.status(500).end();
	}
});

// SECTION get all notes
app.get('/api/notes', async function (req, res) {
	// console.log(req.body);
	const notes = await Note.find({ agent: req.session.userId });
	const modifiedNotes = notes.map((mappedNote) => {
		return mappedNote.toObject();
	});
	// res.json(notes);
	console.log('🚀 ~ file: app.js ~ line 38 ~ modifiedNotes', modifiedNotes);
	res.json(modifiedNotes.reverse());
	// console.log(notes);
});

// SECTION create new note
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

// SECTION update a note
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
				res.sendStatus(204);
			}
		}
	);
});

// SECTION delete a note
app.delete('/api/notes/:id', async function (req, res) {
	let id = req.params.id;
	console.log(id);
	const afterDelete = await note.findByIdAndDelete(id);
	res.json(afterDelete);
});

// SECTION get a user
app.get('/api/users/loggedInUser', async function (req, res) {
	const user = await User.findOne({ _id: req.session.userId });
	console.log(user);
	res.json(user);
});

// SECTION update a user
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

// // update a user
// app.put('/api/users/:id', async function (req, res) {
// 	const id = req.params.id;
// 	console.log(req.body);
// 	User.findByIdAndUpdate(
// 		id,
// 		{
// 			name: req.body.name,
// 			email: req.body.email,
// 			colorScheme: req.body.colorScheme,
// 		},
// 		function (err, result) {
// 			if (err) {
// 				console.log('ERROR: ' + err);
// 				res.send(err);
// 			} else {
// 				res.sendStatus(204);
// 			}
// 		}
// 	);
// });

// // delete a user
// app.delete('/api/users/:id', async function (req, res) {
// 	let id = req.params.id;
// 	const afterDelete = await note.findByIdAndDelete(id);
// 	res.json(afterDelete);
// });

function wrapAsync(fn) {
	return function (req, res, next) {
		fn(req, res, next).catch((e) => next(e));
	};
}

// SECTION signup user
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

// SECTION login user
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

// SECTION logout user
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

// SECTION upload single image
api.post(
	'/api/users/:id/file',
	upload.single('image'),
	wrapAsync(async function (req, res) {
		// You can see the file details here – it also gets automatically saved into the uploads folder
		// Again, this is an example of how this works but you would do something a little different in production.
		console.log('File uploaded of length: ' + req.file.size);
		console.dir(req.file);
		res.json('File uploaded successfully');
	})
);

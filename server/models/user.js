var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('../utils/validators');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	email: {
		type: String,
		validate: {
			validator: validator.validateEmail,
			message: (props) => `${props.value} is not a valid email!`,
		},
		required: true,
		trim: true, // This will trim the whitespace automatically from the email before saving
		unique: true,
	},
	colorScheme: {
		type: String,
		required: true,
	},
});

//Export model
module.exports = mongoose.model('User', UserSchema);

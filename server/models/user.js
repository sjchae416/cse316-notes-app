var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  color_scheme: { type: String, required: true },
});

//Export model
module.exports = mongoose.model('User', UserSchema);

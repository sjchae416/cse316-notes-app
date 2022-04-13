var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  text: { type: String },
  lastUpdatedDate: { type: String, required: true },
  tags: [{ text: { type: String, required: true } }],
});

//Export model
module.exports = mongoose.model('Note', NoteSchema);

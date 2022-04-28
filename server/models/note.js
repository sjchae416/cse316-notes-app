var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NoteSchema = new Schema(
	{
		text: { type: String },
		lastUpdatedDate: { type: Date, required: true },
		tags: [
			{
				text: { type: String, required: true },
				id: { type: String, required: true },
			},
		],
		agent: { type: Schema.Types.ObjectId, ref: 'User', required: false },
	},
	{ versionKey: false }
);

//Export model
module.exports = mongoose.model('Note', NoteSchema);

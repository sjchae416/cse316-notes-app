// import React from 'react';
// import { createNoteAPIMethod } from '../api/client';
// import { response } from 'express';
// import { dir } from 'async';
// import { useHistory } from 'react-router-dom';

function AddNote({ handleAddNote }) {
	// const history = userHistory();

	// const handleCreate = (note) => {
	// 	createNoteAPIMethod(note, (response) => {
	// 		console.log('Created the note on the server');
	// 		console.dir(response);
	// 		// // Transition to the edit author page
	// 		// history.push(`/authors/${response._id}`);
	// 	});
	// };

	return (
		<span onClick={handleAddNote} className="material-icons" id="icon-note-add">
			note_add
		</span>
	);
}
export default AddNote;

function AddNote({ handleAddNote }) {
	return (
		<span onClick={handleAddNote} className="material-icons" id="icon-note-add">
			note_add
		</span>
	);
}
export default AddNote;

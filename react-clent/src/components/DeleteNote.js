const DeleteNote = ({ handleDeleteNote }) => (
	<span
		onClick={handleDeleteNote}
		className="material-icons"
		id="icon-note-delete"
	>
		delete_outline
	</span>
);

export default DeleteNote;

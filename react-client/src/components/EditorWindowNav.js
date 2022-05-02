import DeleteNote from './DeleteNote';

const EditorWindowNav = ({
	handleDeleteNote,
	handleBackArrowClick,
	isNarrowScreen,
	selectedNoteIndex,
}) => (
	<div className="editor-window-nav" id="editor-window-top">
		{isNarrowScreen && (
			<span
				className="material-icons"
				id="icon-arrow"
				onClick={handleBackArrowClick}
			>
				arrow_back
			</span>
		)}
		<span className="material-icons">notification_add</span>
		<span className="material-icons">person_add_alt</span>
		{/* {notes.map((note) => ( */}
		<DeleteNote
			handleDeleteNote={selectedNoteIndex === -1 ? () => {} : handleDeleteNote}
		/>
		{/* ))} */}
	</div>
);

export default EditorWindowNav;

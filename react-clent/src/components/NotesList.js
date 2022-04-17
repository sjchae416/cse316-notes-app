import Note from './Note';

const NotesList = ({
	notes,
	selectedNoteId,
	stateSetSelectedNoteId,
	setNoteContentDisabled,
	noteContentRef,
	setIsSidebarWhenNarrowScreen,
}) => {
	return (
		<div className="notes-list">
			{notes
				.slice(0)
				.reverse()
				.map((note) => {
					return (
						<Note
							key={note.id}
							id={note.id}
							text={note.text}
							date={note.date}
							selectedNoteId={selectedNoteId}
							stateSetSelectedNoteId={stateSetSelectedNoteId}
							setNoteContentDisabled={setNoteContentDisabled}
							noteContentRef={noteContentRef}
							setIsSidebarWhenNarrowScreen={setIsSidebarWhenNarrowScreen}
						/>
					);
				})}
		</div>
	);
};
export default NotesList;

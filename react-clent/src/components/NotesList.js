import Note from './Note';

// const [notes, setNotes] = useState(props.notes);
// useEffect(() => {
//   setNotes(props.notes);
//   console.log(props.notes);
// }, [props.notes]);
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
					// console.log('note is: ');
					// console.log(note);
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

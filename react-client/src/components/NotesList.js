import Note from './Note';
import { getIdToIndex } from '../utils';

const NotesList = ({
	notes,
	selectedNoteIndex,
	setSelectedNoteIndex,
	noteContentRef,
	setIsSidebarWhenNarrowScreen,
	searchedNotes,
}) => {
	return (
		<div className="notes-list">
			{(searchedNotes ?? notes)
				.sort((note1, note2) => note2.lastUpdatedDate - note1.lastUpdatedDate)
				.map((note, idx) => {
					return (
						<Note
							key={`note-${idx}`}
							index={getIdToIndex(notes, note._id)}
							text={note.text}
							lastUpdatedDate={note.lastUpdatedDate}
							setSelectedNoteIndex={setSelectedNoteIndex}
							noteContentRef={noteContentRef}
							setIsSidebarWhenNarrowScreen={setIsSidebarWhenNarrowScreen}
							isSelected={idx === selectedNoteIndex}
						/>
					);
				})}
		</div>
	);
};
export default NotesList;

import Note from './Note';
import { getIdToIndex } from '../utils';

const NotesList = ({
	notes,
	setSelectedNoteIndex,
	noteContentRef,
	setIsSidebarWhenNarrowScreen,
}) => {
	return (
		<div className="notes-list">
			{notes
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
						/>
					);
				})}
		</div>
	);
};
export default NotesList;

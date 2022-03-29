import { useState, useEffect } from 'react';
import Note from './Note';

// const [notes, setNotes] = useState(props.notes);
// useEffect(() => {
//   setNotes(props.notes);
//   console.log(props.notes);
// }, [props.notes]);
const NotesList = ({
  notes, stateSetSelectedNoteId, setNoteContentDisabled, noteContentRef,
}) => (
  <div className="notes-list">
    {notes
      .slice(0)
      .reverse()
      .map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          date={note.date}
          stateSetSelectedNoteId={stateSetSelectedNoteId}
          setNoteContentDisabled={setNoteContentDisabled}
          noteContentRef={noteContentRef}
        />
      ))}
  </div>
);
export default NotesList;

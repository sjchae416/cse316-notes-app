import { useState, useEffect } from 'react';
import Note from './Note';

// const [notes, setNotes] = useState(props.notes);
// useEffect(() => {
//   setNotes(props.notes);
//   console.log(props.notes);
// }, [props.notes]);
const NotesList = ({
  notes,
  stateSetSelectedNoteId,
  setNoteContentDisabled,
  noteContentRef,
  setIsSidebarWhenNarrowScreen,
}) => {
  const handleNoteClick = (id) => {
    setIsSidebarWhenNarrowScreen(false);
    setNoteContentDisabled(false);
    stateSetSelectedNoteId(id);

    setTimeout(() => {
      noteContentRef.current.focus();
    }, 50);
  };

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
              handleClick={() => {
                handleNoteClick(note.id);
              }}
            />
          );
        })}
    </div>
  );
};
export default NotesList;

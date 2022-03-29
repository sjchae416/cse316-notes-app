const Note = ({
  id, text, date, stateSetSelectedNoteId, setNoteContentDisabled, noteContentRef,
}) => (
  <div
    onClick={() => {
      console.log(id);
      setNoteContentDisabled(false);
      stateSetSelectedNoteId(id);
      console.log(noteContentRef);
      setTimeout(() => {
        noteContentRef.current.focus();
      }, 50);
    }}
    className="note"
  >
    <div className="preview">{text || 'New Note'}</div>
    <div className="date">{date}</div>
  </div>
);

export default Note;

import DeleteNote from './DeleteNote';

const EditorWindowNav = ({
  note, handleDeleteNote, selectedNoteId, handleBackArrowClick, isNarrowScreen,
}) => (
  <div className="editor-window-nav" id="editor-window-top">
    { isNarrowScreen && (
    <span className="material-icons" id="icon-arrow" onClick={handleBackArrowClick}>
      arrow_back
    </span>
    )}
    <span className="material-icons">notification_add</span>
    <span className="material-icons">person_add_alt</span>
    {/* {notes.map((note) => ( */}
    <DeleteNote
      notes={note}
      handleDeleteNote={handleDeleteNote}
      selectedNoteId={selectedNoteId}
    />
    {/* ))} */}
  </div>
);

export default EditorWindowNav;

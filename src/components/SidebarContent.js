import NotesList from './NotesList';

const SidebarContent = ({
  notes, stateSetSelectedNoteId, setNoteContentDisabled, noteContentRef,
}) => (
  <div className="sidebar-content content">
    <div className="search-box">
      <span className="material-icons">search</span>
      <input
        className="input-search"
        type="text"
        placeholder="Search all notes"
      />
    </div>
    <NotesList
      notes={notes}
      stateSetSelectedNoteId={stateSetSelectedNoteId}
      setNoteContentDisabled={setNoteContentDisabled}
      noteContentRef={noteContentRef}
    />
  </div>
);

export default SidebarContent;

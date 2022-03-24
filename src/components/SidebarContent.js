import NotesList from "./NotesList";

const SidebarContent = ({ notes, stateSetSelectedNoteId }) => {
  return (
    <div className="sidebar-content content">
      <div className="search-box">
        <span className="material-icons">search</span>
        <input className="input-search" type="text" placeholder="Search all notes" />
      </div>
      {/* <NotesList notes={notes} handleGetId={handleGetId} stateSetSelectedNoteId={stateSetSelectedNoteId} /> */}
      <NotesList notes={notes} stateSetSelectedNoteId={stateSetSelectedNoteId} />
    </div>
  );
};

export default SidebarContent;
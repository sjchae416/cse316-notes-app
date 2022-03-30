import NotesList from './NotesList';

const SidebarContent = (props) => (
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
      {...props}
    />
  </div>
);

export default SidebarContent;

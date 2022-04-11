import DisplayProfilePage from './DisplayProfilePage';
import AddNote from './AddNote';

const SidebarNav = ({ notes, handleAddNote, openProfileModal }) => (
  <div className="sidebar-nav">
    <DisplayProfilePage openModal={openProfileModal} />
    <span className="sidebar-title">My Notes</span>
    <AddNote notes={notes} handleAddNote={handleAddNote} />
  </div>
);

export default SidebarNav;
import DisplayProfilePage from './DisplayProfilePage';
import AddNote from './AddNote';

const SidebarNav = ({ notes, handleAddNote, openProfileModal, profile }) => (
	<div className="sidebar-nav">
		<DisplayProfilePage openModal={openProfileModal} profile={profile} />
		<span className="sidebar-title">My Notes</span>
		<AddNote notes={notes} handleAddNote={handleAddNote} />
	</div>
);

export default SidebarNav;

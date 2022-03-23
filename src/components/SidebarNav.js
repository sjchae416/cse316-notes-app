import ProfilePhotoButton from "./ProfilePhotoButton";
import AddNote from "./AddNote";

const SidebarNav = (props) => {
  return (
    <div className="sidebar-nav nav">
      <ProfilePhotoButton />
      <span className="sidebar-title">My Notes</span>
      <AddNote notes={props.notes} handleAddNote={props.handleAddNote} />
    </div>
  )
}

export default SidebarNav;
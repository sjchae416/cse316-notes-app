const ProfilePage = ({
  handleProfileName,
  handleProfileEmail,
  handleProfileColorScheme,
  handleSaveClick,
  profile,
  handleClose,
  isNarrowScreen,
}) => (
  <form className="profile-form">
    <div className="profile-nav">
      <h1>Edit Profile</h1>
      <button
        className="button-close"
        id="button-close"
        type="button"
        onClick={handleClose}
      >
        X
      </button>
    </div>

    <div className="profile-image">
      <div className="img">
        <img
          className="profile-picture"
          id="profile-profile"
          src={`${process.env.PUBLIC_URL}/assets/images/keyboard.jpg`}
        />
      </div>
      <button className="button-add" type="button">
        Add New Image
      </button>
      <button className="button-remove" type="button">
        Remove Image
      </button>
    </div>

    <div className="profile-info">
      <label>
        <b>Name</b>
      </label>
      <input
        className="input-name"
        type="text"
        placeholder="Seungjun Chae"
        defaultValue={profile.name}
        onChange={(e) => {
          handleProfileName(e.target.value);
        }}
      />
      <label>
        <b>Email</b>
      </label>
      <input
        className="input-email"
        type="text"
        placeholder="seungjun.chae@stonybrook.edu"
        defaultValue={profile.email}
        onChange={(e) => {
          handleProfileEmail(e.target.value);
        }}
      />
      <label>
        <b>Color Scheme</b>
      </label>
      <select
        className="select-scheme"
        defaultValue={profile.colorScheme}
        onChange={(e) => {
          handleProfileColorScheme(e.target.value);
        }}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>

    <div className="profile-bottom">
      <input
        className="input-save"
        type="submit"
        value="Save"
        onClick={handleSaveClick}
      />
      {/* <button className="button-save" onClick={handleSaveClick}>Save</button> */}
      <button className="button-logout" type="button">
        Logout
      </button>
    </div>
  </form>
);

export default ProfilePage;

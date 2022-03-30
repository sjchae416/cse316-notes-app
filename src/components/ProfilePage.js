const ProfilePage = () => (
  <form className="profile-form">
    <div className="profile-nav">
      <h1>
        Edit Profile
      </h1>
      <button className="button-close" id="button-close" type="button">
        X
      </button>
    </div>

    <div className="profile-image">
      <div className="img">
        <img className="profile-picture" id="profile-profile" src={`${process.env.PUBLIC_URL}/assets/images/keyboard.jpg`} />
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
      <input className="input-name" type="text" placeholder="Seungjun Chae" />
      <label>
        <b>Email</b>
      </label>
      <input className="input-email" type="text" placeholder="seungjun.chae@stonybrook.edu" />
      <label>
        <b>Color Scheme</b>
      </label>
      <select className="select-scheme">
        <option value="light">
          Light
        </option>
        <option value="dark">
          Dark
        </option>
      </select>
    </div>

    <div className="profile-bottom">
      <input
        className="input-save"
        type="submit"
        value="Save"
      />
      <button className="button-logout" type="button">
        Logout
      </button>
    </div>
  </form>
);

export default ProfilePage;

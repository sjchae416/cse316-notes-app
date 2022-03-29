function DisplayProfilePage() {
  return (
    <button className="button-profile" id="button-profile" type="button">
      <img className="profile-picture" src={`${process.env.PUBLIC_URL}/assets/images/keyboard.jpg`} />
    </button>
  );
}

export default DisplayProfilePage;

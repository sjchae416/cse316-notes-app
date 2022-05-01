function DisplayProfilePage({ openModal, profile }) {
	return (
		<button
			className="button-profile"
			id="button-profile"
			type="button"
			onClick={openModal}
		>
			<img
				className="profile-picture"
				src={
					profile?.profileImageUrl ||
					`${process.env.PUBLIC_URL}/assets/images/keyboard.jpg`
				}
			/>
		</button>
	);
}

export default DisplayProfilePage;

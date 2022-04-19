function DisplayProfilePage({ openModal }) {
	return (
		<button
			className="button-profile"
			id="button-profile"
			type="button"
			onClick={openModal}
		>
			<img
				className="profile-picture"
				src={`${process.env.PUBLIC_URL}/assets/images/keyboard.jpg`}
			/>
		</button>
	);
}

export default DisplayProfilePage;

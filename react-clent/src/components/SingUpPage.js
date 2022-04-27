function SignUpPage() {
	const testFunction = () => {
		window.alert('This is a Login Page');
	};

	return (
		<div id="wrapper-signup">
			<div id="signup-header">
				<h1 id="signup-title">Sign Up</h1>
				<button id="btn-signup-close">X</button>
			</div>
			<div id="signup-input">
				<label>Name</label>
				<input id="signup-input-name" type="text" />
				<label>Emai</label>
				<input id="signup-input-email" type="text" />
				<label>Password</label>
				<input id="signup-input-password" type="text" />
			</div>
			<div id="btn-singup-container">
				<button id="btn-signup">Sign Up</button>
			</div>
		</div>
	);
}

export default SignUpPage;

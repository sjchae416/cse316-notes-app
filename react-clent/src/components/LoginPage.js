function LoginPage() {
	const testFunction = () => {
		window.alert('This is a Login Page');
	};

	return (
		<div id="wrapper-login">
			<div id="login-title">
				<h1>Notes</h1>
			</div>
			<div id="login-slogan">
				<h2>Organize all your thoughts in one place</h2>
			</div>
			<div id="login-overlay">
				<div id="login-input">
					<label>Email</label>
					<input id="login-input-email" type="text" />
					<label>Password</label>
					<input id="login-input-password" type="type" />
				</div>
				<div className="btn-login-container">
					<button id="btn-login">Log in</button>
				</div>
				<div className="btn-create-container">
					<button id="btn-create">Create New Account</button>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;

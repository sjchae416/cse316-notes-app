import React, { useState } from 'react';
import { loginUserAPIMethod } from '../api/client';

function LoginPage({ setUser, setIsLoginPage }) {
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');

	const onChangeEmail = (event) => {
		console.log(event.target.value);
		let loginEmail = event.target.value;
		setLoginEmail(loginEmail);
	};

	const onChangePassword = (event) => {
		console.log(event.target.value);
		let loginPassword = event.target.value;
		setLoginPassword(loginPassword);
	};

	const login = async () => {
		try {
			const user = await loginUserAPIMethod({
				email: loginEmail,
				password: loginPassword,
			});
			console.log('user: ', user);
			setUser(user);
		} catch (e) {
			console.log(e);
		}
	};

	const displaySignUpPage = () => {
		setIsLoginPage(false);
	};

	return (
		<div id="wrapper-login">
			<div id="login-title">
				<h1>Notes</h1>
				<h2>Organize all your thoughts in one place</h2>
			</div>
			<div id="login-overlay">
				<div id="login-input">
					<label>Email</label>
					<input id="login-input-email" type="text" onChange={onChangeEmail} />
					<label>Password</label>
					<input
						id="login-input-password"
						type="password"
						onChange={onChangePassword}
					/>
				</div>
				<div id="error-msg">Error: Invalid email and/or password</div>
				<div className="login-btn">
					<button id="btn-login" onClick={login}>
						Log in
					</button>
					<hr />
					<button id="btn-sign-up" onClick={displaySignUpPage}>
						Create New Account
					</button>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;

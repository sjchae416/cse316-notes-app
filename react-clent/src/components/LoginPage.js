import React, { useState } from 'react';
import { getUserAPIMethod, loginUserAPIMethod } from '../api/client';

function LoginPage({ setUser }) {
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
			await loginUserAPIMethod({ email: loginEmail, password: loginPassword });
			const user = await getUserAPIMethod();
			console.log('user', user);
			setUser(user);
		} catch (e) {
			console.log(e);
		}
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
					<input id="login-input-email" type="text" onChange={onChangeEmail} />
					<label>Password</label>
					<input
						id="login-input-password"
						type="type"
						onChange={onChangePassword}
					/>
				</div>
				<div className="btn-login-container">
					<button id="btn-login" onClick={login}>
						Log in
					</button>
				</div>
				<div className="btn-create-container">
					<button id="btn-create">Create New Account</button>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;

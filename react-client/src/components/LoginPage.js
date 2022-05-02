import React, { useState } from 'react';
import { loginUserAPIMethod } from '../api/client';
import SignUpPage from './SignUpPage';

function LoginPage({ setUser, setIsLoginPage }) {
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const loginErrorMsg = document.getElementById('error-msg');
	const [show, setShow] = useState(false);

	// console.log('LOGIN PAGE');

	const onChangeEmail = (event) => {
		// loginErrorMsg.style.display = 'none';
		document.getElementById('error-msg').style.display = 'none';
		let loginEmail = event.target.value;
		setLoginEmail(loginEmail);
	};

	const onChangePassword = (event) => {
		// loginErrorMsg.style.display = 'none';
		document.getElementById('error-msg').style.display = 'none';

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
			document.getElementById('error-msg').style.display = 'block';
		}
	};

	const displaySignUpPage = () => {
		setIsLoginPage(false);
	};

	return (
		// NOTE delete div#start-page and SignUpPage component to restore
		<div id="start-page">
			<div id="wrapper-login">
				<div id="login-title">
					<h1>Notes</h1>
					<h2>Organize all your thoughts in one place</h2>
				</div>
				<div id="login-overlay">
					<div id="login-input">
						<label>Email</label>
						<input
							id="login-input-email"
							type="text"
							onChange={onChangeEmail}
						/>
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
						{/* <button id="btn-sign-up" onClick={displaySignUpPage}> */}
						<button id="btn-sign-up" onClick={() => setShow(true)}>
							Create New Account
						</button>
					</div>
				</div>
			</div>
			<SignUpPage show={show} onClose={() => setShow(false)} />
		</div>
	);
}

export default LoginPage;

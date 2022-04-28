import React, { useState } from 'react';
import { registerUserAPIMethod } from '../api/client';

function SignUpPage() {
	// user,
	// setSignup,
	// handleRegister,
	// setSignupName,
	// setSignupEmail,
	// setSignupPassword
	const [signupName, setSignupName] = useState('');
	const [signupEmail, setSignupEmail] = useState('');
	const [signupPassword, setSignupPassword] = useState('');

	const onChangeName = (event) => {
		console.log(event.target.value);
		let signupName = event.target.value;
		setSignupName(signupName);
	};

	const onChangeEmail = (event) => {
		console.log(event.target.value);
		let signupEmail = event.target.value;
		setSignupEmail(signupEmail);
	};

	const onChangePassword = (event) => {
		console.log(event.target.value);
		let signupPassword = event.target.value;
		setSignupPassword(signupPassword);
	};

	const handleRegister = async () => {
		try {
			const newUser = await registerUserAPIMethod({
				name: signupName,
				email: signupEmail,
				password: signupPassword,
			});
			console.log(newUser);
			//TODO setProfile 해주고, profile 유무에 따라 로그인화면인지 아닌지 보여주기
		} catch (e) {
			console.log('signupfailed');
			console.error(e);
		}
	};

	return (
		<div id="wrapper-signup">
			<div id="signup-header">
				<h1 id="signup-title">Sign Up</h1>
				<button id="btn-signup-close">X</button>
			</div>
			<div id="signup-input">
				<label>Name</label>
				<input id="signup-input-name" type="text" onChange={onChangeName} />
				<label>Email</label>
				<input id="signup-input-email" type="text" onChange={onChangeEmail} />
				<label>Password</label>
				<input
					id="signup-input-password"
					type="text"
					onChange={onChangePassword}
				/>
			</div>
			<div id="btn-singup-container">
				<button id="btn-signup" onClick={handleRegister}>
					Sign Up
				</button>
			</div>
		</div>
	);
}

export default SignUpPage;

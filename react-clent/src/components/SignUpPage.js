import React, { useState } from 'react';
import { signUpUserAPIMethod } from '../api/client';

function SignUpPage({ setUser }) {
	const [signUpName, setSignUpName] = useState('');
	const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  
  console.log('SIGN UP PAGE');

	const onChangeName = (event) => {
		console.log(event.target.value);
		let signUpName = event.target.value;
		setSignUpName(signUpName);
	};

	const onChangeEmail = (event) => {
		console.log(event.target.value);
		let signUpEmail = event.target.value;
		setSignUpEmail(signUpEmail);
	};

	const onChangePassword = (event) => {
		console.log(event.target.value);
		let signUpPassword = event.target.value;
		setSignUpPassword(signUpPassword);
	};

	const handleSignUp = async () => {
		try {
			const newUser = await signUpUserAPIMethod({
				name: signUpName,
				email: signUpEmail,
				password: signUpPassword,
			});
			setUser(newUser);
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
			<div id="btn-sign-up-container">
				<button id="btn-sign-up" onClick={handleSignUp}>
					Sign Up
				</button>
			</div>
		</div>
	);
}

export default SignUpPage;

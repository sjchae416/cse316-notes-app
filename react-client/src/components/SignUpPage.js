import React, { useState } from 'react';
import { signUpUserAPIMethod } from '../api/client';

function SignUpPage({ setUser, setIsLoginPage, show, onClose }) {
	const [signUpName, setSignUpName] = useState('');
	const [signUpEmail, setSignUpEmail] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
	const signUpErrorMsg = document.getElementById('error-msg');

	// console.log('SIGN UP PAGE');
	// NOTE 1 character before an @ symbol, followed by domain name
	// NOTE minimum 6 characters in length

	const closeSignUpPage = () => {
		setIsLoginPage(true);
	};

	const onChangeName = (event) => {
		// signUpErrorMsg.style.display = 'none';
		console.log(event.target.value);
		let signUpName = event.target.value;
		setSignUpName(signUpName);
	};

	const onChangeEmail = (event) => {
		// signUpErrorMsg.style.display = 'none';
		console.log(event.target.value);
		let signUpEmail = event.target.value;
		setSignUpEmail(signUpEmail);
	};

	const onChangePassword = (event) => {
		// signUpErrorMsg.style.display = 'none';
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
			document.getElementById('error-msg').style.display = 'block';
		}
	};

	if (!show) {
		return null;
	}

	return (
		// NOTE delete div#sign-up-modal to restore
		<div id="sign-up-modal" onClick={onClose}>
			<div id="wrapper-sign-up" onClick={(e) => e.stopPropagation()}>
				<div id="sign-up-header">
					<h1 id="sign-up-title">Sign Up</h1>
					{/* <button id="btn-sign-up-close" onClick={closeSignUpPage}> */}
					<button id="btn-sign-up-close" onClick={onClose}>
						X
					</button>
				</div>
				<div id="sign-up-input">
					<label>Name</label>
					<input id="sign-up-input-name" type="text" onChange={onChangeName} />
					<label>Email</label>
					<input
						id="sign-up-input-email"
						type="text"
						onChange={onChangeEmail}
					/>
					<label>Password</label>
					<input
						id="sign-up-input-password"
						type="text"
						onChange={onChangePassword}
					/>
				</div>
				<div id="error-msg">Error: Invalid email and/or password</div>
				<div id="btn-sign-up-container">
					<button id="btn-sign-up" onClick={handleSignUp}>
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
}

export default SignUpPage;

import React, { useEffect, useState } from 'react';
import Home from './Home';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import { getUserByIdAPIMethod } from './api/client';

const App = () => {
	const [profile, setProfile] = useState();
	const [isLogInPage, setIsLoginPage] = useState(true);

	useEffect(() => {
		const autoLogin = async () => {
			try {
				const user = await getUserByIdAPIMethod();
				if (user) {
					setProfile(user);
				}
			} catch (e) {
				console.log('there is no such session or expired');
				return;
			}
		};
		autoLogin();
	}, []);
	return (
		<>
			{profile ? (
				<Home profile={profile} setProfile={setProfile} />
			) : isLogInPage ? (
				<LoginPage setUser={setProfile} setIsLoginPage={setIsLoginPage} />
			) : (
				<SignUpPage setUser={setProfile} />
			)}
		</>
	);
};

export default App;

// ANCHOR about tags
// NOTE
// TODO
// SECTION
// FIXME
// REVIEW

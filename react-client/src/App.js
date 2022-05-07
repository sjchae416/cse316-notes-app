import React, { useEffect, useState } from 'react';
import Home from './Home';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import { getUserByIdAPIMethod } from './api/client';

const App = () => {
	const [profile, setProfile] = useState();
	const [isLogInPage, setIsLoginPage] = useState(true);

	useEffect(() => {}, []);

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
			{
				profile ? (
					<Home
						profile={profile}
						setProfile={setProfile}
						setIsLoginPage={setIsLoginPage}
					/>
				) : isLogInPage ? (
					<LoginPage setUser={setProfile} setIsLoginPage={setIsLoginPage} />
				) : null
				// NOTE delete null and uncomment bottom lines to restore
				//   (
				// <SignUpPage setUser={setProfile} setIsLoginPage={setIsLoginPage} />
				// )
			}
		</>
	);
};

export default App;

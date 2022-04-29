import React, { useEffect, useState } from 'react';
import Home from './Home';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SingUpPage';
import { getUserByIdAPIMethod } from './api/client';

const App = () => {
	const [profile, setProfile] = useState();
	const [isLogInPage, setIsLogInPage] = useState(true);

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
				<Home profile={profile} setProfile={profile} />
			) : isLogInPage ? (
				<LoginPage setUser={setProfile} setIsLogInPage={setIsLogInPage} />
			) : (
				<SignUpPage setUser={setProfile} />
			)}
		</>
	);
};

export default App;

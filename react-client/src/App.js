import React, { useEffect, useState } from 'react';
import Home from './Home';
import LoginPage from './components/LoginPage';
import { getUserByIdAPIMethod } from './api/client';
import { loadModel } from './universalSentenceEncoder';

loadModel();

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
			{profile ? (
				<Home
					profile={profile}
					setProfile={setProfile}
					setIsLoginPage={setIsLoginPage}
				/>
			) : isLogInPage ? (
				<LoginPage setUser={setProfile} setIsLoginPage={setIsLoginPage} />
			) : null}
		</>
	);
};

export default App;

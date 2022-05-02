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

// ANCHOR - Used to indicate a section in your file
// TODO - An item that is awaiting completion
// FIXME - An item that requires a bugfix
// STUB - Used for generated default snippets
// NOTE - An important note for a specific code section
// REVIEW - An item that requires additional review
// SECTION - Used to define a region (See 'Hierarchical anchors')
// LINK - Used to link to a file that can be opened within the editor (See 'Link Anchors')

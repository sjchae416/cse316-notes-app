import { useEffect } from 'react';
import {
	logoutUserAPIMethod,
	updateUserAPIMethod,
	uploadImageToCloudinaryAPIMethod,
} from '../api/client';

const ProfilePage = ({
	handleProfileName,
	handleProfileEmail,
	handleProfileColorScheme,
	handleSaveClick,
	handleClose,
	closeButtonRef,
	saveButtonRef,
	isNarrowScreen,
	profile,
	setProfile,
	setIsLoginPage,
	imageUploadButtonRef,
}) => {
	const handleLogout = async () => {
		console.log('user logged out');
		await logoutUserAPIMethod({
			profile,
		});

		setProfile(null);
		setIsLoginPage(true);
	};

	useEffect(() => {
		console.log('what the profile', profile);
	}, [profile]);

	const handleImageSelected = async (event) => {
		event.preventDefault();
		console.log('New File Selected');
		if (event.target.files && event.target.files[0]) {
			// Could also do additional error checking on the file type, if we wanted
			// to only allow certain types of files.
			const selectedFile = event.target.files[0];
			console.dir(selectedFile);

			const formData = new FormData();
			// TODO: You need to create an "unsigned" upload preset on your Cloudinary account
			// Then enter the text for that here.
			const unsignedUploadPreset = 'wbsf92da';
			formData.append('file', selectedFile);
			formData.append('upload_preset', unsignedUploadPreset);

			console.log('Cloudinary upload');
			const imageResponse = await uploadImageToCloudinaryAPIMethod(formData);
			console.log('Upload success');
			console.dir(imageResponse);

			// Now the URL gets saved to the author
			const updatedUser = { ...profile, profileImageUrl: imageResponse.url };
			setProfile(updatedUser);

			// Now we want to make sure this is updated on the server – either the
			// user needs to click the submit button, or we could trigger the server call here
			const cloudInput = document.getElementById('cloudinary');
			// console.log('Uploaded cloud', cloudInput.value);
			cloudInput.value = null;
			// console.log('Uploaded cloud after clean', cloudInput.value);
		}
	};

	const handleClickImageInput = (e) => {
		e.preventDefault();
		document.getElementById('cloudinary').click();
	};

	const handleRemoveImage = (e) => {
		e.preventDefault();
		const updatedUser = { ...profile, profileImageUrl: '' };
		setProfile(updatedUser);
	};

	return (
		<form className="profile-form">
			<div className="profile-nav">
				<h1>Edit Profile</h1>
				<button
					className="button-close"
					id="button-close"
					type="button"
					onClick={handleClose}
					ref={closeButtonRef}
				>
					X
				</button>
			</div>

			<div className="profile-image">
				<div className="img">
					<img
						className="profile-picture"
						id="profile-profile"
						src={
							profile?.profileImageUrl ||
							`${process.env.PUBLIC_URL}/assets/images/keyboard.jpg`
						}
					/>
				</div>

				<div className="input-image">
					<input
						type="file"
						name="image"
						accept="image/*"
						id="cloudinary"
						onChange={handleImageSelected}
						style={{ display: 'none' }}
					/>
					<button
						ref={imageUploadButtonRef}
						id="btn-add-image"
						onClick={handleClickImageInput}
					>
						Add Image
					</button>
				</div>
				<button id="btn-remove-image" onClick={handleRemoveImage}>
					Remove Image
				</button>
			</div>

			<div className="profile-info">
				<label>
					<b>Name</b>
				</label>
				<input
					className="input-name"
					type="text"
					placeholder="Seungjun Chae"
					defaultValue={profile.name}
					onChange={(e) => {
						handleProfileName(e.target.value);
					}}
				/>
				<label>
					<b>Email</b>
				</label>
				<input
					className="input-email"
					type="text"
					placeholder="seungjun.chae@stonybrook.edu"
					defaultValue={profile.email}
					onChange={(e) => {
						handleProfileEmail(e.target.value);
					}}
				/>
				<label>
					<b>Color Scheme</b>
				</label>
				<select
					className="select-scheme"
					value={profile.colorScheme}
					onChange={(e) => {
						handleProfileColorScheme(e.target.value);
					}}
				>
					<option value="Light">Light</option>
					<option value="Dark">Dark</option>
				</select>
			</div>

			<div className="profile-bottom">
				<input
					className="input-save"
					type="submit"
					value="Save"
					ref={saveButtonRef}
					onClick={handleSaveClick}
				/>
				{/* <button className="button-save" onClick={handleSaveClick}>Save</button> */}
				<button className="button-logout" type="button" onClick={handleLogout}>
					Logout
				</button>
			</div>
		</form>
	);
};

export default ProfilePage;

import '../auth/user.js';
import { updateProfile, getProfile, getUser, uploadImage } from '../fetch-utils.js';

// DOM
const uploadButton = document.getElementById('upload-button');
const profileForm = document.getElementById('profile-form');
const errorDisplay = document.getElementById('error-display');
const userNameInput = profileForm.querySelector('[name=user_name]');
const bioTextArea = profileForm.querySelector('[name=email]');
const profileName = document.getElementById('profile-name');
const previewImage = document.getElementById('preview');

/*  state */
let profile = null;
let error = null;
const user = getUser();

/* events */

window.addEventListener('load', async () => {
    const response = await getProfile(user.id);

    error = response.error;
    profile = response.data;

    if (error) {
        displayError();
    }
    if (profile) {
        displayProfile();
        profileName.textContent = profile.username;
        previewImage.src = profile.image_url;
    }
});

profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(profileForm);
    let url = null;

    const imageFile = formData.get('avatar_url');

    if (imageFile) {
        const randomFolder = Math.floor(Date.now() * Math.random());
        const imagePath = `/${randomFolder}/${imageFile.name}`;

        url = await uploadImage('avatars', imagePath, imageFile);
    }

    const profile = {
        user_name: formData.get('user_name'),
        email: formData.get('email'),
        image_url: url,
        user_id: user.id,
    };

    const response = await updateProfile(profile);

    error = response.error;

    if (error) {
        displayError();
    } else {
        // something
    }
});

uploadButton.addEventListener('change', () => {
    const file = uploadButton.files[0];
    if (file) {
        previewImage.src = URL.createObjectURL(file);
    } else {
        previewImage.src = '../assets/place-holder.png';
    }
});

// display functions
function displayProfile() {
    // > Part B: update user name and bio from profile object
    // console.log('profile username: ' + profile.username);
    userNameInput.value = profile.user_name;
    bioTextArea.value = profile.email;
}
function displayError() {
    errorDisplay.textContent = error.message;
}

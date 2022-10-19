/* Imports */
// this will check if we have a user and set signout link if it exists

import './auth/user.js';
import { getUser, getProfile } from './fetch-utils.js';

/* Get DOM Elements */
const profileName = document.getElementById('profile-name');
const previewImage = document.getElementById('preview-image');
const userAvatar = document.getElementById('user-avatar');
const errorDisplay = document.getElementById('error-display');

// conversionOption = document.getElementById('conversion-option');

/* State */
let profile = null;
let error = null;
const user = getUser();
/* Events */

window.addEventListener('load', async () => {
    const response = await getProfile(user.id);

    error = response.error;
    profile = response.data;

    if (error) {
        displayError();
    }
    if (profile) {
        displayProfile();
        profileName.textContent = profile.user_name;
        userAvatar.src = profile.image_url;
    }
});

/* Display Functions */
function displayProfile() {
    // userNameInput.value = profile.user_name;
    // bioTextArea.value = profile.email;
}
function displayError() {
    errorDisplay.textContent = error.message;
}

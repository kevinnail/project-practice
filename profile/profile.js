import '../auth/user.js';
import { updateProfile, getProfile, getUser } from '../fetch-utils.js';

// DOM
const updateButton = document.getElementById('update-button');
const profileForm = document.getElementById('profile-form');
const errorDisplay = document.getElementById('error-display');
const userNameInput = profileForm.querySelector('[name=user_name]');
const bioTextArea = profileForm.querySelector('[name=email]');

/*  state */
let profile = null;
let error = null;
const user = getUser();

/* events */

window.addEventListener('load', async () => {
    // > Part B:
    //      - get the profile based on user.id
    //      - set profile and error state from response object
    const response = await getProfile(user.id);
    console.log('user.id', user.id);
    console.log('response.data', response.data);

    error = response.error;
    profile = response.data;

    if (error) {
        displayError();
    }
    if (profile) {
        displayProfile();
    }
});

profileForm.addEventListener('submit', async (e) => {
    // keep the form from changing the browser page
    e.preventDefault();

    // niceties for "saving" and errors:
    // reset the error
    errorDisplay.textContent = '';

    // create a form data object for easy access to form values
    const formData = new FormData(profileForm);
    console.log('formData', formData.get('user_name'));

    const profileUpdate = {
        user_name: formData.get('user_name'),
        email: formData.get('email'),
    };
    //      - call updateProfile passing in profile update object, capture the response
    // const response = null; // ??????
    // console.log('profileUpdate', profileUpdate);

    const response = await updateProfile(profileUpdate);
    // console.log('response', response);

    error = response.error;

    // did it work?
    if (error) {
        // display the error
        displayError();
    } else {
        // > Part A: uncomment when working to redirect user
        // location.assign('../');
        // alert('else');
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

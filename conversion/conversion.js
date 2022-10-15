import { createPost } from '../fetch-utils.js';
import '../auth/user.js';

const errorDisplay = document.getElementById('error-display');
const conversionForm = document.getElementById('conversion-form');

let error = null;

conversionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(conversionForm);

    const post = {
        description: formData.get('description'),
    };

    const response = await createPost(post);
    error = response.error;

    if (error) {
        displayError();
    } else {
        // location.assign('/');
    }
});

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

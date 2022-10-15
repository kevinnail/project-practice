// imports

import { createPost, getItems } from '../fetch-utils.js';
import { renderConversionOption } from '../render-utils.js';
import '../auth/user.js';

//  DOM elements

const errorDisplay = document.getElementById('error-display');
const conversionForm = document.getElementById('conversion-form');
const conversionSelect = document.getElementById('conversion-select');

// state
let error = null;
let items = [];
// events

window.addEventListener('load', async () => {
    const conversionOption = await getItems();
    items = conversionOption.data;

    if (!error) {
        displayConversionOptions();
    }
});

conversionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(conversionForm);

    //////////////////////

    const refWeight = formData.get('weight');
    conversionSelect.value;

    //////////////////////
    const post = {
        title: formData.get('title'),
        weight: formData.get('weight'),
    };
    const response = await createPost(post);
    conversionForm.error = response.error;
    conversionForm.reset();

    if (error) {
        displayError();
    } else {
        // location.assign('/');
    }
});

// display functions

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayConversionOptions() {
    for (const item of items) {
        const option = renderConversionOption(item);
        conversionSelect.append(option);
    }
}

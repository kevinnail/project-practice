// imports

import { createPost, getItems } from '../fetch-utils.js';
import { renderConversionOption } from '../render-utils.js';
import '../auth/user.js';

//  DOM elements

const errorDisplay = document.getElementById('error-display');
const conversionForm = document.getElementById('conversion-form');
const conversionSelect = document.getElementById('conversion-select');
const conversionResult = document.getElementById('conversion-result');
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
    const refTitle = formData.get('title');
    const refWeight = formData.get('weight');
    // getWeight(conversionSelect.value);
    // console.log('items:', items);

    for (const item of items) {
        if (conversionSelect.value === item.title) {
            const x = refWeight / item.weight;
            // alert(x);
            conversionResult.textContent = `${refTitle} is approximately ${x} ${item.title}s`;
            // render a post/ log conversion to profile here
        }
    }

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

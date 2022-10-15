// imports

import { createPost, getItems, getPosts } from '../fetch-utils.js';
import { renderConversionOption, renderPost } from '../render-utils.js';
import '../auth/user.js';

//  DOM elements

const errorDisplay = document.getElementById('error-display');
const conversionForm = document.getElementById('conversion-form');
const conversionSelect = document.getElementById('conversion-select');
const conversionResult = document.getElementById('conversion-result');
const conversionResult2 = document.getElementById('conversion-result-2');
const conversionResult3 = document.getElementById('conversion-result-3');
const postList = document.getElementById('post-list');
// state

let error = null;
let items = [];
let posts = [];
// events

window.addEventListener('load', async () => {
    const conversionOption = await getItems();
    items = conversionOption.data;

    const postList = await getPosts();
    posts = postList.data;

    if (!error) {
        displayConversionOptions();
        displayPosts();
    }
});

conversionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(conversionForm);

    const refTitle = formData.get('title');
    const refWeight = formData.get('weight');

    for (const item of items) {
        if (conversionSelect.value === item.title) {
            let x = refWeight / item.weight;
            let x2 = item.weight / refWeight;
            if (x < 0.0001) {
                x = x.toFixed(6);
                x2 = x2.toFixed(0);
            } else if (x < 1) {
                x = x.toFixed(4);
                x2 = x2.toFixed(0);
            } else if (x < 100) {
                x = x.toFixed(2);
                x2 = x2.toFixed(2);
            } else if (x < 1000) {
                x = x.toFixed(0);
                x2 = x2.toFixed(4);
            } else {
                x = x.toFixed(0);
                x2 = x2.toFixed(6);
            }
            // render a post/ log conversion to profile here //////////////////////////////////////////
            // conversionResult.textContent = `For ${refTitle} at ${refWeight} pounds...`;
            // conversionResult2.textContent = `${refTitle} is approximately ${x} ${item.title_pl}`;
            // conversionResult3.textContent = `A ${item.title} is approximately ${x2} ${refTitle}s`;
        }
    }

    const post = {
        title: refTitle,
        weight: refWeight,
        conversion: conversionSelect.value,
        // weight_factor: item.weight,
    };
    const response = await createPost(post);
    conversionForm.error = response.error;

    if (error) {
        displayError();
    } else {
        const postList = await getPosts();
        posts = postList.data;
        displayPosts();
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

function displayPosts() {
    postList.innerHTML = '';
    for (const post of posts) {
        const postEl = renderPost(post);
        postList.append(postEl);
    }
}

// imports

import { createPost, getUser, getItems, getPosts, getProfile } from '../fetch-utils.js';
import { renderConversionOption, renderPost } from '../render-utils.js';
import '../auth/user.js';

//  DOM elements

const errorDisplay = document.getElementById('error-display');
const conversionForm = document.getElementById('conversion-form');
const conversionSelect = document.getElementById('conversion-select');
const postList = document.getElementById('post-list');
const userAvatar = document.getElementById('user-avatar');
// state

let error = null;
let items = [];
let posts = [];
let profile = null;
const user = getUser();
// events

window.addEventListener('load', async () => {
    const conversionOption = await getItems();
    items = conversionOption.data;

    const postList = await getPosts();
    posts = postList.data;

    const response = await getProfile(user.id);
    profile = response.data;
    console.log('profile.image_url', profile.image_url);

    if (!error) {
        displayConversionOptions();
        displayPosts();
    }
    userAvatar.src = profile.image_url;
});

conversionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(conversionForm);

    const refTitle = formData.get('title');
    const refWeight = formData.get('weight');

    let x = null;
    let x2 = null;
    let factorWeight = null;
    let factorID = null;
    let factorPlural = null;
    for (const item of items) {
        if (conversionSelect.value === item.title) {
            factorWeight = item.weight;
            factorID = item.id;
            factorPlural = item.title_pl;

            x = refWeight / factorWeight;
            x2 = factorWeight / refWeight;

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
        }
    }
    x = `${refTitle} is equal to approximately ${x} ${factorPlural}`;
    x2 = `A ${conversionSelect.value} is approximately ${x2} ${refTitle}s`;
    // creating new post object/ inserting into database
    const post = {
        title: refTitle,
        weight: refWeight,
        // conversion: conversionSelect.value,
        // weight_factor: factorWeight,
        result_1: x,
        result_2: x2,
        factor_id: factorID,
        // conversion_pl: factorPlural,
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

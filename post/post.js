import '../auth/user.js';
import {} from '../render-utils.js';
import { getPost } from '../fetch-utils.js';

// state
let error = null;
let post = null;

window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    if (!id) {
        location.replace('/');
        return;
    }
    const response = await getPost(id);
    error = response.error;
    post = response.data;

    if (error) {
        location.replace('/');
    }
    displayPost();
});

const postTitle = document.getElementById('post-title');
const result_1 = document.getElementById('result-1');
const result_2 = document.getElementById('result-2');

// display functions
function displayPost() {
    postTitle.textContent = `For ${post.title} at ${post.weight} pounds...`;
    result_1.textContent = post.result_1;
    result_2.textContent = post.result_2;
}
